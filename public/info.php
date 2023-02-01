<?php
$str='[1,2,3]';
$str=json_decode($str,true);
foreach($str as $s){
    echo $s;
}
?>
