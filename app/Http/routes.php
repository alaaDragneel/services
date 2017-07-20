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


/*
|--------------------------------------------------------------------------
|                          Front-End Routes                                |
|--------------------------------------------------------------------------
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/home', 'HomeController@index');

/*
|--------------------------------------------------------------------------
| For Auth Users Only
|--------------------------------------------------------------------------
|
*/

Route::group(['middleware' => 'auth'], function() {

    /*
    |--------------------------------------------------------------------------
    | Services Routes
    |--------------------------------------------------------------------------
    |
    */

    // Add Service
    Route::post('/Services', 'ServicesController@store');
    // My Services
    Route::get('/getMyServices/{length?}', 'ServicesController@getMyServices');

    /*
    |--------------------------------------------------------------------------
    | Orders Routes
    |--------------------------------------------------------------------------
    |
    */

    // Add New Order
    Route::get('/Orders/{id}', 'OrdersController@show');
    // Show purchase Orders
    Route::get('/purchaseOrders/{length?}', 'OrdersController@getMyPurchaseOrders');
    // Show Incomeing Orders
    Route::get('/incomingOrders/{length?}', 'OrdersController@getMyIncomingOrders');
    // Show Single Order
    Route::get('/getOrderById/{orderId}', 'OrdersController@getOrderById');
    // Show Change The Status
    Route::get('/changeStatus/{order_id}/{status}', 'OrdersController@changeStatus');
    // Show Finish The Order
    Route::get('/finishOrder/{order_id}', 'OrdersController@finishOrder');

    /*
    |--------------------------------------------------------------------------
    | Comments Routes
    |--------------------------------------------------------------------------
    |
    */

    // Add New Comment
    Route::post('/Comments', 'CommentsController@store');
    // Show Comments
    Route::get('/Comments/{order_id}', 'CommentsController@show');

    /*
    |--------------------------------------------------------------------------
    | Messages Routes
    |--------------------------------------------------------------------------
    |
    */

    // Get The Messages
    Route::get('/Messages', 'MessagesController@index');
    // Send Messages
    Route::post('/Messages', 'MessagesController@store');
    // Show Single Message
    Route::get('/Messages/{message_id}', 'MessagesController@show');
    // Show Recived Messages
    Route::get('/GetRecivedMessages', 'MessagesController@GetRecivedMessages');
    // Show UnRead Messages
    Route::get('/GetUnReadMessages', 'MessagesController@GetUnReadMessages');
    // Show Read Messages
    Route::get('/GetReadMessages', 'MessagesController@GetReadMessages');

    /*
    |--------------------------------------------------------------------------
    | Favorites Routes
    |--------------------------------------------------------------------------
    |
    */

    // Add New Favorite
    Route::get('/Addfavorite/{service_id}', 'FavoriteController@Addfavorite');
    // Show All Favorite
    Route::get('/userFavorites', 'FavoriteController@userFavorites');
    // Delete Favorite
    Route::delete('/deleteFav/{fav_id}', 'FavoriteController@deleteFav');

    /*
    |--------------------------------------------------------------------------
    | Rating Routes
    |--------------------------------------------------------------------------
    |
    */

    // Add Then Will Update Your Vote
    Route::post('/addNewVote', 'VoteController@addNewVote');

    /*
    |--------------------------------------------------------------------------
    | Auth Users Routes
    |--------------------------------------------------------------------------
    |
    */

    // Get The Auth User
    Route::get('/GetAuthUser', 'UsersController@GetAuthUser');
    // Show All Charges Operations
    Route::get('/GetAllChargeOperation', 'UsersController@GetAllChargeOperation');
    // Show All Payments Operations
    Route::get('/GetAllPaymentOperation', 'UsersController@GetAllPaymentOperation');
    // Show All Profits Operations
    Route::get('/GetAllProfitOperation', 'UsersController@GetAllProfitOperation');
    // Show All Waiting Profits Operations
    Route::get('/GetAllWitingProfitOperation', 'UsersController@GetAllWitingProfitOperation');
    // Show All Balance Operations
    Route::get('/GetAllBalanceOperation', 'UsersController@GetAllBalanceOperation');
    // Get The Profit
    Route::post('/GetProfit', 'UsersController@GetProfit');

    /*
    |--------------------------------------------------------------------------
    | Payment Routes
    |--------------------------------------------------------------------------
    |
    */

    // Add To Credit
    Route::post('/AddCredit', 'PayController@AddCredit');

    /*
    |--------------------------------------------------------------------------
    | Notifications Routes
    |--------------------------------------------------------------------------
    |
    */

    // Get My Notifications
    Route::get('/GetMyNotifications/{length?}', 'NotificationController@GetMyNotifications');
    // Get UnRead Notifications
    Route::get('/GetMyUnReadNotifications/{length?}', 'NotificationController@GetMyUnReadNotifications');
    // Get Count Of Notifications
    Route::get('/GetNotificationsCount', 'NotificationController@GetNotificationsCount');
    // Get All User Notifications
    Route::get('/getAllUserNotifications', 'NotificationController@getAllUserNotifications');




});

