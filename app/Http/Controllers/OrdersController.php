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

use App\Pay;

use App\Buy;

use App\Events\CreateNotification as CreateNotify;

use App\Events\ReadNotification as ReadNotify;

use Event;

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
                    // if the status == 4 that's mean it is finish and can order again
                    $q->whereIn('status', [0, 1, 2]);
                    $q->where('service_id', $service->id);
                })->count();
                if ($orderdItBefore == 0) {
                    /*
                    | --------------------------------------------------------------------------------------------------------------
                    | Check If the Money Of The User Can Buy the Order With Check If The Order Rejected OR Not Rejected Staus == 2
                    | --------------------------------------------------------------------------------------------------------------
                    | Get the Real Money If The Order Is New Or Old Or in Progrees The Money Will Be[معلقه]!
                    | If the Order Is Cancled The Money Goes Back To The User Who Make The Order [اللي عامل الخدمه]
                    | If the Order Is Finished The Money Goes To The Owner Of Service Of The Order [اللي عمل الخدمه]
                    */
                    $buyCheck = Buy::where(function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                        $q->where('finish', '!=', 2);
                    })->sum('buy_price');
                    /*
                    | -------------------------------------------------
                    | Check If the Money Of The User Can Buy the Order
                    | -------------------------------------------------
                    |
                    */
                    $pay = Pay::where('user_id', $user->id)->sum('price');

                    $ifUserHaveMoney = $pay - $buyCheck;
                    if ($ifUserHaveMoney >= $service->price) {

                        /*
                        | -------------------------------------------------
                        | Add New Order
                        | -------------------------------------------------
                        |
                        */
                        $orders = new Order();
                        $orders->service_id = $service->id;
                        $orders->user_order = $user->id;
                        $orders->user_id = $service->user_id;
                        $orders->status = 0;
                        $orders->type = 0;

                        if($orders->save()) {

                            /*
                            | -------------------------------------------------
                            | make New Payment
                            | -------------------------------------------------
                            */

                            $buy = new Buy();
                            $buy->user_id = $user->id;
                            $buy->recive_id = $orders->user_id;
                            $buy->order_id = $orders->id;
                            $buy->buy_price = $service->price;
                            $buy->finish = 0;
                            $buy->save();

                            /*
                            | -------------------------------------------------
                            | make New Notification For The Recived User[Not Auth User]
                            | -------------------------------------------------
                            */

                            Event::fire(new CreateNotify($orders->id, $user->id, $orders->user_id, 'ReviceOrders'));

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

    public function getMyPurchaseOrders($length = null)
    {
        if ($length === null) {
            $skipLengthOfServices = 0;
        } else {
            $skipLengthOfServices = $length;
        }
        $user = Auth::user();
        $orders = Order::where('user_order', $user->id)
        ->with('services', 'getUserAddService')
        ->skip($skipLengthOfServices)
        ->take(env('LIMIT_SERVICES'))
        ->orderBy('id', 'DESC')
        ->get();

        return Response::json(['user' => $user, 'orders' => $orders], 200);
    }

    public function getMyIncomingOrders($length = null)
    {
        if ($length === null) {
            $skipLengthOfServices = 0;
        } else {
            $skipLengthOfServices = $length;
        }

        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
        ->with('services', 'getMyOrders')
        ->skip($skipLengthOfServices)
        ->take(env('LIMIT_SERVICES'))
        ->orderBy('id', 'DESC')
        ->get();

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

                /*
                | ----------------------------------------
                | Seen Notification
                | ----------------------------------------
                |
                */

                Event::fire(new ReadNotify($orderId, ['ReviceOrders', 'AcceptedOrder', 'RejectedOrder', 'CompeleteOrder', 'RecivedComment']));

                $array = [
                    'user_id' => $user_id,
                    'order_user' => $order_user,
                    'order' => $order,
                    'ordersCount' => $orderCount,
                    'authUser' => $authUser
                ];
                return Response::json($array, 200);
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

                    /*
                    | -----------------------------------------------------
                    | Update The Buy Order If The Owner Rrejected The Order
                    | -----------------------------------------------------
                    |
                    */
                    if ($status == 3) {
                        $buy = Buy::where('order_id', $order_id)->first();
                        $buy->finish = 2;
                        $buy->update();
                    }

                    /*
                    | -------------------------------------
                    | Update The Order
                    | -------------------------------------
                    |
                    */

                    if ($order->update()) {
                        /*
                        | -----------------------------------------------------
                        | make New Notification For The User Who Make The Order
                        | -----------------------------------------------------
                        */
                        $userId = Auth::user()->id;

                        $noteType = $status == 2 ? 'AcceptedOrder' :  'RejectedOrder';

                        Event::fire(new CreateNotify($order->id, $userId, $order->user_order, $noteType));

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

    public function finishOrder($order_id)
    {
        $user = Auth::user();
        $order = Order::findOrFail(intval($order_id));
        if ($order) {

            if ($user->id == $order->user_order) {
                if ($order->status == 2) {
                    $order->status = 4;

                    /*
                    | -----------------------------------------------------------
                    | Update The Buy Order If The User Who Order Finish The Order
                    | -----------------------------------------------------------
                    |
                    */

                    $buy = Buy::where('order_id', $order_id)->first();
                    $buy->finish = 1;
                    $buy->update();

                    /*
                    | -------------------------------------
                    | Update The Order
                    | -------------------------------------
                    |
                    */

                    if ($order->update()) {

                        /*
                        | -------------------------------------------------------
                        | make New Notification For The User Who Accept The Order
                        | -------------------------------------------------------
                        */

                        Event::fire(new CreateNotify($order->id, $user->id, $order->user_id, 'CompeleteOrder'));


                        return 'success';
                    }
                }

                App::abort(403);
            }
            App::abort(403);
        }
        App::abort(403);
    }

    public function checkOrders()
    {
        $user = Auth::user();
        $purchaseOrders = getAllPurchesOrderCounter($user->id);
        return Response::json(['orders' => $purchaseOrders]);
    }
}
