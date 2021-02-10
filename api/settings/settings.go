package settings

import (
	"encoding/json"
)

//Settings - структура настроек
type Settings struct {
	Keyboard  bool
	DrowPhoto bool
}

//Swipe - Эмитирует нажатие на ползунок <-- принимает поле на которое нужно свайпнуть; поля для свайпа: Keyboard, DrowPhoto
func (s *Settings) Swipe(button string) {
	switch button {
	case "Keyboard":
		s.Keyboard = !s.Keyboard
	case "DrowPhoto":
		s.DrowPhoto = !s.DrowPhoto
	}
}

//Send - --> возвращает структуру преобразованную в Json
func (s *Settings) Send() ([]byte, bool) {
	jsonFile, err := json.Marshal(s)
	if err != nil {
		return []byte("nil"), false
	}
	return jsonFile, true
}
