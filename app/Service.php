<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    // User Relation
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    // Category Relation
    public function category()
    {
        return $this->belongsTo('App\Category', 'cat_id');
    }

    // Order Relation
    public function orders()
    {
        return $this->hasMany('App\Order', 'service_id');
    }
    // Vote Relation
    public function votes()
    {
        return $this->hasMany('App\Vote');
    }
    // View Relation
    public function view()
    {
        return $this->hasMany('App\View');
    }
}
