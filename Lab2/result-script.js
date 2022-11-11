$('#clear-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: $(this).attr('method')
        , url: $(this).attr('action')
        , data: 'getClear=true'
        , contentType: false
        , cached: false
        , processData: false
        , success: function (res) {
            location.reload();
        }
    , });
});

$('#go-back-form').submit(function (e) {
    e.preventDefault();
    window.location.replace('index.jsp');
});

drawGraph();
var pointCoord = fromRealToPoint(checkX, checkY, checkR);
drawPoint(pointCoord.x, pointCoord.y, checkR);
