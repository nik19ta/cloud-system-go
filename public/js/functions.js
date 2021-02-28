import { settings } from './Settings'

class Functions {
	constructor() {}

	show_date_dock() {
		let date = new Date();

		document.querySelector('#dock_time').innerHTML = `
			${settings.get('days_of_week')[date.toDateString().split(' ')[0]]},
			${date.toDateString().split(' ')[2]} 
			${settings.get('months')[date.toDateString().split(' ')[1]]}. 
			${date.toTimeString().split(':')[0]}:${date.toTimeString().split(':')[1]}`
	}

	drag(elem, elemM) {
		elem.style.zIndex = 1000;
		
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

			document.onmousemove = function(e) { moveAt(e) };

			elem.onmouseup = function() {
				document.onmousemove = null;
				elem.onmouseup = null;
			};

		}

		elemM.ondragstart = function() { return false };

		function getCoords(elem) {
			var box = elem.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};
		}

	}

}

const functions = new Functions()
export { functions } 
