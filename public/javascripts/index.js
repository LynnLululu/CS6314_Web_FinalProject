$(function () {
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

});

