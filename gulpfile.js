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
        'bootstrap.min.css',
        'font-awesome.min.css'
    ], 'public/src/css/style.css');

    mix.scripts([
        'jquery-1.12.4.min.js',
        'bootstrap.min.js'
    ], 'public/src/js/main.js');

});
