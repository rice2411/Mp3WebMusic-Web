$(document).ready(function () {

    // Get current page URL
    var url = window.location.pathname;

    // remove # from URL
 

    // If file name not avilable
    if (url == '') {
        url = 'index.html';
    }

    // Loop all menu items
    $('.navbar-nav li').each(function () {

        // select href
        var href = $(this).find('a').attr('href');

        // Check filename
        if (url == href) {
            $('li').removeClass('active')
            // Add active class
            $(this).addClass('active');
        }
    });

});
var yOffset = $("#scrollwithpage").offset().top;
$(window).scroll(function () {
    if ($(window).scrollTop() < yOffset) {
        $("#scrollwithpage").css({
            'top': 0,
            'position': 'fixed'
        });
    } 
    if ($("#scrollwithpage").offset().top ==  0) {
        $("#scrollwithpage").css({
            'top': "",
            'position': ''
        });
    } 

});
