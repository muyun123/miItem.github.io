$(function () {
    class Counreg {
        constructor() {
            //属性
            this.regtxt = ['手机号码格式错误', '请输入手机号码', '验证码错误', '两个密码不正确', '密码格式错误'];
            this.ifphonenum = false;
            this.ifregcode = false;
            this.phonenum = 0;
            this.password = 0;
            this.init();
        }
        init() {
            $(".erro_tip").css('display', 'none');
            this.Rphonenum();
        }
        //手机号码验证
        Rphonenum() {
            let _this = this;
            $("#phonenum").blur(function (e) {
                let num = $("#phonenum").val();
                if (!num.trim()) {
                    //手机号不能为空
                    _this.Iferror(1);
                } else if (!_this.reg('phonenum', num)) {
                    //手机号格式错误
                    _this.Iferror(0);
                } else {
                    $("#phonenum").removeClass('acterr');
                    $(".erro_tip").css('display', 'none');
                    _this.ifphonenum = true;
                }
            })
            $("#phonenum").on('input', function (e) {
                $("#phonenum").removeClass('acterr');
                $(".erro_tip").css('display', 'none');
            });
            $("#btn1").click(function (e) {
                //手机号格式都正确
                if (_this.ifphonenum) {
                    _this.phonenum = $("#phonenum").val();
                    _this.regcode();

                }
            });

        }
        //验证码验证注册
        regcode() {
            let _this = this;
            $(".first_step").css('display', 'none');
            $(".second_step").css('display', 'block');
            //输入的验证码是否正确
            $(".down_step .down_btn").click(function () {
                if ($(".input_if .if_num").val().trim()) {
                    $(".erro_tip").css('display', 'none');
                    _this.setpassword()
                } else {
                    $(".second_step .erro_tip").css('display', 'block');
                    $(".second_step .erro_tip span").html(_this.regtxt[2]);
                }
            })
            $(".input_if .if_num").on('input', function () {
                $(".second_step .erro_tip").css('display', 'none');
            });
        }
        //设置密码
        setpassword() {
            let _this = this;
            $(".second_step").css('display', 'none');
            $(".third").css('display', 'block');
            $(".third .password1 .if_num").blur(function () {
                let num = $(".third .password1 .if_num").val();
                if (!_this.reg('password', num)) {
                    $(".third .erro_tip").css('display', 'block');
                    $(".third .erro_tip span").html(_this.regtxt[4]);
                } else {
                    $(".third .erro_tip").css('display', 'none');
                    $(".third .down_step .down_btn").click(function () {
                        if ($(".third .password1 .if_num").val().trim() == $(".third .input_if .res_num").val().trim()) {
                            $(".third .erro_tip").css('display', 'none');
                            _this.password = $(".third .password1 .if_num").val().trim();
                            _this.reglast();
                        } else {
                            $(".third .erro_tip").css('display', 'block');
                            $(".third .erro_tip span").html(_this.regtxt[3]);
                        }
                    })
                }
            });



        }
        //账号存在判断是否是本人注册
        regtrue() {
            $(".third").css('display', 'none');
            $(".reg_true").css('display', 'block');

        }
        //注册完成
        reglast() {
            let _this = this;
            $.ajax({
                type: "post",
                url: "./api/zuce.php",
                data: {
                    phonenum: _this.phonenum,
                    password: _this.password
                },
                success: function (str) {
                    var arr = JSON.parse(str);
                    $(".reg_last .addr-place").html(arr[0].uid);
                }
            });
            $(".third").css('display', 'none');
            $(".reg_last").css('display', 'block');
            $(".reg_last .down_btn").click(function () {
                location.href = "login.html";
            });
        }
        Iferror(num) {
            $("#phonenum").addClass('acterr');
            $(".erro_tip").css('display', 'block');
            $(".erro_tip span").html(this.regtxt[num]);
            this.ifphonenum = false;
        }
        //正则验证
        reg(str, ele) {
            switch (str) {
                case 'phonenum':
                    var reg = /1[3-9]\d{9}/;
                    break;
                case 'password':
                    var reg = /(?!^([0-9]+|[a-zA-Z]+|[!#*_]+)$)^[a-zA-Z0-9!#*_]{8,20}$/;
                    break;
            }
            return reg.test(ele);
        }
    }
    new Counreg();
});