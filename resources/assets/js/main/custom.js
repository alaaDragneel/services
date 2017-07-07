$(document).ready(function(){
/*
| ------------------------------------------------
|  Notification
| ----------------------------------------------
*/
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
            $('ul.menu').html(res['notife']);
        });
    });

    setInterval(function () {
        $.ajax({
            method: 'GET',
            url: 'checkNotification',
            data: {_token: $('meta#_token').attr('value')}
        }).done(function (res) {
            counter.html(res['count']);
            header.html(res['count']);
        });
    }, 5000);


    /*
    | ------------------------------------------------
    |  Orders
    | ----------------------------------------------
    */

    setInterval(function () {
        $.ajax({
            method: 'GET',
            url: 'checkOrders',
            data: {_token: $('meta#_token').attr('value')}
        }).done(function (res) {
            $('#orderCount').html(res['orders']);
        });
    }, 6000);

    /*
    | ------------------------------------------------
    |  Favorites
    | ----------------------------------------------
    */
    setInterval(function () {
        $.ajax({
            method: 'GET',
            url: 'checkFavorites',
            data: {_token: $('meta#_token').attr('value')}
        }).done(function (res) {
            $('#favoriteCount').html(res['favorite']);
        });
    }, 7000);

    /*
    | ------------------------------------------------
    |  unreadMessages
    | ----------------------------------------------
    */
    setInterval(function () {
        $.ajax({
            method: 'GET',
            url: 'checkMessages',
            data: {_token: $('meta#_token').attr('value')}
        }).done(function (res) {
            $('#messageCount').html(res['countMessages']);
        });
    }, 8000);
    //trigger nice scrool
   $(".menu").slimscroll({
      height: '200px',
      alwaysVisible: false,
      size: '3px'
    }).css("width", "100%");

});
