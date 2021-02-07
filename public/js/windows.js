function drag(elem) {
    elem.onmousedown = function(e) {

        var coords = getCoords(elem);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        elem.style.position = 'absolute';
        document.body.appendChild(elem);
        moveAt(e);

        elem.style.zIndex = 1000;

        function moveAt(e) {
            elem.style.left = e.pageX - shiftX + 'px';
            elem.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        elem.onmouseup = function() {
            document.onmousemove = null;
            elem.onmouseup = null;
        };

    }

    elem.ondragstart = function() {
        return false;
    };

    function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}

let offset = 30;
let apps = []


function app(app_name, icon, width, height, change_size, title, html) {
    this.width = width;
    this.height = height;
    this.change_size = change_size;
    this.title = title;
    this.icon = icon;
    this.isopen = false;
    this.close_window = function() {
        document.querySelector(`.${this.title}`).remove()
        offset = offset - 30
        this.isopen = !this.isopen
    }
    this.render = function() {
        if (this.isopen) {
            return
        }
        let app = document.createElement('div')
        app.className = this.title
        app.id = this.title
        app.style.height = this.height + 'px'
        app.style.width = this.width + 'px'
        app.style.background = '#fff'
        app.style.position = 'absolute'
        app.style.top = `${offset}px`
        app.style.left = `${offset}px`
        app.style.borderRadius = '8px'
        app.style.paddingTop = '25px'

        let header = document.createElement('div')
        header.className = 'header_app'
        header.style.width = '100%'
        header.style.height = '25px'
        header.style.position = 'absolute'
        header.style.top = '0px'

        let closeDiv = document.createElement('div')
        closeDiv.className = 'close'
        closeDiv.onclick = () => this.close_window()
        let rollupDiv = document.createElement('div')
        rollupDiv.className = 'rollup'
        let expandDiv = document.createElement('div')
        expandDiv.className = 'expand'
        let app_nameDiv = document.createElement('div')
        app_nameDiv.className = 'app_name'
            // app_nameDiv.innerHTML = this.title

        header.appendChild(closeDiv)
        header.appendChild(rollupDiv)
        header.appendChild(expandDiv)
        header.appendChild(app_nameDiv)

        let content = document.createElement('div')
        content.className = 'main_content'
        content.innerHTML = html

        app.appendChild(header)
        app.appendChild(content)

        document.querySelector('body').appendChild(app)

        offset = offset + 30
        this.isopen = !this.isopen
        drag(app)
    }
    this.render_icon = function() { 

        let elem_icon = document.createElement('img')
        elem_icon.className = `icon_in_dock`     
        elem_icon.src = `./icons/${this.icon}`
        elem_icon.style.width = `34px`
        elem_icon.style.height = `34px`
        elem_icon.onclick = function() {
            eval(`${app_name}.render()`)
        }

        dock.appendChild(elem_icon)

    }
    this.render_icon()
}

// function render_icons() {
//     for (let i = 0; i < apps.length; i++) {
//         console.log(apps[i]['icon']);

//         let icon = document.createElement('img')
//         icon.className = `icon_in_dock`
//         icon.src = `./icons/${apps[i]['icon']}`
//         icon.style.width = `34px`
//         icon.style.height = `34px`
//         icon.onclick = function() {
//             eval(`${apps[i]['func']}()`)
//         }

//         dock.appendChild(icon)
//     }
// }

// setTimeout(() => {
//     render_icons()
// }, 1000);

// settingsApp.render()