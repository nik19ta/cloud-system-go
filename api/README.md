# API

## go packages:

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


### Стркутура проекта

```sh
.
├── Makefile                # Автоматизация сборки проекта
├── README                  # Папка с ресурсов для README файла
├── README.md               # README.md - описание проекта
├── api                     # Папка с api go
│   ├── README.md           # Описание серверной части
│   ├── operation           # Модуль работы с операциями 
│   ├── settings            # Модуль работы с настройками
│   ├── wwd                 # Модуль работы с папками
│   ├── wwf                 # Модуль работы с файлами
│   └── wwz                 # Модуль работы с zip архивами
├── go.mod                  # Описание модулей go
├── go.sum                  # База данных контрольных сумм
├── .gitignore              # Файл где описанны все файлы которые игнорируются git
├── .editconfig             # Файл настройки редакторов кода
├── main                    # билд main.go (создаётся при компиляции)
├── main.go                 # Самый главный файл сервера
└── public                  # Папка статических файлов
    ├── css                 # Папка стилей
    ├── icons               # Папка иконок приложений
    ├── images              # картинки
    ├── index.html          # Главнй html файл
    └── js                  # Папка где хранятся все скрипты 
        ├── Application.js  # Глаыный класс-родитель приложений
        ├── DragAndDrop.js  # Файл где реализуется DragAndDrop
        ├── apps            # Папка с приложениями
        ├── functions.js    # Файл с различными файлами
        ├── init.js         # Файл инициализации
        ├── main.js         # Главный файл где запускаются основные функции 
        └── settings.js     # файл где хранятся дефолтные настройки
```
