function show_date_dock() {
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

    console.log(str);
}