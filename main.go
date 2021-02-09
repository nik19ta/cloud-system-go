package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"github.com/nik19ta/go_server/api/wwf"
)

type Localfile struct {
	Name     string
	IsFolder bool
}
type Files struct {
	Name string
	Data string
}

func readfile(w http.ResponseWriter, r *http.Request) {
	files := []Files{}

	vars := mux.Vars(r)
	file := vars["file"]

	file = strings.Replace(file, "slash", "/", 20)

	f, err := os.Open(file)

	if err != nil {
		panic(err)
	}
	defer f.Close()

	wr := bytes.Buffer{}
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		wr.WriteString(sc.Text())
	}
	files = append(files, Files{file, wr.String()})

	json_data, err := json.Marshal(files)

	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(json_data))

}

func getFiles(w http.ResponseWriter, r *http.Request) {
	localfiles := []Localfile{}

	vars := mux.Vars(r)
	dir := vars["dir"]

	res1 := strings.Replace(dir, "slash", "/", 20)

	files, err := ioutil.ReadDir(res1)

	for _, file := range files {
		localfiles = append(localfiles, Localfile{file.Name(), file.IsDir()})
	}

	json_data2, err := json.Marshal(localfiles)

	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(string(json_data2))
}

func main() {

	fs := http.FileServer(http.Dir("./public"))

	router := mux.NewRouter()

	router.HandleFunc(`/api/local_files/dir="{dir}"`, getFiles)

	router.HandleFunc(`/api/readfile/file="{file}"`, readfile)

	router.HandleFunc(`/api/local_files`, getFiles)

	http.Handle("/api/", router)

	http.Handle("/", fs)

	fmt.Println("Server is listening...")
	http.ListenAndServe(":3000", nil)
}
