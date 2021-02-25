package settings

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

//Settings - структура настроек
type Settings struct {
	Version string `json:"version"`
	Users   []User `json:"users"`
}

// User - настройки конкретного пользователя
type User struct {
	Username      string `json:"username" `
	Password      string `json:"password"`
	IsRoot        bool   `json:"isRoot"`
	Iconpack      string `json:"iconpack"`
	Team          string `json:"team"`
	ReadLanguages bool   `json:"readLanguages"`
	Language      string `json:"language"`
	SessionKey    string `json:"sessionKey"`
}

// Get - получение настроек
func Get() Settings {
	var settings Settings
	jsonFile, err := os.Open("./settings.json")
	if err != nil {
		fmt.Println(err)
		return CreateSettings()
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	json.Unmarshal(byteValue, &settings)

	if len(settings.Users) == 0 || settings.Version == "" {
		CreateSettings()
	}

	return settings
}

// Record - записывает новые настройки
func Record(settingsJSON string) Settings {
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

func CreateSettings() Settings {
	user := User{
		Username:      "root",
		Password:      "pass",
		IsRoot:        true,
		Iconpack:      "EgorkaPack",
		Team:          "dark",
		ReadLanguages: false,
		Language:      "en",
		SessionKey:    ""}
	settings := Settings{"Beta", []User{user}}
	settingsJSON, _ := settings.Send()
	Record(string(settingsJSON))
	return settings
}
