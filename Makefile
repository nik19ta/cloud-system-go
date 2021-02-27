.PHONY: build
build:
	webpack
	go build -v ./main.go

buildFront:
	webpack
	open ./build/index.html

buildBack:
	go build -v ./main.go
	./main

devFront:
	go build -v ./main.go
	./main
	webpack --mode development  --watch

.DEFAULT_GOAL := build
