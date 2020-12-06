var stateData = 
    '<option value="Alabama">Alabama</option>\n' +
    '<option value="Alaska">Alaska</option>\n' +
    '<option value="Arizona">Arizona</option>\n' +
    '<option value="Arkansas">Arkansas</option>\n' +
    '<option value="California">California</option>\n' +
    '<option value="Colorado">Colorado</option>\n' +
    '<option value="Connecticut">Connecticut</option>\n' +
    '<option value="Delaware">Delaware</option>\n' +
    '<option value="Florida">Florida</option>\n' +
    '<option value="Georgia">Georgia</option>\n' +
    '<option value="Hawaii">Hawaii</option>\n' +
    '<option value="Idaho">Idaho</option>\n' +
    '<option value="Illinois">Illinois</option>\n' +
    '<option value="Indiana">Indiana</option>\n' +
    '<option value="Iowa">Iowa</option>\n' +
    '<option value="Kansas">Kansas</option>\n' +
    '<option value="Kentucky">Kentucky</option>\n' +
    '<option value="Louisiana">Louisiana</option>\n' +
    '<option value="Maine">Maine</option>\n' +
    '<option value="Maryland">Maryland</option>\n' +
    '<option value="Massachusetts">Massachusetts</option>\n' +
    '<option value="Michigan">Michigan</option>\n' +
    '<option value="Minnesota">Minnesota</option>\n' +
    '<option value="Mississippi">Mississippi</option>\n' +
    '<option value="Missouri">Missouri</option>\n' +
    '<option value="Montana">Montana</option>\n' +
    '<option value="Nebraska">Nebraska</option>\n' +
    '<option value="Nevada">Nevada</option>\n' +
    '<option value="NewHampshire">NewHampshire</option>\n' +
    '<option value="NewJersey">NewJersey</option>\n' +
    '<option value="NewMexico">NewMexico</option>\n' +
    '<option value="NewYork">NewYork</option>\n' +
    '<option value="NorthCarolina">NorthCarolina</option>\n' +
    '<option value="NorthDakota">NorthDakota</option>\n' +
    '<option value="Ohio">Ohio</option>\n' +
    '<option value="Oklahoma">Oklahoma</option>\n' +
    '<option value="Oregon">Oregon</option>\n' +
    '<option value="Pennsylvania">Pennsylvania</option>\n' +
    '<option value="RhodeIsland">RhodeIsland</option>\n' +
    '<option value="SouthCarolina">SouthCarolina</option>\n' +
    '<option value="SouthDakota">SouthDakota</option>\n' +
    '<option value="Tennessee">Tennessee</option>\n' +
    '<option value="Texas">Texas</option>\n' +
    '<option value="Utah">Utah</option>\n' +
    '<option value="Vermont">Vermont</option>\n' +
    '<option value="Virginia">Virginia</option>\n' +
    '<option value="Washington">Washington</option>\n' +
    '<option value="WestVirginia">WestVirginia</option>\n' +
    '<option value="Wisconsin">Wisconsin</option>\n' +
    '<option value="Wyoming">Wyoming</option>';
