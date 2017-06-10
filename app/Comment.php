<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    // Order Relation
    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}
