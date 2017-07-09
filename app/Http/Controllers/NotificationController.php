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

    public function GetMyNotificationsWithAjax()
    {
        $user = Auth::user();
        $notifications = Notify::where('user_id', $user->id)->with('userWhoSendNotification')->take(20)->orderBy('id', 'DESC')->get();
        $notificationsCount = Notify::where('user_id', $user->id)->where('seen', 0)->take(20)->orderBy('id', 'DESC')->count();
        $notife = '';
        if ($notifications->count() > 0) {
            foreach ($notifications as $notify) {
                $class = $notify->seen == 1 ? 'seen' : '';
                $notife .= '<li class="notification-real-li '. $class .'">';
                if ($notify->type == 'ReviceOrders'){
                    $notife .='<a href="#!/Order/'.$notify->notify_id.'"
                    title="New Buying Order From '. $notify->userWhoSendNotification->name .'
                    Order #' .$notify->notify_id .'">
                    <i class="fa fa-cart-plus text-green"></i>
                    New Buying Order From '. $notify->userWhoSendNotification->name .'
                    Order #'. $notify->notify_id .'
                    </a>';
                }
                if ($notify->type == 'ReviceMessage') {
                    $notife .= '<a href="#!/messageDetails/ '. $notify->notify_id .'/income"
                    title="New Message From '. $notify->userWhoSendNotification->name .'">
                    <i class="fa fa-envelope"></i> New Message From '. $notify->userWhoSendNotification->name .'
                    </a>';

                }
                if ($notify->type == 'AcceptedOrder') {
                    $notife .='<a href="#!/Order/'.$notify->notify_id.'"
                    title="'. $notify->userWhoSendNotification->name .' Accepted Your Order #'. $notify->notify_id .'!">
                    <i class="fa fa-check-circle text-green"></i> '. $notify->userWhoSendNotification->name .' Accepted Your Order #'. $notify->notify_id .'!
                    </a>';
                }
                if ($notify->type == 'RejectedOrder') {
                    $notife .='<a href="#!/Order/'.$notify->notify_id.'"
                    title="'. $notify->userWhoSendNotification->name .' Rejected Your Order #'. $notify->notify_id .'!">
                    <i class="fa fa-warning text-red"></i> '. $notify->userWhoSendNotification->name .' Rejected Your Order #'. $notify->notify_id .'!
                    </a>';
                }
                if ($notify->type == 'CompeleteOrder') {
                    $notife .='<a href="#!/Order/'.$notify->notify_id.'"
                    title="'. $notify->userWhoSendNotification->name .' Finished Order #'. $notify->notify_id .'!">
                    <i class="fa fa-truck text-blue""></i> '. $notify->userWhoSendNotification->name .' Finished Order #'. $notify->notify_id .'!
                    </a>';
                }

                if ($notify->type == 'RecivedComment') {
                    $notife .='<a href="#!/Order/'.$notify->notify_id.'"
                    title="'. $notify->userWhoSendNotification->name .' Commented On Order #'. $notify->notify_id .'!">
                    <i class="fa fa-comments text-aqua"></i> '. $notify->userWhoSendNotification->name .' Commented On Order #'. $notify->notify_id .'!
                    </a>';
                }
                $notife .= '</li>';
            }
        } else {
            $notife .= '<li style="position: absolute; top: 41%; left: 3%; font-size: 30px; color: #bbb;"><i class="fa fa-bell"></i> No Notifications!</li>';
        }
        $array = [
        'user' => $user,
        'notife' => $notife,
        'notifeCount' => $notificationsCount,
        ];
        return Response::json($array, 200);

    }

    public function GetNotificationsCount()
    {
        $user = Auth::user();
        $notificationsCount = getAllNotification($user->id);
        $favoritesCount = getFavCounter($user->id);
        $ordersCount = getAllPurchesOrderCounter($user->id);
        $messagesCount = getUnReadMessages($user->id);
        return Response::json([
            'notificationsCount' => $notificationsCount,
            'favoritesCount' => $favoritesCount,
            'ordersCount' => $ordersCount,
            'messagesCount' => $messagesCount
        ]);
    }
}
