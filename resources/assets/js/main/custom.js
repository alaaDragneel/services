$(document).ready(function(){
    // $(".dropdown").hover(
    //     function() {
    //         $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
    //         $(this).toggleClass('open');
    //     },
    //     function() {
    //         $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
    //         $(this).toggleClass('open');
    //     }
    // );

    //trigger nice scrool
   $(".menu").slimscroll({
      height: '200px',
      alwaysVisible: false,
      size: '3px'
    }).css("width", "100%");

});
