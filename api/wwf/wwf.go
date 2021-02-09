// Package wwf - Work With Files
package wwf

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

// File - Структура Файлов, Data поумолчанию должна быть пустой
type File struct {
	Name        string
	IsDirectory bool
	Data        string
}

// Rename - Меняет имя файла <-- принимает полное, новое имя файла --> возвращает true в случае успешной смены имени, false в случае неудачи
func (f *File) Rename(newName string) bool {

	err := os.Rename(f.Name, newName)

	if err != nil {
		return false
	}

	return true
}

// Open - Заменяет путстую File.Data на содержимое файла c пробелами и переносами строк
func (f *File) Open() {
	file, err := os.Open(f.Name)
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()
	data := make([]byte, 64)
	lines := ""
	for {
		n, err := file.Read(data)
		if err == io.EOF {
			break
		}
		lines = lines + string(data[:n])
	}
	f.Data = lines
}

// Delete - удаляет файл --> возвращает true в случае удаления, false в случае неудачи
func (f *File) Delete() bool {
	err := os.Remove(f.Name)
	if err != nil {
		return false
	}
	return true
}

// Send - --> возвращает структуру преобразованную в Json
func (f *File) Send() ([]byte, bool) {
	jsonFile, err := json.Marshal(f)
	if err != nil {
		return []byte("nil"), false
	}
	return jsonFile, true
}

// RecordFile - Создает новый экземпляр Структуры File, с пустой Data
func RecordFile(fileName string) File {

	file, err := os.Stat(fileName)

	if err != nil {
		fmt.Println(err)
	}
	return File{Name: fileName, IsDirectory: file.IsDir()}
}

// CreateFile - создает новый файл <-- принимает имя файла --> возвращает true в случае создания, false в случае неудачи
func CreateFile(name string) bool {
	newFile, err := os.Create(name)
	if err != nil {
		return false
	}
	newFile.Close()
	return true
}
