'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var List = function () {
        function List() {
            _classCallCheck(this, List);

            this.pagei = 1;
            this.isture = true;
            this.num = 0;
            this.init();
        }

        _createClass(List, [{
            key: 'init',
            value: function init() {
                this.require();
                this.scroo();
            }
        }, {
            key: 'require',
            value: function require() {
                var _this2 = this;

                $.ajax({
                    type: 'get',
                    url: './api/list.php',
                    dataType: 'json',
                    data: {
                        page: this.pagei
                    },
                    success: function success(str) {
                        _this2.crelist(str);
                    }
                });
            }
        }, {
            key: 'crelist',
            value: function crelist(arr) {
                var html = '';
                for (var key in arr) {
                    html += '<dl class="listgood_item clearfix">\n                        <dt title="' + key + '">' + key + '</dt>';
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = arr[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var val = _step.value;

                            if (val.tejia) {
                                var dis = 'inline-block';
                            } else {
                                var dis = 'none';
                            }
                            html += '<dd><a href="detail.html?gid=' + val.gid + '">\n                                <div class="gooditem_img">\n                                    <img src="' + val.imgurl + '"\n                                        alt="">\n                                </div>\n                                <div class="goods_pro">\n                                    <p class="good_title">' + val.lititle + '</p>\n                                    <p class="good_littitle">' + val.title + '</p>\n                                    <p class="good_price">\n                                        <span class="dao_fu">\uFFE5</span>\n                                        <span class="good_num">' + val.newprice + '</span>\n                                        <span class="pric_fla">\u8D77</span>\n                                        <span class="price_tejia" style="display:' + dis + '">' + val.tejia + '</span>\n                                    </p>\n                                </div>\n                            </a></dd>';
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

                    html += '</dl>';
                    $(".typegoods_item").append(html);
                    this.num = $(".typegoods_item").outerHeight() + $(".typegoods_item").offset().top - $(window).innerHeight();
                    this.isture = true;
                }
            }
        }, {
            key: 'scroo',
            value: function scroo() {
                var _this = this;
                $(window).scroll(function () {
                    if (_this.isture) {
                        if ($(window).scrollTop() >= _this.num) {
                            _this.isture = false;
                            _this.pagei++;
                            var timer = setInterval(function () {
                                _this.require();
                                clearInterval(timer);
                            }, 200);
                        }
                    }
                });
            }
        }]);

        return List;
    }();

    window.onload = function () {
        new List();
    };
});