<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
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
