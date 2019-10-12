"use strict";

$(function () {
    function Imgcli() {
        this.idsy = 0; //遮罩的Y定位
        this.ibsy = 0; //几倍img的Y定位
        this.idsx = 0;
        this.ibsx = 0;
        this.now = 0; //li索引
        this.fewt = 2; //放大倍数
        this.goodnum = 1;
        this.kucun = 10;
        this.gid = location.search.split('=')[1];
        this.smallimgs = $(".small_img .list_img");
        this.img = ["https://img.youpin.mi-img.com/goods/shop_e2c2f21adf6b767c3f0775e02e32bbad.jpeg@base@tag=imgScale&F=webp&h=166&w=166", "https://img.youpin.mi-img.com/goods/shop_8274ff7be6c64af1b4852b265002cd7f.jpeg@base@tag=imgScale&F=webp&h=166&w=166", "https://img.youpin.mi-img.com/goods/shop_0681e484c0cd892536a6760f44817dd3.jpeg@base@tag=imgScale&F=webp&h=166&w=166", "https://img.youpin.mi-img.com/goods/shop_c62369cdfd265ed5cddd5c65499d20bd.jpeg@base@tag=imgScale&F=webp&h=166&w=166", "https://img.youpin.mi-img.com/goods/shop_ba9b69c843a4bb6b8b7f8d259ae2947d.jpeg@base@tag=imgScale&F=webp&h=166&w=166", "https://img.youpin.mi-img.com/goods/fshop_05426cf9db8ac6283a963a2c6ffd72c3.jpeg@base@tag=imgScale&F=webp&h=166&w=166"];
        this.ulh = $(".list_img li").outerHeight() + 11;
        this.init();
    }

    Imgcli.prototype.init = function () {
        this.require();
        // this.wimg(); //小图渲染
        this.smallclick(); //小图点击
        this.hove();
        this.selclick();
        this.next(); //下一张图
        this.prev(); //上一张图
        this.inpval();
        this.tab(); //选项卡
        this.bigimg();
        this.imghover(this);
        this.addcar();
    };
    //请求数据
    Imgcli.prototype.require = function () {
        var _this = this;
        $.ajax({
            type: "get",
            url: "./api/list.php",
            data: {
                gid: this.gid
            },
            success: function success(str) {
                var arr = JSON.parse(str);
                _this.kucun = arr[0].kucun;
                _this.img = arr[0]['img'];
                console.log(arr);
                _this.wimg();
                _this.gooddtail(arr);
            }
        });
    };
    //信息渲染
    Imgcli.prototype.gooddtail = function (arr) {
        if (!arr[0].tejia) {
            var dis = 'none';
        } else {
            var dis = 'block';
        }
        if (!arr[0].tehui) {
            var dis1 = 'none';
        } else {
            var dis1 = 'block';
        }
        $(".title_top").append("<div class=\"goods_tile\">\n                                    <p>" + arr[0].lititle + "</p>\n                                </div>\n                                <div class=\"goods_summary\">\n                                    <a href class=\"preferential\" style=\"display:" + dis1 + "\">" + arr[0].tehui + "</a>\n                                    <a href class=\"preferential\">" + arr[0].inporthui + "</a>\n                                    <span class=\"little\">" + arr[0].title + "</span>\n                                </div>");
        $(".goods_price").append("<span class=\"sku_title\">\u552E\u4EF7</span>\n                                    <span class=\"money-symbol\">\xA5</span>\n                                    <span class=\"new_price\">" + arr[0].newprice + "</span>\n                                    <span class=\"old_price\">\xA5" + arr[0].oldprice + "</span>\n                                    <span class=\"sale_tag\" style=\"display:" + dis + "\">" + arr[0].tejia + "</span>");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arr[0].color.split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var val = _step.value;

                $(".color_list").append("<dd>" + val + "</dd>");
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

        $(".kucun").append(" <span>\u5E93\u5B58<span class=\"kunum\">" + arr[0].kucun + "</span></span>");
    };
    //鼠标经过大图时
    Imgcli.prototype.imghover = function (_this) {
        $(".big_img_item").hover(function () {
            $(".big_img_item .mask").css('display', 'block');
            $(".big_img_item .big_pic").css('display', 'block');
            $(".big_pic img").css({
                'width': _this.fewt * 100 + '%',
                'height': _this.fewt * 100 + '%'
            });
            //在大图移动时
            $(".big_img_item").mousemove(function (ev) {
                _this.mover(ev);
            });
        }, function () {
            $(".big_img_item .mask").css('display', 'none');
            $(".big_img_item .big_pic").css('display', 'none');
        });
    };
    //小图选中效果
    Imgcli.prototype.wimg = function () {
        for (var i = 0; i < this.img.length; i++) {
            $(".small_img .list_img").append("<li><img src=\"" + this.img[i].img + "\" alt=\"\"></li>");
        }
        this.smallimgs.find("li").eq(0).addClass('active').siblings().removeClass('active');
        this.ulh = $(".list_img li").outerHeight() + 11;
        this.bigimg();
    };
    //路过小图
    Imgcli.prototype.hove = function () {
        $(".small_img").hover(function () {
            $(".prev").css('display', 'block');
            $(".next").css('display', 'block');
        }, function () {
            $(".prev").css('display', 'none');
            $(".next").css('display', 'none');
        });
    };
    //大图图片获取
    Imgcli.prototype.bigimg = function () {
        $(".big_pic img").attr('src', $(".list_img .active img").attr('src'));
        $(".big_img img").attr('src', $(".list_img .active img").attr('src'));
    };
    //下一张
    Imgcli.prototype.next = function () {
        var _this = this;
        $(".prev").click(function () {
            _this.now--;
            if (_this.now <= 0) {
                _this.now = 0;
            }
            if (_this.now > 0 && _this.now < $(".list_img li").length - 3) {
                _this.smallimgs.css('top', -(_this.now - 1) * _this.ulh + 'px');
            }
            _this.smallimgs.find("li").eq(_this.now).addClass('active').siblings().removeClass('active');
            _this.bigimg();
        });
    };
    //上一张
    Imgcli.prototype.prev = function () {
        var _this = this;
        $(".next").click(function () {
            _this.now++;
            if (_this.now >= $(".list_img li").length - 1) {
                _this.now = $(".list_img li").length - 1;
            }
            if (_this.now > 2 && _this.now < $(".list_img li").length - 1) {
                _this.smallimgs.css('top', -(_this.now - 2) * _this.ulh + 'px');
            }
            _this.smallimgs.find("li").eq(_this.now).addClass('active').siblings().removeClass('active');
            _this.bigimg();
        });
    };
    //小图点击
    Imgcli.prototype.smallclick = function () {
        var _this = this;
        $(".list_img").delegate('li', 'click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            _this.now = $(this).index();
            console.log(_this.now);
            _this.bigimg();
        });
    };
    //大图遮罩
    Imgcli.prototype.mover = function (ev) {
        this.idsx = event.pageX - $(".big_img_item").offset().left - $(".big_img_item .mask").outerWidth() / 2;
        this.idsy = event.pageY - $(".big_img_item").offset().top - $(".big_img_item .mask").outerHeight() / 2;
        if (this.idsy >= $(".big_img_item").outerHeight() - $(".big_img_item .mask").outerHeight()) {
            this.idsy = $(".big_img_item").outerHeight() - $(".big_img_item .mask").outerHeight();
        } else if (this.idsy < 0) {
            this.idsy = 0;
        }
        if (this.idsx >= $(".big_img_item").outerWidth() - $(".big_img_item .mask").outerWidth()) {
            this.idsx = $(".big_img_item").outerWidth() - $(".big_img_item .mask").outerWidth();
        } else if (this.idsx < 0) {
            this.idsx = 0;
        }
        $(".big_img_item .mask").css({
            'top': this.idsy,
            'left': this.idsx
        });
        this.amplification();
    };
    //放大
    Imgcli.prototype.amplification = function () {
        this.ibsy = -($(".big_pic img").outerHeight() - $(".big_pic").outerHeight()) * (this.idsy / ($(".big_img_item").outerHeight() - $(".big_img_item .mask").outerHeight()));
        this.ibsx = -($(".big_pic img").outerWidth() - $(".big_pic").outerWidth()) * (this.idsx / ($(".big_img_item").outerWidth() - $(".big_img_item .mask").outerWidth()));
        $(".big_pic img").css({
            'top': this.ibsy,
            'left': this.ibsx
        });
    };
    //商品数量
    Imgcli.prototype.selclick = function () {
        var _this = this;
        $(".color_list").delegate('dd', 'click', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $("#add").click(function () {
            _this.goodnum++;
            _this.inpval();
        });
        $("#num").change(function () {
            _this.goodnum = $(this).val() - 0;
            _this.inpval();
        });
        $("#sub").click(function () {
            _this.goodnum--;
            _this.inpval();
        });
    };
    //超过库存
    Imgcli.prototype.inpval = function () {
        if (this.goodnum >= this.kucun) {
            this.goodnum = this.kucun;
            $("#add").css({
                'color': '#d6d6d6',
                'cursor': 'no-drop'
            });
        } else if (this.goodnum <= 1) {
            this.goodnum = 1;
            $("#sub").css({
                'color': '#d6d6d6',
                'cursor': 'no-drop'
            });
            $('#add').css({
                'color': '#845f3f',
                'cursor': 'pointer'
            });
        } else {
            $("#sub").css({
                'color': '#845f3f',
                'cursor': 'pointer'
            });
            $('#add').css({
                'color': '#845f3f',
                'cursor': 'pointer'
            });
        }
        $("#num").val(this.goodnum);
    };
    //选项卡
    Imgcli.prototype.tab = function () {
        for (var i = 0; i < $(".main_content .main").length; i++) {

            if ($(".main_content .main").eq(i).css('display') == 'block') {
                $(".list_active").css('left', i * $(".list_active").outerWidth());
            }
        }

        $(".detail_list").delegate('li', 'click', function () {
            console.log($(this).index());
            $(".main_content .main").eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
            $(".list_active").css('left', $(this).index() * $(".list_active").outerWidth());
        });

        var oft = $(".suction_top_menu").offset();
        $(window).scroll(function () {
            var sct = this.scrollY;
            if (sct >= oft.top) {
                $(".suction_top_menu").css({
                    'position': 'fixed',
                    'top': 52,
                    'left': 134.5
                });
            } else {
                $(".suction_top_menu").css({
                    'position': 'relative',
                    'top': 0,
                    'left': 0
                });
            }
        });
    };
    //加入购物车
    Imgcli.prototype.addcar = function () {
        var _this = this;
        $(".good_buy_car .add_car").click(function () {
            if (!_this.getcookie('uid') && !_this.getcookie('user')) {
                $("#xieyi").css('display', 'block');
            } else {
                var obj = {};
                obj.gid = location.search.split('?')[1].split('=')[1];
                obj.uid = _this.getcookie('uid');
                obj.price = $(".goods_price .new_price").html();
                obj.model = '';
                for (var i = 0; i < $(".buy_goods_type .list_type dd").length; i++) {
                    if ($(".buy_goods_type .list_type dd").eq(i).hasClass('active')) {
                        obj.model += $(".buy_goods_type .list_type dd").eq(i).html() + '&';
                    }
                }
                obj.num = $("#num").val();
                $.ajax({
                    type: "get",
                    url: "./api/shopcar.php",
                    data: {
                        data: obj,
                        opt: 'a'
                    },
                    success: function success(str) {
                        if (str) {
                            $(".good_buy_car .succr").css('display', 'block');
                            var timer = setInterval(function () {
                                $(".good_buy_car .succr").css('display', 'none');
                                clearInterval(timer);
                            }, 1500);
                        }
                    }
                });
            }
        });
    };

    Imgcli.prototype.getcookie = function (key) {
        var str = document.cookie;
        var arr = str.split('; ');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                var arr2 = item.split('=');
                if (key == arr2[0]) {
                    return arr2[1];
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
    };
    window.onload = function () {
        var lee = new Imgcli();
    };
});