$(function () {

    class Shopcar {
        constructor() {
            this.gnum = 1;
            this.init();
        }
        init() {
            this.require();
            this.checked();
            this.goodnum();
            this.oneTotype($(".sel_goods .onecheck"));
            // this.checknum();
            this.delectgood();
            // this.sbottom();
            this.checkdel()
        }
        //吸底
        sbottom() {
            var offset = $(".cart-total").offset();
            var top = offset.top - $(window).outerHeight();
            $(window).scroll(function () {
                if ($(window).scrollTop() <= top) {
                    $(".cart-total").css({
                        'position': 'fixed',
                        'top': $(window).outerHeight() - $(".cart-total").outerHeight(),
                    });
                } else {
                    $(".cart-total").css({
                        'position': 'static',
                    });
                }
            });
        }
        //删除
        delectgood() {
            let _this = this;
            $(".sel_goods").delegate('.delect', 'click', function () {
                let thisr = this;
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
        drequire(arr) {
            console.log(arr)
            let _this = this;
            $.ajax({
                type: "get",
                url: "./api/shopcar.php",
                data: {
                    opt: 'd',
                    uid: _this.getcookie('uid'),
                    gid: arr,
                },
                success: function (str) {
                    if (str) {
                        _this.require();
                    }
                }
            });
        }
        //数量加减
        goodnum() {
            let _this = this;
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
            })
        }
        //数量加减特效
        clianima() {
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
        urequire(gid) {
            let _this = this;
            $.ajax({
                type: "get",
                url: "./api/shopcar.php",
                data: {
                    opt: 'u',
                    gid: gid,
                    uid: _this.getcookie('uid'),
                    gnum: _this.gnum,
                },
                success: function (str) {
                    var arr = JSON.parse(str);
                    if (arr.res) {
                        // _this.require()
                        _this.clidata(arr['data']);
                    }
                }
            });
        }
        clidata(arr) {
            for (var i = 0; i < $(".sel_goods .good_all").length; i++) {
                if ($(".sel_goods .good_all").eq(i).attr('gid') == arr[0].gid) {
                    $(".sel_goods .ast").eq(i).find(".nums").val(arr[0].num);
                    $(".sel_goods .ast").eq(i).find(".good_sum").html(`￥${arr[0].num*arr[0].price}`);
                    $(".sel_goods .ast").eq(i).find(".good_sum").attr('date-price', arr[0].num * arr[0].price);
                }
            }
            this.clianima()
            this.checknum()
        }
        //商品勾选
        checked() {
            this.allcheck();
            this.typecheck();
            this.onecheck();
        }
        //全选
        allcheck() {
            let _this = this;
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
            })
        }
        //商品类型全选
        typecheck() {
            let _this = this;
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
            })
        }
        //反选
        typeToall() {
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
        onecheck() {
            let _this = this;
            $(".sel_goods").delegate('.onecheck', 'click', function () {
                if ($(this).hasClass('checked')) {
                    $(this).addClass('check').removeClass('checked');
                } else {
                    $(this).addClass('checked').removeClass('check');
                };
                _this.oneTotype(this);
                _this.checknum();
            })
        }
        //反选
        oneTotype(_this) {
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
        checknum() {
            var sum = 0;
            var istrue = 0;
            for (var i = 0; i < $(".sel_goods .onecheck").length; i++) {
                if ($(".sel_goods .onecheck").eq(i).hasClass('checked')) {
                    istrue += $(".sel_goods .nums").eq(i).val() - 0;
                    sum += $(".sel_goods .good_sum").eq(i).attr('date-price') - 0;
                }
            }
            $(".cart-total .goods_sum").html(`总额：￥${sum.toFixed(2)},<span>立减￥0</span>`);
            $(".cart-total .sel_sum .sum").html(`￥${sum.toFixed(2)}`);
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
        checkdel() {
            let _this = this;
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
        require() {
            let _this = this;
            if (this.getcookie('uid') && this.getcookie('user')) {
                $.ajax({
                    type: "post",
                    url: "./api/shopcar.php",
                    data: {
                        opt: 'r', //读数据
                        uid: _this.getcookie('uid')
                    },
                    success: function (str) {
                        if (str == 'no') {
                            $(".no_car").css('display', 'block');
                            $(".main_car").css('display', 'none');
                        } else {
                            $(".no_car").css('display', 'none');
                            $(".main_car").css('display', 'block');
                            var arr = JSON.parse(str);
                            _this.xunaran(arr)
                        }
                    }
                });
            } else {
                $(".no_car").css('display', 'block');
                $(".main_car").css('display', 'none');
            }

        }
        getcookie(key) {
            let str = document.cookie;
            let arr = str.split('; ');
            for (let item of arr) {
                let arr2 = item.split('=');
                if (key == arr2[0]) {
                    return arr2[1];
                }
            }
        }
        xunaran(arr) {
            let obj = {};
            for (var val of arr) {
                var arr1 = [];
                if (obj[val.goodtype]) {
                    arr1 = obj[val.goodtype];
                    arr1.push(val);
                    obj[val.goodtype] = arr1;
                } else {
                    arr1[0] = val
                    obj[val.goodtype] = arr1;
                }
            }
            var html = '';
            for (var key in obj) {
                html += `<dl class="goods_list">
                            <dt class="good_type">
                                <span class="typecheck checked" data-index=${obj[key][0].gtynum}></span>
                                <span class="type_name"><a href="">${key}</a></span>
                                <span class="mianyun"><i>!</i>已免运费</span>
                            </dt>`;
                for (var val of obj[key]) {
                    html += `<dd class="good_all clearfix" gid="${val.gid}">
                                <div class="good_check">
                                    <span class="onecheck checked" data-checked="false"></span>
                                </div>
                                <div class="good_img">
                                    <a href="detail.html?gid=${val.gid}"><img
                                            src="${val.imgurl}"
                                            alt=""></a>
                                </div>
                                <div class="good_tit"><a href="detail.html?gid=${val.gid}">${val.lititle}&nbsp;${val.gty.split('&').join('')}</a></div>
                               <div class="good_price"><span>￥${val.price}</span></div>
                                <div class="ast">
                                <div class="good_num" gid="${val.gid}">
                                    <input type="button" class="sub">
                                    <input type="tel" class="nums" value="${val.num}" kucun="${val.kucun}">
                                    <input type="button" class="add">
                                </div>
                                <div class="good_sum" date-price=${val.price*val.num}>￥${val.price*val.num}</div></div>
                                <div class="good_opt"><span class="delect"></span></div>
                            </dd>`;
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
    }
    new Shopcar();
});