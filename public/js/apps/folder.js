let files = ''
let url_folder = 'open_folder'
let lastcolor = ''

let classNameDiv = ''
// класс выбронного жлемента

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
                <button class='app_folder__header_btn btn_disable' >Delete</button>
                <button class='app_folder__header_btn btn_disable' onclick='folder.btn_rename()' >Rename</button>
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
        flex-wrap: nowrap;
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
   .filepath{
        white-space: nowrap;   
   }
   .active{
        background-color: rgb(14, 92, 205);
        border-radius: 5px;
    }
    .btn_disable{
        opacity: 0.5;
        cursor: default;
    }
    .btn_en{
        opacity: 1;
        cursor: pointer;
    }
    </style>
    `


let folder = new app('folder', true, 'folder.png', 600, 400, false, 'Проводник', folder_html, () => {}, () => {
    folder.tofile(url_folder)
}, () => {
    url_folder = 'open_folder'
})
folder.folder_open_file = (filename) => {
    let sname = filename.split('.')[filename.split('.').length - 1];
    let localpath = url_folder + '/' + filename;
    localpath = localpath.split('/').join('|')

    if (sname === 'png') {} else {
        folder.getfetch(`/api/readfile/file="${localpath}"`, (r) => {
            reader.callback(JSON.parse(r)['Data'], JSON.parse(r)['Name'])
        })
    }

}

folder.renameFile = (oldname, newname) => {
    path = url_folder + '/' + oldname
    path = path.split('/').join('|')

    folder.getfetch(`/api/renamefile/filepath="${path}",oldname="${oldname}",newname="${newname}""`, (response) => {
        return JSON.parse(response)
    })
}

folder.tofile = (dir) => {

    console.log(dir);

    let app_folder = document.querySelector('.folder__files');

    if (dir == "..") {
        url_folder = url_folder.split("/").slice(0, -1).join("|");
        console.log(url_folder);
    } else if (dir != "open_folder") {
        url_folder = url_folder + '/' + dir
        url_folder = url_folder.split("/").join("|");
    }

    folder.getfetch(`/api/local_files/dir="${url_folder}"`, (response) => {

        if (classNameDiv != "") {
            document.querySelectorAll('.btn_disable')[0].classList.remove('btn_en')
            document.querySelectorAll('.btn_disable')[1].classList.remove('btn_en')
            document.querySelector(classNameDiv).classList.remove('active')
            classNameDiv = ''            
        }

        url_folder = JSON.parse(response).Name

        let local_path = url_folder;

            while (local_path.length > 50) {
                console.log(1);
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

        console.log(JSON.parse(response)['Files'].length);
        for (let i = 0; i < JSON.parse(response)['Files'].length; i++) {
            files = files + folder.elem(JSON.parse(response)['Files'][i], i)
        }
        app_folder.innerHTML = files;
    })
}

folder.elem = (data, i) => {
    return ` <div 
        class='${data['IsDirectory'] ? "file_folder" : "file_no_folder"}  ${i % 2 == 0 ? 'bg_line' : 'fg_line'} line line_${data['Name'].replace(/\s/g, '').replace(/\./g, "__")}'

        ${data['IsDirectory'] ? `ondblclick='folder.tofile("${data['Name']}")'` : `ondblclick='folder.folder_open_file("${data['Name']}")'` }
        ${`onclick='folder.set_active("${data['Name']}")'`}
        
        >

        <div class='folder__icon' >
        <img class='image' src="${folder.setimg(data['Name'], data['IsDirectory'])}" alt="">
        </div>

        <p class='folder__filename ${data["Name"].length < 15 ? "center" : ""}  line_${data["Name"].replace(/\s/g, "").replace(/\./g, "__")}_text' >${data["Name"]}</p>

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
    console.log('oncklick', data);

    classNameDiv = `.line_${data.replace(/\s/g, '').replace(/\./g, "__")}_text`

    document.querySelectorAll('.btn_disable')[0].classList.add('btn_en')
    document.querySelectorAll('.btn_disable')[1].classList.add('btn_en')
    document.querySelector(classNameDiv).classList.add('active')
    console.log(document.querySelector(classNameDiv).className);
}
folder.btn_rename = () => {
    let last_name = document.querySelector(classNameDiv).innerHTML;
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
        console.log(document.querySelector('.input_rename').value.replace('"', '').replace('/', ''));
        folder.renameFile(last_name, document.querySelector('.input_rename').value.replace('"', '').replace('/', ''))
        document.querySelector(classNameDiv).innerHTML = document.querySelector('.input_rename').value
        document.querySelectorAll('.btn_disable')[0].classList.remove('btn_en')
        document.querySelectorAll('.btn_disable')[1].classList.remove('btn_en')
        document.querySelector(classNameDiv).classList.remove('active')
        classNameDiv = ''

    })
}
folder.setimg = (name, type) => {
    let path = '../../images/res/folder';
    if (name.indexOf('.') !== -1) {

        if (name.split('.')[name.split('.').length - 1] === 'zip') return `${path}/zip.png`
        else if (name.split('.')[name.split('.').length - 1] === 'go') return `${path}/go.png`
        else if (name.split('.')[name.split('.').length - 1] === 'js') return `${path}/js.png`
        else if (name.split('.')[name.split('.').length - 1] === 'html') return `${path}/html.png`
        else if (name.split('.')[name.split('.').length - 1] === 'css') return `${path}/css.png`
        else if (name.split('.')[name.split('.').length - 1] === 'py') return `${path}/py.png`
        else if (name.split('.')[name.split('.').length - 1] === 'md') return `${path}/md.png`
        else if (name.split('.')[name.split('.').length - 1] === 'txt') return `${path}/file.png`
        else if (name.split('.')[name.split('.').length - 1] === 'json') return `${path}/json.png`
        else if (name.split('.')[name.split('.').length - 1] === 'png') return `${path}/png.png`
        else if (name.split('.')[name.split('.').length - 1] === 'jpg' || name.split('.')[name.split('.').length - 1] === 'jpeg') return `${path}/jpg.png`
        else if (name.split('.')[name.split('.').length - 1] === 'csv') return `${path}/csv.png`
        else if (name.split('.')[name.split('.').length - 1] === 'mov') return `${path}/mov.png`
        else if (name.split('.')[name.split('.').length - 1] === 'mp3') return `${path}/mp3.png`
        else if (name.split('.')[name.split('.').length - 1] === 'mp4') return `${path}/mp4.png`
        else if (name.split('.')[name.split('.').length - 1] === 'ts') return `${path}/ts.png`
    }

    if (type) {
        return `${path}/folder.png`
    } else {
        if (name.includes("git")) return `${path}/git.png`
        else if (name.indexOf('.') === -1) return `${path}/runfile.png`
        else return `${path}/defoult.png`
    }

}