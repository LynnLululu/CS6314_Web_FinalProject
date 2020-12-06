var stateData = 
    '<option value="AL">AL</option>\n' +
    '<option value="AK">AK</option>\n' +
    '<option value="AZ">AZ</option>\n' +
    '<option value="AR">AR</option>\n' +
    '<option value="CA">CA</option>\n' +
    '<option value="CO">CO</option>\n' +
    '<option value="CT">CT</option>\n' +
    '<option value="DE">DE</option>\n' +
    '<option value="FL">FL</option>\n' +
    '<option value="GA">GA</option>\n' +
    '<option value="HI">HI</option>\n' +
    '<option value="ID">ID</option>\n' +
    '<option value="IL">IL</option>\n' +
    '<option value="IN">IN</option>\n' +
    '<option value="IA">IA</option>\n' +
    '<option value="KS">KS</option>\n' +
    '<option value="KY">KY</option>\n' +
    '<option value="LA">LA</option>\n' +
    '<option value="ME">ME</option>\n' +
    '<option value="MD">MD</option>\n' +
    '<option value="MA">MA</option>\n' +
    '<option value="MI">MI</option>\n' +
    '<option value="MN">MN</option>\n' +
    '<option value="MS">MS</option>\n' +
    '<option value="MO">MO</option>\n' +
    '<option value="MT">MT</option>\n' +
    '<option value="NE">NE</option>\n' +
    '<option value="NV">NV</option>\n' +
    '<option value="NH">NH</option>\n' +
    '<option value="NJ">NJ</option>\n' +
    '<option value="NM">NM</option>\n' +
    '<option value="NY">NY</option>\n' +
    '<option value="NC">NC</option>\n' +
    '<option value="ND">ND</option>\n' +
    '<option value="OH">OH</option>\n' +
    '<option value="OK">OK</option>\n' +
    '<option value="OR">OR</option>\n' +
    '<option value="PA">PA</option>\n' +
    '<option value="RI">RI</option>\n' +
    '<option value="SC">SC</option>\n' +
    '<option value="SD">SD</option>\n' +
    '<option value="TN">TN</option>\n' +
    '<option value="TX">TX</option>\n' +
    '<option value="UT">UT</option>\n' +
    '<option value="VT">VT</option>\n' +
    '<option value="VA">VA</option>\n' +
    '<option value="WA">WA</option>\n' +
    '<option value="WV">WV</option>\n' +
    '<option value="WI">WI</option>\n' +
    '<option value="WY">WY</option>';
var noData = '<option value="" selected="">-Select-</option>';

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "jquery.validate.min"], a) : a(jQuery)
}(function (a) {
    var icon = "<i class='fa fa-times-circle'></i>  ";
    a.extend(a.validator.messages, {
        required: icon + "This field is required",
        remote: icon + "Please modify this field",
        email: icon + "Please enter a valid email",
        url: icon + "lease enter a valid URL",
        date: icon + "Please enter a valid date",
        dateISO: icon + "Please enter a valid date (YYYY-MM-DD)",
        number: icon + "Please enter correct number",
        digits: icon + "Number only",
        creditcard: icon + "Please enter a valid card number",
        equalTo: icon + "The two inputs are different",
        extension: icon + "Please enter a valid extension",
        maxlength: a.validator.format(icon + "Maxmum of 0 charater"),
        minlength: a.validator.format(icon + "Minmum of 0 charater"),
        rangelength: a.validator.format(icon + "Please enter a string of length 0 to 1"),
        range: a.validator.format(icon + "Please enter a value between 0 and 1"),
        max: a.validator.format(icon + "Please enter a value not greater than 0"),
        min: a.validator.format(icon + "Please enter a value not less than 0")
    });
    $.validator.addMethod("mm",function(value,element,params){
        var mm = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return this.optional(element)||(mm.test(value));
    },"<i class='fa fa-times-circle'></i>  Must contain a combination of upper and lower case letters and numbers!");
    $.validator.addMethod("username",function(value,element,params){
        var username = /^[A-Za-z0-9]+$/;
        return this.optional(element)||(username.test(value));
    },"<i class='fa fa-times-circle'></i>  User names can only contain letters and numbers!");
    $.validator.addMethod("phone",function(value,element,params){
        var mobilereg1 = /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/;
        value = value.replace(/\s/g, "");
        return this.optional(element) || mobilereg1.test(value);
    },"<i class='fa fa-times-circle'></i>  Please enter a valid phone number");
    $.validator.addMethod("cardNumber",function(value,element,params){
        var b = false;
        $.ajax({
            url: "https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=" + value.replace(/\s/g,''),
            async: false,
            success: function (data) {
                b = data.validated;
            }
        });
        return this.optional(element) || b;
    },"<i class='fa fa-times-circle'></i>  Please enter a valid card number");
});

