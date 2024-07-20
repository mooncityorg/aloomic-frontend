$(function () {
    // for swiper slider
    $('.swiper-slide img').on('mouseenter', function () {
        $(this).addClass('mover');
    });
    $('.swiper-slide img').on('mouseleave', function () {
        $(this).removeClass('mover');
    });
    // 
    var $hamburger = $(".hamburger");
    $hamburger.on("click", function (e) {

        $hamburger.toggleClass("is-active");
        // Do something else, like open/close menu
    });

    $(".nav-item").hover(function () {
        if ($(document).width() <= 768) {
            $(".menu-thumb").addClass("hidden")
        } else if ($(document).width() <= 1080) {
            $(".menu-thumb").addClass("hidden")
            $(this).find(".menu-thumb").removeClass("hidden")
            if ($(this).index() >= 3) {
                $(this).find(".menu-thumb").css('top', 70 + 70 * ($(this).index() - 3));
                if ($(this).index() >= $('#main-menu .nav-item').length - 3) {
                    $(this).find(".menu-thumb").css('top', 70 * ($('#main-menu .nav-item').length - 3) - 132);
                }
            }
        } else {

            $(".menu-thumb").addClass("hidden")
            $(this).find(".menu-thumb").removeClass("hidden")
            if ($(this).index() >= 2) {
                $(this).find(".menu-thumb").css('top', 88 + 100 * ($(this).index() - 2));
                if ($(this).index() >= $('#main-menu .nav-item').length - 1) {
                    $(this).find(".menu-thumb").css('top', 88 + 100 * ($(this).index() - 3));
                }
            }
        }
    })

    // Control nave menu
    $(".menu-button").click(function () {
        $(".nav-menu").toggleClass("menu-open")
    })
    $(".client-explain").click(function () {
        $(".client-explain:last-child").removeClass("hidden")
        $(this).addClass("hidden")
        $(".our-clients-pre").css("margin-bottom", 0)
        $("#clients-explain").removeClass('hidden')//css("height", "auto")
    })
    $(".client-explain:last-child").click(function () {
        $(".client-explain").removeClass("hidden")
        $(this).addClass("hidden")
        $(".our-clients-pre").css("margin-bottom", 100)
        $("#clients-explain").addClass('hidden')//css("height", 0)
    })

    // console slide
    cardSlideCount = 0;
    deviceWidth = $("#device-ruler").width();
    if (deviceWidth > 460) cardsCunt = parseInt($('.slide-item').length / 2);
    else cardsCunt = $('.slide-item').length;

    $("#right-arrow").click(function () {
        if (cardSlideCount > 0 - cardsCunt) {
            cardSlideCount--
            $(".slide-cards").css({ "transform": "translateX(" + deviceWidth * cardSlideCount + "px)" })
            $("#left-arrow").css("opacity", 1)
        } else {
            $("#right-arrow").css("opacity", 0.4)
            $("#left-arrow").css("opacity", 1)
        }
    })
    $("#left-arrow").click(function () {
        if (cardSlideCount < 0) {
            cardSlideCount++
            $(".slide-cards").css({ "transform": "translateX(" + deviceWidth * cardSlideCount + "px)" })
            $("#right-arrow").css("opacity", 1)
        } else {
            $("#right-arrow").css("opacity", 1)
            $("#left-arrow").css("opacity", 0.4)
        }
    })



    $('#checkbox').change(function () {
        setInterval(function () {
            moveRight();
        }, 3000);
    });

    var slideCount = $('#slider-reviews ul li').length;
    var slideWidth = $('#slider-reviews ul li').width();
    var slideHeight = $('#slider-reviews ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider-reviews').css({ width: '100%', height: slideHeight });

    // $('#slider-reviews ul').css({ width: sliderUlWidth, marginLeft: -slideWidth });

    $('#slider-reviews ul li:last-child').prependTo('#slider-reviews ul');

    function moveLeft() {
        $('#slider-reviews ul').animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider-reviews ul li:last-child').prependTo('#slider-reviews ul');
            $('#slider-reviews ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider-reviews ul').animate({
            left: -slideWidth
        }, 200, function () {
            $('#slider-reviews ul li:first-child').appendTo('#slider-reviews ul');
            $('#slider-reviews ul').css('left', '');
        });
    };

    $('button.control_prev').click(function () {
        moveLeft();
    });

    $('button.control_next').click(function () {
        moveRight();
    });
    //////////////
    var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
    slideCount = $('.slide').length;

    $('#slides1').on('mousedown touchstart', slideStart);
    $('#slides1').on('mouseup touchend', slideEnd);
    $('#slides1').on('mousemove touchmove', slide);

    /**
    / Triggers when slide event started
    */
    function slideStart(event) {
        // If it is mobile device redefine event to first touch point
        if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        // If sliding not started yet store current touch position to calculate distance in future.
        if (sliding == 0) {
            sliding = 1; // Status 1 = slide started.
            startClientX = event.clientX;
        }
    }

    /** Occurs when image is being slid.
    */
    function slide(event) {
        event.preventDefault();
        if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        // Distance of slide.
        var deltaSlide = event.clientX - startClientX;
        // If sliding started first time and there was a distance.
        if (sliding == 1 && deltaSlide != 0) {
            sliding = 2; // Set status to 'actually moving'
            startPixelOffset = pixelOffset; // Store current offset
        }

        //  When user move image
        if (sliding == 2) {
            // Means that user slide 1 pixel for every 1 pixel of mouse movement.
            var touchPixelRatio = 1;
            // Check for user doesn't slide out of boundaries
            if ((currentSlide == 0 && event.clientX > startClientX) ||
                (currentSlide == slideCount - 1 && event.clientX < startClientX))
                // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
                touchPixelRatio = 3;
            // Calculate move distance.
            pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            // Apply moving and remove animation class
            $('#slides1').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
        }
    }

    /** When user release pointer finish slide moving.
    */
    function slideEnd(event) {
        if (sliding == 2) {
            // Reset sliding.
            sliding = 0;
            // Calculate which slide need to be in view.
            currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
            // Make sure that unexisting slides weren't selected.
            currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);

            // Since in this example slide is full viewport width offset can be calculated according to it.
            pixelOffset = currentSlide * -430;

            // Remove style from DOM (look below)
            $('#temp').remove();
            // Add a translate rule dynamically and asign id to it
            $('<style id="temp">#slides1.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
            // Add animate class to slider and reset transform prop of this class.
            $('#slides1').addClass('animate').css('transform', '');
        }
    }

    $('#we-do-menu').on('click', function () {
        $('#main-menu').addClass('hidden');
        $('#we-do-submenu').addClass('hidden').removeClass('hidden');
    });
    $('.back-to-mainmenu').on('click', function () {
        $('#main-menu').addClass('hidden').removeClass('hidden');
        $('#we-do-submenu').addClass('hidden');
    });
    // $('#scroll_value').css('left', ($('.circle-mark-wrapper').width() - $('#scroll_value').width()) / 2);
    // for circle-rounding widget
    var ypos = window.pageYOffset || document.documentElement.scrollTop;
    var maxYvalue = $(document).height() - $(window).height();
    var percent = parseInt(ypos * 100 / maxYvalue);

    $('#scroll_value').text(percent + "%");
    // for scrolling beginning
    window.onscroll = function (e) {
        $('.circle-mark path').css("opacity", 0);
        $('#scroll_value').css("opacity", 0);
        // called when the window is scrolled.  
        var ypos = window.pageYOffset || document.documentElement.scrollTop;
        var maxYvalue = $(document).height() - $(window).height();
        var percent = parseInt(ypos * 100 / maxYvalue);
        $('#scroll_value').text(percent + "%");

        // for background color animation
        // console.log(ypos);



    }



});

