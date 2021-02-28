export default class Settings {
	constructor() {
		this.data = {}
		this.data['desktop_background'] = './images/backgrounds/1.jpg'
		this.data['title_page'] = 'System'
		this.data['path_to_iconpack'] = '../../images/res/'
		this.data['icons'] = {
			"html": "html",
			"json": "json",
			"jpeg": "jpg",
			"java": "java",
			"webp": "webp",
			"scss": "scss",
			"cpp":  "cpp",
			"txt":  "txt",
			"png":  "png",
			"jpg":  "jpg",
			"zip":  "zip",
			"csv":  "csv",
			"css":  "css",
			"mov":  "mov",
			"mp3":  "mp3",
			"mp4":  "mp4",
			"dmg":  "dmg",
			"pkg":  "pkg",
			"exe":  "exe",
			"ico":  "ico",
			"jar":  "jar",
			"jsx":  "jsx",
			"xml":  "xml",
			"cs":   "cs",
			"go":   "go",
			"js":   "js",
			"py":   "py",
			"md":   "md",
			"ts":   "ts",
			"sh":   "sh",
		}
		this.data['photo_extension_default'] = 'png'
		this.data['iconpack'] = 'egorkaPack'
		this.data['days_of_week'] = {
			'Sun': 'Вс',
			'Mon': 'Пн',
			'Tue': 'Вт',
			'Wed': 'Ср',
			'Thu': 'Чт',
			'Fri': 'Пт',
			'Sat': 'Сб'
		}
		this.data['months'] = {
			'Jan': 'янв',
			'Feb': 'фев',
			'Mar': 'мар',
			'Apr': 'апр',
			'May': 'май',
			'Jun': 'июн',
			'Jul': 'июл',
			'Aug': 'авг',
			'Sep': 'сен',
			'Oct': 'окт',
			'Nov': 'ноя',
			'Dec': 'дек'
		}
	}

	get(field) {
		return this.data[field]
	}

	get_fields(separator) {
		let str = "";
		for (var key in this.data) {
			str += key + (separator == undefined ? "," : separator)
		}

		return str.substring(0, str.length - (separator == undefined ? 1 : separator.length))
	}
}

const settings = new Settings()

export { settings }
