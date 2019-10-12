<?php
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
$sql = "select * from navlist";
$res = $conn->query($sql);
$obj = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
