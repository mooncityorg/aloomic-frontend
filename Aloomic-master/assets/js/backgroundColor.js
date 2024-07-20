$(function () {
    var ypos = window.pageYOffset || document.documentElement.scrollTop;
    var maxYvalue = $(document).height() - $(window).height();
    var percent = parseInt(ypos * 100 / maxYvalue);
    $('#scroll_value').text(percent + "%");

    window.onscroll = function (e) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            // do something
            $('.circle-mark path').animate({ opacity: '1' });
            $('#scroll_value').animate({ opacity: "1" });
        }, 250));

        var ypos = window.pageYOffset || document.documentElement.scrollTop;

        $('.circle-mark path').css("opacity", 0);
        $('#scroll_value').css("opacity", 0);
        // called when the window is scrolled.  

        var maxYvalue = $(document).height() - $(window).height();
        var percent = parseInt(ypos * 100 / maxYvalue);
        $('#scroll_value').text(percent + "%");


        if (ypos < 3500) {

            if (width >= 1080) {
                if (ypos >= 1030 && ypos <= 1630) {
                    $(".cards-box:first-child .video-card:first-child").css('transform', 'translate3d(' + (ypos - 1630) / 6 * 2 + '%, 0, 0) scale(' + (2230 - ypos) / 600 + ', ' + (2230 - ypos) / 600 + ')');
                    $(".cards-box:first-child .video-card:first-child").css('opacity', (ypos - 1030) / 600);
                    // 
                    $(".cards-box:last-child .video-card:first-child").css('transform', 'translate3d(' + (1630 - ypos) / 4 + '%, ' + (1630 - ypos) / 12 + '%, 0) scale(' + (2830 - ypos) / 1200 + ', ' + (2830 - ypos) / 1200 + ')');
                    $(".cards-box:last-child .video-card:first-child").css('opacity', (ypos - 1030) / 600);
                    //
                    $(".cards-box:first-child .video-card:last-child, .cards-box:first-child .video-card:nth-child(2)").css('transform', 'translate3d(' + (ypos - 1630) / 6 * 2 + '%, ' + (1630 - ypos) / 6 * 2 + '%, 0) scale(' + (2230 - ypos) / 600 + ', ' + (2230 - ypos) / 600 + ')');
                    $(".cards-box:first-child .video-card:last-child, .cards-box:first-child .video-card:nth-child(2)").css('opacity', (ypos - 1030) / 600);
                    // 
                    $(".cards-box:last-child .video-card:last-child, .cards-box:last-child .video-card:nth-child(2)").css('transform', 'translate3d(' + (1630 - ypos) / 4 + '%, ' + (1630 - ypos) / 12 + '%, 0) scale(' + (2830 - ypos) / 1200 + ', ' + (2830 - ypos) / 1200 + ')');
                    $(".cards-box:last-child .video-card:last-child, .cards-box:last-child .video-card:nth-child(2)").css('opacity', (ypos - 1030) / 600);

                } else if (ypos > 1630) {
                    $(".cards-box .video-card").css('transform', 'translate3d(0, 0, 0) scale(1, 1)');
                    $(".cards-box .video-card").css('opacity', '1');
                    //

                }
            }
            // 
            $('.client-section').removeClass('background-w2b').removeClass('background-b2w').addClass('background-w2b');
            $('.client-section *').removeClass('color-b2w').removeClass('color-w2b').addClass('color-b2w');
            $('.full-screen>div').removeClass('background-w2b').removeClass('background-b2w').addClass('background-w2b');
            $('.full-screen>div *').removeClass('color-b2w').removeClass('color-w2b').addClass('color-b2w');
        } else if (ypos < 4800 && ypos > 3500) {
            $('.full-screen>div').removeClass('background-w2b').removeClass('background-b2w').addClass('background-b2w');
            $('.full-screen>div *').removeClass('color-b2w').removeClass('color-w2b').addClass('color-w2b');

            $('.client-section').removeClass('background-w2b').removeClass('background-b2w').addClass('background-b2w');
            $('.client-section *').removeClass('color-b2w').removeClass('color-w2b').addClass('color-w2b');

        } else {
            $('.full-screen>div').removeClass('background-w2b').removeClass('background-b2w').addClass('background-w2b');
            $('.full-screen>div *').removeClass('color-b2w').removeClass('color-w2b').addClass('color-b2w');

            $('.client-section').removeClass('background-w2b').removeClass('background-b2w').addClass('background-w2b');
            $('.client-section *').removeClass('color-b2w').removeClass('color-w2b').addClass('color-b2w');
        }
    }
});

$('.mySwiper').bind('mousewheel', function (e) {

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var activeslide = $('.swiper-slide-active').index();
    if ((e.originalEvent.wheelDelta / 120 > 0 && activeslide === 0) || (e.originalEvent.wheelDelta / 120 < 0 && activeslide == 7)) {
        // setTimeout(allowScroll, 1000);
        // allowScroll();
        window.onscroll = function () {
            // window.scrollTo(scrollLeft, scrollTop);
        };

    } else {
        // disallowScroll();
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }

});
