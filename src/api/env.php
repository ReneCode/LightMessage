<?php
header('Content-Type: application/json');
$json = array();
$json["ApiServer"] = getenv("ApiServer");
echo json_encode($json);
?>
