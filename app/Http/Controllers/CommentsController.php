<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\AddCommentsRequest as addComment;

use App;

use Auth;

use App\Comment;

use App\Order;

use App\Events\CreateNotification as CreateNotify;

use App\Events\ReadNotification as ReadNotify;

use Event;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(addComment $request)
    {
        $user = Auth::user();
        $order = Order::findOrFail($request->orderId);
        if ($order) {
            if ($user->id == $order->user_id || $user->id == $order->user_order) {
                $comment = new Comment();
                $comment->user_id = $user->id;
                $comment->comment = strip_tags($request->comment);
                $comment->order_id = intval($request->orderId);
                if ($comment->save()) {
                    /*
                    | -------------------------------------------------
                    | make New Notification For The Recived User[Not Auth User]
                    | -------------------------------------------------
                    */

                    if ($user->id == $order->user_id) {
                        // Comment by User Who Add The Service
                        // Will GO To The user Who make The Order
                        $recivedUser = $order->user_order;
                    } else if ($user->id == $order->user_order) {
                        // Comment by User Who make The Order
                        // Will GO To The user Who Add The Service
                        $recivedUser = $order->user_id;
                    }

                    Event::fire(new CreateNotify($order->id, $user->id, $recivedUser, 'RecivedComment'));

                    return Comment::where('id', $comment->id)->with('user')->first();
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
    public function show($order_id)
    {

                        /*
                        | ----------------------------------------
                        | Seen Notification
                        | ----------------------------------------
                        |
                        */
                        // $notify = Note::where(function ($q) use ($message_id, $user) {
                        //     $q->where('notify_id', $message_id)->where('type', 'ReviceMessage');
                        //     $q->where('seen', 0)->where('user_id', $user->id);
                        // })->first();
                        // if ($notify) {
                        //     $notify->seen = 1;
                        //     $notify->update();
                        // }
        return Comment::where('order_id', $order_id)->with('user')->orderBy('id', 'DESC')->get();
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
