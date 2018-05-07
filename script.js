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

        $('#education').visibility(vis_obj_factory("#education"));
        $('#work').visibility(vis_obj_factory("#work"));
        $('#projects').visibility(vis_obj_factory("#projects"));

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');

    });