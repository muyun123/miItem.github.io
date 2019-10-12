$(function () {
    class List {
        constructor() {
            this.pagei = 1;
            this.num = 0;
            this.n = '';
            this.n1 = '';
            this.n2 = '';
            this.keyword = decodeURI(location.search.split('?')[1].split('=')[1]);
            this.init();
        }
        init() {
            this.require();
            this.sear()
        }
        sear() {
            var _this = this;
            $("#sort").click(function (ev) {
                _this.n = $("#sort").val();
                _this.init();
            })
            $("#btn3").click(function () {
                _this.n1 = $("#num1").val();
                _this.n2 = $("#num2").val();
                _this.init();
            })

        }
        require() {
            var _this = this;
            $.ajax({
                type: "get",
                url: "./api/sear.php",
                data: {
                    page: _this.pagei,
                    word: _this.keyword,
                    n: _this.n,
                    n1: _this.n1,
                    n2: _this.n2,
                },
                success: function (str) {
                    var arr = JSON.parse(str);
                    _this.crelist(arr);
                }
            });
        }
        crelist(arr) {
            $("#mi_list .sear_res").html(`为您找到${arr.length}条结果`);
            var html = '';
            for (var val of arr) {
                html += `<dd><a href="detail.html?gid=${val.gid}">
                                <div class="gooditem_img">
                                    <img src="${val.imgurl}"
                                        alt="">
                                </div>
                                <div class="goods_pro">
                                    <p class="good_title">${val.lititle}</p>
                                    <p class="good_price">
                                        <span class="dao_fu">￥</span>
                                        <span class="good_num">${val.newprice}</span>
                                    </p>
                                </div>
                            </a></dd>`;
            }
            $(".listgood_item").html(html);
        }

    }
    window.onload = function () {
        new List();
    }

})