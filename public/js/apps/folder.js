let files = ''
let url_folder = 'open_folder'
let classNameDiv = ''
let last_name = ''

let FolderHtml = `
    <div class="app_folder">
        <div class="app_folder__header">
            <div class='left_block'>
                <img onclick='FolderApp.tofile("..")' src='../../images/res/back.svg' class='back' />
                <img onclick='FolderApp.tofile("..")' src='../../images/res/back.svg' class='back backtoback' />
                <p class='filepath'>
                    <p />
            </div>
            <div class="rigth_block">
                <button class='app_folder__header_btn'>Create</button>
                <button class='app_folder__header_btn btn_disable'>Delete</button>
                <button class='app_folder__header_btn btn_disable' onclick='FolderApp.btn_rename()'>Rename</button>
            </div>
        </div>
        <div class="folder__files">${files}</div>
    </div>

    <style>
        * {
            user-select: none;
        }

        .app_folder {
            box-sizing: border-box;
            padding-bottom: 10px;
            font-size: 12px;
            color: #fff;
            width: 100%;
            height: 100%;
            background-color: rgb(30, 30, 30);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            display: flex;
            flex-wrap: wrap;
            aling-items: center;
            flex-direction: row;
            position: relative;
        }

        .app_folder__header_btn {
            height: 18px;
            padding-left: 10px;
            padding-right: 10px;
            background: #383838;
            border: 0.5px solid rgba(75, 75, 75, 0.52);
            box-sizing: border-box;
            color: #FFFFFF;
            border-radius: 4px;

            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 11px;
            font-family: inherit;
            cursor: pointer;
        }

        .left_block {
            width: 50%;
            height: 100%;
            display: flex;
            flex-wrap: nowrap;
            aling-items: center;
            justify-content: flex-start;
        }

        .rigth_block {
            padding-right: 15px;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 17px;
        }

        .filepath {
            font-weight: bold;
        }

        .back {
            width: 33px !important;
            cursor: pointer;
        }

        .backtoback {
            transform: rotate(180deg);
            margin-left: 13px;
        }

        .app_folder__header {
            background: #262626;
            border-radius: 0px;
            height: 40px;
            width: 100%;
            position: absolute;
            top: 0;
            display: flex;
            aling-items: center;
        }

        .folder__files {
            padding-top: 10px;
            margin-top: 40px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            width: 100%;
            overflow: auto;
            max-height: 333px;
            overflow: auto;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            flex-flow: row wrap;
            align-self: flex-start;

            gap: 22px;
        }

        .line {
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            backdorund-color: red;
            border-radius: 4px;
            padding: 2px;
            flex-wrap: wrap;
        }

        .folder__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        .image {
            height: 50px;
        }

        .back {
            padding-left: 25px;
        }

        .folder__filename {
            width: 100%;
            font-size: 10px;
            margin-top: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .center {
            display: flex;
            justify-content: center;
        }

        .filepath {
            white-space: nowrap;
        }

        .active {
            background-color: rgb(14, 92, 205);
            border-radius: 5px;
        }

        .btn_disable {
            opacity: 0.5;
            cursor: default;
        }

        .btn_en {
            opacity: 1;
            cursor: pointer;
        }
    </style>`

class Folder extends Application {
	constructor(...args) {

		super(...args)
		

	}


	folder_open_file(filename) {
		let localpath = url_folder + '/' + filename;
		localpath = localpath.split('/').join('|')

		ReaderApp.getData(localpath)
	}

	renameFile(oldname, newname) {
		let path = url_folder + '/' + oldname
		path = path.split('/').join('|')

		this.getfetch(`/api/renamefile/filepath="${path}",oldname="${oldname}",newname="${newname}"`, (response) => {
			console.log(JSON.parse(response));
			return JSON.parse(response)
		})
	}

