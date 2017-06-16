<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // service Relation
    public function services()
    {
        return $this->hasMany('App\Service');
    }

    // Order Relations
    public function ordersIMade()
    {
        return $this->hasMany('App\Order', 'user_order');
    }

    public function getMyServiceOrder()
    {
        return $this->hasMany('App\Order');
    }

    // Message Relations
    public function getMessagesIAdd()
    {
        return $this->hasMany('App\Message', 'user_message_you');
    }

    public function getMessagesIRecived()
    {
        return $this->hasMany('App\Message');
    }
    // Notification Relations
    public function getMyNotify()
    {
        return $this->hasMany('App\Notification', 'user_notify_you');
    }

    public function getMyNotification()
    {
        return $this->hasMany('App\Notification');
    }

    // vote Relation
    public function votes()
    {
        return $this->hasMany('App\Vote');
    }

    // Comment Relation
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
