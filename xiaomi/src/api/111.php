<?php
$arr = array(
    ["https://img.youpin.mi-img.com/shopmain/83ffcda63d23d280553061538bdd05b9.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/6b2fdb69773507e67c8ffae4c5aa329d.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/8ac4c52d867152ec079ef84c2068653d.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/c0f6568067ccc6dd447709c4470c8058.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/0ef670dab4150661cb0bb507b27984a7.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/4e620092c9551fc3c64e1c5b78cb3e67.jpg@base@tag=imgScale&F=webp&h=366&w=366"],
    ["https://img.youpin.mi-img.com/shopmain/191a551a7d0caf0d5bd4643023aacfea.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/8570326433016f48cbd245746982ce86.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/fc774883ecf94b697bb579a81c44cf34.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/46ce4ece8d7011eda22e51af19c6d687.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/16c1152ac120f1e84e17c842ab3975ee.jpg@base@tag=imgScale&F=webp&h=366&w=366"],
    ["https://img.youpin.mi-img.com/shopmain/c196cb27f22030598512b1107921fbb8.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/40400d477580325e0d41f55d5a7bb18b.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/a1f3c3b8bc5c3e80abf29a8600ea56a7.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/885b89fd9fd0432f1c4bfab71f52d09e.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/8089824b5301ab29f31383d2a2a0f8f8.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/58001418657564bdeabfba484c2fa65e.jpg@base@tag=imgScale&F=webp&h=366&w=366"],
    ["https://img.youpin.mi-img.com/shopmain/8a6287ca065f34f5a94b6cab9b352305.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/goods/eb01024b96d1c160fb0c71881abb7094.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/goods/3cba5d453c8128e82fabc4770412cf4f.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/2eb3f57f12ffa3b85f9fe94547033290.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/79bdf38d67b25a8cfb902d005d764761.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/5486680f8d3927c0a9202ab8c30f1c8f.jpg@base@tag=imgScale&F=webp&h=366&w=366"],
    ["https://img.youpin.mi-img.com/shopmain/490c82b329e4004b678625a2a510ae1d.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/30758127979c9eee06063389a069f4d5.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/d13902b559955195c5ece36767d66ac0.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/3f5c2d9c46ddf2022da775bea1fbfec9.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/1c04417ef9004458f66cbb38f220708c.jpg@base@tag=imgScale&F=webp&h=366&w=366", "https://img.youpin.mi-img.com/shopmain/56a0b245a79600f036d441f701f072f8.jpg@base@tag=imgScale&F=webp&h=366&w=366"]
);
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
$j = 0;
while ($j < 650) {
    for ($i = 0; $i < count($arr); $i++) {
        for ($x = 0; $x < count($arr[$i]); $x++) {
            $sql = "insert into imgs(gid,img) values('$j','" . $arr[$i][$x] . "')";
            $res = $conn->query($sql);
            var_dump($res);
        }
        $j++;
    }
}
