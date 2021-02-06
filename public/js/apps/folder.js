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
            files = files + `<div>${JSON.parse(response)[i]['Name']}</div>`
            console.log('-------');
        }

        console.log(files);

        folder = new app('folder', 'folder.png', 600, 400, false, 'Проводник', `
            <div class="app_folder" >${files}</div>
                
            <style>
            .app_folder{
                padding: 5px;
                color: #fff;
                width: 600px;
                height: calc(400px - 25px);
                background-color: rgb(30, 30, 30);
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            </style>
    `)

    })
    .catch(err => console.log(err))





// file:///Users/nikitakhvatov/Desktop/dev/macoshtml/js/apps/folder.html

// folder.render()