$(function () {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#informationForm").validate({
        rules: {
            infoEmail: {
                required: true,
                email: true,
            },
            infoPwd: {
                required: true,
                minlength: 6,
                mm: true
            },
            dateOfBirth: {
                required: true,
            },
            infoState: {
                required: true,
            },
            infoCity: {
                required: true,
            },
            infoZip: {
                required: true,
            }
        },
        messages: {
            infoEmail: {
                required: icon + "Please enter your Email",
                remote: "Email already exists"
            },
            infoPwd: {
                required: icon + "Please enter your Password",
                minlength: icon + "Minimum of 6 characters"
            },
            dateOfBirth: {
                required: icon + "Please enter your Date of Birth",
            },
            infoState: {
                required: icon + "Please enter your State",
            },
            infoCity: {
                required: icon + "Please enter your City",
            },
            infoZip: {
                required: icon + "Please enter your Zip Code",
            }
        }
    });
    $("#cardForm").validate({
        rules: {
            cardNumber: {
                required: true,
                cardNumber: true
            },
            expirationDate: {
                required: true,
            },
            securityCode: {
                required: true,
                minlength: 3,
                maxlength: 4
            }
        },
        messages: {
            cardNumber: {
                required: icon + "Please enter your Card Number",
                cardNumber: icon + "Please enter a valid Card Number",
            },
            expirationDate: {
                required: icon + "Please enter the Expiration Date",
            },
            securityCode: {
                required: icon + "Please enter the Security Code",
                minlength: icon + "Minimum of 3 characters",
                maxlength: icon + "Maximum of 4 characters",
            }
        }
    });
    $("#deliveryForm").validate({
        rules: {
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            },
            streetAddress: {
                required: true,
            },
            infoState: {
                required: true,
            },
            infoCity: {
                required: true,
            },
            infoZip: {
                required: true,
                maxlength: 5
            },
            phoneNumber: {
                required: true,
                phone: true,
                maxlength: 12
            }
        },
        messages: {
            firstName: {
                required: icon + "Please enter your First Name",
            },
            lastName: {
                required: icon + "Please enter your Last Name",
            },
            streetAddress: {
                required: icon + "Please enter your Address",
            },
            infoState: {
                required: icon + "Please enter your State",
            },
            infoCity: {
                required: icon + "Please enter your City",
            },
            infoZip: {
                required: icon + "Please enter your Zip",
                maxlength: icon + "Maximum of 5 characters"
            },
            phoneNumber: {
                required: icon + "Please enter your Phone Number",
                maxlength: icon + "Maximum of 10 characters"
            }
        }
    });

    // handle password changing
    $("#pwd-edit").on("click", function () {
        $("#infoPwd").prop("disabled", false);
        $("#pwd-edit").hide();
        $("#pwd-save").show();        
    });

    $("#pwd-save").on("click", function(){
        $("#infoPwd").prop("disabled", true);
        $("#pwd-edit").show();
        $("#pwd-save").hide();
        var newPwd = $("#infoPwd").val();
        console.log(newPwd);
        $.post("/users/update/password", {newPwd: newPwd})  
    })

    // handle username changing
    

    $("#infoCountry").html(countryData);
    $("#infoCountry").on("change", function () {
        var ss = $("#infoCountry").val();
        if (ss == "US") {
            $("#infoState").html(noData + stateData);
        } else {
            $("#infoState").html('<option value="" selected="">-No Data-</option>');
        }
    });
    $("#infoCountry1").html(countryData);
    $("#infoCountry1").on("change", function () {
        var ss = $("#infoCountry1").val();
        if (ss == "US") {
            $("#infoState1").html(noData + stateData);
        } else {
            $("#infoState1").html('<option value="" selected="">-No Data-</option>');
        }
    });
    $('#dateOfBirth').datepicker({
        autoclose: true,  // Select and close automatically
        clearBtn: true,   // button for clear
        format: "mm/dd/yyyy" // form of date
    });
    $("#infoState").html(noData + stateData);
    $("#infoState1").html(noData + stateData);
});
//  Account Details
function saveUserInfo() {
    if(!$("#informationForm").valid()){
        return;
    }

    var infoEmail = $("input[name='infoEmail']").val();
    var infoPwd = $("input[name='infoPwd']").val();
    var dateOfBirth = $("input[name='dateOfBirth']").val();
    var infoState = $("input[name='infoState']").val();
    var infoCity = $("input[name='infoCity']").val();
    var infoZip = $("input[name='infoZip']").val();

   // alert("save successful！");

    $.ajax({
        type: "POST",
        url: "users/update/account", // Save user information
        data: {
            "infoZip": infoZip,
            "infoCity": infoCity,
            "infoState": infoState,
            "dateOfBirth": dateOfBirth,
            "infoPwd": infoPwd,
            "infoEmail": infoEmail,
        },
        success: function(r) {
            if (r.code == 200) {
                alert("Save successful!");
            } else {
                alert("Fail to save");
            }
        }
    });
}
// Payment Methods
function saveCardInfo() {
    if(!$("#cardForm").valid()){
        return;
    }
    var cardNumber = $("input[name='cardNumber']").val();
    var expirationDate = $("input[name='expirationDate']").val();
    var securityCode = $("input[name='securityCode']").val();
    $.ajax({
        type: "POST",
        url: "/user/saveCard", // Save credit card information
        data: {
            "cardNumber": cardNumber.replace(/\s/g,''),
            "expirationDate": expirationDate,
            "securityCode": securityCode,
        },
        success: function(r) {
            if (r.code == 200) {
                alert("Save successful!");
            } else {
                alert("Fail to save");
            }
        }
    });
}
// Delivery Addresses
function saveDeliveryInfo() {
    if(!$("#deliveryForm").valid()){
        return;
    }
    var firstName = $("input[name='firstName']").val();
    var lastName = $("input[name='lastName']").val();
    var streetAddress = $("input[name='streetAddress']").val();
    var infoState = $("input[name='infoState']").val();
    var infoCity = $("input[name='infoCity']").val();
    var infoZip = $("input[name='infoZip']").val();
    var phoneNumber = $("input[name='phoneNumber']").val();
    $.ajax({
        type: "POST",
        url: "/user/saveDelivery", // Save the informatio of delivery address
        data: {
            "infoZip": infoZip,
            "infoCity": infoCity,
            "infoState": infoState,
            "streetAddress": streetAddress,
            "lastName": lastName,
            "firstName": firstName,
            "phoneNumber": phoneNumber.replace(/\s/g, ""),
        },
        success: function(r) {
            if (r.code == 200) {
                alert("Save successful!");
            } else {
                alert("Fail to save");
            }
        }
    });
}

