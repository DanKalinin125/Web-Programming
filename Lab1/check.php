<?php
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    function check($x,$y,$r) {
        if (($x <= 0) and ($x >= -$r) and ($y <= 0) and ($y >= -$r)){
            return "В области";
        };
        
        if (($x <= 0) and ($y >= 0) and ($y <= $x + $r/2)){
            return "В области";
        };
        
        if (($x >= 0) and ($y >= 0) and ($x*$x + $y*$y <= $r*$r)){
            return "В области";
        };
        
        return "Вне области";
    };

    function validate_x($x){
        if (preg_match("/^([-]?[0-9]+)$/",$x) and (int)$x > -4 and (int)$x < 6){
            return true;
        }
        else{
            return false;
        }
    }
    
    function validate_y($y){
        if (preg_match("/^([-]?[0-9]+([.]?[0-9]+){0,1})$/",$y) and (float)$y + 5 >= -1e-6 and (float)$y - 5 <= 1e6){
            return true;
        }
        else{
            return false;
        }
    }

    function validate_r($r){
         if (preg_match("/^([-]?[0-9]+)$/",$r) and (int)$r > 0 and (int)$r < 6){
            return true;
        }
        else{
            return false;
        }
    }

    $y = $_POST["y"];
    $r = $_POST["r"];

    $datestamp = $_POST["datestamp"];
    
    
    $checkboxes = json_decode($_POST["x"]);
    var_dump($checkboxes);

    foreach ($checkboxes as $x){
        
        $start = microtime(true);
        $text = "<tr>\n<td>" . $datestamp . "</td>\n";
        
        if (validate_x($x) and validate_y($y) and validate_r($r)){
            $res = check((int)$x, (float)$y, (int)$r);
            $time = number_format(round((microtime(true) - $start)*6, 5), 5, '.', '');
            
            $text .= "<td>$time</td>\n";
            $text .= "<td>" . (int)$x . "</td>\n";
            $text .= "<td>" . (float)$y . "</td>\n";
            $text .= "<td>" . (int)$r . "</td>\n";
            $text .= "<td>$res</td>\n</tr>\n";
        }
        else{
            $text .= "<td> </td>\n";
            $text .= "<td> </td>\n";
            $text .= "<td> </td>\n";
            $text .= "<td> </td>\n";
            $text .= "<td>Некорректные значения</td>\n</tr>\n";
        }
        
        file_put_contents('table.xml', $text, FILE_APPEND | LOCK_EX);
    }
    
    echo file_get_contents('table.xml');
?>