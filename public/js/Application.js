const { drag } = require("./functions");


let IdApp = 0
let ApplicationOffset = 30;

export default class Application {
    constructor(
        ApplicationName = 'default',
        ApplicationTitle = 'title',
        ApplicationIcon = 'default.png',
        ApplicationHtml = `<div class='app_window' id='${ApplicationTitle}' ></div>`,
        ApplicationWidth = 600,
        ApplicationHeight = 400,
        showInDock = false,
        PreOpenCallBack,
        PreCloseCallBack,
    ) {
        this.ApplicationName = ApplicationName
        this.ApplicationTitle = ApplicationTitle
        this.ApplicationIcon = ApplicationIcon
        this.ApplicationHtml = ApplicationHtml
        this.ApplicationWidth = ApplicationWidth
        this.ApplicationHeight = ApplicationHeight
        this.showInDock = showInDock

        this.PreOpenCallBack = PreOpenCallBack
        this.PreCloseCallBack = PreCloseCallBack

        IdApp++
        this.ApplicationId = IdApp

        this.IsOpen = false

        this.app_html = `
            <div class='${this.ApplicationTitle+"_"+this.ApplicationId} window_app' id='window_app_${this.ApplicationTitle+"_"+this.ApplicationId}' >

			<div class='close close_${this.ApplicationName}' ></div>
			
			<div class='header_app header_app_${this.ApplicationName}' >
                    <div class='app_name_${this.ApplicationName}' ></div>
                </div>
				
                <div class='content_folder${this.ApplicationName}' >
                    ${this.ApplicationHtml}
                </div>
            </div>

            <style>
                #window_app_${this.ApplicationTitle+"_"+this.ApplicationId} {
                    width: ${this.ApplicationWidth}px;
                    height: ${this.ApplicationHeight}px;
                    position: absolute;
                    border-radius: 8px;
                    padding-top: 25px;
                    border: solid 1px;
                    border-color: rgba(236,236,236,0.22);
                }
                .header_app {
                    width: 100%;
                    height: 25px;
                    position: absolute;
                    top: 0px;
                    background: #383838;
                }
                .close{
                    background: #E996B0;
					position: absolute;

					top: 5.75px;
					left: 12px;
					z-index: 2;
                }
                .app_name_${this.ApplicationName} {
                    width: calc(100% - 100px);
                    display: flex;
                    justify-content: center;
                    color: #fff;
                    font-size: 12px;
                }
                .content_folder${this.ApplicationName} {
                    height: calc(${this.ApplicationHeight}px - 27px);
                    background: #1e1e1e;

                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
            </style>`
    }

    render() {
        if (this.IsOpen) return

        let app = document.createElement('div');
        app.innerHTML = this.app_html;

        document.querySelector('body').appendChild(app)

        drag(document.querySelector(`#window_app_${this.ApplicationTitle+"_"+this.ApplicationId}`), document.querySelector(`.header_app_${this.ApplicationName}`))

        this.PreOpenCallBack()
        this.IsOpen = true;

        document.querySelector(`.close_${this.ApplicationName}`).addEventListener('click', (e) => {
			console.log(1111);
            this.close()
        })
        document.querySelector(`#window_app_${this.ApplicationTitle+"_"+this.ApplicationId}`).style.top = ApplicationOffset+'px'
        document.querySelector(`#window_app_${this.ApplicationTitle+"_"+this.ApplicationId}`).style.left = ApplicationOffset+'px'
        ApplicationOffset += 30
    }

    close() {
		console.log(2);
        if (this.IsOpen) {
            this.PreCloseCallBack()
            document.querySelector(`#window_app_${this.ApplicationTitle+"_"+this.ApplicationId}`).remove()
            this.IsOpen = false
            ApplicationOffset -= 30
        }
    }

    delIcon() {
        document.querySelector('#dock').removeChild(document.querySelector(`.icon_${this.ApplicationName}`))
    }

    renderIcon() {
        let elem_icon = document.createElement('img')
        elem_icon.className = `icon_in_dock icon_${this.ApplicationName}`
        elem_icon.src = `./images/icons/${this.ApplicationIcon}`
        elem_icon.style.height = `34px`
        elem_icon.onclick = () => {
            if (!this.IsOpen) {
                eval(`${this.ApplicationName}.render()`)
            }
        }
        dock.appendChild(elem_icon)
    }
}
