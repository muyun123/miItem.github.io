(function () {
    info();
    tuijian();
    var timer = '2020-09-28 20:00:00';
    var ttime = setInterval(timedown, 1000); //参数为年月日 时分秒 例：2019-09-28 20：00：00

    function info() {
        var mySwiper1 = new Swiper('#swiper1', {
            autoplay: true, //自动切换
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
                delay: 3000,
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        mySwiper1.el.onmouseover = function () {
            mySwiper1.autoplay.stop();
        }
        mySwiper1.el.onmouseout = function () {
            mySwiper1.autoplay.start();
        }
        //限时抢购
        $.ajax({
            type: 'get',
            url: './api/xianshigou.json',
            dataType: 'json',
            success: str => {
                limitime(str);
            }
        });
        //新品热门
        $.ajax({
            type: 'get',
            url: './api/xinpin.json',
            dataType: 'json',
            success: str => {
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
                ele.append(`<li class="swiper-slide"><a href="">
                                <div class="small_img_item"><img
                                        src="${arr[i].img}"
                                        alt=""></div>
                                <div class="title_price">
                                    <p class="pro_info">${arr[i].title}</p>
                                    <p class="pro_title">${arr[i].littletitle}</p>
                                    <p class="pro_price">
                                        <span>￥</span>
                                        <span class="now_price">${arr[i].price}</span>
                                        <span class="m_up">起</span>
                                    </p>
                                </div>
                                <div class="color_sel">
                                   ${arr[i].selcolor}
                                </div>
                            </a></li>`);
                if (!arr[i].selcolor) {
                    ele.find(".color_sel").eq(i).css('display', 'none');
                } else {
                    ele.find(".color_sel").eq(i).css('display', 'block');
                }
            }

        }


        function limitime(str) {
            var html = '';
            for (var val of str) {
                html += `<li class="swiper-slide"><a href="">
                                    <div class="small_img_item"><img
                                       src="${val.img}"
                                             alt=""></div>
                                                <div class="title_price">
                                                   <p class="pro_info">${val.title}</p>
                                                    <p class="pro_price">
                                                   <span>￥</span>
                                                    <span class="now_price">${val.newprice}</span>
                                                    <span class="m_up"></span>
                                                    <span class="old_price">
                                                    <span>￥</span>
                                                     <span class="old_num">${val.oldprice}</span>
                                                    </span>
                                                    </p>
                                                   </div>
                            </a></li>`

            };
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
                disabledClass: 'my-button-disabled',
            },
        });
        var mySwiper3 = new Swiper('.swiper-container1', {
            init: false,
            // observer: true,
            direction: 'horizontal', // 垂直切换选项    
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                disabledClass: 'my-button-disabled',
            },
        });
        var mySwiper4 = new Swiper('.swiper-container2', {
            init: false,
            // observer: true,
            direction: 'horizontal', // 垂直切换选项    
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                disabledClass: 'my-button-disabled',
            },
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
            success: str => {
                newgoods(str);
            }
        });

        function newgoods(arr) {
            for (var i in arr) {
                $(".re_commend .list_item_tuijian").append(`<li><a href="">
                                <div class="small_img_item"><img
                                        src = "${arr[i].img}"
                                        alt=""></div>
                                <div class="small_img_intro">
                                    <p class="pro_title">${arr[i].littletitle}</p>
                                </div>
                                <div class="title_price">
                                    <p class="m-goods-common-tag-con">
                                        <span class="common-tag">${arr[i].jiajiagou}</span>
                                    </p>
                                    <p class="pro_info">${arr[i].title}</p>

                                    <p class="pro_price">
                                        <span>￥</span>
                                        <span class="now_price">${arr[i].price}</span>
                                        <span class="m_up">起</span>
                                    </p>
                                </div>
                                <div class="color_sel">
                                    ${arr[i].selcolor}
                                </div>
                            </a></li>`);
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