var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

require('laravel-elixir-vueify');

elixir(function(mix) {

    mix.styles([
        'main/font-awesome.min.css',
        'main/bootstrap.min.css',
        'sweetalert.css',
        'alertify.core.css',
        'alertify.default.css',
        'alertify.css',
        'fontawesome-stars.css',
        'custome.css',
    ], 'public/css/style.css');


    mix.scripts([
        'main/jquery-2.1.1.js',
        'main/bootstrap.min.js',
        'sweetalert.min.js',
        'alertify.js',
        'jquery.slimscroll.min.js',
        'jquery.barrating.min.js',
        'main/custom.js',
    ], 'public/js/main.js');

    // Admin Styles
    mix.styles([
        'main/font-awesome.min.css',
        'main/bootstrap.min.css',
        'admin/reset.css',
        'admin/card.css',
        'alertify.core.css',
        'alertify.default.css',
        'alertify.css',
        'admin/styles.css',

    ], 'public/admin/css/style.css');
    // Admin Scripts
    mix.scripts([
        'main/jquery-2.1.1.js',
        'main/bootstrap.min.js',
        'admin/custom.js',
        'admin/modernizr.js',
        'admin/velocity.min.js',
        'alertify.js',
        'admin/main.js',

    ], 'public/admin/js/main.js');

    mix.browserify([
        'app.js'
    ], 'public/js/app.js');

});
