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
    return view('home');
});

Route::auth();

Route::get('/home', 'HomeController@index');

// Services
Route::resource('/Services', 'ServicesController');
Route::get('/getMyServices/{length?}', 'ServicesController@getMyServices');
Route::get('/getAllServices/{length?}', 'ServicesController@getAllServices');
Route::get('/getUserServices/{userId}/{length?}', 'ServicesController@getUserServices');

// Orders
Route::resource('/Orders', 'OrdersController');
Route::get('/purchaseOrders/{length?}', 'OrdersController@getMyPurchaseOrders');
Route::get('/incomingOrders/{length?}', 'OrdersController@getMyIncomingOrders');
Route::get('/getOrderById/{orderId}', 'OrdersController@getOrderById');
Route::get('/changeStatus/{order_id}/{status}', 'OrdersController@changeStatus');
Route::get('/finishOrder/{order_id}', 'OrdersController@finishOrder');
// Comments
Route::resource('/Comments', 'CommentsController');
// Message
Route::resource('/Messages', 'MessagesController');
Route::get('/GetRecivedMessages', 'MessagesController@GetRecivedMessages');
Route::get('/GetUnReadMessages', 'MessagesController@GetUnReadMessages');
Route::get('/GetReadMessages', 'MessagesController@GetReadMessages');
// fevorite
Route::get('/Addfavorite/{service_id}', 'FavoriteController@Addfavorite');
Route::get('/userFavorites', 'FavoriteController@userFavorites');
Route::delete('/deleteFav/{fav_id}', 'FavoriteController@deleteFav');
// Rating
Route::post('/addNewVote', 'VoteController@addNewVote');
// Category
Route::get('/getServicesByCategoryId/{catId}/{length?}', 'CategoryController@getServicesByCategoryId');
// users
Route::get('/GetAuthUser', 'UsersController@GetAuthUser');
Route::get('/GetAllChargeOperation', 'UsersController@GetAllChargeOperation');
Route::get('/GetAllPaymentOperation', 'UsersController@GetAllPaymentOperation');
Route::get('/GetAllProfitOperation', 'UsersController@GetAllProfitOperation');
Route::get('/GetAllBalanceOperation', 'UsersController@GetAllBalanceOperation');
// Payment
Route::post('/AddCredit', 'PayController@AddCredit');
// Notifications
Route::get('/GetMyNotifications/{length?}', 'NotificationController@GetMyNotifications');
Route::get('/GetMyUnReadNotifications/{length?}', 'NotificationController@GetMyUnReadNotifications');
Route::get('/GetNotificationsCount', 'NotificationController@GetNotificationsCount');
Route::get('/getAllUserNotifications', 'NotificationController@getAllUserNotifications');
