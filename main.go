package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"

	"github.com/nik19ta/go_server/api/operation"
	"github.com/nik19ta/go_server/api/settings"
	"github.com/nik19ta/go_server/api/wwd"
	"github.com/nik19ta/go_server/api/wwf"
)

//readfile - фукция которая отвечает за роут /api/local_files/dir="{dir}" / читает файл
func readfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	filename := vars["file"]

	path := strings.Replace(filename, "|", "/", 20)

	file, _ := wwf.RecordFile(path)

	file.Open()
	jsonfile, _ := file.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfile))

}

//getfiles - фукция которая отвечает за роут /api/readfile/file="{file}" / читает файлы в директории
func getfiles(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	dir := vars["dir"]
	var path string
	if dir == "open_folder" {
		path = wwd.TakeWorkDir()
	} else {
		path = strings.Replace(dir, "|", "/", 20)
	}
	files := wwd.RecordDir(path)
	jsonfiles, _ := files.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfiles))
}

// renamefile - фукция которая отвечает за роут /api/renamefile/filepath="{filepath}",oldname="{oldname}",newname="{newname}" / меняет имя файла
func renamefile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	newname := vars["newname"]
	oldname := vars["oldname"]
	filepath := vars["filepath"]

	filepath = strings.Replace(filepath, "|", "/", 20)

	file, _ := wwf.RecordFile(filepath)

	var oper operation.Operation

	newFilePath := strings.Replace(filepath, oldname, newname, 1)

	fmt.Println(newname, "\n", oldname, "\n", filepath, "\n", newFilePath)

	err := file.Rename(newFilePath)

	if err == false {
		oper = operation.Record(err, file)
	} else {
		newFilePath := strings.Replace(file.Name, oldname, newname, 1)
		file, _ = wwf.RecordFile(newFilePath)
		oper = operation.Record(true, file)
	}

	jsonfile, _ := oper.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfile))

}

func deletefile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	filepath := vars["filepath"]
	filepath = strings.Replace(filepath, "|", "/", 20)

	file, _ := wwf.RecordFile(filepath)

	isDone := file.Delete()
	oper := operation.Record(isDone, file)

	jsonfile, _ := oper.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfile))

}

func createfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	isDir := vars["isDir"]
	filepath := vars["filepath"]
	filepath = strings.Replace(filepath, "|", "/", 20)

	var oper operation.Operation

	if isDir == "true" {
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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfile))

}

func main() {

	fmt.Println(settings.Get())

	fs := http.FileServer(http.Dir("./build"))
	router := mux.NewRouter()

	router.HandleFunc(`/api/local_files/dir="{dir}"`, getfiles)
	router.HandleFunc(`/api/readfile/file="{file}"`, readfile)
	router.HandleFunc(`/api/renamefile/filepath="{filepath}",oldname="{oldname}",newname="{newname}"`, renamefile)
	router.HandleFunc(`/api/deletefile/filepath="{filepath}"`, deletefile)
	router.HandleFunc(`/api/createfile/isDir="{isDir}", filepath="{filepath}"`, createfile)

	http.Handle("/api/", router)
	http.Handle("/", fs)

	fmt.Println("Server is listening...")
	http.ListenAndServe(":3000", nil)
}
