<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Response;

use App;

use App\User;

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
    public function show($id) // NOTE For Save new Order Not Recommended Here by alaaDragneel
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

    public function getMyPurchaseOrders()
    {
        $user = Auth::user();
        $orders = Order::where('user_order', $user->id)
            ->with('services', 'getUserAddService')->orderBy('id', 'DESC')->get();

        return Response::json(['user' => $user, 'orders' => $orders], 200);
    }

    public function getMyIncomingOrders()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->with('services', 'getMyOrders')->orderBy('id', 'DESC')->get();

        return Response::json(['user' => $user, 'orders' => $orders], 200);
    }

    public function getOrderById($orderId) // NOTE to Get The Single Order by alaaDragneel
    {
        $authUser = Auth::user();
        $order = Order::findOrFail($orderId);
        if ($order) {
            // who add the services
            $user_id = User::where('id', $order->user_id)
            ->with(['services' => function ($q) {
                return $q->where('status', 1)->take(3)->orderBy('id', 'DESC');
            }])
            ->first();
            // who request the services
            $order_user = User::where('id', $order->user_order)
            ->with(['services' => function ($q) {
                return $q->where('status', 1)->take(3)->orderBy('id', 'DESC');
            }])
            ->first();

            if ($user_id->id != $order_user->id) {
                if ($authUser->id == $user_id->id) {
                    if ($order->status == 0) {                        
                        $order->status = 1;
                        $order->update();
                    }
                }
                $order = Order::where('id', $orderId)->with('services')->first();
                $orderCount = Order::where(function ($q) use ($order){
                    $q->where('service_id', $order->service_id);
                    $q->whereIn('status', [0, 1, 2, 4]); // status => 0 => New, 1 => Old, 2 => inprogress, 4 => finished
                })->count();
                return Response::json([
                    'user_id' => $user_id,
                    'order_user' => $order_user,
                    'order' => $order,
                    'ordersCount' => $orderCount,
                    'authUser' => $authUser
                ], 200);
            }
            App::abort(403);
        }
        App::abort(403);
    }

    public function changeStatus($order_id, $status)
    {
        $order = Order::findOrFail(intval($order_id));
        if ($order) {
            $statusCheck = [2, 3];
            if (in_array($status, $statusCheck)) {
                if ($status != $order->status) {
                    $order->status = intval($status);
                    if ($order->update()) {
                        return 'success';
                    }
                    App::abort(403);
                }
                App::abort(403);
            }
            App::abort(403);
        }
        App::abort(403);
    }
}
