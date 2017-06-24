<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/home', 'HomeController@index');

// Services
Route::resource('/Services', 'ServicesController');
Route::get('/getAllServices', 'ServicesController@getAllServices');
Route::get('/getUserServices/{userId}', 'ServicesController@getUserServices');

// Orders
Route::resource('/Orders', 'OrdersController');
Route::get('/purchaseOrders', 'OrdersController@getMyPurchaseOrders');
Route::get('/incomingOrders', 'OrdersController@getMyIncomingOrders');
Route::get('/getOrderById/{orderId}', 'OrdersController@getOrderById');
Route::get('/changeStatus/{order_id}/{status}', 'OrdersController@changeStatus');
// Comments
Route::resource('/Comments', 'CommentsController');
// Message
Route::resource('/Messages', 'MessagesController');
Route::get('/getMessagesCount', 'MessagesController@getMessagesCount');
Route::get('/GetRecivedMessages', 'MessagesController@GetRecivedMessages');
Route::get('/GetUnReadMessages', 'MessagesController@GetUnReadMessages');
Route::get('/GetReadMessages', 'MessagesController@GetReadMessages');
// fevorite
Route::get('/Addfavorite/{service_id}', 'FavoriteController@Addfavorite');
Route::get('/userFavorites', 'FavoriteController@userFavorites');
Route::delete('/deleteFav/{fav_id}', 'FavoriteController@deleteFav');
// Rating
Route::post('/addNewVote', 'VoteController@addNewVote');