/*
|--------------------------------------------------------------------------
| Services Routes
|--------------------------------------------------------------------------
|
*/

// Show Single Service
Route::get('/Services/{id}', 'ServicesController@show');
// Show All Service
Route::get('/getAllServices/{length?}', 'ServicesController@getAllServices');
// Show user Service
Route::get('/getUserServices/{userId}/{length?}', 'ServicesController@getUserServices');

/*
|--------------------------------------------------------------------------
| Categories Routes
|--------------------------------------------------------------------------
|
*/

// Show All Service By Categories
Route::get('/getServicesByCategoryId/{catId}/{length?}', 'CategoryController@getServicesByCategoryId');


/*
|--------------------------------------------------------------------------
| Notifications Routes
|--------------------------------------------------------------------------
|
*/

// Get Count Of Notifications and Return The Category And Check If The User Auth Or Not
Route::get('/GetNotificationsCount', 'NotificationController@GetNotificationsCount');


/*
|--------------------------------------------------------------------------
|                          Back-End Routes                                |
|--------------------------------------------------------------------------
|
*/

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
|
*/

Route::group(['middleware' => 'admin'], function() {
    Route::group(['prefix' => '/admin'], function() {
        Route::group(['namespace' => 'Admin'], function() {
            // Controllers Within The "App\Http\Controllers\Admin" Namespace
            /*
            |--------------------------------------------------------------------------
            | Dashboard Routes
            |--------------------------------------------------------------------------
            |
            */

            Route::get('/dashboard', [
                'uses' => 'AdminController@index',
                'as' => 'dashboard'
            ]);

            /*
            |--------------------------------------------------------------------------
            | Services Routes
            |--------------------------------------------------------------------------
            |
            */

            Route::get('/services', [
                'uses' => 'AdminServiceController@index',
                'as' => 'index.services'
            ]);

            Route::get('/services/waiting', [
                'uses' => 'AdminServiceController@waiting',
                'as' => 'waiting.services'
            ]);

            Route::get('/services/user/all/{id}', [
                'uses' => 'AdminServiceController@allUserServices',
                'as' => 'all.user.services'
            ]);

            Route::get('/services/filter_by/{status}', [
                'uses' => 'AdminServiceController@filter_by',
                'as' => 'filter.services'
            ]);

            Route::get('/services/filter_by_category/{cat_id}', [
                'uses' => 'AdminServiceController@filter_by_category',
                'as' => 'filter.category.services'
            ]);

            Route::post('/services/search', [
                'uses' => 'AdminServiceController@filter_by_search',
                'as' => 'filter.search.services'
            ]);

            Route::get('/services/changeStatus/{id?}', [
                'uses' => 'AdminServiceController@changeStatus',
                'as' => 'changeStatus.services'
            ]);

            Route::get('/services/delete/{id?}', [
                'uses' => 'AdminServiceController@deleteService',
                'as' => 'delete.services'
            ]);

            Route::get('/services/edit/{id?}', [
                'uses' => 'AdminServiceController@editService',
                'as' => 'edit.services'
            ]);

            Route::post('/services/update/{id?}', [
                'uses' => 'AdminServiceController@updateService',
                'as' => 'update.service'
            ]);

            Route::get('/services/getServiceInfo', [
                'uses' => 'AdminServiceController@getServiceInfo',
                'as' => 'card.services'
            ]);


            /*
            |--------------------------------------------------------------------------
            | Users Routes
            |--------------------------------------------------------------------------
            |
            */


            Route::get('/users', [
                'uses' => 'AdminUserController@index',
                'as' => 'index.users'
            ]);

            Route::get('/users/filter_by/{status}', [
                'uses' => 'AdminUserController@filter_by',
                'as' => 'filter.users'
            ]);

            Route::post('/users/search', [
                'uses' => 'AdminUserController@filter_by_search',
                'as' => 'filter.search.users'
            ]);

            Route::get('/users/edit/{id}', [
                'uses' => 'AdminUserController@editUser',
                'as' => 'edit.user'
            ]);



            Route::get('/users/delete/{id}', [
                'uses' => 'AdminUserController@deleteUser',
                'as' => 'delete.users'
            ]);

            Route::post('/users/update/{id}', [
                'uses' => 'AdminUserController@updateUser',
                'as' => 'update.user'
            ]);

            /*
            |--------------------------------------------------------------------------
            | Orders Routes
            |--------------------------------------------------------------------------
            |
            */

            Route::get('/orders', [
                'uses' => 'AdminOrderController@index',
                'as' => 'index.orders'
            ]);

            Route::get('/orders/user/owner/{id}', [
                'uses' => 'AdminOrderController@allUserOwnerOrders',
                'as' => 'all.user.owner.orders'
            ]);

            Route::get('/orders/user/other/{id}', [
                'uses' => 'AdminOrderController@allUserOtherOrders',
                'as' => 'all.user.other.orders'
            ]);


            Route::get('/orders/filter_by/{status}', [
                'uses' => 'AdminOrderController@filter_by',
                'as' => 'filter.orders'
            ]);

            Route::post('/orders/search', [
                'uses' => 'AdminOrderController@filter_by_search',
                'as' => 'filter.search.orders'
            ]);


            Route::get('/orders/delete/{id}', [
                'uses' => 'AdminOrderController@deleteOrder',
                'as' => 'delete.orders'
            ]);

            Route::get('/orders/edit/{id}', [
                'uses' => 'AdminOrderController@editOrder',
                'as' => 'edit.orders'
            ]);

            Route::get('/orders/getAllOrders/{id?}', 'AdminOrderController@getAllOrders');

            Route::post('/orders/update/{id}', [
                'uses' => 'AdminOrderController@updateOrder',
                'as' => 'update.order'
            ]);

            /*
            |--------------------------------------------------------------------------
            | Comments Routes
            |--------------------------------------------------------------------------
            |
            */


            Route::get('/orders/comment/delete/{id}', [
                'uses' => 'AdminOrderController@deleteComment',
                'as' => 'delete.comment'
            ]);

            /*
            |--------------------------------------------------------------------------
            | Messages Routes
            |--------------------------------------------------------------------------
            |
            */

            // NOTE

            /*
            |--------------------------------------------------------------------------
            | Favorites Routes
            |--------------------------------------------------------------------------
            |
            */

            // NOTE

            /*
            |--------------------------------------------------------------------------
            | Rating Routes
            |--------------------------------------------------------------------------
            |
            */

            // NOTE

            /*
            |--------------------------------------------------------------------------
            | Payment Routes
            |--------------------------------------------------------------------------
            |
            */

            Route::get('/profits', [
                'uses' => 'AdminProfitController@index',
                'as' => 'index.profits'
            ]);

            Route::get('/profits/user/{id}/waiting', [
                'uses' => 'AdminProfitController@waitingUserProfit',
                'as' => 'user.waiting.profits'
            ]);

            Route::get('/profits/user/{id}/all', [
                'uses' => 'AdminProfitController@allUserProfit',
                'as' => 'user.all.profits'
            ]);

            Route::get('/profits/today/{status?}', [
                'uses' => 'AdminProfitController@todayProfit',
                'as' => 'today.profits'
            ]);

            Route::get('/profits/waiting', [
                'uses' => 'AdminProfitController@waitingProfit',
                'as' => 'waiting.profits'
            ]);

            Route::get('/profits/done', [
                'uses' => 'AdminProfitController@doneProfit',
                'as' => 'done.profits'
            ]);

            Route::get('/profits/filter_by/{status}', [
                'uses' => 'AdminProfitController@filter_by',
                'as' => 'filter.profits'
            ]);

            Route::post('/profits/search', [
                'uses' => 'AdminProfitController@filter_by_search',
                'as' => 'filter.search.profits'
            ]);

            Route::post('/profits/search/date', [
                'uses' => 'AdminProfitController@filter_by_search_date',
                'as' => 'filter.search.date.profits'
            ]);


            Route::get('/profits/delete/{id}', [
                'uses' => 'AdminProfitController@deleteProfit',
                'as' => 'delete.profits'
            ]);

            Route::get('/profits/edit/{id}', [
                'uses' => 'AdminProfitController@editProfit',
                'as' => 'edit.profits'
            ]);

            Route::post('/profits/update/{id}', [
                'uses' => 'AdminProfitController@updateProfit',
                'as' => 'update.profits'
            ]);

            /*
            |--------------------------------------------------------------------------
            | Notifications Routes
            |--------------------------------------------------------------------------
            |
            */

            // NOTE:
        });

    });
});
