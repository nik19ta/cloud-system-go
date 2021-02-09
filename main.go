package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"

	"github.com/nik19ta/go_server/api/wwd"
	"github.com/nik19ta/go_server/api/wwf"
)

// фукция которая отвечает за роут /api/local_files/dir="{dir}" / читает файл
func readfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	filename := vars["file"]

	path := strings.Replace(filename, "slash", "/", 20)

	file := wwf.RecordFile(path)

	file.Open()
	jsonfile, _ := file.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfile))

}

// фукция которая отвечает за роут /api/readfile/file="{file}" / читает файлы в директории
func getfiles(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	dir := vars["dir"]
	path := strings.Replace(dir, "slash", "/", 20)

	files := wwd.RecordDir(path)
	jsonfiles, _ := files.Send()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(jsonfiles))
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	router := mux.NewRouter()

	router.HandleFunc(`/api/local_files/dir="{dir}"`, getfiles)
	router.HandleFunc(`/api/readfile/file="{file}"`, readfile)

	http.Handle("/api/", router)
	http.Handle("/", fs)

	fmt.Println("Server is listening...")
	http.ListenAndServe(":3000", nil)
}
