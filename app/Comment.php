<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    // User Relation
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    // Order Relation
    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}
