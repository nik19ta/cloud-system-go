let folder = {};

const params = decodeURI(document.location.search);

const URL = params.split('?')[0];

let files = ''
let url_folder = '..'



folder = new app('folder', true, 'folder.png', 600, 400, false, 'Проводник', `
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
    `, () => {},  () => {to_file(url_folder)})


function to_file(dir) {
    console.log(dir);
    url_folder = url_folder + 'slash' + dir;
    fetch(URL + `/api/local_files/dir="${url_folder}"`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        })
        .then(response => response.text())
        .then((response) => {
            response = JSON.parse(response)
            console.log(response);

            files = `<div class="line back fg_line" onclick='to_file("..")'>. .</div>`
            while (document.querySelector('.app_folder').firstChild) {
                document.querySelector('.app_folder').removeChild(document.querySelector('.app_folder').firstChild);
            }

            for (let i = 0; i < JSON.parse(response)['Files'].length; i++) {

                files = files + `
            <div 
            class='
                ${JSON.parse(response)['Files'][i]['IsDirectory'] ? "file_folder" : "file_no_folder"} 
                ${i % 2 == 0 ? 'bg_line' : 'fg_line'} line'

            ${JSON.parse(response)['Files'][i]['IsDirectory'] ? `onclick='to_file("${JSON.parse(response)['Files'][i]['Name']}")'` : `onclick='folder_open_file("${JSON.parse(response)['Files'][i]['Name']}")'` }>

            <img class='image' src="${JSON.parse(response)['Files'][i]['IsDirectory'] ?'../../images/res/folder/folder.png' : '../../images/res/folder/file.png'}" alt="">

            ${JSON.parse(response)['Files'][i]['Name']}
            </div>`


                document.querySelector('.app_folder').innerHTML = files;

            }
        })
        .catch(err => console.log(err))
}

function folder_open_file(filename) {
    let localpathwithfile = url_folder + 'slash' + filename;
    console.log(localpathwithfile);

    fetch(URL + `/api/readfile/file="${localpathwithfile}"`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        })
        .then(response => response.text())
        .then((response) => {
            response = JSON.parse(JSON.parse(response));
            openReader(response['Data'], response['Name'])
        })
        .catch(err => console.log(err))
}

function openReader(data, name) {
    reader.callback(data, name)
}