function tabCk(id, thzz) {
    $(".tab-form").hide();
    $("#" + id).show();
    $(".nav-link-c").removeClass("active");
    $(thzz).addClass("active");
    if(id == 'informationForm') {
        $(".content-title").html("Account Details");
    } else if(id == 'cardForm') {
        $(".content-title").html("Payment Methods");
    } else if(id == 'deliveryForm') {
        $(".content-title").html("Delivery Addresses");
    }
}
function phone(tz) {
    console.log(tz);
    var $ph = $(tz);
    var vs = $ph.val().replace(/\s/g, "").split("");
    var ret = "";
    for (var i = 0; i < vs.length; i++) {
        var v = vs[i];
        if (/^\d+$/.test(v)) {
            ret += v;
            if (i < 8) {
                if (i == 2) {
                    ret += " ";
                } else if (i == 5) {
                    ret += " ";
                }
            }
        }
    }
    $ph.val(ret);
    return ret;
}
function formatBankNo(BankNo) {
    var id = BankNo.id;
    BankNo = $("#" + BankNo.id).val();
    if(BankNo == "") return;
    var account = new String(BankNo);
    account = account.substring(0, 22); 
    if(account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
        
        if(account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
            ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
            var accountNumeric = accountChar = "",
                i;
            for(i = 0; i < account.length; i++) {
                accountChar = account.substr(i, 1);
                if(!isNaN(accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for(i = 0; i < accountNumeric.length; i++) {
                if(i == 4) account = account + " ";
                if(i == 8) account = account + " ";
                if(i == 12) account = account + " ";
                account = account + accountNumeric.substr(i, 1)
            }
        }
    } else {
        account = " " + account.substring(1, 5) + " " + account.substring(6, 10) + " " + account.substring(14, 18) + "-" + account.substring(18, 25);
    }
    $("#" + id).val(account);
    return account;
}
function formatDate(BankNo) {
    var id = BankNo.id;
    BankNo = $("#" + BankNo.id).val();
    if(BankNo == "") return;
    var account = new String(BankNo);
    account = account.replace(" / ", "").substring(0, 4);
    if(account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
        
        if(account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
            ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
            var accountNumeric = accountChar = "",
                i;
            for(i = 0; i < account.length; i++) {
                accountChar = account.substr(i, 1);
                if(!isNaN(accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for(i = 0; i < accountNumeric.length; i++) { 
                if(i == 2) account = account + " / "; 
                account = account + accountNumeric.substr(i, 1)
            }
        }
    } else {
        account = account.substring(1, 2) + " / " + account.substring(2, account.length);
    }
    $("#" + id).val(account);
    return account;
}
