const canvas = document.getElementsByClassName("areas")[0];
ctx = canvas.getContext('2d');

canvas.height = canvas.width;
let w = canvas.width, h = canvas.height;

//Координаты центра
const centerX = w/2;
const centerY = h/2;
const axisFontSize = 18;
const offsetTextFromAsix = 20;

//Значение r, отображаемое на графике
let pointR = w/4;
let flag_selected_r = false;

//Рисование графа
function drawGraph() {

    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'DodgerBlue';
    
    //square
    ctx.fillRect(centerX, centerY,pointR, -pointR);
        
    //triangle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX -pointR/2, centerY);
    ctx.lineTo(centerX, centerY +pointR/2);
    ctx.fill();
    ctx.closePath();

    //cyrcle
    ctx.arc(centerX, centerY,pointR/2, -1/2 * Math.PI, Math.PI, true);
    ctx.fill();
        
    // y axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX - 10, 15);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX + 10, 15);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, h);
    ctx.stroke();
    ctx.closePath();

    // x axis
    ctx.beginPath();
    ctx.moveTo(w, centerY);
    ctx.lineTo(w - 15, centerY - 10);
    ctx.moveTo(w, centerY);
    ctx.lineTo(w - 15, centerY + 10);
    ctx.moveTo(w, centerY);
    ctx.lineTo(0, centerY);
    ctx.stroke();
    ctx.closePath();
    
    //Название осей
    ctx.fillStyle = 'black';
    ctx.font = `500 ${axisFontSize}px Roboto`;
    ctx.fillText('x', w - 20, centerY + offsetTextFromAsix);
    ctx.fillText('y', centerX - offsetTextFromAsix, 20);
    
    //Пункты R на осях
    ctx.lineWidth = 1;
    
    ctx.fillText('R', centerX + pointR - axisFontSize/2, centerY + offsetTextFromAsix);
    ctx.beginPath();
    ctx.moveTo(centerX +pointR, centerY - 5);
    ctx.lineTo(centerX +pointR, centerY + 5);
    ctx.stroke();
    ctx.closePath();
    
    ctx.fillText('R', centerX - pointR - axisFontSize/2, centerY + offsetTextFromAsix);
    ctx.beginPath();
    ctx.moveTo(centerX - pointR, centerY - 5);
    ctx.lineTo(centerX - pointR, centerY + 5);
    ctx.stroke();
    ctx.closePath();
    
    ctx.fillText('R', centerX - offsetTextFromAsix, centerY + pointR + axisFontSize/2);
    ctx.beginPath();
    ctx.moveTo(centerX - 5, centerY + pointR);
    ctx.lineTo(centerX + 5, centerY + pointR);
    ctx.stroke();
    ctx.closePath();
    
    ctx.fillText('R', centerX - offsetTextFromAsix, centerY - pointR + axisFontSize/2);
    ctx.beginPath();
    ctx.moveTo(centerX - 5, centerY - pointR);
    ctx.lineTo(centerX + 5, centerY - pointR);
    ctx.stroke();
    ctx.closePath();
    
    //Пометки R/2 на осях
    ctx.beginPath();
    ctx.moveTo(centerX + pointR/2, centerY - 5);
    ctx.lineTo(centerX + pointR/2, centerY + 5);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(centerX - pointR/2, centerY - 5);
    ctx.lineTo(centerX - pointR/2, centerY + 5);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(centerX - 5, centerY + pointR/2);
    ctx.lineTo(centerX + 5, centerY + pointR/2);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(centerX - 5, centerY - pointR/2);
    ctx.lineTo(centerX + 5, centerY - pointR/2);
    ctx.stroke();
    ctx.closePath();
}

function drawPoint(pointX, pointY, realR){
    drawGraph();    //Очищаем график от лишних точек
    
    ctx.fillStyle = 'red';
    ctx.fillRect(pointX, pointY, 5, 5);
}

function fromRealToPoint(realX, realY, realR){
    var e = pointR/realR;
    var pointX = centerX + e*realX;
    var pointY = centerY - e*realY;
    
    return {x: pointX, y: pointY};
}

function fromPointToReal(pointX, pointY, realR){
    var e = pointR/realR;
    var realX = Math.round((pointX - centerX)/e);
    var realY = -(pointY - centerY)/e;
    
    return {x: realX, y: realY};
}