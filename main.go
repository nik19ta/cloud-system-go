package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/nik19ta/go_server/api/operation"
	"github.com/nik19ta/go_server/api/structs"
	"github.com/nik19ta/go_server/api/wwd"
	"github.com/nik19ta/go_server/api/wwf"
)

type Request struct {
	Type  string `json:"type"`
	Value string `json:"value"`
}

func hendler(w http.ResponseWriter, r *http.Request) {

	isLogin := r.Header.Get("X-IsLogin")
	fmt.Println(isLogin)

		switch r.Method {

		case "GET":
			http.ServeFile(w, r, "../public/index.html")

		case "POST":
			b, err := ioutil.ReadAll(r.Body)
			defer r.Body.Close()
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			request := Request{}
			json.Unmarshal([]byte(b), &request)

			var answer []byte

			switch request.Type {

			case "local_files":
				localFiles := structs.LocalFiles{}
				json.Unmarshal([]byte(request.Value), &localFiles)
				answer = getfiles(localFiles.Dir)

			case "read_file":
				readFile := structs.ReadFile{}
				json.Unmarshal([]byte(request.Value), &readFile)
				answer = readfile(readFile.File)

			case "rename_file":
				renameFile := structs.RenameFile{}
				json.Unmarshal([]byte(request.Value), &renameFile)
				answer = renamefile(renameFile.FilePath, renameFile.OldFileName, renameFile.NewFileName)

			case "delete_file":
				deleteFile := structs.DeleteFile{}
				json.Unmarshal([]byte(request.Value), &deleteFile)
				answer = deletefile(deleteFile.FilePath)

			case "create_file":
				createFile := structs.CreateFile{}
				json.Unmarshal([]byte(request.Value), &createFile)
				answer = createfile(createFile.IsDir, createFile.FilePath)

			}

			fmt.Println("Server accept post request, body -> ", request)

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(string(answer))
		}

	}


func getfiles(dir string) []byte {
	var path string
	if dir == "open_folder" {
		path = wwd.TakeWorkDir()
	} else {
		path = strings.Replace(dir, "|", "/", 20)
	}
	files := wwd.RecordDir(path)
	jsonfiles, _ := files.Send()

	return jsonfiles
}

func readfile(filename string) []byte {

	path := strings.Replace(filename, "|", "/", 20)

	file, _ := wwf.RecordFile(path)
	file.Open()

	jsonfile, _ := file.Send()
	return jsonfile
}

func renamefile(filepath string, oldfilename string, newfilename string) []byte {

	filepath = strings.Replace(filepath, "|", "/", 20)
	file, _ := wwf.RecordFile(filepath)
	var oper operation.Operation
	newFilePath := strings.Replace(filepath, oldfilename, newfilename, 1)

	err := file.Rename(newFilePath)

	if err == false {
		oper = operation.Record(err, file)
	} else {
		newFilePath := strings.Replace(file.Name, oldfilename, newfilename, 1)
		file, _ = wwf.RecordFile(newFilePath)
		oper = operation.Record(true, file)
	}

	jsonfile, _ := oper.Send()
	return jsonfile
}

func deletefile(filepath string) []byte {

	filepath = strings.Replace(filepath, "|", "/", 20)
	file, _ := wwf.RecordFile(filepath)

	isDone := file.Delete()
	oper := operation.Record(isDone, file)

	jsonfile, _ := oper.Send()
	return jsonfile
}

func createfile(isDir bool, filepath string) []byte {

	filepath = strings.Replace(filepath, "|", "/", 20)

	var oper operation.Operation

	if isDir == true {
		err := wwd.CreateDir(filepath)
		if err == false {
			oper = operation.Record(err, wwf.File{})
		} else {
			dir, _ := wwf.RecordFile(filepath)
			oper = operation.Record(err, dir)
		}

	} else {
		err, file := wwf.CreateFile(filepath)
		if err == false {
			oper = operation.Record(err, wwf.File{})
		} else {
			file, _ = wwf.RecordFile(filepath)
			oper = operation.Record(err, file)
		}
	}

	jsonfile, _ := oper.Send()
	return jsonfile
}

func main() {

	http.HandleFunc("/", hendler)

	fmt.Printf("Starting server for testing HTTP POST...\n")

	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}
