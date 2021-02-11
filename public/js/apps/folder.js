let files = ''
let url_folder = '..'
let lastcolor = ''

const folder_html = `
    <div class="app_folder" >${files}</div>
        
    <style>
        .app_folder{
            width: 100%;
            padding: 8px;
            padding-bottom: 10px;
            font-size: 12px;
            color: #fff;
            width: 600px;
            height: calc(400px - 25px);
            background-color: rgb(30, 30, 30);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            overflow-y: auto;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 20px;
        }
        .line{
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            backdorund: red;
            border-radius: 4px;
            padding: 2px;
            flex-wrap: wrap;
        }
        .bg_line{
            // background: rgb(41,41,41);
        }
        .fg_line{
            // background: rgb(41,41,41);
        }
        .folder__icon{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        .image{
            height: 50px;
        }
        .back{
            padding-left: 25px;
        }
        .folder__filename{
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
    </style>
    `




let folder = new app('folder', true, 'folder.png', 600, 400, false, 'Проводник', folder_html, () => {}, () => {
    folder.tofile(url_folder)
})
folder.folder_open_file = (filename) => {
    let localpath = url_folder + 'slash' + filename;
    folder.getfetch(`/api/readfile/file="${localpath}"`, (r) => {
        reader.callback(JSON.parse(r)['Data'], JSON.parse(r)['Name'])
    })

}
folder.tofile = (dir) => {
    let app_folder = document.querySelector('.app_folder');

    if (dir === '..' && url_folder !== '..') {
        url_folder = url_folder.substring(0, url_folder.length - url_folder.length);
        url_folder = url_folder + dir;
    } else {
        url_folder = url_folder + "slash" + dir;
    }

    console.log('Запрос на', url_folder);
    folder.getfetch(`/api/local_files/dir="${url_folder}"`, (response) => {
        files = `<div class="line back fg_line" ondblclick='folder.tofile("..")'>. .</div>`

        while (app_folder.firstChild) {
            app_folder.removeChild(app_folder.firstChild);
        }

        for (let i = 0; i < JSON.parse(response)['Files'].length; i++) {
            files = files + folder.elem(JSON.parse(response)['Files'][i], i)
            app_folder.innerHTML = files;
        }
    })
}

folder.elem = (data, i) => {
    return ` <div 
        class='${data['IsDirectory'] ? "file_folder" : "file_no_folder"}  ${i % 2 == 0 ? 'bg_line' : 'fg_line'} line line_${data['Name'].replace(/\s/g, '')}'

        ${data['IsDirectory'] ? `ondblclick='folder.tofile("${data['Name']}")'` : `ondblclick='folder.folder_open_file("${data['Name']}")'` }
        ${`onclick='folder.set_active("${data['Name']}")'`}
        
        >

        <div class='folder__icon' >
        <img class='image' src="${folder.setimg(data['Name'], data['IsDirectory'])}" alt="">
        </div>

        <p class="folder__filename ${data['Name'].length < 15 ? 'center' : ''} " >${data['Name']}</p>

        </div>`
    }
    // ${data['Name']}
folder.getfetch = (url, callback) => {
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
folder.set_active = (data) => {
    if (document.querySelector(`.selected_line`) == null) {
        document.querySelector(`.line_${data.replace(/\s/g, '')}`).className = document.querySelector(`.line_${data.replace(/\s/g, '')}`).className + " selected_line"
        lastcolor = document.querySelector(`.line_${data.replace(/\s/g, '')}`).style.background;
        document.querySelector(`.line_${data.replace(/\s/g, '')}`).style.background = "rgb(14, 91, 205)"
    } else {
        console.log(1);
        document.querySelector(`.selected_line`).style.background = lastcolor
        document.querySelector(`.selected_line`).classList.remove("selected_line")
        lastcolor = document.querySelector(`.line_${data.replace(/\s/g, '')}`).style.background;
        document.querySelector(`.line_${data.replace(/\s/g, '')}`).className = document.querySelector(`.line_${data.replace(/\s/g, '')}`).className + " selected_line"
    }

}
folder.setimg = (name, type) => {
    let path = '../../images/res/folder';
    if (name.indexOf('.') !== -1) {
        console.log(name.split('.')[name.split('.').length - 1]);

        if (name.split('.')[name.split('.').length - 1] === 'zip') {
            return `${path}/zip.png`
        } else if (name.split('.')[name.split('.').length - 1] === 'go') {
            return `${path}/golang.png`
        }
    }

    if (type) {
        return `${path}/folder.png`
    } else {
        return `${path}/file.png`
    }

}