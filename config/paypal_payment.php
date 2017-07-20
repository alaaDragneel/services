<?php

return [

    /*
    |--------------------------------------------------------------------------
    | User Paypal Account
    |--------------------------------------------------------------------------
    |
    | All values Come From Paypal.
    | ClientId is The User id in Paypal.
    | ClientSecret is The Secret key To connect With The Paypal Account.
    |
    */

    'Account' => [
        'ClientId' => 'ASN_Vwv8e5bXoQ8Fm12FvnY42RA34VkF6CbF1KL-VIxEr1ZZg5r6UQUoLn6HMWF2U7kzDm_n-bdpUHOC',
        'ClientSecret' => 'EN0IBgEam8eyeYl5QrfFIFxOOLE8ZrIY6P3mZNEmQKQc5R9fN_r7dVhalsIjrUvsQ_PboQYph0QRtElX'
    ],

    /*
    |--------------------------------------------------------------------------
    | User Paypal Account Connection && Log Setting
    |--------------------------------------------------------------------------
    |
    | All Keys Used By The Paypal SDK.
    | Mode See If Your App In Production OR Development[Sandbox].
    | Http.ConnectionTimeOut Set The Time Out By Passing The Number Of Seconds.
    | log.LogEnable Enable The Log.
    | logFileName Use File TO Log In It By Default [ public_path('/logs/paypal.log') ].
    | log.LogLevel Choose the Log Level By Default [ FINE ].
    |
    */

    'Setting' => [
        'mode' => 'sandbox',
        'http.ConnectionTimeOut' => '30',
        'log.LogEnable' => 'true',
        'logFileName' => public_path('/logs/paypal.log'),
        'log.LogLevel' => 'FINE'
    ],

];
