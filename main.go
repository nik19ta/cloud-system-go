package main

import(
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "io/ioutil"
    "github.com/gorilla/mux"
)

type Localfile struct {
    Name string
    IsFolder bool
}

func getFiles(w http.ResponseWriter, r * http.Request) {
    localfiles := [] Localfile {}

    vars := mux.Vars(r)
    dir := vars["dir"];

    files, err := ioutil.ReadDir(dir)

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

    router.HandleFunc(`/api/local_files`, getFiles)

    http.Handle("/api/", router)

    http.Handle("/", fs)

    fmt.Println("Server is listening...")
    http.ListenAndServe(":3000", nil)
}