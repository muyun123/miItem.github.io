"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var Shopcar = function () {
        function Shopcar() {
            _classCallCheck(this, Shopcar);

            this.gnum = 1;
            this.init();
        }

        _createClass(Shopcar, [{
            key: "init",
            value: function init() {
                this.require();
                this.checked();
                this.goodnum();
                this.oneTotype($(".sel_goods .onecheck"));
                // this.checknum();
                this.delectgood();
                // this.sbottom();
                this.checkdel();
            }
            //吸底

        }, {
            key: "sbottom",
            value: function sbottom() {
                var offset = $(".cart-total").offset();
                var top = offset.top - $(window).outerHeight();
                $(window).scroll(function () {
                    if ($(window).scrollTop() <= top) {
                        $(".cart-total").css({
                            'position': 'fixed',
                            'top': $(window).outerHeight() - $(".cart-total").outerHeight()
                        });
                    } else {
                        $(".cart-total").css({
                            'position': 'static'
                        });
                    }
                });
            }
            //删除

        }, {
            key: "delectgood",
            value: function delectgood() {
                var _this = this;
                $(".sel_goods").delegate('.delect', 'click', function () {
                    var thisr = this;
                    $(".alttr").css('display', 'block');
                    $(".alttr .close").click(function () {
                        $(".alttr").css('display', 'none');
                    });
                    $(".alttr .btn-gray").click(function () {
                        $(".alttr").css('display', 'none');
                    });
                    $(".alttr .btn-brown").click(function () {
                        var arr = [];
                        arr.push($(thisr).parent().parent().attr('gid'));
                        _this.drequire(arr);
                        $(".alttr").css('display', 'none');
                    });
                });
            }
            //删除请求

        }, {
            key: "drequire",
            value: function drequire(arr) {
                console.log(arr);
                var _this = this;
                $.ajax({
                    type: "get",
                    url: "./api/shopcar.php",
                    data: {
                        opt: 'd',
                        uid: _this.getcookie('uid'),
                        gid: arr
                    },
                    success: function success(str) {
                        if (str) {
                            _this.require();
                        }
                    }
                });
            }
            //数量加减

        }, {
            key: "goodnum",
            value: function goodnum() {
                var _this = this;
                $(".sel_goods").delegate('.add', 'click', function () {
                    _this.gnum = $(this).parent().find(".nums").val() - 0;
                    _this.gnum += 1;
                    if (_this.gnum > $(this).prev().attr('kucun')) {
                        _this.gnum = $(this).prev().attr('kucun');
                    }
                    _this.urequire($(this).parent().attr('gid'));
                }).delegate('.sub', 'click', function () {
                    _this.gnum = $(this).parent().find(".nums").val() - 0;
                    _this.gnum -= 1;
                    if (_this.gnum < 1) {
                        _this.gnum = 1;
                    }
                    _this.urequire($(this).parent().attr('gid'));
                }).delegate('.nums', 'click', function () {
                    $(this).blur(function (e) {
                        _this.gnum = $(this).parent().find(".nums").val() - 0;
                        if (_this.gnum < 1) {
                            _this.gnum = 1;
                        } else if (_this.gnum > $(this).prev().attr('kucun')) {
                            _this.gnum = $(this).prev().attr('kucun');
                        }
                        _this.urequire($(this).parent().attr('gid'));
                    });
                });
            }
            //数量加减特效

        }, {
            key: "clianima",
            value: function clianima() {
                for (var i = 0; i < $(".sel_goods .nums").length; i++) {
                    if ($(".sel_goods .nums").eq(i).val() - 0 < $(".sel_goods .nums").eq(i).attr('kucun') - 0) {
                        $(".sel_goods .nums").eq(i).prev().addClass('subed');
                        $(".sel_goods .nums").eq(i).next().removeClass('added');
                    } else {
                        $(".sel_goods .nums").eq(i).val($(".sel_goods .nums").eq(i).attr('kucun'));
                        $(".sel_goods .nums").eq(i).next().addClass('added');
                        $(".sel_goods .nums").eq(i).prev().addClass('subed');
                    }
                    if ($(".sel_goods .nums").eq(i).val() <= 1) {
                        $(".sel_goods .nums").eq(i).val(1);
                        $(".sel_goods .nums").eq(i).prev().removeClass('subed');
                    }
                }
            }
            //修改数量

        }, {
            key: "urequire",
            value: function urequire(gid) {
                var _this = this;
                $.ajax({
                    type: "get",
                    url: "./api/shopcar.php",
                    data: {
                        opt: 'u',
                        gid: gid,
                        uid: _this.getcookie('uid'),
                        gnum: _this.gnum
                    },
                    success: function success(str) {
                        var arr = JSON.parse(str);
                        if (arr.res) {
                            // _this.require()
                            _this.clidata(arr['data']);
                        }
                    }
                });
            }
        }, {
            key: "clidata",
            value: function clidata(arr) {
                for (var i = 0; i < $(".sel_goods .good_all").length; i++) {
                    if ($(".sel_goods .good_all").eq(i).attr('gid') == arr[0].gid) {
                        $(".sel_goods .ast").eq(i).find(".nums").val(arr[0].num);
                        $(".sel_goods .ast").eq(i).find(".good_sum").html("\uFFE5" + arr[0].num * arr[0].price);
                        $(".sel_goods .ast").eq(i).find(".good_sum").attr('date-price', arr[0].num * arr[0].price);
                    }
                }
                this.clianima();
                this.checknum();
            }
            //商品勾选

        }, {
            key: "checked",
            value: function checked() {
                this.allcheck();
                this.typecheck();
                this.onecheck();
            }
            //全选

        }, {
            key: "allcheck",
            value: function allcheck() {
                var _this = this;
                $(".main_car .allcheck").click(function () {
                    if ($(this).hasClass('checked')) {
                        $(".main_car .allcheck").addClass('check').removeClass('checked');
                        $(".sel_goods .typecheck").addClass('check').removeClass('checked');
                        $(".sel_goods .onecheck").addClass('check').removeClass('checked');
                        $(".cart-total .goods_sum").css('display', 'none');
                        $(".cart-total .sel_sum").css('lineHeight', '62px');
                    } else {
                        $(".main_car .allcheck").addClass('checked').removeClass('check');
                        $(".sel_goods .typecheck").addClass('checked').removeClass('check');
                        $(".sel_goods .onecheck").addClass('checked').removeClass('check');
                        $(".cart-total .goods_sum").css('display', 'block');
                        $(".cart-total .sel_sum").css('lineHeight', 'normal');
                    }
                    _this.checknum();
                });
            }
            //商品类型全选

        }, {
            key: "typecheck",
            value: function typecheck() {
                var _this = this;
                $(".sel_goods").delegate('.typecheck', 'click', function () {
                    console.log($(".sel_goods .typecheck").hasClass('checked'));
                    if ($(".sel_goods .typecheck").hasClass('checked')) {
                        console.log(111);
                        $(".sel_goods .typecheck").addClass('check').removeClass('checked');
                        $(".sel_goods .typecheck").parent().parent().find(".onecheck").addClass('check').removeClass('checked');
                    } else {
                        $(".sel_goods .typecheck").addClass('checked').removeClass('check');
                        $(".sel_goods .typecheck").parent().parent().find(".onecheck").addClass('checked').removeClass('check');
                    };
                    _this.typeToall();
                    _this.checknum();
                });
            }
            //反选

        }, {
            key: "typeToall",
            value: function typeToall() {
                var istrue = 0;
                for (var i = 0; i < $(".sel_goods .typecheck").length; i++) {
                    if ($(".sel_goods .typecheck").eq(i).hasClass('checked')) {
                        istrue += 1;
                    }
                }
                if (istrue == $(".sel_goods .typecheck").length) {
                    $(".main_car .allcheck").addClass('checked').removeClass('check');
                } else {
                    $(".main_car .allcheck").addClass('check').removeClass('checked');
                }
            }
            //商品单选

        }, {
            key: "onecheck",
            value: function onecheck() {
                var _this = this;
                $(".sel_goods").delegate('.onecheck', 'click', function () {
                    if ($(this).hasClass('checked')) {
                        $(this).addClass('check').removeClass('checked');
                    } else {
                        $(this).addClass('checked').removeClass('check');
                    };
                    _this.oneTotype(this);
                    _this.checknum();
                });
            }
            //反选

        }, {
            key: "oneTotype",
            value: function oneTotype(_this) {
                var istrue = 0;
                for (var i = 0; i < $(_this).parent().parent().parent().find(".onecheck").length; i++) {
                    if ($(_this).parent().parent().parent().find(".onecheck").eq(i).hasClass('checked')) {
                        istrue += 1;
                    }
                }
                if (istrue == $(_this).parent().parent().parent().find(".onecheck").length) {
                    $(_this).parent().parent().parent().find(".typecheck").addClass('checked').removeClass('check');
                } else {
                    $(_this).parent().parent().parent().find(".typecheck").addClass('check').removeClass('checked');
                }
                this.typeToall();
            }
            //勾选商品的数量

        }, {
            key: "checknum",
            value: function checknum() {
                var sum = 0;
                var istrue = 0;
                for (var i = 0; i < $(".sel_goods .onecheck").length; i++) {
                    if ($(".sel_goods .onecheck").eq(i).hasClass('checked')) {
                        istrue += $(".sel_goods .nums").eq(i).val() - 0;
                        sum += $(".sel_goods .good_sum").eq(i).attr('date-price') - 0;
                    }
                }
                $(".cart-total .goods_sum").html("\u603B\u989D\uFF1A\uFFE5" + sum.toFixed(2) + ",<span>\u7ACB\u51CF\uFFE50</span>");
                $(".cart-total .sel_sum .sum").html("\uFFE5" + sum.toFixed(2));
                $(".cart-total .check_num").html(istrue);
                if (istrue == 0) {
                    $(".cart-total .jiesuan").addClass('jiesuaned');
                    $(".cart-total .sel_sum").css('lineHeight', '62px');
                    $(".cart-total .goods_sum").css('display', 'none');
                } else {
                    $(".cart-total .jiesuan").removeClass('jiesuaned');
                    $(".cart-total .sel_sum").css('lineHeight', 'normal');
                    $(".cart-total .goods_sum").css('display', 'block');
                }
            }
            //勾选商品删除

        }, {
            key: "checkdel",
            value: function checkdel() {
                var _this = this;
                $(".cart-total .delect").click(function () {
                    var arr1 = [];
                    for (var i = 0; i < $(".sel_goods .onecheck").length; i++) {
                        if ($(".sel_goods .onecheck").eq(i).hasClass('checked')) {
                            arr1.push($(".sel_goods .onecheck").eq(i).parent().parent().attr('gid'));
                        }
                    }
                    $(".alttr").css('display', 'block');
                    $(".alttr .close").click(function () {
                        $(".alttr").css('display', 'none');
                    });
                    $(".alttr .btn-gray").click(function () {
                        $(".alttr").css('display', 'none');
                    });
                    $(".alttr .btn-brown").click(function () {
                        _this.drequire(arr1);
                        $(".alttr").css('display', 'none');
                    });
                });
            }
            //获取数据

        }, {
            key: "require",
            value: function require() {
                var _this = this;
                if (this.getcookie('uid') && this.getcookie('user')) {
                    $.ajax({
                        type: "post",
                        url: "./api/shopcar.php",
                        data: {
                            opt: 'r', //读数据
                            uid: _this.getcookie('uid')
                        },
                        success: function success(str) {
                            if (str == 'no') {
                                $(".no_car").css('display', 'block');
                                $(".main_car").css('display', 'none');
                            } else {
                                $(".no_car").css('display', 'none');
                                $(".main_car").css('display', 'block');
                                var arr = JSON.parse(str);
                                _this.xunaran(arr);
                            }
                        }
                    });
                } else {
                    $(".no_car").css('display', 'block');
                    $(".main_car").css('display', 'none');
                }
            }
        }, {
            key: "getcookie",
            value: function getcookie(key) {
                var str = document.cookie;
                var arr = str.split('; ');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        var arr2 = item.split('=');
                        if (key == arr2[0]) {
                            return arr2[1];
                        }
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
            }
        }, {
            key: "xunaran",
            value: function xunaran(arr) {
                var obj = {};
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var val = _step2.value;

                        var arr1 = [];
                        if (obj[val.goodtype]) {
                            arr1 = obj[val.goodtype];
                            arr1.push(val);
                            obj[val.goodtype] = arr1;
                        } else {
                            arr1[0] = val;
                            obj[val.goodtype] = arr1;
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

                var html = '';
                for (var key in obj) {
                    html += "<dl class=\"goods_list\">\n                            <dt class=\"good_type\">\n                                <span class=\"typecheck checked\" data-index=" + obj[key][0].gtynum + "></span>\n                                <span class=\"type_name\"><a href=\"\">" + key + "</a></span>\n                                <span class=\"mianyun\"><i>!</i>\u5DF2\u514D\u8FD0\u8D39</span>\n                            </dt>";
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = obj[key][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var val = _step3.value;

                            html += "<dd class=\"good_all clearfix\" gid=\"" + val.gid + "\">\n                                <div class=\"good_check\">\n                                    <span class=\"onecheck checked\" data-checked=\"false\"></span>\n                                </div>\n                                <div class=\"good_img\">\n                                    <a href=\"detail.html?gid=" + val.gid + "\"><img\n                                            src=\"" + val.imgurl + "\"\n                                            alt=\"\"></a>\n                                </div>\n                                <div class=\"good_tit\"><a href=\"detail.html?gid=" + val.gid + "\">" + val.lititle + "&nbsp;" + val.gty.split('&').join('') + "</a></div>\n                               <div class=\"good_price\"><span>\uFFE5" + val.price + "</span></div>\n                                <div class=\"ast\">\n                                <div class=\"good_num\" gid=\"" + val.gid + "\">\n                                    <input type=\"button\" class=\"sub\">\n                                    <input type=\"tel\" class=\"nums\" value=\"" + val.num + "\" kucun=\"" + val.kucun + "\">\n                                    <input type=\"button\" class=\"add\">\n                                </div>\n                                <div class=\"good_sum\" date-price=" + val.price * val.num + ">\uFFE5" + val.price * val.num + "</div></div>\n                                <div class=\"good_opt\"><span class=\"delect\"></span></div>\n                            </dd>";
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    html += '</dl>';
                }
                $(".sel_goods").html(html);
                // this.checked();
                // this.goodnum();
                // this.oneTotype($(".sel_goods .onecheck"));
                this.checknum();
                // this.delectgood();
                this.sbottom();
                // this.checkdel()
            }
        }]);

        return Shopcar;
    }();

    new Shopcar();
});