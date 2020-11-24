! function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "jquery.validate.min"], a) : a(jQuery)
}(function (a) {
    var icon = "<i class='fa fa-times-circle'></i>  ";
    a.extend(a.validator.messages, {
        email: icon + "Please enter a valid email address.",
        min: a.validator.format(icon + "please enter value no less than {0}")
    })
});

$(function() {
    validateRule();
});

$.validator.setDefaults({
    submitHandler: function() {
        register();
    }
});
$.validator.addMethod("mm",function(value,element,params){
    var mm = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return this.optional(element)||(mm.test(value));
},"<i class='fa fa-times-circle'></i>  Password requires uppercase letter, lowercase letter and number.");
$.validator.addMethod("username",function(value,element,params){
    var username = /^[A-Za-z0-9]+$/;
    return this.optional(element)||(username.test(value));
},"<i class='fa fa-times-circle'></i> User name can only contain letter and number.");

function register() {
    var email = $("input[name='email']").val();
    var userName = $("input[name='userName']").val();
    var pwd = $("input[name='pwd']").val();
    var pwdC = $("input[name='pwdC']").val();
    alert("Registered successful!");
    
    $.ajax({
        type: "POST",
        url: "/users/signup",
        data: {
            "email": email,
            "userName": userName,
            "pwd": pwd,
        },
        success: function(r) {
            if (r.code == 200) {
                alert("注册成功！");
                $("#exampleModal").modal('toggle');
            } else {

            }
        }
    });

}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            email: {
                required: true,
                email: true,
                remote: {
                    url: "./data/checkEmail.json",
                    // url: "/user/checkEmail/" + $("input[name='email']").val(),
                    type: "get",
                }
            },
            userName: {
                required: true,
                username: true,
                remote: {
                    url: "./data/checkUsername.json",
                    // url: "/user/checkUsername" + $("input[name='userName']").val(),
                    type: "get",
                }
            },
            pwd: {
                required: true,
                minlength: 6,
                mm: true
            },
            pwdC: {
                required: true,
                equalTo: "[name='pwd']"
            }
        },
        messages: {
            email: {
                required: icon + "Please enter your email address.",
                remote: "Email already exists."
            },
            userName: {
                required: icon + "Please enter a user name.",
                remote: "User name already exists."
            },
            pwd: {
                required: icon + "Please enter a password.",
                minlength: icon + "Minimum of 6 characters."
            },
            pwdC: {
                required: icon + "Please confirm your password.",
                equalTo: icon + "Two password inputs are inconsistent."
            }
        }
    });
    $("#sign").validate({
        rules: {
            emailx: {
                required: true,
                email: true,
            }
        },
        messages: {
            emailx: {
                required: icon + "Please enter your email address.",
                remote: "Email already exists."
            }
        }
    })
}
function login() {
    var email = $("input[name='emailx']").val();
    var pwd = $("input[name='pwdx']").val();
    if (pwd.length < 3 || email.length < 3) {
        alert("User name or password is wrong.");
        return;
    }

    // if (email == "99@qq.com" && pwd == "Qqq123456") {
    //     alert("Login successful!");
    //     $("#exampleModal").modal('toggle');
    //     $("#sign-txt1").hide();
    //     $("#sign-txt2").html(' <i class="fas fa-user ml-2 mr-2"></i> admin');
    //     $("#sign-txt2").show();
    // } else {
    //     alert("User name or password is wrong.");

    // }
    
    $.ajax({
        type: "POST",
        url: "/users/signin",
        data: {
            "emailx": email,
            "pwdx": pwd,
        },
        success: function(r) {
            if (r.code == 200) {
                alert("登录成功！");
                $("#exampleModal").modal('toggle');
                $("#sign-txt1").hide();
                $("#sign-txt2").html(' <i class="fas fa-user ml-2 mr-2"></i>' + r.data);
                $("#sign-txt2").show();
            } else {
                alert("用户名或者密码错误！");
            }
        }
    });
}
function logout() {
    $.ajax({
        type: "POST",
        url: "/users/signout",
    });
}