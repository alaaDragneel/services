<?php

namespace App\Listeners;

use App\Events\CreateNotification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Notification as Note;

class CreateNotifications
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Notification  $event
     * @return void
     */
    public function handle(CreateNotification $event)
    {
        $note = new Note();
        $note->notify_id = $event->id;
        $note->user_notify_you = $event->user_notify_you;
        $note->user_id = $event->user_id ;
        $note->type = $event->type;
        $note->seen = 0;
        $note->save();
    }
}
