<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    // User Relation
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
