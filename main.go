package main
 
import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "io/ioutil"
)
 
type Localfile struct {
    Name       string
    IsFolder   bool
}
 
func main() {

    fs := http.FileServer(http.Dir("public"))

    http.Handle("/", fs)

    http.HandleFunc("/local_files", func(w http.ResponseWriter, r *http.Request){
        localfiles := []Localfile{}

        files, err := ioutil.ReadDir(".")
        if err != nil { log.Fatal(err) }

        for _, file := range files {
            localfiles = append(localfiles, Localfile{file.Name(), file.IsDir()})
        }

        json_data2, err := json.Marshal(localfiles)
        
        if err != nil { log.Fatal(err) }

        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(string(json_data2))
    })


    fmt.Println("Server is listening...")
    http.ListenAndServe(":3000", nil)
}