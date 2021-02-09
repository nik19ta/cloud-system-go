function drag(elem, elemM) {
    elemM.onmousedown = function(e) {

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

    elemM.ondragstart = function() {
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


function app(app_name, show_in_dock, icon, width, height, change_size, title, html, callback, callbackrender) {
    this.width = width;
    this.height = height;
    this.show_in_dock = show_in_dock;
    this.change_size = change_size;
    this.title = title;
    this.icon = icon;
    this.isopen = false;
    this.callback = callback;
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
        header.className = `header_app header_app_${app_name}`
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
        app_nameDiv.className = `app_name_${app_name}`
            app_nameDiv.style.width = 'calc(100% - 100px)'
            app_nameDiv.style.display = 'flex'
            app_nameDiv.style.justifyContent = 'Center'
            app_nameDiv.style.color = '#fff'
            app_nameDiv.style.fontSize = '12px'

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
        drag(app, header)
        if (callbackrender) callbackrender()
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
    if (show_in_dock) {
        this.render_icon()
    }
}