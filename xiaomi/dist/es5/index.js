'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
    info();
    tuijian();
    var timer = '2020-09-28 20:00:00';
    var ttime = setInterval(timedown, 1000); //参数为年月日 时分秒 例：2019-09-28 20：00：00

    function info() {
        var _ref;

        var mySwiper1 = new Swiper('#swiper1', (_ref = {
            autoplay: true, //自动切换
            direction: 'horizontal', // 垂直切换选项
            loop: true }, _defineProperty(_ref, 'autoplay', {
            delay: 3000
        }), _defineProperty(_ref, 'pagination', {
            el: '.swiper-pagination'
        }), _defineProperty(_ref, 'navigation', {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }), _ref));
        mySwiper1.el.onmouseover = function () {
            mySwiper1.autoplay.stop();
        };
        mySwiper1.el.onmouseout = function () {
            mySwiper1.autoplay.start();
        };
        //限时抢购
        $.ajax({
            type: 'get',
            url: './api/xianshigou.json',
            dataType: 'json',
            success: function success(str) {
                limitime(str);
            }
        });
        //新品热门
        $.ajax({
            type: 'get',
            url: './api/xinpin.json',
            dataType: 'json',
            success: function success(str) {
                newgoods(str);
            }
        });

        function newgoods(str) {
            var str1 = str.xinpin;
            var str2 = str.hot;
            xuanr(str1, $(".e_new_goods .list_itme_c"));
            xuanr(str2, $(".e_hot_goods .list_itme_c"));
            mySwiper3.init();
            mySwiper4.init();
        }

        function xuanr(arr, ele) {
            for (var i in arr) {
                ele.append('<li class="swiper-slide"><a href="">\n                                <div class="small_img_item"><img\n                                        src="' + arr[i].img + '"\n                                        alt=""></div>\n                                <div class="title_price">\n                                    <p class="pro_info">' + arr[i].title + '</p>\n                                    <p class="pro_title">' + arr[i].littletitle + '</p>\n                                    <p class="pro_price">\n                                        <span>\uFFE5</span>\n                                        <span class="now_price">' + arr[i].price + '</span>\n                                        <span class="m_up">\u8D77</span>\n                                    </p>\n                                </div>\n                                <div class="color_sel">\n                                   ' + arr[i].selcolor + '\n                                </div>\n                            </a></li>');
                if (!arr[i].selcolor) {
                    ele.find(".color_sel").eq(i).css('display', 'none');
                } else {
                    ele.find(".color_sel").eq(i).css('display', 'block');
                }
            }
        }

        function limitime(str) {
            var html = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var val = _step.value;

                    html += '<li class="swiper-slide"><a href="">\n                                    <div class="small_img_item"><img\n                                       src="' + val.img + '"\n                                             alt=""></div>\n                                                <div class="title_price">\n                                                   <p class="pro_info">' + val.title + '</p>\n                                                    <p class="pro_price">\n                                                   <span>\uFFE5</span>\n                                                    <span class="now_price">' + val.newprice + '</span>\n                                                    <span class="m_up"></span>\n                                                    <span class="old_price">\n                                                    <span>\uFFE5</span>\n                                                     <span class="old_num">' + val.oldprice + '</span>\n                                                    </span>\n                                                    </p>\n                                                   </div>\n                            </a></li>';
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

            ;
            $(".c_contenter_are .list_itme_b").append(html);
            $(".c_contenter_are .list_itme_b").css("width", ($(".c_contenter_are .list_itme_b li:first").outerWidth() + 5) * $(".c_contenter_are .list_itme_b li").length);
            mySwiper2.init();
        }

        var mySwiper2 = new Swiper('#swiper2', {
            init: false,
            // observer: true,
            direction: 'horizontal', // 垂直切换选项    
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                disabledClass: 'my-button-disabled'
            }
        });
        var mySwiper3 = new Swiper('.swiper-container1', {
            init: false,
            // observer: true,
            direction: 'horizontal', // 垂直切换选项    
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                disabledClass: 'my-button-disabled'
            }
        });
        var mySwiper4 = new Swiper('.swiper-container2', {
            init: false,
            // observer: true,
            direction: 'horizontal', // 垂直切换选项    
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                disabledClass: 'my-button-disabled'
            }
        });
    }

    function timedown() {
        //到时时间转毫秒
        var daoshi = new Date(timer);
        var timers = Date.parse(timer);
        var timernow = Date.now();
        var timerdif = (timers - timernow) / 1000;
        var second = Math.floor(timerdif % 60);
        var mintus = Math.floor(timerdif / 60 % 60);
        var hour = Math.floor(timerdif / 60 / 60);
        $(".main_cotenter_bar .target_time").html(zoon(daoshi.getHours()) + ':' + zoon(daoshi.getMinutes()) + '场');
        $(".main_cotenter_bar .hour").html(zoon(hour));
        $(".main_cotenter_bar .mintus").html(zoon(mintus));
        $(".main_cotenter_bar .second").html(zoon(second));
        // console.log(zoon(hour), zoon(mintus), zoon(second));
        if (second == 0 && mintus == 0 && hour) {
            clearInterval(ttime);
        }

        function zoon(tt) {
            if (tt < 10) {
                return '0' + String(tt);
            } else {
                return tt;
            }
        }
    }

    function tuijian() {
        //推荐
        $.ajax({
            type: 'get',
            url: './api/tuijian.json',
            dataType: 'json',
            success: function success(str) {
                newgoods(str);
            }
        });

        function newgoods(arr) {
            for (var i in arr) {
                $(".re_commend .list_item_tuijian").append('<li><a href="">\n                                <div class="small_img_item"><img\n                                        src = "' + arr[i].img + '"\n                                        alt=""></div>\n                                <div class="small_img_intro">\n                                    <p class="pro_title">' + arr[i].littletitle + '</p>\n                                </div>\n                                <div class="title_price">\n                                    <p class="m-goods-common-tag-con">\n                                        <span class="common-tag">' + arr[i].jiajiagou + '</span>\n                                    </p>\n                                    <p class="pro_info">' + arr[i].title + '</p>\n\n                                    <p class="pro_price">\n                                        <span>\uFFE5</span>\n                                        <span class="now_price">' + arr[i].price + '</span>\n                                        <span class="m_up">\u8D77</span>\n                                    </p>\n                                </div>\n                                <div class="color_sel">\n                                    ' + arr[i].selcolor + '\n                                </div>\n                            </a></li>');
                if (!arr[i].jiajiagou) {
                    $(".re_commend .list_item_tuijian").find(".common-tag").eq(i).css('visibility', 'hidden');
                } else {
                    $(".re_commend .list_item_tuijian").find(".common-tag").eq(i).css('visibility', 'unset');
                }
                if (!arr[i].selcolor) {
                    $(".re_commend .list_item_tuijian").find(".color_sel").eq(i).css('visibility', 'hidden');
                } else {
                    $(".re_commend .list_item_tuijian").find(".color_sel").eq(i).css('visibility', 'unset');
                }
            }
        }
    }
})();