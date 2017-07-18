<?php

function getFavCounter($user_id) {
    return App\Favorite::where('user_id', $user_id)->count();
}

function getAllPurchesOrderCounter($user_id) {
    return App\Order::where(function ($q) use ($user_id) {
        $q->where('user_order', $user_id)->where('status', 0);
    })->count();
}

function getUnReadMessages($user_id) {
    return App\Message::where(function ($q) use ($user_id) {
        $q->where('user_id', $user_id)->where('seen', 0);
    })->count();
}

function getAllNotification($user_id) {
    return App\Notification::where(function ($q) use ($user_id) {
        $q->where('user_id', $user_id)->where('seen', 0);
    })->count();
}

function getAllNotificationObjects($user_id) {
    return App\Notification::where('user_id', $user_id)
    ->with('userWhoSendNotification')
    ->take(20)->orderBy('id', 'DESC')->get();
}

function getParseIntVal($var) {
    return intval($var);
}
