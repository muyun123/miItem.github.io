<?php
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '';
$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');

if ($page) {
    $num = $page - 1;
    $sql1 = "select * from navlist where tid=0";
    $res1 = $conn->query($sql1);
    $obj1 = $res1->fetch_all(MYSQLI_ASSOC);

    $sql = "select * from goodlist limit " . ($num * 25) . ",25";
    $res = $conn->query($sql);
    $obj = $res->fetch_all(MYSQLI_ASSOC);
    $arr = array($obj1[$num]['title'] => $obj);
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
} else if ($gid >= 0) {
    $sql = "select * from goodlist where gid=$gid";
    $sql1 = "select img from imgs where gid=$gid";
    $res = $conn->query($sql);
    $res1 = $conn->query($sql1);
    $obj = $res->fetch_all(MYSQLI_ASSOC);
    $obj1 = $res1->fetch_all(MYSQLI_ASSOC);
    $arr = $obj;
    $arr[0]['img'] = $obj1;
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}
