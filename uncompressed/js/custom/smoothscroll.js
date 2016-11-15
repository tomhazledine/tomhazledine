// Smooth Scroll
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {

                // If there's a fixed-position
                // header, subtract it's hight
                // from the scroll destination
                var stickyHeader = $('.stickyHeading');
                var targetPostion = target.offset().top
                if (stickyHeader.length) {
                    var stickyHeaderHeight = stickyHeader.outerHeight();
                    var arbitraryVisualPadding = 10; 
                    targetPostion = targetPostion - stickyHeaderHeight - arbitraryVisualPadding;
                }

                // Animate the scroll
                $('html,body').animate({
                    scrollTop: targetPostion
                }, 300);
                return false;
            }
        }
    });
});