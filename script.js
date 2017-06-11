$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
})

$(document)
    .ready(function() {


        // JQuery Plugin just tells us if the element is in the viewport
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

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

        $(window).bind('mousewheel', function(event) {
            if ($('.masthead').isInViewport() && $(window).scrollTop() != 0) {
                var pos = $('.masthead').css("background-position").split(" ");
                if (event.originalEvent.wheelDelta >= 0) {
                    $('.masthead').css("background-position", `${pos[0]} ${parseFloat(pos[1]) + 0.35}px`);
                } else {
                    $('.masthead').css("background-position", `${pos[0]} ${parseFloat(pos[1]) - 0.35}px`);
                }
            }
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