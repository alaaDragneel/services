<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Order;

use App\Pay;

use App\Buy;

use App\Comment;

class AdminOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    public function index()
    {

        $orders = Order::with('getMyOrders', 'getUserAddService', 'services')->paginate(env('LIMIT_SERVICES'));
        return view('admin.orders.orders', compact('orders'));
    }

    public function deleteOrder($id)
    {
        $order = Order::findOrFail($id);
        $buy = Buy::where('order_id', $order->id)->delete();
        $order->delete();
        return redirect()->route('index.orders')->with('success', 'order deleted successfully');
    }

    public function deleteComment($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return redirect()->back()->with('success', 'Comment deleted successfully');
    }

    public function editOrder($id)
    {
            $order = Order::where('id', $id)->with('getMyOrders', 'getUserAddService', 'services', 'comments')->first();
            if ($order) {

                $orderOwnerCharge = Pay::where('user_id', $order->getMyOrders->id)->sum('price');

                $orderOwnerPays = Buy::where('user_id', $order->getMyOrders->id)->where('finish', '!=', 2)->sum('buy_price');

                $orderOwnerProfits = Buy::where('recive_id', $order->getMyOrders->id)->where('finish', 1)->sum('buy_price');

                $serviceOwnerCharge = Pay::where('user_id', $order->getUserAddService->id)->sum('price');

                $serviceOwnerPays = Buy::where('user_id', $order->getUserAddService->id)->where('finish', '!=', 2)->sum('buy_price');

                $serviceOwnerProfits = Buy::where('recive_id', $order->getUserAddService->id)->where('finish', 1)->sum('buy_price');

                return view('admin.orders.edit', compact('order', 'orderOwnerCharge', 'orderOwnerPays', 'orderOwnerProfits',
                                                            'serviceOwnerCharge', 'serviceOwnerPays', 'serviceOwnerProfits'));
            }
        return App::abort(404);
    }

    public function updateOrder($id, Request $request)
    {
        $status = [0, 1, 2, 3, 4];
        if (in_array($request->status, $status)) {
            $order = Order::findOrFail($id);
            $order->status = $request->status;
            /*
            | -------------------------------------------------------------------
            | Update The Buy Order If The Admin make It New || Old || In prgress
            | -------------------------------------------------------------------
            |
            */
            if ($request->status == 0 || $request->status == 1 || $request->status == 2) {
                $buy = Buy::where('order_id', $order->id)->first();
                $buy->finish = 0;
                $buy->update();
            }

            /*
            | -----------------------------------------------------
            | Update The Buy Order If The Admin Rrejected The Order
            | -----------------------------------------------------
            |
            */
            if ($request->status == 3) {
                $buy = Buy::where('order_id', $order->id)->first();
                $buy->finish = 2;
                $buy->update();
            }

            /*
            | -----------------------------------------------------------
            | Update The Buy Order If The Admin Finish The Order
            | -----------------------------------------------------------
            |
            */

            if ($request->status == 4) {
                $buy = Buy::where('order_id', $order->id)->first();
                $buy->finish = 1;
                $buy->update();
            }

            $updateOrder = $order->update();
            if ($updateOrder) {
                return redirect()->back()->with('success', 'Order Updated successfully');
            }
            return redirect()->back()->with('error', 'Error Happend Tray Again');
        }
        return redirect()->back()->with('error', 'Error Miss With The Status values');


    }


        public function filter_by($status = null)
        {
            if ($status != null) {
                $statusCheck = [0, 1, 2, 3, 4, 5, 'id-ASC', 'id-DESC'];
                if (in_array($status, $statusCheck)) {
                    if ($status == 5) { // NOTE Mean Get All Services
                        $orders = Order::with('getMyOrders', 'getUserAddService', 'services')->paginate(env('LIMIT_SERVICES'));
                    } else if ($status == 'id-ASC' || $status == 'id-DESC') {
                        $explode = explode('-', $status);
                        $orders = Order::orderBy($explode[0], $explode[1])->with('getMyOrders', 'getUserAddService', 'services')->paginate(env('LIMIT_SERVICES'));
                    } else {
                        $orders = Order::where('status', $status)->with('getMyOrders', 'getUserAddService', 'services')->paginate(env('LIMIT_SERVICES'));
                    }
                } else {
                    return redirect()->back()->with('error', 'Error With The Values');
                }
            } else {
                $orders = Order::with('getMyOrders', 'getUserAddService', 'services')->paginate(env('LIMIT_SERVICES'));
            }

            return view('admin.orders.orders', compact('orders'));
        }

        public function filter_by_search(Request $request)
        {
            $search = strip_tags($request->search);
            $orders = Order::where('id', "$search")->with('getMyOrders', 'getUserAddService', 'services')->paginate(env('LIMIT_SERVICES'));
            return view('admin.orders.orders', compact('orders'));
        }

}
