$(function () {
    class List {
        constructor() {
            this.pagei = 1;
            this.isture = true;
            this.num = 0;
            this.init();
        }
        init() {
            this.require();
            this.scroo();
        }
        require() {
            $.ajax({
                type: 'get',
                url: './api/list.php',
                dataType: 'json',
                data: {
                    page: this.pagei,
                },
                success: str => {
                    this.crelist(str);
                },
            });
        }
        crelist(arr) {
            var html = '';
            for (var key in arr) {
                html += `<dl class="listgood_item clearfix">
                        <dt title="${key}">${key}</dt>`;
                for (var val of arr[key]) {
                    if (val.tejia) {
                        var dis = 'inline-block';
                    } else {
                        var dis = 'none';
                    }
                    html += `<dd><a href="detail.html?gid=${val.gid}">
                                <div class="gooditem_img">
                                    <img src="${val.imgurl}"
                                        alt="">
                                </div>
                                <div class="goods_pro">
                                    <p class="good_title">${val.lititle}</p>
                                    <p class="good_littitle">${val.title}</p>
                                    <p class="good_price">
                                        <span class="dao_fu">￥</span>
                                        <span class="good_num">${val.newprice}</span>
                                        <span class="pric_fla">起</span>
                                        <span class="price_tejia" style="display:${dis}">${val.tejia}</span>
                                    </p>
                                </div>
                            </a></dd>`;
                }
                html += `</dl>`;
                $(".typegoods_item").append(html);
                this.num = $(".typegoods_item").outerHeight() + $(".typegoods_item").offset().top - $(window).innerHeight();
                this.isture = true;
            }
        }

        scroo() {
            let _this = this;
            $(window).scroll(function () {
                if (_this.isture) {
                    if ($(window).scrollTop() >= _this.num) {
                        _this.isture = false;
                        _this.pagei++;
                        let timer = setInterval(() => {
                            _this.require();
                            clearInterval(timer);
                        }, 200);

                    }
                }
            });
        }
    }
    window.onload = function () {
        new List();
    }

})