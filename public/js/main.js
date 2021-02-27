import { settings } from './Settings'

import { FolderApp } from './apps/folder'
import { ReaderApp } from './apps/reader'
import show_date_dock from './functions'



function init() {
	show_date_dock.show_date_dock()
	document.querySelector('body').style.background = `url(${settings.get('desktop_background')})`
	document.querySelector("title").innerHTML = settings.get('title_page');	

}
setInterval(() => show_date_dock.show_date_dock(), 60000)

init()




window.FolderApp = FolderApp
window.ReaderApp = ReaderApp
