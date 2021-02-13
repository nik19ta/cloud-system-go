# wwz - Work with zip

### Funcs:
* Unzip(filename) - создает папку(с таким же именем как и у zip архива) и распаковывает туда zip
* ZipFiles(zipname, files) - упаковывает файлы в zip

# wwf - Work with file

### Funcs:
* `RecordFile(fileName) return File` - Создает новый экземпляр Структуры File, с пустой Data
* `CreateFile(name string) return true or false` - создает новый файл

### use stract `File`:
```go
type File struct {
	Name        string
	IsDirectory bool
	Data        string
	Size        int64
	ModTime     time.Time
}
```
### `File` methods
* `Write(newFill) return File.Data` - Записывает новое содержимое в файл 
* `Rename(newName) return true or false` - Переименовывает файл
* `Open()` - Заменяет пустую File.Data на содержимое файла 
*	`CreateFile(fileName) return File` - создает новый файл
* `Delete() -> true or false` - Удаляет файл
* `Send() return []byte, bool` - возвращает структуру преобразованную в Json

# wwd - Work with dir

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

# settings - Work with settings
### Funcs:
### use stract `Settings`:
```go
type Settings struct {
	Keyboard  bool
	DrowPhoto bool
}
```
### `Settings` methods:
* `Swipe(button)` - Эмитирует нажатие на ползунок
* `Send() return []byte, bool` - возвращает структуру преобразованную в Json