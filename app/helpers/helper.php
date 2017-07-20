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

function waitingServicesCount() {
    return \App\Service::where('status', 0)->count();
}

function waitingProfitCount() {
    return \App\Profit::where('status', 0)->count();
}

function doneProfitCount() {
    return \App\Profit::where('status', 1)->count();
}

function getTimeAfterDayes($time, $type) {
    if ($type == 'moment') {
        return \Carbon\Carbon::parse($time)->addDays(env('PROFIT_DAYS'))->diffForHumans();
    }
    if ($type == 'date') {
        return \Carbon\Carbon::parse($time)->addDays(env('PROFIT_DAYS'))->toFormattedDateString();
    }
}

function getTimeToday($type) {
    if ($type == 'Date Only') {
        // Jul 20, 2017
        return \Carbon\Carbon::today()->toFormattedDateString();
    }
    if ($type == 'Start Date Time') {
        // 2017-7-20 00:00:00  - env(PROFIT_DAYS) Dayes
        return \Carbon\Carbon::today()->startOfDay()->subDays(env('PROFIT_DAYS'))->toDateTimeString();
    }
    if ($type == 'End Date Time') {
        // 2017-7-20 23:59:59 - env(PROFIT_DAYS) Dayes
        return \Carbon\Carbon::today()->endOfDay()->subDays(env('PROFIT_DAYS'))->toDateTimeString();
    }
}

function getTimeTodaCount() {
    $profits = \App\Profit::where(function ($q) {
        // Larger Than the day before now By 7 days
        $q->where('created_at', '>=' , getTimeToday('Start Date Time'));
        // lower Than the day before now By 7 days
        $q->where('created_at', '<=' , getTimeToday('End Date Time'));
        $q->where('status', 0);
    })->count();
    return $profits;
}
