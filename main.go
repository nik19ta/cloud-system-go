package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"

	"github.com/nik19ta/go_server/api/operation"
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

	fmt.Println(oper)

	jsonfile, _ := oper.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfile))

}

func main() {

	fs := http.FileServer(http.Dir("./public"))
	router := mux.NewRouter()

	router.HandleFunc(`/api/local_files/dir="{dir}"`, getfiles)
	router.HandleFunc(`/api/readfile/file="{file}"`, readfile)
	router.HandleFunc(`/api/renamefile/filepath="{filepath}",oldname="{oldname}",newname="{newname}"`, renamefile)

	http.Handle("/api/", router)
	http.Handle("/", fs)

	fmt.Println("Server is listening...")
	http.ListenAndServe("localhost:3000", nil)
}
