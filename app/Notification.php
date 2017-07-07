<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    /*
    | ----------------------------------------
    | Setuations Of Notification
    | ----------------------------------------
    | The Notification Will Work In The Following Setuations
    |
    | ------- For The Owner Of The Service Only -------
    | Recive Order
    | ------- For The Owner Of The Service Only -------
    |
    | Recive Messages
    | Comment
    | Compelete Service
    |
    | ------- For The User Who Order The Service Only -------
    | Done Order
    | Reject Order
    | ------- For The User Who Order The Service Only -------
    |
    | ------- For The Owner Of The Service Only -------
    | Compelete Order
    | ------- For The Owner Of The Service Only -------
    |
    */
    // User Relations
    public function getUserSendNotification()
    {
        return $this->belongsTo('App\User', 'user_notify_you');
    }

    public function getUserReceiveNotify()
    {
        return $this->belongsTo('App\User');
    }
}
