module.exports = {
	show_date_dock: function () {
		let date = new Date();
		let days_of_week = {
			'Sun': 'Вс',
			'Mon': 'Пн',
			'Tue': 'Вт',
			'Wed': 'Ср',
			'Thu': 'Чт',
			'Fri': 'Пт',
			'Sat': 'Сб'
		}
		let months = {
			'Jan': 'янв',
			'Feb': 'фев',
			'Mar': 'мар',
			'Apr': 'апр',
			'May': 'май',
			'Jun': 'июн',
			'Jul': 'июл',
			'Aug': 'авг',
			'Sep': 'сен',
			'Oct': 'окт',
			'Nov': 'ноя',
			'Dec': 'дек'
		}
		let str = `${days_of_week[date.toDateString().split(' ')[0]]}, ${date.toDateString().split(' ')[2]} ${months[date.toDateString().split(' ')[1]]}. ${date.toTimeString().split(':')[0]}:${date.toTimeString().split(':')[1]} `
		document.querySelector('#dock_time').innerHTML = str
	},

	drag: function(elem, elemM) {
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
};
