keyboard = new app('keyboard', true, 'keyboard.png', 800, 300, false, 'Проводник', `
            <div class="keyboard-block" >
                <div class="keyboard" id="keyboard" >
                    <div class="keyboard__line" id="line1" ></div>
                    <div class="keyboard__line" id="line2" ></div>
                    <div class="keyboard__line" id="line3" ></div>
                    <div class="keyboard__line" id="line4" ></div>
                    <div class="keyboard__line" id="line5" ></div>
                </div>
            </div>
                
            <style>
            .keyboard{
                width: 800px;
                height: 300px;
                background: #64656c;
                // border-radius: 6px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                padding: 7px;
                position: relative;
                user-select: none;
            }
            .keyboard__line{
                width: 100%;
                height: 20%;
                display: flex;
                align-items: center;
            }
            .btn{
                margin-left: 10px;
                background-color: #15191f;
                border-radius: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
            }

            .btns{
                margin-left: 10px;
                height: 100%;
                width: 46.85px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
            }
            .btns_div{
                margin-left: 10px;
                height: 100%;
                width: 46.85px;
                height: 46.85px;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                padding-bottom: 2px;
                flex-wrap: wrap;
            }
            .btnM {
                background-color: #15191f;
                border-radius: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
                height: 20px !important;
                width: 46.85px !important;
            }
            #key40{
                margin-top: -10px;
            }
            .btn:first-child {
                margin-left: 0px;
            }

            .space{
                width: 50%!important;
            }
            .command {
                width: 100px!important;
            }
            .option,
            .control {
                width: 70px!important;
            }
            .shift{
                width: 110px!important;
            }
            .return{
                width: 80px!important;
            }
            .caps {
                width: 70px!important;
            }
            .delete {
                width: 70px!important;
            }

            .chenge {
                position: absolute;
                top: 0px;
                background: #64656c;
                color: #fff;
                border-radius: 6px;
                padding: 7px;

                right: -100px;
                cursor: pointer;
            }

            #inp {
                width: 250px;
                height: 46px;
                border: 0;
                padding: 5px;
                font-size: 18px;
                background-color:#64656c;
                color: #f0f0f0;
                border-radius: 6px;
            }
            </style>
    `,  () => {}, () => {
        initkeyboard()
        mainK()
    })


function mainK() {
    function color(keyNum) {
    try {
        document.querySelectorAll(`#key${keyNum}`)[0].style.background = '#37404a';
        document.querySelectorAll(`#key${keyNum}`)[0].style.transition = 'background 0.2s';
        setTimeout(() => {
            document.querySelectorAll(`#key${keyNum}`)[0].style.background = '#15191f';
        }, 200)
    } catch (error) {
        
    }
    try {
        document.querySelectorAll(`#key${keyNum}`)[0].style.transition = 'background 0.2s';
        document.querySelectorAll(`#key${keyNum}`)[1].style.background = '#37404a';
        setTimeout(() => {
            document.querySelectorAll(`#key${keyNum}`)[1].style.background = '#15191f';
        }, 200)
    } catch (error) {

    }
}

let arr = []

function keyPress(e) {

    let keyNum;
    if (window.event) {
        keyNum = window.event.keyCode;
    } else if (e) {
        keyNum = e.which;
    }

    arr.push(keyNum)

    color(keyNum)
}
document.onkeydown = keyPress;
}


function initkeyboard() {
    let keyboard = document.querySelector('.keyboard')


let line_first = document.querySelector('#line1')
let line_second = document.querySelector('#line2')
let line_third = document.querySelector('#line3')
let line_fourth = document.querySelector('#line4')
let line_fifth = document.querySelector('#line5')

let lang = true;

en_line1_keycode = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 173, 61, 8]
en_line2_keycode = [9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220]
en_line3_keycode = [20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 59, 222, 13]
en_line4_keycode = [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16]
en_line5_keycode = [17, 18, 224, 32, 224, 18]

en_line1 = ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', `delete`]
en_line2 = ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', `\\`]
en_line3 = ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return']
en_line4 = ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'shift']
en_line5 = ['Ctrl', 'alt', '⌘', 'space', '⌘', 'alt']

ru_line1 = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', `delete`]
ru_line2 = ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', `ё`]
ru_line3 = ['caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'return']
ru_line4 = ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', 'shift']
ru_line5 = ['Ctrl', 'alt', '⌘', 'space', '⌘', 'alt']



let nums_key = [37, 37, 38, 39]
let nums_keyP = [" ", "Left", "", "Right"]

function renderNums(count) {
    if (count === 1 || count === 3) {
        let divParent = document.createElement('div');
        divParent.className = 'btns_div'
        let block = document.createElement('div');

        block.innerHTML = `${nums_keyP[count]}`

        block.onclick = () => color(nums_key[count])
        block.id = 'key' + nums_key[count]
        block.className = `btnM`

        divParent.appendChild(block)
        line_fifth.appendChild(divParent)

    } else {
        let divParent = document.createElement('div');
        divParent.className = 'btns'

        let block = document.createElement('div');

        block.innerHTML = `Top`
        block.className = 'btnM'

        block.onclick = () => color(38)
        block.id = 'key38'

        divParent.appendChild(block)
        block1 = document.createElement('div');

        block1.innerHTML = `Down`
        block1.className = 'btnM'
        block1.onclick = () => color(40)
        block1.id = 'key40'

        divParent.appendChild(block1)
        line_fifth.appendChild(divParent)
    }
}

function render(id, name, keycode) {
    for (let i = 0; i < id.length; i++) {
        let block = document.createElement('div');
        if (id[i].length === 1) block.innerHTML = id[i].toUpperCase()
        else block.innerHTML = `${id[i]}`

        block.onclick = () => color(keycode[i])
        block.id = 'key' + keycode[i]
        block.className = 'btn'
        block.style.width = `46.85px`
        block.style.height = `46.85px`
        if (id[i].length > 1) block.className = `btn line1 ${id[i]}`
        else block.className = `btn`

        name.appendChild(block)
    }

}


// render(ru_line1, line_first, en_line1_keycode)
// render(ru_line2, line_second, en_line2_keycode)
// render(ru_line3, line_third, en_line3_keycode)
// render(ru_line4, line_fourth, en_line4_keycode)
// render(ru_line5, line_fifth, en_line5_keycode)

render(en_line1, line_first, en_line1_keycode)
render(en_line2, line_second, en_line2_keycode)
render(en_line3, line_third, en_line3_keycode)
render(en_line4, line_fourth, en_line4_keycode)
render(en_line5, line_fifth, en_line5_keycode)

renderNums(1)
renderNums(2)
renderNums(3)   
}