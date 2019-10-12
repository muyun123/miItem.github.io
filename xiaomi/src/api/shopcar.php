<?php
$opt = isset($_REQUEST['opt']) ? $_REQUEST['opt'] : '';
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
$gnum = isset($_REQUEST['gnum']) ? $_REQUEST['gnum'] : '';
$datar = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
if ($opt == 'r') {
    $sql = "select * from shopcar inner join goodlist on shopcar.gid=goodlist.gid where uid='$uid'";
    $res = $conn->query($sql);
    if ($res->num_rows) {
        $obj = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($obj, JSON_UNESCAPED_UNICODE);
    } else {
        echo 'no';
    }
} else if ($opt == 'u') {
    $sql = "update shopcar set num='$gnum' where uid='$uid' and gid='$gid'";
    $res = $conn->query($sql);
    if ($res) {
        $sql1 = "select num,price,gid from shopcar where uid='$uid' and gid='$gid'";
        $res1 = $conn->query($sql1);
        $obj = $res1->fetch_all(MYSQLI_ASSOC);
        $arr = array('res' => '1', 'data' => $obj);
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
} else if ($opt == 'd') {
    $j = 0;
    for ($i = 0; $i < count($gid); $i++) {
        $sql = "delete from shopcar where uid='$uid' and gid='" . $gid[$i] . "'";
        $res = $conn->query($sql);
        if ($res) {
            $j++;
        }
    }
    if ($j == count($gid)) {
        echo 1;
    }
} else if ($opt == 'a') {
    $sql = "select * from shopcar where uid='" . $datar['uid'] . "' and gid='" . $datar['gid'] . "'";
    $res = $conn->query($sql);
    if ($res->num_rows) {
        $sql = "update shopcar set gty='" . $datar['model'] . "',num='" . $datar['num'] . "' where uid='" . $datar['uid'] . "' and gid='" . $datar['gid'] . "' ";
        $res = $conn->query($sql);
        print_r($res);
    } else {
        $sql = "insert into shopcar(uid,gid,gty,price,num,gtynum,goodtype) values('" . $datar['uid'] . "','" . $datar['gid'] . "','" . $datar['model'] . "','" . $datar['price'] . "','" . $datar['num'] . "','0','有品精选');";
        $res = $conn->query($sql);
        print_r($res);
    }
    
}
