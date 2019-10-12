$(() => {
    class Lgin {
        constructor() {
            this.password = '';
            this.username = '';
            this.ptrue = false;
            this.utrue = false;
            this.init();
        }
        init() {
            this.submit();

        }
        submit() {
            var _this = this;
            $(".login-inp .btn").click(function () {
                _this.password = ($(".login-inp .password").val().trim());
                _this.username = ($(".login-inp .username").val().trim());
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
                        success: function (str) {
                            let arr = JSON.parse(str);
                            _this.iflog(arr);
                        }
                    });
                }
            });
        }
        iflog(arr) {
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
        setcookie(key, val, iday) {
            let now = new Date();
            now.setDate(now.getDate() + iday);
            document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
        }
        removeCookie(key) {
            setcookie(key, '', -1);
        }
        getcookie(key) {
            let str = document.cookie;
            let arr = str.split('; ');
            for (let item of arr) {
                let arr2 = item.split('=');
                if (key == arr2[0]) {
                    if (arr2[2]) {
                        return arr2[1] + '=' + arr2[2];
                    } else {
                        return arr2[1];
                    }
                }
            }
        }
    }
    new Lgin();
});