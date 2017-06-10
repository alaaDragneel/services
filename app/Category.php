<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // service Relation
    public function services()
    {
        return $this->hasMany('App\Service');
    }
}
