// $(window).on('beforeunload', function() {
//     $(this).scrollTop(0);
// })

// lastY = $(this).scrollTop();

// JQuery Plugin just tells us if the element is in the viewport
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    if (elementBottom < viewportTop || elementTop > viewportBottom) {
        return false;
    }

    var workingTop;
    if (elementTop > viewportTop) {
        // element top is on page
        workingTop = elementTop;
    } else {
        workingTop = viewportTop;
    }

    var workingBottom;
    if (elementBottom < viewportBottom) {
        // element bottom is on page
        workingBottom = elementBottom;
    } else {
        workingBottom = viewportBottom;
    }

    var workingHeight = workingBottom - workingTop;
    var workingPercentage = (workingHeight / $(window).height()) * 100;

    return workingPercentage > 55.0;
};

$(document).ready(function() {
    $(window).on("scroll", function() {
        handle_menu("#home");
        handle_menu("#education");
        handle_menu("#work");
        handle_menu("#projects");
    })

    function handle_menu(ref) {
        if ($(ref).isInViewport()) {
            $("#follow-menu .active").removeClass("active");
            $(`#follow-menu a[href='${ref}']`).addClass("active");
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

    function smooth_scroll(e) {
        var hash = this.hash;
        $(".ui.sidebar").sidebar("hide");

        // If mobile don't bother with smooth scrolling just go to the section
        if (window.innerWidth <= 800 && window.innerHeight <= 600) {
            return true;
        }

        // not on mobile
        if (this.hash !== "") {
            $("body,html").animate({
                scrollTop: $(hash).offset().top + 1
            }, 400, function() {})
        } else {
            if ($(this).attr("href") === "#") {
                $("body,html").animate({
                    scrollTop: 0
                }, 400, function() {})
            } else {
                return true;
            }
        }

        return false;
    }

    $("#follow-menu a").on("click", smooth_scroll);
    $("#main-menu a").on("click", smooth_scroll);
    $("#about-me a").on("click", smooth_scroll);
    $('.ui.sidebar a').on("click", smooth_scroll);

    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');

});