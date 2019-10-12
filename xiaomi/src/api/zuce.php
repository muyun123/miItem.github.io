<?php
$phonenum = isset($_REQUEST['phonenum']) ? $_REQUEST['phonenum'] : '';
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
$sql = "insert into userinfo(phonenum,password) values('$phonenum','$password')";
$res = $conn->query($sql);
$sql = "select uid from userinfo where phonenum=$phonenum";
$res = $conn->query($sql);
$obj = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($obj);