<?php

    $text = "<tr> \n<th>Время отправки запроса</th> \n<th>Время работы (мкс)</th> \n<th>X</th> \n<th>Y</th> \n<th>R</th> \n<th>Результат</th> \n</tr> \n<tr>";

    file_put_contents('table.xml', $text);
    echo file_get_contents('table.xml');
    
?>