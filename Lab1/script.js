var error_name = 'none';
//Форма для отправки данных
$('#check-form').submit(function (e) {
    e.preventDefault();
    console.log("Запускаю check.php");
    //Получение данных из формы
    let datestamp = new Date();
    let checkboxes = document.querySelectorAll('#chbx');
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
    checkboxes.forEach(function (item, i, checkboxes) {
        if (item.checked) {
            array_x.push(item.value);
        }
    });
    //Валидация и формирование данных для отправки
    let validate = validate_checkboxes(checkboxes) && validate_text(input_y) && validate_radio(input_r);
    let formData = new FormData(this);
    formData.append('datestamp', date);
    formData.set('x', JSON.stringify(array_x));
    //Отправка данных
    if (validate) {
        $.ajax({
            type: $(this).attr('method')
            , url: $(this).attr('action')
            , data: formData
            , contentType: false
            , cached: false
            , processData: false
            , success: function (res) {
                $('#result').html(res);
            }
        , });
    }
    else {
        alert(error_name);
    };
});
//Форма для чистки таблицы
$('#clear-form').submit(function (e) {
    e.preventDefault();
    console.log("Запускаю clear.php");
    $.ajax({
        type: $(this).attr('method')
        , url: $(this).attr('action')
        , data: new FormData(this)
        , contentType: false
        , cached: false
        , processData: false
        , success: function (res) {
            $('#result').html(res);
        }
    , });
});

function validate_checkboxes(checkboxes) {
    let count = 0;
    checkboxes.forEach(function (item, i, checkboxes) {
        if (item.checked) {
            count = count + 1;
        }
    });
    if (count > 0 && count < 10) {
        console.log("X is correct");
        return true;
    }
    else {
        console.log("X is incorrect");
        error_name = 'Данные поля X введены некореектно. Выбирите от 1 до 9 checkbox-ов.';
        console.log(error_name);
        return false;
    };
};

function validate_text(input_y) {
    if (!(/^([-]?[0-9]+([.]?[0-9]+){0,1})$/.test(input_y.value))) {
        console.log("Y is incorrect");
        error_name = 'Данные поля Y введены некореектно. Введите число в радиусе [-5, 5]. Разделитель "."';
        return false;
    };
    let y = parseFloat(input_y.value);
    if ((y + 5 >= -1e-6) && (y - 5 <= 1e-6)) {
        console.log("Y is correct");
        return true;
    }
    else {
        console.log("Y is incorrect");
        error_name = 'Данные поля Y введены некореектно. Введите число в радиусе [-5, 5]. Разделитель "."'
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