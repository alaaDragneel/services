<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App;

use Auth;

use Response;

use App\Notification as Notify;

class NotificationController extends Controller
{
    public function GetMyNotifications()
    {
        $user = Auth::user();
        $notify = Notify::where('user_id', $user->id)->with('userWhoSendNotification')->orderBy('id', 'DESC')->get();

        $array = [
            'user' => $user,
            'notify' => $notify
        ];

        return Response::json($array, 200);

    }

    public function GetMyUnReadNotifications()
    {
        $user = Auth::user();
        $notify = Notify::where(function ($q) use ($user) {
            $q->where('user_id', $user->id)->where('seen', 0);
        })->with('userWhoSendNotification')->orderBy('id', 'DESC')->get();

        $array = [
            'user' => $user,
            'notify' => $notify
        ];

        return Response::json($array, 200);

    }
}
