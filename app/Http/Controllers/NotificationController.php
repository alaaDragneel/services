<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App;

use Auth;

use Response;

use App\Category as Cat;

use App\Notification as Notify;

class NotificationController extends Controller
{
    public function GetMyNotifications($length = null)
    {
        $user = Auth::user();
        if ($length === null) {
            $skipLengthOfServices = 0;
        } else {
            $skipLengthOfServices = $length;
        }
        $notify = Notify::where('user_id', $user->id)->with('userWhoSendNotification')
        ->skip($skipLengthOfServices)
        ->take(env('LIMIT_SERVICES'))
        ->orderBy('id', 'DESC')->get();
        $array = [
            'user' => $user,
            'notify' => $notify
        ];
        return Response::json($array, 200);
    }

    public function GetMyUnReadNotifications($length = null)
    {
        $user = Auth::user();
        if ($length === null) {
            $skipLengthOfServices = 0;
        } else {
            $skipLengthOfServices = $length;
        }
        $notify = Notify::where(function ($q) use ($user) {
            $q->where('user_id', $user->id)->where('seen', 0);
        })->with('userWhoSendNotification')
        ->skip($skipLengthOfServices)
        ->take(env('LIMIT_SERVICES'))
        ->orderBy('id', 'DESC')->get();

        $array = [
            'user' => $user,
            'notify' => $notify
        ];

        return Response::json($array, 200);

    }

    public function GetNotificationsCount()
    {
        $categories = Cat::get(['id', 'name']);
        if (Auth::check()) {
            $user = Auth::user();
            $notificationsCount = getAllNotification($user->id);
            $favoritesCount = getFavCounter($user->id);
            $ordersCount = getAllPurchesOrderCounter($user->id);
            $messagesCount = getUnReadMessages($user->id);
            return Response::json([
                'login' => 'auth',
                'notificationsCount' => $notificationsCount,
                'favoritesCount' => $favoritesCount,
                'ordersCount' => $ordersCount,
                'categories' => $categories,
                'messagesCount' => $messagesCount,
                'user' => $user
            ]);
        }
        return Response::json([
            'login' => 'guest',
            'categories' => $categories,
        ]);

    }

    public function getAllUserNotifications()
    {
        $user = Auth::user();
        $notifications = getAllNotificationObjects($user->id);
        $notificationsCount = getAllNotification($user->id);

        return Response::json([
            'notifications' => $notifications,
            'notificationsCount' => $notificationsCount,
        ]);
    }
}
