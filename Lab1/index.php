<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="UTF-8">
    <title>Lab1</title>
    <style type="text/css">
        body {
            background: bisque;
        }
        
        body > table {
            padding-left: 1%;
            padding-right: 1%;
        }
        
        .header {
            font-size: 20px;
            font-family: fantasy;
            color: black;
        }
        
        .fio {
            text-align: center;
        }
        
        .variant {
            text-align: right;
            padding-bottom: 1%;
            padding-top: 1%;
        }
        
        .variant p:nth-child(1)::after{
            content: "1111";
        }
        
        .variant p:nth-child(2)::after{
            content: "32141";
        }
        
        .content {
            font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
            font-size: 14px;
        }
        
        .form {
            vertical-align: top;
            background: bisque;
            padding-top: 1%;
            padding: 5%;
            background: #D8E6F3;
        }
        
        .table {
            vertical-align: top;
            padding-top: 1%;
        }
        
        #result {
            border-collapse: collapse;
            text-align: center;
        }
        
        #result th {
            background: #AFCDE7;
            color: white;
            padding-bottom: 1%;
        }
        
        #result th,
        #result td {
            border-style: solid;
            border-color: white;
        }
        
        #result tr:last-child td {
            background: #AFCDE7;
        }
        
        #result td {
            background: #D8E6F3;
        }
    </style>
</head>

<body>
    <table width="100%">
        <tr class="header" height="10%">
            <td width="40%" class="fio">Калинин Даниил Дмитриевич</td>
            <td width="60%" class="variant"> 
               <p>Вариант: </p>
               <p>Группа: </p></td>
        </tr>
        <tr class="content">
            <td class="form"> <img src="areas.png" width="50%">
                <form id="check-form" action="check.php" method="post">
                    <p>Введите X:</p>
                    <input type="checkbox" name="x" id="chbx" value="-3" />-3
                    <input type="checkbox" name="x" id="chbx" value="-2" />-2
                    <input type="checkbox" name="x" id="chbx" value="-1" />-1
                    <input type="checkbox" name="x" id="chbx" value="0" />0
                    <input type="checkbox" name="x" id="chbx" value="1" />1
                    <input type="checkbox" name="x" id="chbx" value="2" />2
                    <input type="checkbox" name="x" id="chbx" value="3" />3
                    <input type="checkbox" name="x" id="chbx" value="4" />4
                    <input type="checkbox" name="x" id="chbx" value="5" />5
                    <p>Введите Y:</p>
                    <input type="text" name="y" id="input_y" value="" />
                    <p>Введите R:</p>
                    <input type="radio" name="r" value="1" />1
                    <input type="radio" name="r" value="2" />2
                    <input type="radio" name="r" value="3" />3
                    <input type="radio" name="r" value="4" />4
                    <input type="radio" name="r" value="5" />5
                    <br>
                    <button id="btn" type="submit">Отправить</button>
                </form>
                <form id="clear-form" action="clear.php" method="post">
                    <button type="submit">Отчистить таблицу</button>
                </form>
            </td>
            <td class="table">
                <table width="100%" id="result" border="1">
                    <?php echo file_get_contents("table.xml"); ?>
                </table>
            </td>
        </tr>
    </table>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="script.js"></script>
</body>

</html>