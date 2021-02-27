.PHONY: build
build:
	webpack
	go build -v ./main.go
	./main
buildFront:
	webpack
	open ./build/index.html
buildBack:
	go build -v ./main.go
	./main

devFront:
	webpack --mode development  --watch

.DEFAULT_GOAL := build
