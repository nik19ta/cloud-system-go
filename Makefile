.PHONY: build
build:
	go build -v ./main.go
	./main

.DEFAULT_GOAL := build