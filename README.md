## wwf - Work with file
*** 
### Funcs:
* `RecordFile(fileName) return File` - Создает новый экземпляр Структуры File, с пустой Data
* `CreateFile(name string) return true or false` - создает новый файл

### use stract `File`:
```go
type File struct {
	Name        string
	IsDirectory bool
	Data        string
}
```
### `File` methods
* `Rename(newName) return true or false` - Переименовывает файл
* `Open()` - Заменяет пустую File.Data на содержимое файла 
* `Delete() -> true or false` - Удаляет файл
* `Send() return []byte, bool` - возвращает структуру преобразованную в Json

## wwd - Work with file
*** 
### Funcs:
* `RecordDir(path string) return Dir` - Создает новый экземпляр Структуры Dir
* `CreateDir(name)` - создает новую папку

### use stract `Dir`:
```go
type Dir struct {
	Name  string
	Files []wwf.File
}
```
### `Dir` methods
* `Rename(newName) return true or false` - Меняет имя папки
* `Delete() -> true or false` - Удаляет папку
* `Send() return []byte, bool` - Возвращает структуру преобразованную в Json