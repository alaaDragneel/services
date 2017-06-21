<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    // User Relation
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
    // own User Relation
    public function getOwnUserService()
    {
        return $this->belongsTo('App\User', 'own_user');
    }
    // Services Relation
    public function service()
    {
        return $this->belongsTo('App\Service', 'service_id');
    }

}