var countryData = '<option value="" selected="">-Select-</option>\n' +
    '<option value="US">United States of America</option>\n' +
    '<option value="AF">Afghanistan</option>\n' +
    '<option value="AX">Aland Islands</option>\n' +
    '<option value="AL">Albania</option>\n' +
    '<option value="DZ">Algeria</option>\n' +
    '<option value="AS">American Samoa</option>\n' +
    '<option value="AD">Andorra</option>\n' +
    '<option value="AO">Angola</option>\n' +
    '<option value="AQ">Antarctica</option>\n' +
    '<option value="AG">Antigua and Barbuda</option>\n' +
    '<option value="AR">Argentina</option>\n' +
    '<option value="AM">Armenia</option>\n' +
    '<option value="AW">Aruba</option>\n' +
    '<option value="AU">Australia</option>\n' +
    '<option value="AT">Austria</option>\n' +
    '<option value="AZ">Azerbaijan</option>\n' +
    '<option value="BS">Bahamas</option>\n' +
    '<option value="BH">Bahrain</option>\n' +
    '<option value="BD">Bangladesh</option>\n' +
    '<option value="BB">Barbados</option>\n' +
    '<option value="BY">Belarus</option>\n' +
    '<option value="BE">Belgium</option>\n' +
    '<option value="BZ">Belize</option>\n' +
    '<option value="BJ">Benin</option>\n' +
    '<option value="BM">Bermuda</option>\n' +
    '<option value="BT">Bhutan</option>\n' +
    '<option value="BO">Bolivia (Plurinational State of)</option>\n' +
    '<option value="BQ">Bonaire, Sint Eustatius and Saba</option>\n' +
    '<option value="BA">Bosnia and Herzegovina</option>\n' +
    '<option value="BW">Botswana</option>\n' +
    '<option value="BR">Brazil</option>\n' +
    '<option value="IO">British Indian Ocean Territory</option>\n' +
    '<option value="BN">Brunei Darussalam</option>\n' +
    '<option value="BG">Bulgaria</option>\n' +
    '<option value="BF">Burkina Faso</option>\n' +
    '<option value="BI">Burundi</option>\n' +
    '<option value="CV">Cabo Verde</option>\n' +
    '<option value="KH">Cambodia</option>\n' +
    '<option value="CM">Cameroon</option>\n' +
    '<option value="CA">Canada</option>\n' +
    '<option value="KY">Cayman Islands</option>\n' +
    '<option value="CF">Central African Republic</option>\n' +
    '<option value="TD">Chad</option>\n' +
    '<option value="CL">Chile</option>\n' +
    '<option value="CN">China</option>\n' +
    '<option value="CO">Colombia</option>\n' +
    '<option value="KM">Comoros</option>\n' +
    '<option value="CG">Congo</option>\n' +
    '<option value="CD">Congo (Democratic Republic of the)</option>\n' +
    '<option value="CK">Cook Islands</option>\n' +
    '<option value="CR">Costa Rica</option>\n' +
    '<option value="CI">Cote d\'Ivoire</option>\n' +
    '<option value="HR">Croatia</option>\n' +
    '<option value="CU">Cuba</option>\n' +
    '<option value="CW">Curaçao</option>\n' +
    '<option value="CY">Cyprus</option>\n' +
    '<option value="CZ">Czechia</option>\n' +
    '<option value="DK">Denmark</option>\n' +
    '<option value="DJ">Djibouti</option>\n' +
    '<option value="DM">Dominica</option>\n' +
    '<option value="DO">Dominican Republic</option>\n' +
    '<option value="EC">Ecuador</option>\n' +
    '<option value="EG">Egypt</option>\n' +
    '<option value="SV">El Salvador</option>\n' +
    '<option value="GQ">Equatorial Guinea</option>\n' +
    '<option value="ER">Eritrea</option>\n' +
    '<option value="EE">Estonia</option>\n' +
    '<option value="SZ">Eswatini</option>\n' +
    '<option value="ET">Ethiopia</option>\n' +
    '<option value="FO">Faroe Islands</option>\n' +
    '<option value="FJ">Fiji</option>\n' +
    '<option value="FI">Finland</option>\n' +
    '<option value="FR">France</option>\n' +
    '<option value="GF">French Guiana</option>\n' +
    '<option value="PF">French Polynesia</option>\n' +
    '<option value="TF">French Southern Territories</option>\n' +
    '<option value="GA">Gabon</option>\n' +
    '<option value="GM">Gambia</option>\n' +
    '<option value="GE">Georgia</option>\n' +
    '<option value="DE">Germany</option>\n' +
    '<option value="GH">Ghana</option>\n' +
    '<option value="GI">Gibraltar</option>\n' +
    '<option value="GR">Greece</option>\n' +
    '<option value="GL">Greenland</option>\n' +
    '<option value="GD">Grenada</option>\n' +
    '<option value="GP">Guadeloupe</option>\n' +
    '<option value="GU">Guam</option>\n' +
    '<option value="GT">Guatemala</option>\n' +
    '<option value="GG">Guernsey</option>\n' +
    '<option value="GN">Guinea</option>\n' +
    '<option value="GW">Guinea-Bissau</option>\n' +
    '<option value="GY">Guyana</option>\n' +
    '<option value="HT">Haiti</option>\n' +
    '<option value="HN">Honduras</option>\n' +
    '<option value="HK">Hong Kong</option>\n' +
    '<option value="HU">Hungary</option>\n' +
    '<option value="IS">Iceland</option>\n' +
    '<option value="IN">India</option>\n' +
    '<option value="ID">Indonesia</option>\n' +
    '<option value="IR">Iran (Islamic Republic of)</option>\n' +
    '<option value="IQ">Iraq</option>\n' +
    '<option value="IE">Ireland</option>\n' +
    '<option value="IM">Isle of Man</option>\n' +
    '<option value="IL">Israel</option>\n' +
    '<option value="IT">Italy</option>\n' +
    '<option value="JM">Jamaica</option>\n' +
    '<option value="JP">Japan</option>\n' +
    '<option value="JE">Jersey</option>\n' +
    '<option value="JO">Jordan</option>\n' +
    '<option value="KZ">Kazakhstan</option>\n' +
    '<option value="KE">Kenya</option>\n' +
    '<option value="KI">Kiribati</option>\n' +
    '<option value="KP">Korea (Democratic People\'s Republic of)</option>\n' +
    '<option value="KR">Korea (Republic of)</option>\n' +
    '<option value="KW">Kuwait</option>\n' +
    '<option value="KG">Kyrgyzstan</option>\n' +
    '<option value="LA">Lao People\'s Democratic Republic</option>\n' +
    '<option value="LV">Latvia</option>\n' +
    '<option value="LB">Lebanon</option>\n' +
    '<option value="LS">Lesotho</option>\n' +
    '<option value="LR">Liberia</option>\n' +
    '<option value="LY">Libya</option>\n' +
    '<option value="LI">Liechtenstein</option>\n' +
    '<option value="LT">Lithuania</option>\n' +
    '<option value="LU">Luxembourg</option>\n' +
    '<option value="MO">Macao</option>\n' +
    '<option value="MG">Madagascar</option>\n' +
    '<option value="MW">Malawi</option>\n' +
    '<option value="MY">Malaysia</option>\n' +
    '<option value="MV">Maldives</option>\n' +
    '<option value="ML">Mali</option>\n' +
    '<option value="MT">Malta</option>\n' +
    '<option value="MH">Marshall Islands</option>\n' +
    '<option value="MQ">Martinique</option>\n' +
    '<option value="MR">Mauritania</option>\n' +
    '<option value="MU">Mauritius</option>\n' +
    '<option value="YT">Mayotte</option>\n' +
    '<option value="MX">Mexico</option>\n' +
    '<option value="FM">Micronesia (Federated States of)</option>\n' +
    '<option value="MD">Moldova (Republic of)</option>\n' +
    '<option value="MC">Monaco</option>\n' +
    '<option value="MN">Mongolia</option>\n' +
    '<option value="ME">Montenegro</option>\n' +
    '<option value="MS">Montserrat</option>\n' +
    '<option value="MA">Morocco</option>\n' +
    '<option value="MZ">Mozambique</option>\n' +
    '<option value="MM">Myanmar</option>\n' +
    '<option value="NA">Namibia</option>\n' +
    '<option value="NR">Nauru</option>\n' +
    '<option value="NP">Nepal</option>\n' +
    '<option value="NL">Netherlands</option>\n' +
    '<option value="NC">New Caledonia</option>\n' +
    '<option value="NZ">New Zealand</option>\n' +
    '<option value="NI">Nicaragua</option>\n' +
    '<option value="NE">Niger</option>\n' +
    '<option value="NG">Nigeria</option>\n' +
    '<option value="MK">North Macedonia</option>\n' +
    '<option value="MP">Northern Mariana Islands</option>\n' +
    '<option value="NO">Norway</option>\n' +
    '<option value="OM">Oman</option>\n' +
    '<option value="PK">Pakistan</option>\n' +
    '<option value="PW">Palau</option>\n' +
    '<option value="PS">Palestinian, State of</option>\n' +
    '<option value="PA">Panama</option>\n' +
    '<option value="PG">Papua New Guinea</option>\n' +
    '<option value="PY">Paraguay</option>\n' +
    '<option value="PE">Peru</option>\n' +
    '<option value="PH">Philippines</option>\n' +
    '<option value="PL">Poland</option>\n' +
    '<option value="PT">Portugal</option>\n' +
    '<option value="PR">Puerto Rico</option>\n' +
    '<option value="QA">Qatar</option>\n' +
    '<option value="RO">Romania</option>\n' +
    '<option value="RU">Russian Federation</option>\n' +
    '<option value="RW">Rwanda</option>\n' +
    '<option value="RE">Réunion</option>\n' +
    '<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>\n' +
    '<option value="KN">Saint Kitts and Nevis</option>\n' +
    '<option value="LC">Saint Lucia</option>\n' +
    '<option value="PM">Saint Pierre and Miquelon</option>\n' +
    '<option value="VC">Saint Vincent and the Grenadines</option>\n' +
    '<option value="WS">Samoa</option>\n' +
    '<option value="SM">San Marino</option>\n' +
    '<option value="ST">Sao Tome and Principe</option>\n' +
    '<option value="SA">Saudi Arabia</option>\n' +
    '<option value="SN">Senegal</option>\n' +
    '<option value="RS">Serbia</option>\n' +
    '<option value="SC">Seychelles</option>\n' +
    '<option value="SL">Sierra Leone</option>\n' +
    '<option value="SG">Singapore</option>\n' +
    '<option value="SX">Sint Maarten (Dutch Part)</option>\n' +
    '<option value="SK">Slovakia</option>\n' +
    '<option value="SI">Slovenia</option>\n' +
    '<option value="SB">Solomon Islands</option>\n' +
    '<option value="SO">Somalia</option>\n' +
    '<option value="ZA">South Africa</option>\n' +
    '<option value="SS">South Sudan</option>\n' +
    '<option value="ES">Spain</option>\n' +
    '<option value="LK">Sri Lanka</option>\n' +
    '<option value="SD">Sudan</option>\n' +
    '<option value="SR">Suriname</option>\n' +
    '<option value="SJ">Svalbard and Jan Mayen</option>\n' +
    '<option value="SE">Sweden</option>\n' +
    '<option value="CH">Switzerland</option>\n' +
    '<option value="SY">Syrian Arab Republic</option>\n' +
    '<option value="TW">Taiwan (Province of China)</option>\n' +
    '<option value="TJ">Tajikistan</option>\n' +
    '<option value="TZ">Tanzania, United Republic of</option>\n' +
    '<option value="TH">Thailand</option>\n' +
    '<option value="TL">Timor-Leste</option>\n' +
    '<option value="TG">Togo</option>\n' +
    '<option value="TK">Tokelau</option>\n' +
    '<option value="TO">Tonga</option>\n' +
    '<option value="TT">Trinidad and Tobago</option>\n' +
    '<option value="TN">Tunisia</option>\n' +
    '<option value="TR">Turkey</option>\n' +
    '<option value="TM">Turkmenistan</option>\n' +
    '<option value="TC">Turks and Caicos Islands</option>\n' +
    '<option value="TV">Tuvalu</option>\n' +
    '<option value="UG">Uganda</option>\n' +
    '<option value="UA">Ukraine</option>\n' +
    '<option value="AE">United Arab Emirates</option>\n' +
    '<option value="GB">United Kingdom of Great Britain and Northern Ireland</option>\n' +
    '<option value="UM">United States Minor Outlying Islands</option>\n' +
    '<option value="UY">Uruguay</option>\n' +
    '<option value="UZ">Uzbekistan</option>\n' +
    '<option value="VU">Vanuatu</option>\n' +
    '<option value="VE">Venezuela (Bolivarian Republic of)</option>\n' +
    '<option value="VN">Viet Nam</option>\n' +
    '<option value="VG">Virgin Islands (British)</option>\n' +
    '<option value="VI">Virgin Islands (U.S.)</option>\n' +
    '<option value="WF">Wallis and Futuna</option>\n' +
    '<option value="EH">Western Sahara</option>\n' +
    '<option value="YE">Yemen</option>\n' +
    '<option value="ZM">Zambia</option>\n' +
    '<option value="ZW">Zimbabwe</option>'; 
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

    $("#pwd-edit").on("click", function () {
        $("#infoPwd").prop("disabled", false);
        $("#pwd-edit").hide();
    });

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
        url: "/update/account", // Save user information
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
