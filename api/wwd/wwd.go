package wwd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/nik19ta/go_server/api/wwf"
)

//Dir - структура папок
type Dir struct {
	Name  string
	Files []wwf.File
}

// Send - --> возвращает структуру преобразованную в Json
func (d *Dir) Send() ([]byte, bool) {
	jsonFile, err := json.Marshal(d)
	if err != nil {
		return []byte("nil"), false
	}
	return jsonFile, true
}

// Delete - удаляет папку --> возвращает true в случае удаления, false в случае неудачи
func (d *Dir) Delete() bool {
	err := os.Remove(d.Name)
	if err != nil {
		return false
	}
	return true
}

// Rename - Меняет имя папки <-- принимает полное, новое имя файла --> возвращает true в случае успешной смены имени, false в случае неудачи
func (d *Dir) Rename(newName string) bool {

	err := os.Rename(d.Name, newName)

	if err != nil {
		return false
	}

	return true
}

// RecordDir - Создает новый экземпляр Структуры Dir
func RecordDir(path string) Dir {
	files, err := ioutil.ReadDir(path)
	if err != nil {
		fmt.Println("Error")
	}
	dir := Dir{Name: path}
	for _, file := range files {
		dir.Files = append(dir.Files, wwf.File{Name: file.Name(), IsDirectory: file.IsDir()})
	}
	return dir
}

// CreateDir - создает новую папку <-- принимает имя папки --> возвращает true в случае создания, false в случае неудачи
func CreateDir(name string) {
	os.MkdirAll(name, os.ModePerm)
}
