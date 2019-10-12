'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var Lgin = function () {
        function Lgin() {
            _classCallCheck(this, Lgin);

            this.password = '';
            this.username = '';
            this.ptrue = false;
            this.utrue = false;
            this.init();
        }

        _createClass(Lgin, [{
            key: 'init',
            value: function init() {
                this.submit();
            }
        }, {
            key: 'submit',
            value: function submit() {
                var _this = this;
                $(".login-inp .btn").click(function () {
                    _this.password = $(".login-inp .password").val().trim();
                    _this.username = $(".login-inp .username").val().trim();
                    if (!_this.password) {
                        var erro = '请输入密码';
                        $(".erro_tip").css('display', 'block');
                        $(".erro_tip span").html(erro);
                        _this.ptrue = false;
                    } else if (!_this.username) {
                        var erro = '请输入账号';
                        $(".erro_tip").css('display', 'block');
                        $(".erro_tip span").html(erro);
                        _this.utrue = false;
                    } else {
                        $(".erro_tip").css('display', 'none');
                        _this.ptrue = true;
                        _this.utrue = true;
                    }
                    $(".login-inp .password").on('input', function (e) {
                        $(".erro_tip").css('display', 'none');
                    });
                    $(".login-inp .username").on('input', function (e) {
                        $(".erro_tip").css('display', 'none');
                    });
                    if (_this.ptrue && _this.utrue) {
                        $.ajax({
                            type: "get",
                            url: "./api/login.php",
                            data: {
                                username: _this.username,
                                password: _this.password
                            },
                            success: function success(str) {
                                var arr = JSON.parse(str);
                                _this.iflog(arr);
                            }
                        });
                    }
                });
            }
        }, {
            key: 'iflog',
            value: function iflog(arr) {
                if (!arr['res']) {
                    $(".erro_tip").css('display', 'block');
                    $(".erro_tip span").html(arr['txt']);
                } else {
                    $(".erro_tip").css('display', 'none');
                    location.href = this.getcookie('url');
                    this.setcookie('user', arr['date']['user'], 3);
                    this.setcookie('uid', arr['date']['uid'], 3);
                }
            }
        }, {
            key: 'setcookie',
            value: function setcookie(key, val, iday) {
                var now = new Date();
                now.setDate(now.getDate() + iday);
                document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
            }
        }, {
            key: 'removeCookie',
            value: function removeCookie(key) {
                setcookie(key, '', -1);
            }
        }, {
            key: 'getcookie',
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
                            if (arr2[2]) {
                                return arr2[1] + '=' + arr2[2];
                            } else {
                                return arr2[1];
                            }
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
        }]);

        return Lgin;
    }();

    new Lgin();
});