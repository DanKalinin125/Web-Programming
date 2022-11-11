drawGraph();

//Реализуем логику кнопки X как radio
$('input[type="button"]').click(function (event) {
    if ($(this).hasClass('disabled')) {        
        $(this).removeClass('disabled');
    } else {
        let buts = document.querySelectorAll('input[type="button"]');
        buts.forEach(function (item, i, buts) {
            if ($(item).hasClass('disabled')) {
                $(item).removeClass('disabled');
            }
        });
        
        $(this).addClass('disabled');
    }
});

//Форма для отправки данных
var error_name = 'none';
$('#check-form').submit(function (e) {
    e.preventDefault();
    //Получение данных из формы
    let datestamp = new Date();
    let buttons = document.querySelectorAll('#btn-x');
    let input_y = document.querySelector('#input_y');
    let input_r = document.querySelectorAll('input[name = "r"]');
    //Формирование даты отправки запроса
    let date = datestamp.toLocaleString();
    let timeZone = datestamp.getTimezoneOffset();
    if (timeZone > 0) {
        date += ", UTC" + Math.round(timeZone / 60);
    }
    else {
        date += ", UTC+" + (-1) * Math.round(timeZone / 60);
    }
    
    //Формирование массива checkbox-ов для отправки
    let array_x = new Array();
    buttons.forEach(function (item, i, buttons) {
        if (item.checked) {
            array_x.push(item.value);
        }
    });
    
    //Валидация и формирование данных для отправки
    let validate = validate_buttons(buttons) && validate_text(input_y) && validate_radio(input_r);
    
    
    //Отправка данных
    if (validate) {
        var form = $('#check-form');
        var item_x;
        
        buttons.forEach(function (item, i, buttons) {
            if ($(item).hasClass('disabled')) {
                item_x = item;
            }
        });
        
        $.ajax({
            type: form.attr('method')
            , url: form.attr('action')
            , data: form.serialize() + "&timezone=" + new Date().getTimezoneOffset() + "&x=" + item_x.value
            , success: function (data) {
                //$('#result').html(data);
                window.location.replace("result.jsp");
            }
        });
        
    }
    else {
        generateError("Некорректный ввод данных", error_name);
    };
});

//Нажатие на граф, выбор новой точки
document.getElementById('graph').addEventListener('click', (event) => {
    if (checkSelectedR()) {
        var mousePosition = getMousePosition(event);
        console.log("{x: ", mousePosition.x, ", y: ", mousePosition.y, ", r: ", getSelectedR().value,", cx: ", centerX, ", cy: ", centerY, " }");
        
        drawPoint(mousePosition.x, mousePosition.y, getSelectedR().value);
        
        var realCoord = fromPointToReal(mousePosition.x, mousePosition.y, getSelectedR().value);
        console.log("{realX: ", realCoord.x, ", realY: ", realCoord.y, " }");
        
        
        if (validateRealX(realCoord.x) && validateRealY(realCoord.y)){
            fillForm(realCoord.x, realCoord.y);
        }
        else{
            generateError("Некорректная точка", "Выбранная точка находится вне границ формы");
            clearForm();
        }
        
    } else {
        generateError("Невведен радиус", "Необходимо ввести значение r");
    }
});


//Валидация введенных значений перед отправкой
function validate_buttons(buttons) {
    let count = 0;
    
    buttons.forEach(function (item, i, buttons) {
        if ($(item).hasClass('disabled')) {
            count = count + 1;
        }
    });
        
    if (count == 1) {
        console.log("X is correct");
        return true;
    }
    else {
        console.log("X is incorrect");
        error_name = 'Данные поля X введены некоректно. Выбирите 1 кнопку.';
        console.log(error_name);
        return false;
    };
};

function validate_text(input_y) {
    if (!(/^([-]?[0-9]+([.]?[0-9]+){0,1})$/.test(input_y.value))) {
        console.log("Y is incorrect");
        error_name = 'Данные поля Y введены некореектно. Введите число в радиусе [-5, 3]. Разделитель "."';
        return false;
    };
    let y = parseFloat(input_y.value);
    if ((y + 5 >= -1e-6) && (y - 3 <= 1e-6)) {
        console.log("Y is correct");
        return true;
    }
    else {
        console.log("Y is incorrect");
        error_name = 'Данные поля Y введены некореектно. Введите число в радиусе [-5, 3]. Разделитель "."'
        return false;
    }
};

function validate_radio(input_r) {
    let flag = false;
    input_r.forEach(function (item, i, input_r) {
        if (item.checked) {
            flag = true;
        };
    });
    if (flag) {
        console.log("R is correct");
        return true;
    }
    else {
        console.log("R is incorrect");
        error_name = 'Данные поля R введены некореектно. Введите любое значение из radio-кнопок.'
        return false;
    };
};



//Генерация ошибок в виде Toast
function generateError(title, message){
    let start_note = '<div class="note hide-me">';
    
    let start_title = '<div class="note__title">';
    let end_title = '</div>';
    
    let start_message = '<div class="note__message">';
    let end_message = '</div>';
    
    let end_note = '</div>';
    
    let note = start_note + start_title + title + end_title + start_message + message + end_message + end_note;
    
    $(".notes").html(note);
}



//Работа с формой из графа
function clearForm(){
    //Отчистка x
    var buttons = document.querySelectorAll('#btn-x');
    
    buttons.forEach(function (item, i, buttons) {
        if ($(item).hasClass('disabled')) {
            $(item).removeClass('disabled');
        }
    });
    
    //Отчистка y
    document.getElementById("input_y").value = "";
    
}

function fillForm(realX, realY){
    clearForm();
    
    //Отчистка x
    var buttons = document.querySelectorAll('#btn-x');
    
    buttons.forEach(function (item, i, buttons) {
        if (item.value == realX) {
            $(item).addClass('disabled');
        }
    });
    
    //Отчистка y
    document.getElementById("input_y").value = realY;
}



//Дополнительные функции для работы с графом
function getMousePosition(e) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
    var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}

function checkSelectedR(){
    var radioButtons = document.querySelectorAll('.rd-r');
    var flag = false;
    
    radioButtons.forEach(function (item, i, radioButtons) {
        if (item.checked) {
            flag = true;
        }
    });
    
    return flag;
}

function getSelectedR(){
    var radioButtons = document.querySelectorAll('.rd-r');
    var res_item = null;
    
    radioButtons.forEach(function (item, i, radioButtons) {
        if (item.checked) {
            res_item = item;
        }
    });
    
    return res_item;
}

function validateRealX(realX){
    return !((realX < -3) || (realX > 5));
}

function validateRealY(realY){
    return (!(realY < -5) || (realY > 3))
}