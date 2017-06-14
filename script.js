$(window).on('beforeunload', function() {
    $(this).scrollTop(0);
})

lastY = $(this).scrollTop();

// JQuery Plugin just tells us if the element is in the viewport
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document)
    .ready(function() {

        function vis_obj_factory(reference) {
            return {
                once: false,
                onTopPassed: function() {
                    if ($("#follow-menu .active").attr("href") !== reference) {
                        $("#follow-menu .active").removeClass("active");
                        $(`#follow-menu a[href='${reference}']`).addClass("active");
                    }
                },
                onTopPassedReverse: function() {
                    $("#follow-menu .active").removeClass("active");
                    $(`#follow-menu a[href='${reference}']`).prev().addClass("active");
                },
                onBottomPassedReverse: function() {
                    $("#follow-menu .active").removeClass("active");
                    $(`#follow-menu a[href='${reference}']`).addClass("active");
                }
            }
        }

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });

        $(window).bind('scroll mousewheel', function(event) {
            // Masthead Parralax Effect
            if ($('.masthead').isInViewport()) {
                var currY = $(this).scrollTop();
                var pos = $('.masthead').css("background-position").split(" ");

                // At the top
                if (currY === 0) {
                    $('.masthead').css("background-position", `${pos[0]} 0px`);
                } else {
                    if (currY > lastY) {
                        // Down
                        $('.masthead').css("background-position", `${pos[0]} ${parseFloat(pos[1]) + 0.2}px`);
                    } else if (currY < lastY) {
                        // Up
                        $('.masthead').css("background-position", `${pos[0]} ${parseFloat(pos[1]) - 0.2}px`);

                    }
                }
            }

            // In-view fade-in transition
            $.each($('.main-section'), function() {
                var current = $(this);
                if (current.isInViewport()) {
                    current.addClass("in-view");
                } else {
                    current.removeClass("in-view");
                }
            })

            lastY = currY;

        });

        function smooth_scroll(e) {
            e.preventDefault();
            var hash = this.hash;
            if (this.hash !== "") {
                $("html body").animate({
                    scrollTop: $(hash).offset().top + 1
                }, 800, function() {})
            } else {
                $("html body").animate({
                    scrollTop: 0
                }, 800, function() {})
            }
        }

        $("#follow-menu a").on("click", smooth_scroll);
        $("#main-menu a").on("click", smooth_scroll);

        $('#education').visibility(vis_obj_factory("#education"));
        $('#work').visibility(vis_obj_factory("#work"));
        $('#projects').visibility(vis_obj_factory("#projects"));

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');

    });