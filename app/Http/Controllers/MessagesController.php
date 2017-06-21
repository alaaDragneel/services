<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\AddMessagesRequest;

use Auth;

use App;

use App\User;

use App\Message;

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
