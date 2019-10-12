<?php
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '';
$keyword = isset($_REQUEST['word']) ? $_REQUEST['word'] : '';
$n = isset($_REQUEST['n']) ? $_REQUEST['n'] : ''; //排序
$n1 = isset($_REQUEST['n1']) ? $_REQUEST['n1'] : ''; //价格1
$n2 = isset($_REQUEST['n2']) ? $_REQUEST['n2'] : ''; //价格2
$num = $page - 1;
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
$sql = "select * from goodlist";
if ($n1 == '' && $n2 == '') {
    $sql .= " where lititle like '%$keyword%'";
}
if ($n1 != '' && $n2 != '') {
    $sql .= " where newprice between $n1 and $n2 and lititle like '%$keyword%'";
}
if ($n == 'add') {
    $sql .= " order by newprice asc";
} else if ($n == 'sub') {
    $sql .= " order by newprice desc";
}
// $sql = "select * from goodlist where lititle like '%$keyword%';";
$res = $conn->query($sql);
$obj = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
