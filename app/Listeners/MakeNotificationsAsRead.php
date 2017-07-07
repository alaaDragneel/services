<?php

namespace App\Listeners;

use App\Events\ReadNotification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Notification as Note;

class MakeNotificationsAsRead
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
    public function handle(ReadNotification $event)
    {

        $notify = Note::where(function ($q) use ($event) {
            $q->where('notify_id', $event->id);
            $q->whereIn('type', $event->type);
            $q->where('seen', 0)->where('user_id', $event->authUser);
        })->get();
        
        if ($notify->count() > 0) {
            foreach ($notify as $noty) {
                $n = Note::findOrFail($noty->id);
                $n->seen = 1;
                $n->update();
            }
        }

    }
}
