import { FolderApp } from './apps/folder'
import { ReaderApp } from './apps/reader'

import { settings } from './Settings'
import { functions } from './Functions'

import '../css/main.css'

class Main {
	constructor() {}

	init() {
		functions.show_date_dock()
		document.querySelector('body').style.background = `url(${settings.get('desktop_background')})`
		document.querySelector("title").innerHTML = settings.get('title_page');
		setInterval(() => functions.show_date_dock(), 60000)
	
		window.FolderApp = FolderApp
		window.ReaderApp = ReaderApp
	}
}

const main = new Main()

main.init()
