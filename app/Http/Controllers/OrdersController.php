<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Service;

use App\Order;

use Auth;

class OrdersController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        /**
        *  NOTE 0 Status => Waiting Order
        *  NOTE 1 Status => the Order Seen By The Provider Of This Service
        *  NOTE 2 Status => The Order Was Approved
        *  NOTE 3 Status => The Order Was Cancelled
        *  NOTE 4 Status => The Order Was Finished
        */

        $service = Service::findOrFail($id);
        if ($service) {
            $user = Auth::user();
            if ($user->id != $service->user_id) {
                $orderdItBefore = Order::where(function ($q) use ($user, $service) {
                    $q->where('user_order', $user->id);
                    $q->where('service_id', $service->id);
                })->count();
                if ($orderdItBefore == 0) {
                    $orders = new Order();
                    $orders->service_id = $service->id;
                    $orders->user_order = $user->id;
                    $orders->user_id = $service->user_id;
                    $orders->status = 0;
                    $orders->type = 0;

                    if($orders->save()) {
                        return 'true';
                    }
                    App::abort(403);
                }
                App::abort(403);
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
