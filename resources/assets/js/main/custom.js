$(document).ready(function(){
    var li = $('.notification-real-li');
    var counter = $('#counter');
    var header = $('#counter-header');

    li.on('click', function(event) {
        if (!$(this).hasClass('seen')) {
                $(this).addClass('seen')
                if (counter.html() > 0 && header.html() > 0) {
                    counter.html((counter.html() - 1));
                    header.html((header.html() - 1));
                }
        }
    });
    $( document ).ajaxStart(function() {
        $('#loading').css('display', 'block');
    });

    $( document ).ajaxStop(function() {
        $('#loading').css('display', 'none');
    });
    $('#notifications-menu').on('click', function(event) {
        $.ajax({
            method: 'GET',
            url: 'GetMyNotificationsWithAjax',
            data: {_token: $('meta#_token').attr('value')}
        }).done(function (res) {
            counter.html(res['notifeCount']);
            header.html(res['notifeCount']);
            $('ul.menu').html(res['notife']);
        });
    });
    //trigger nice scrool
   $(".menu").slimscroll({
      height: '200px',
      alwaysVisible: false,
      size: '3px'
    }).css("width", "100%");

});
