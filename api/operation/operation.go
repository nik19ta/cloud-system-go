package operation

import (
	"encoding/json"

	"github.com/nik19ta/go_server/api/wwf"
)

// Operation - Ответ приходящий на сервер
type Operation struct {
	IsDone bool
	Answer wwf.File
}

// Send - --> возвращает структуру преобразованную в Json
func (o *Operation) Send() ([]byte, bool) {
	jsonFile, err := json.Marshal(o)
	if err != nil {
		return []byte("nil"), false
	}
	return jsonFile, true
}

// Record - --> Записывает операцию
func Record(IsDone bool, Answer wwf.File) Operation {
	return Operation{IsDone: IsDone, Answer: Answer}
}
