<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\AddMessagesRequest;

use Auth;

use Response;

use App;

use App\User;

use App\Message;

use App\Events\CreateNotification as CreateNotify;

use App\Events\ReadNotification as ReadNotify;

use Event;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { // My Send Messages
        $user = Auth::user();
        return Message::where('user_message_you', $user->id)->with('getReceivedUser')->orderBy('id', 'DESC')->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function GetRecivedMessages()
    { // My Recived Messages
        $user = Auth::user();
        return Message::where('user_id', $user->id)->with('getSendUser')->orderBy('id', 'DESC')->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function GetUnReadMessages()
    { // My UnRead Messages
        $user = Auth::user();
        return Message::where(function ($q) use ($user) {
            $q->where('user_id', $user->id);
            $q->where('seen', 0);
        })->with('getSendUser')->orderBy('id', 'DESC')->get();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function GetReadMessages()
    { // My Read Messages
        $user = Auth::user();
        return Message::where(function ($q) use ($user) {
            $q->where('user_id', $user->id);
            $q->where('seen', 1);
        })->with('getSendUser')->orderBy('id', 'DESC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddMessagesRequest $request)
    {
        $user = Auth::user();
        $recivedUser = User::findOrFail(intval($request->userId));
        if ($recivedUser) {
            if ($user->id != $recivedUser->id) {
                $message = new Message();
                $message->user_message_you = $user->id;
                $message->user_id = $recivedUser->id;
                $message->title = strip_tags($request->title);
                $message->message = strip_tags($request->message);
                if ($message->save()) {
                    /*
                    | -------------------------------------------------
                    | make New Message For The Recived User[Not Auth User]
                    | -------------------------------------------------
                    */

                    Event::fire(new CreateNotify($message->id, $user->id, $recivedUser->id, 'ReviceMessage'));
                    return 'success';
                }
                App::abort(403);
            }
            App::abort(403);
        }
        App::abort(403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($message_id)
    {
        $message = Message::findOrFail(intval($message_id));
        if ($message) {
            $user = Auth::user();
            if ($user->id == $message->user_id || $user->id == $message->user_message_you) {
                if ($message->seen == 0 && $user->id == $message->user_id) {
                    $message->seen = 1;
                    $message->save();
                }

                /*
                | ----------------------------------------
                | Seen Notification
                | ----------------------------------------
                |
                */

                Event::fire(new ReadNotify($message_id, ['ReviceMessage']));

                return Message::where('id', $message_id)->with('getReceivedUser', 'getSendUser')->first();
            }
            App::abort(403);
        }
        App::abort(403);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
