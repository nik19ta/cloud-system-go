// Package wwf - Work With Files, ну я хз пока какое описание сделать, так что я думаю потом распишу 
package wwf

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
)

// File - Структура Файлов, Data поумолчанию должна быть пустой
type File struct {
	Name        string
	isDirectory bool
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

// Open - Заменяет путстую File.Data на содержимое файла (без \n)
func (f *File) Open() {
	file, err := os.Open(f.Name)
	if err != nil {
		fmt.Println(err)
	}
	wr := bytes.Buffer{}
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		wr.WriteString(sc.Text())
	}
	f.Data =  wr.String()
	file.Close()
}

// Delete - удаляет файл --> возвращает true в случае успешной смены имени, false в случае неудачи 
func (f *File) Delete() bool {
	err := os.Remove(f.Name)
    if err != nil {
        return false
    }
	return true
}

// RecordFile - Создает новый экземпляр Структуры File, с пустой Data 
func RecordFile(fileName string) File {

	file, err := os.Stat(fileName)

	if err != nil {
		fmt.Println(err)
	}

	return File{Name: file.Name(), isDirectory: file.IsDir()}
}


