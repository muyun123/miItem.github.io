<?php
$username = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
$sql = "select * from userinfo where phonenum=$username";
$res = $conn->query($sql);
if ($res->num_rows) {
    $obj = $res->fetch_all(MYSQLI_ASSOC);
    if ($password == $obj[0]['password']) {
        $str = "登录成功";
        $mass = 1;
        $data = array('user' => $obj[0]['phonenum'], 'uid' => $obj[0]['uid']);
        $arr = array('txt' => $str, 'date' => $data, 'res' => $mass);
    } else {
        $str = "用户名或密码不正确";
        $mass = 0;
        $arr = array('txt' => $str, 'res' => $mass);
    }
} else {
    $str = "用户名或密码不正确";
    $mass = 0;
    $arr = array('txt' => $str, 'res' => $mass);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
