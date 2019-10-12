"use strict";

$(function () {
    init();
    $("header").load("./head.html", function () {
        init();
    });
    $("footer").load("./footer.html");

    function init() {
        $.ajax({
            type: "post",
            url: "./api/shopcar.php",
            data: {
                opt: 'r', //读数据
                uid: getcookie('uid')
            },
            success: function success(str) {
                if (str == 'no') {
                    $(".header-sear_bar .icon-gouwuche_o span").css('display', 'none');;
                } else {
                    var arr = JSON.parse(str);
                    $(".header-sear_bar .icon-gouwuche_o span").css('display', 'block').html(arr.length);
                }
            }
        });
        $(".one_nav_bar").delegate('li', 'mouseenter', function () {
            $(".side_nav_bar").css('display', 'block');
            var index = $(this).index();
            //导航菜单渲染
            $.ajax({
                type: 'get',
                url: './api/navs.json',
                dataType: 'json',
                success: function success(str) {
                    navs(str, index);
                }
            });

            function navs(arr, index) {
                var arr1 = arr[index];
                var html = '';
                for (var i in arr1) {
                    html += "<dl class=\"two_nav_bar clearfix\">\n                            <dt>" + i + "</dt>";
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = arr1[i][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var k = _step.value;

                            html += " <dd><img src=\"" + k.img + "\"\n                                    alt=\"\"><a href=\"list.html\" title=\"" + k.title + "\">" + k.title + "</a></dd>";
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    html += "</dl>";
                }
                $(".side_nav_bar").html(html);
            }
        });
        //分类菜单
        $(".nav_left").mouseleave(function () {
            $(".side_nav_bar").css('display', 'none');
            var html = '';
            $(".side_nav_bar").html(html);
        });

        //吸顶
        window.onscroll = function () {
            var idy = 484;
            var scry = window.scrollY;
            if (scry > idy) {
                $(".xiding_zuobiao").css({
                    'position': 'fixed',
                    'top': '0',
                    'margin-top': '0',
                    'z-index': '40',
                    'border-bottom': '1px solid #eee'
                });
                $(".header_types").css('visibility', 'unset');
            } else {
                $(".xiding_zuobiao").css({
                    'position': 'static',
                    'margin-top': '20px',
                    'border-bottom': '0px'
                });
                $(".header_types").css('visibility', 'hidden');
            }
            //回到顶部
            $(".gotop").click(function () {
                var timer = null;
                clearInterval(timer);
                var sctop = 0;
                var speed = 10;
                timer = setInterval(function () {
                    sctop = window.scrollY;
                    sctop -= speed;
                    if (sctop <= 0) {
                        clearInterval(timer);
                    };
                    window.scrollTo(0, sctop);
                }, 90);
            });
        };
        $(".list_header .denglu").click(function () {
            $("#xieyi").css('display', 'block');
        });
        $(".list_header .zhuce").click(function () {
            $("#xieyi").css('display', 'block');
            $(".agree").click(function () {
                location.href = "zhuce.html";
            });
        });
        $(".close").click(function () {
            $("#xieyi").css('display', 'none');
        });
        $(".reject").click(function () {
            $("#xieyi").css('display', 'none');
        });
        $(".agree").click(function () {
            location.href = "login.html";
        });
        user();

        function user() {
            if (getcookie('user') && getcookie('uid')) {
                $(".weideng").css('display', 'none');
                $(".yideng").css('display', 'block');
                $(".yideng .m-username").html(getcookie('user'));
                $(".erji .exitlog").click(function () {
                    removeCookie('user');
                    removeCookie('uid');
                    location.href = getcookie('url');
                    init();
                });
            } else {
                $(".weideng").css('display', 'block');
                $(".yideng").css('display', 'none');
            }
        }
        setcookie('url', location.href);

        function removeCookie(key) {
            setcookie(key, '', -1);
        }

        function setcookie(key, val, iday) {
            var now = new Date();
            now.setDate(now.getDate() + iday);
            document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
        }

        function getcookie(key) {
            var str = document.cookie; //username=admin; age=18
            var arr = str.split('; ');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    var arr2 = item.split('=');
                    if (key == arr2[0]) {
                        if (arr2[2]) {
                            return arr2[1] + '=' + arr2[2];
                        } else {
                            return arr2[1];
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        //s搜索
        search();

        function search() {
            $("header .sear_a").click(function () {
                if ($("header .sear").val().trim()) {
                    location.href = "sear.html?keyword=" + $("header .sear").val().trim();
                }
            });

            $("header .sear").focus(function () {
                $("header .sear").keyup(function (e) {
                    if (e.keyCode == 13 && $("header .sear").val().trim()) {
                        location.href = "sear.html?keyword=" + $("header .sear").val().trim();
                    }
                });
            });
        }
    }
});