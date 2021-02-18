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

            // if (e.pageY <= 0) {
            //     document.onmousemove = null;
            //     elem.onmouseup = null;
            //     elem.style.top = '26px';
            // }
            
            // console.log(`${e.pageY} - ${shiftY} = ${e.pageY - shiftY}`);
            elem.style.left = e.pageX - shiftX + 'px';
            elem.style.top = e.pageY - shiftY + 'px';
            // if (e.pageY - shiftY >= 26) {
            // } else {
            //     // console.log(`||||||${e.pageY} - ${shiftY} = ${e.pageY - shiftY}||||||`);
            //     // console.log();
            // }
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
