reader = new app('reader', false, 'folder.png', 600, 400, false, 'reader', `
            <div class="app_reader" ></div>
                
            <style>
            .app_reader{
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
            </style>
    `, function (data, name) {
        this.render()
        document.querySelector('.app_reader').innerHTML = data
        document.querySelector('.app_name_reader').innerHTML = name;
    })