$(document).ready(function(){

    //bootstrap select
    $.fn.selectpicker.Constructor.BootstrapVersion = '4';
    $('select').selectpicker();

    // color the heart when hover on it
    $("#productList").on("mouseover", "i.fa-heart", function () {
        $(this).toggleClass("fas");
    });
    $("#productList").on("mouseleave", "i.fa-heart", function () {
        $(this).toggleClass("fas");

    });

    // click the heart to toggle color.
    $("#productList").on("click", "i.fa-heart", function () {
        $(this).toggleClass("fas");
    });


    // pagination
    var itemNum = 8;    // display 8 item per page
    var handleDisable = function(){
        if (!$('#page').find('.active').prev().hasClass("page")) {
            $('#pagePrev').addClass("disabled");
        } else {
            $('#pagePrev').removeClass("disabled");
        }
        if (!$('#page').find('.active').next().hasClass("page")) {
            $('#pageNext').addClass("disabled");
        } else {
            $('#pageNext').removeClass("disabled");
        }
        scrollTo(0,0);
    }

    // create page li
    var cardsNum = $('#productList').children().length;
    var pageNum = Math.ceil(cardsNum / itemNum);
    if (pageNum > 1) {
        for (var i = pageNum; i > 1; i--){
            var li = '<li id="page'+ i +'" class="page page-item"><a class="page-link">' + i +'</a></li>';
            $(li).insertAfter('#page .active');
        }
    }
    // set page id
    $('#productList').children().each(function (index) {
        $(this).attr("id", index);
     });
    // render first page
    for (var i = 0; i < itemNum; i++){
        $('#' + i).show();
    }
    // deal with page change
    $('#page').children(".page").on("click",function(){
        // change active class
        $(this).addClass("active");
        $(this).siblings().removeClass("active");

        // hide & show items
        $('#productList').children().hide();
        var c = $(this).find('a').text();
        for (var j = 0; j < itemNum; j++) {
            var x = (c - 1) * itemNum + j;
            if (x < cardsNum) {
                $('#' + x).show();
            }
        }

        handleDisable();
    });

    $('#pagePrev').on("click", function(){
        $('#productList').children().hide();
        var c = $('#page').find('.active a').text();
        for (var j = 0; j < itemNum; j++) {
            var x = (c - 2) * itemNum + j;
            if (x < cardsNum) {
                $('#' + x).show();
            }
        }
        var page = $('#page').find('.active');
        page.prev('.page').addClass("active");
        page.removeClass("active");
        
        handleDisable();
    });

    $('#pageNext').on("click", function(){
        $('#productList').children().hide();
        var c = $('#page').find('.active a').text();
        for (var j = 0; j < itemNum; j++) {
            var x = (c) * itemNum + j;
            if (x < cardsNum) {
                $('#' + x).show();
            }
        }
        var page = $('#page').find('.active');
        page.next('.page').addClass("active");
        page.removeClass("active");

        handleDisable();
    });
});