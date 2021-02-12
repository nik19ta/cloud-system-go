let files = ''
let url_folder = '..slash..'
let lastcolor = ''


const folder_html = `
    <div class="app_folder" >
        <div class="app_folder__header" >
            <div class='left_block' >
                <img  onclick='folder.tofile("..")' src='../../images/res/back.svg' class='back' />    
                <img  onclick='folder.tofile("..")' src='../../images/res/back.svg' class='back backtoback' />    
                <p class='filepath' ><p/>
            </div>
            <div class="rigth_block" >
                <button class='app_folder__header_btn' >Create</button>
                <button class='app_folder__header_btn' >Delete</button>
                <button class='app_folder__header_btn' >Rename</button>
            </div>
        </div>
        <div class="folder__files" >${files}</div>
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
        width: calc(600px - 2px);
        height: calc(400px - 25px - 2px);
        background-color: rgb(30, 30, 30);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        display: flex;
        flex-wrap: wrap;
        aling-items: center;
        flex-direction: row;
        position: relative;
   }
   .app_folder__header_btn{
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
   .left_block{
        width: 50%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        aling-items: center;
        justify-content: flex-start;
   }
   .rigth_block{
        padding-right: 15px;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 17px;
   }
   .filepath{
        font-weight: bold;
   }
   .back {
        width: 33px!important;
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

    </style>
    `




let folder = new app('folder', true, 'folder.png', 600, 400, false, 'Проводник', folder_html, () => {}, () => {
    folder.tofile(url_folder)
})
folder.folder_open_file = (filename) => {
    let sname = filename.split('.')[filename.split('.').length -1];
    let localpath = url_folder + 'slash' + filename;

    if (sname === 'png') {
    } else {
        folder.getfetch(`/api/readfile/file="${localpath}"`, (r) => {
            reader.callback(JSON.parse(r)['Data'], JSON.parse(r)['Name'])
        })
    }

}
folder.tofile = (dir) => {
    let app_folder = document.querySelector('.folder__files');
    
    document.querySelector('.filepath').innerHTML = dir

    console.log(url_folder);

    if (url_folder.indexOf('..') === -1 || url_folder.indexOf('..') === 0) {
        url_folder = url_folder + "slash" + dir;
    } else {
        if (dir === '..' && url_folder !== '..') {
            url_folder = url_folder.substring(0, url_folder.length - url_folder.length);
            url_folder = url_folder + dir;
        } else {
            url_folder = url_folder + "slash" + dir;
        }
    }


    console.log('Запрос на', url_folder);
    folder.getfetch(`/api/local_files/dir="${url_folder}"`, (response) => {
        console.log(JSON.parse(response));
        files = ``
        
        if (JSON.parse(response)['Files'] == null) {
            alert("Папка пустая")
        } 

        while (app_folder.firstChild) {
            app_folder.removeChild(app_folder.firstChild);
        }

        console.log(JSON.parse(response)['Files'].length);
        for (let i = 0; i < JSON.parse(response)['Files'].length; i++) {
            files = files + folder.elem(JSON.parse(response)['Files'][i], i)
        }
        app_folder.innerHTML = files;
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
        document.querySelector(`.selected_line`).style.background = lastcolor
        document.querySelector(`.selected_line`).classList.remove("selected_line")
        lastcolor = document.querySelector(`.line_${data.replace(/\s/g, '')}`).style.background;
        document.querySelector(`.line_${data.replace(/\s/g, '')}`).className = document.querySelector(`.line_${data.replace(/\s/g, '')}`).className + " selected_line"
    }

}
folder.setimg = (name, type) => {
    let path = '../../images/res/folder';
    if (name.indexOf('.') !== -1) {
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