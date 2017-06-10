<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // comment Relation
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    // Services Relation
    public function services()
    {
        return $this->belongsTo('App\Service');
    }

    // User Relations
    public function getMyOrders()
    {
        return $this->belongsTo('App\User', 'user_order');
    }

    public function getUserAddService()
    {
        return $this->belongsTo('App\User');
    }
}
