import { FolderApp } from './apps/folder'
import { ReaderApp } from './apps/reader'

var show_date_dock = require("./functions");

let desktop_background = './images/backgrounds/1.jpg'
let title_page = 'System'

// настроцка folder


function init() {
	show_date_dock.show_date_dock()
	document.querySelector('body').style.background = `url(${desktop_background})`
	document.querySelector("title").innerHTML = title_page;	
}

init()


setInterval(() => show_date_dock.show_date_dock(), 60000)



window.FolderApp = FolderApp
window.ReaderApp = ReaderApp

FolderApp.renderIcon()
// FolderApp.render()

// console.log(FolderApp)
