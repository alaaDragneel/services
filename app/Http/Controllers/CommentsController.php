<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\AddCommentsRequest as addComment;

use App;

use Auth;

use App\Comment;

use App\Order;

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
