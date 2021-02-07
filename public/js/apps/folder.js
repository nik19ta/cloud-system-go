let folder = {};

const params = decodeURI(document.location.search);

const URL = params.split('?')[0];

let files = ''


let url_folder = '..'


fetch(URL + `/api/local_files/dir=".."`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
    .then(response => response.text())
    .then((response) => {
        response = JSON.parse(response)


        for (let i = 0; i < JSON.parse(response).length; i++) {

            files = files + `<div 
            class='
            ${JSON.parse(response)[i]['IsFolder'] ? "file_folder" : "file_no_folder"} 
            ${i % 2 == 0 ? 'fg_line' : 'bg_line'} line' onclick='to_file("${JSON.parse(response)[i]['Name']}")' >
            <img class='image' src="${JSON.parse(response)[i]['IsFolder'] ?'../../images/res/folder/folder.png' : '../../images/res/folder/file.png'}" alt="">
            ${JSON.parse(response)[i]['Name']}
            </div>`

        }
        folder = new app('folder', 'folder.png', 600, 400, false, 'Проводник', `
            <div class="app_folder" ><div class="line back bg_line" >. .</div> ${files}</div>
                
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
                width: 16px;
                height: 16px;
            }
            .back{
                padding-left: 25px;
            }
            </style>
    `)



    })
    .catch(err => console.log(err))



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

            files = ''
            files = files + `<div class="line back bg_line" onclick='to_file("..")'>. .</div>`
            while (document.querySelector('.app_folder').firstChild) {
                document.querySelector('.app_folder').removeChild(document.querySelector('.app_folder').firstChild);
            }

            for (let i = 0; i < JSON.parse(response).length; i++) {

            files = files + `<div 
                class='
                ${JSON.parse(response)[i]['IsFolder'] ? "file_folder" : "file_no_folder"} 
                ${i % 2 == 0 ? 'fg_line' : 'bg_line'} line' onclick='to_file("${JSON.parse(response)[i]['Name']}")' >
                <img class='image' src="${JSON.parse(response)[i]['IsFolder'] ?'../../images/res/folder/folder.png' : '../../images/res/folder/file.png'}" alt="">
                ${JSON.parse(response)[i]['Name']}
                </div>`

            document.querySelector('.app_folder').innerHTML = files;

            }
        })
        .catch(err => console.log(err))
}


// file:///Users/nikitakhvatov/Desktop/dev/macoshtml/js/apps/folder.html

// folder.render()