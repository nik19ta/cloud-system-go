package structs

type LocalFiles struct {
	Dir string `json:"dir"`
}

type ReadFile struct {
	File string `json:"file"`
}

type RenameFile struct {
	FilePath string `json:"filepath"`
	OldFileName string `json:"oldfilname"`
	NewFileName string `json:"newfilename"`
}

type DeleteFile struct {
	FilePath string `json:"filepath"`
}

type CreateFile struct {
	IsDir bool `json:"isdir"`
	FilePath string `json:"filepath"`
}