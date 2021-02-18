package settings

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

//Settings - структура настроек
type Settings struct {
	IconPack string `json:"icon-pack"`
}

// Get - получение настроек
func Get() Settings {
	jsonFile, err := os.Open("./settings.json")
	if err != nil {
		fmt.Println(err)
		return Settings{"egorkaPack"}
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var settings Settings
	json.Unmarshal(byteValue, &settings)

	return settings
}

// Record - записывает новые настройки
func Record( settingsJSON string) Settings {
	var settings Settings
	json.Unmarshal([]byte(settingsJSON), &settings)
	_ = ioutil.WriteFile("./settings.json", []byte(settingsJSON), 0644)
	return settings
}

//Send - --> возвращает структуру преобразованную в Json
func (s *Settings) Send() ([]byte, bool) {
	jsonFile, err := json.Marshal(s)
	if err != nil {
		return []byte("nil"), false
	}
	return jsonFile, true
}
