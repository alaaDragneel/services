var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

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

elixir(function(mix) {

    mix.styles([
        'main/font-awesome.min.css',
        'main/bootstrap.min.css',
        'sweetalert.css',
        'default.css',
        'alertify.css',
        'custome.css'
    ], 'public/css/style.css');

    mix.scripts([
        'main/jquery-1.12.4.min.js',
        'main/bootstrap.min.js',
        'sweetalert.min.js',
        'alertify.js'
    ], 'public/js/main.js');

    mix.browserify([
        'app.js'
    ], 'public/js/app.js');

});
