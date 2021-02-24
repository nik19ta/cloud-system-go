class Reader extends Application {
    constructor(...args) {
        super(...args)
    }

    getData(data) {
        this.render()

        fetch(`/api/readfile/file="${data}"`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            })
            .then(response => response.text())
            .then((r) => {
                r = JSON.parse(r)
                console.log(JSON.parse(r));
                document.querySelector('.app_reader').innerHTML = `<pre><code>${JSON.parse(r)['Data']}</code></pre>`
                document.querySelector('.app_name_ReaderApp').innerHTML = JSON.parse(r)['Name'];
            })
            .catch(err => console.log(err))

            this.renderIcon()
    }
}

let ReaderApp = new Reader('ReaderApp', 'Reader', 'reader.png', `
            <div class="app_reader" ></div>
                
            <style>
            .app_reader{
                width: 100%;
                padding: 8px;
                padding-bottom: 10px;
                font-size: 12px;
                color: #fff;
                width: calc(700px - 2px);
                height: calc(500px - 25px);
                background-color: rgb(30, 30, 30);
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                overflow-y: auto;
            }
            </style>
    `, 700, 500, true, () => {}, () => {ReaderApp.delIcon()})