	tofile(dir) {
		let app_folder = document.querySelector('.folder__files');

		if (dir == "..") {
			url_folder = url_folder.split("/").slice(0, -1).join("|");
		} else if (dir != "open_folder") {
			url_folder = url_folder + '/' + dir
			url_folder = url_folder.split("/").join("|");
		}

		this.getfetch(`/api/local_files/dir="${url_folder}"`, (response) => {
			console.log(1);

			if (classNameDiv != "") {
				document.querySelectorAll('.btn_disable')[0].classList.remove('btn_en')
				document.querySelectorAll('.btn_disable')[1].classList.remove('btn_en')
				document.querySelector(classNameDiv).classList.remove('active')
				classNameDiv = ''
			}

			url_folder = JSON.parse(response).Name

			let local_path = url_folder;

			while (local_path.length > 50) {
				local_path = local_path.split('/').splice(1).join('/');
			}
			document.querySelector('.filepath').innerHTML = local_path

			files = ``

			if (JSON.parse(response)['Files'] == null) {
				alert("Папка пустая")
			}

			while (app_folder.firstChild) {
				app_folder.removeChild(app_folder.firstChild);
			}

			for (let i = 0; i < JSON.parse(response)['Files'].length; i++) {
				files = files + FolderApp.elem(JSON.parse(response)['Files'][i], i)
			}
			app_folder.innerHTML = files;
		})
	}

	elem(data, i) {
		return ` <div 
        class='${data['IsDirectory'] ? "file_folder" : "file_no_folder"}  ${i % 2 == 0 ? 'bg_line' : 'fg_line'} line line_${data['Name'].replace(/\s/g, '').replace(/\./g, "__")}'
        id='line${i}'

        ${data['IsDirectory'] ? `ondblclick='FolderApp.tofile("${data['Name']}")'` : `ondblclick='FolderApp.folder_open_file("${data['Name']}")'` }
        ${`onclick='FolderApp.set_active("${i}")'`}

        >

        <div class='folder__icon' >
        <img class='image' src="${FolderApp.setimg(data['Name'], data['IsDirectory'])}" alt="">
        </div>

        <p  
            id='line_${i}_text'
            class='
                folder__filename ${data["Name"].length < 15 ? "center" : ""}
                line_${data["Name"].replace(/\s/g, "").replace(/\./g, "__")}_text'
                > ${data["Name"]} </p>

        </div>`
	}
	// ${data['Name']}
	getfetch(url, callback) {
		fetch(`${url}`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "GET",
			})
			.then(response => response.text())
			.then((response) => {
				response = JSON.parse(response)
				callback(response)
			})
			.catch(err => console.log(err))
	}
	set_active(data) {
		if (document.querySelector('.active') != null) {
			document.querySelector(classNameDiv).classList.remove('active')
			classNameDiv = ''
		}
		classNameDiv = `#line_${data}_text`


		document.querySelectorAll('.btn_disable')[0].classList.add('btn_en')
		document.querySelectorAll('.btn_disable')[1].classList.add('btn_en')
		document.querySelector(classNameDiv).classList.add('active')
	}
	btn_rename() {
		last_name = document.querySelector(classNameDiv).innerHTML;
		document.querySelector(classNameDiv).innerHTML = `
			<form id='renameinp' ><input  type="text" class="input_rename" value="${last_name}" ></form>

			<style>    
			.input_rename {
				width: 50px;
				background: #0003;
				color: #fff;
				border: 0;
				border-radius: 4px;
				padding: 4px;
			}
			</style>
			`

		document.querySelector('#renameinp').addEventListener('submit', function (e) {
			e.preventDefault();
			FolderApp.renameFile(last_name.trim(), document.querySelector('.input_rename').value.trim())
			document.querySelector(classNameDiv).innerHTML = document.querySelector('.input_rename').value
			// document.querySelectorAll('.btn_disable')[0].classList.remove('btn_en')
			// document.querySelectorAll('.btn_disable')[1].classList.remove('btn_en')
			// document.querySelector(classNameDiv).classList.remove('active')
			last_name = ''
			classNameDiv = ''

		})
	}
	setimg(name, type) {
		if (name.indexOf('.') !== -1) {
			let file_extension = icons[name.split('.')[name.split('.').length - 1]];
			if (file_extension != undefined) return `${path_to_iconpack}/${iconpack}/${file_extension}.${photo_extension_default}`
		}
		if (type) return `${path_to_iconpack}/${iconpack}/folder.png`
		else {
			if (name.includes("git")) return `${path_to_iconpack}/${iconpack}/git.${photo_extension_default}`
			else if (name.indexOf('.') === -1) return `${path_to_iconpack}/${iconpack}/runfile.${photo_extension_default}`
			else return `${path_to_iconpack}/${iconpack}/defoult.${photo_extension_default}`
		}
	}
}

let FolderApp = new Folder('FolderApp', 'Folder', 'folder.png', FolderHtml, 600, 400, true, () => {
	url_folder = 'open_folder'
	FolderApp.tofile('open_folder')
}, () => {})


FolderApp.renderIcon()
