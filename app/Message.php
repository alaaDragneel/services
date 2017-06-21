<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public function getSendUser()
    {
        return $this->belongsTo('App\User', 'user_message_you');
    }

    public function getReceivedUser()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
