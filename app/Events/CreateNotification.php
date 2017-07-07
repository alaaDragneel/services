<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use Auth;

class CreateNotification extends Event
{
    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
     public function __construct($notify_id, $user_notify_you, $user_id, $type)
     {
         $this->id = $notify_id;
         $this->user_notify_you = $user_notify_you;
         $this->user_id = $user_id;
         $this->type = $type;
     }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