// for scrolling stop

$(window).scroll(function () {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function () {
        // do something
        $('.circle-mark path').animate({ opacity: '1' });
        $('#scroll_value').animate({ opacity: "1" });
    }, 250));
});
// for googlemap
function initMap() {
    // The location of Uluru
    var zoom = 15;
    const uluru = { lat: -34.879986750516096, lng: 138.59206451516428 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        minZoom: zoom - 2,
        maxZoom: zoom + 2,
        center: uluru,
        mapTypeControl: false,
        keyboardShortcutsControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#000000" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1C2A25" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#74DBB0" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#74DBB0" }],
            },
            // {
            //     featureType: "poi",
            //     elementType: "labels.text.fill",
            //     stylers: [{ color: "#74DBB0" }],
            // },

            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],//color: "#101915"
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ visibility: "off" }],//color: "#101915"
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ visibility: "off" }],//color: "#74DBB0"
            },
            {
                featureType: "poi.business",
                elementType: "all",
                stylers: [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#507C69" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1C2A25" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#74DBB0" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1C2A25" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#74DBB0" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ visibility: "off" }],//color: "#2f3948"
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ visibility: "off" }],//color: "#74DBB0" 
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }],//color: "#74DBB0" 
            },
            {
                featureType: "water",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#74DBB0" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#1C2A25" }],
            },
        ],
    });
    const image = "./assets/img/position.svg";
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
        title: "Come here!"
    });
    marker.setMap(map);
    // const styleControl = document.getElementById("style-selector-control");
    // The marker, positioned at Uluru

    const mapType = new google.maps.StyledMapType();
    map.mapTypes.set(`Dummy Style`, mapType);
    map.setMapTypeId(`Dummy Style`);
}

function playPause() {
    var vid = document.getElementById("vid");
    if (vid.paused == true) {
        vid.play();
        $('.play-button img').attr('src', './assets/img/pause-icon.svg');
    } else {
        vid.pause();
        $('.play-button img').attr('src', './assets/img/play-icon.svg');
    }
}
// 
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

var mySwiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    longSwipesMs: 4000,
    slidesPerView: (width >= 767) ? 1.5 : 1,
    followFinger: true,
    spaceBetween: 30,
    speed: 1000,
    mousewheel: {
        releaseOnEdges: true,
    },
    on: {
        slideChangeTransitionStart: function () {

        },
        transitionStart: function () {
            // Slide captions
            var swiper = this;
            var currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
            var currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
            $(".slide-captions").html(function () {
                return "<h2 class='current-title'>" + currentTitle + "</h2>" + "<h3 class='current-subtitle'>" + currentSubtitle + "</h3>";
            });

            gsap.from($(".swiper-slide-active .current-title"), 0.9, { duration: .8, startAt: { autoAlpha: 1 }, autoAlpha: 0, y: 120, ease: Power1.easeOut });
            gsap.from($(".swiper-slide-active .current-subtitle"), 0.9, { startAt: { autoAlpha: 1 }, autoAlpha: 0, y: 80, delay: 0.15, ease: Power1.easeOut });
        }
    }

});
