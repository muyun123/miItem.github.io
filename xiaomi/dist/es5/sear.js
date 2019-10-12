'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var List = function () {
        function List() {
            _classCallCheck(this, List);

            this.pagei = 1;
            this.num = 0;
            this.n = '';
            this.n1 = '';
            this.n2 = '';
            this.keyword = decodeURI(location.search.split('?')[1].split('=')[1]);
            this.init();
        }

        _createClass(List, [{
            key: 'init',
            value: function init() {
                this.require();
                this.sear();
            }
        }, {
            key: 'sear',
            value: function sear() {
                var _this = this;
                $("#sort").click(function (ev) {
                    _this.n = $("#sort").val();
                    _this.init();
                });
                $("#btn3").click(function () {
                    _this.n1 = $("#num1").val();
                    _this.n2 = $("#num2").val();
                    _this.init();
                });
            }
        }, {
            key: 'require',
            value: function require() {
                var _this = this;
                $.ajax({
                    type: "get",
                    url: "./api/sear.php",
                    data: {
                        page: _this.pagei,
                        word: _this.keyword,
                        n: _this.n,
                        n1: _this.n1,
                        n2: _this.n2
                    },
                    success: function success(str) {
                        var arr = JSON.parse(str);
                        _this.crelist(arr);
                    }
                });
            }
        }, {
            key: 'crelist',
            value: function crelist(arr) {
                $("#mi_list .sear_res").html('\u4E3A\u60A8\u627E\u5230' + arr.length + '\u6761\u7ED3\u679C');
                var html = '';
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var val = _step.value;

                        html += '<dd><a href="detail.html?gid=' + val.gid + '">\n                                <div class="gooditem_img">\n                                    <img src="' + val.imgurl + '"\n                                        alt="">\n                                </div>\n                                <div class="goods_pro">\n                                    <p class="good_title">' + val.lititle + '</p>\n                                    <p class="good_price">\n                                        <span class="dao_fu">\uFFE5</span>\n                                        <span class="good_num">' + val.newprice + '</span>\n                                    </p>\n                                </div>\n                            </a></dd>';
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

                $(".listgood_item").html(html);
            }
        }]);

        return List;
    }();

    window.onload = function () {
        new List();
    };
});