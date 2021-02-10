let files = ''
let url_folder = '..'

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
        }
        .line{
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            width: 100%;
            border-radius: 4px;
            padding: 2px;
        }
        .bg_line{
            background: rgb(41,41,41);
        }
        .fg_line{
            
        }
        .image{
            width: 13px;
        }
        .back{
            padding-left: 25px;
        }
    </style>
    `




let folder = new app('folder', true, 'folder.png', 600, 400, false, 'Проводник', folder_html, () => {}, () => {
    folder.tofile(url_folder)
})
folder.folder_open_file = (filename) => {
    let localpath = url_folder + 'slash' + filename;
    folder.getfetch(`/api/readfile/file="${localpath}"`, (r) => {
        // console.log(JSON.parse(r));
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
        files = `<div class="line back fg_line" onclick='folder.tofile("..")'>. .</div>`

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
        class='${data['IsDirectory'] ? "file_folder" : "file_no_folder"}  ${i % 2 == 0 ? 'bg_line' : 'fg_line'} line'
        ${data['IsDirectory'] ? `onclick='folder.tofile("${data['Name']}")'` : `onclick='folder.folder_open_file("${data['Name']}")'` } >

        <img class='image' src="${data['IsDirectory'] ?'../../images/res/folder/folder.png' : '../../images/res/folder/file.png'}" alt="">

        ${data['Name']}
        </div>`
}
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