let folder = {};

const params = decodeURI(document.location.search);

const URL = params.split('?')[0];

let files = ''

fetch(URL + 'local_files', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
        // body: JSON.stringify({
        //     search: keywords,
        //     params: params
        // })
    })
    .then(response => response.text())
    .then((response) => {
        response = JSON.parse(response)


        for (let i = 0; i < JSON.parse(response).length; i++) {
            console.log(JSON.parse(response)[i]['Name']);

            files = files + `<div 
            class='
            ${JSON.parse(response)[i]['IsFolder'] ? "file_folder" : "file_no_folder"} 
            ${i % 2 == 0 ? 'fg_line' : 'bg_line'} line' >
            <img class='image' src="${JSON.parse(response)[i]['IsFolder'] ?'../../images/res/folder/folder.png' : '../../images/res/folder/file.png'}" alt="">
            ${JSON.parse(response)[i]['Name']}
            </div>`
            console.log('-------');
        }

        console.log(files);

        folder = new app('folder', 'folder.png', 600, 400, false, 'Проводник', `
            <div class="app_folder" ><div class="line back bg_line" >. .</div> ${files}</div>
                
            <style>
            .app_folder{
                width: 100%;
                padding: 8px;
                font-size: 12px;
                color: #fff;
                width: 600px;
                height: calc(400px - 25px);
                background-color: rgb(30, 30, 30);
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
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





// file:///Users/nikitakhvatov/Desktop/dev/macoshtml/js/apps/folder.html

// folder.render()