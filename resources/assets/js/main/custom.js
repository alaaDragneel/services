$(document).ready(function(){
    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');
        }
    );

    $(".catFolder").hover(
        function() {
            $(this).children('i').removeClass('fa-folder').addClass('fa-folder-open');
        },
        function() {
            $(this).children('i').addClass('fa-folder').removeClass('fa-folder-open');
        }
    );

});
