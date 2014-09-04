'use strict';

$(function () {
    $("a.scroll-to").click(function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - $('.navbar').height() - 20
        }, 2000);
    });
});