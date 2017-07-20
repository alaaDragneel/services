<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;

use App;

use App\Profit;

class AdminProfitController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    public function index()
    {
        $profits = Profit::with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.profits.profits', compact('profits'));
    }

    public function waitingUserProfit($id)
    {

        $profits = Profit::where('status', 0)->where('user_id', $id)->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        if ($profits) {
            return view('admin.profits.profits', compact('profits'));
        }
        return redirect()->back()->with('error', 'User Does\'nt Exist');
    }

    public function allUserProfit($id)
    {

        $profits = Profit::where('user_id', $id)->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        if ($profits) {
            return view('admin.profits.profits', compact('profits'));
        }
        return redirect()->back()->with('error', 'User Does\'nt Exist');
    }

    public function todayProfit($status = null)
    {
        if ($status == null) {
            // NOTE getTimeToday() Can Found In The Helper.php File
            $profits = Profit::where(function ($q) {
                // Larger Than the day before now By 7 days
                $q->where('created_at', '>=' , getTimeToday('Start Date Time'));
                // lower Than the day before now By 7 days
                $q->where('created_at', '<=' , getTimeToday('End Date Time'));
            })->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        } else {
            if ($status == 'waiting') {
                $profits = Profit::where(function ($q) {
                    $q->where('created_at', '>=' , getTimeToday('Start Date Time'));
                    $q->where('created_at', '<=' , getTimeToday('End Date Time'));
                    $q->where('status', 0);
                })->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
            }
            if ($status == 'done') {
                $profits = Profit::where(function ($q) {
                    $q->where('created_at', '>=' , getTimeToday('Start Date Time'));
                    $q->where('created_at', '<=' , getTimeToday('End Date Time'));
                    $q->where('status', 1);
                })->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
            }
        }
        return view('admin.profits.profits', compact('profits'));
    }

    public function waitingProfit()
    {
        $profits = Profit::where('status', 0)->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.profits.profits', compact('profits'));
    }

    public function doneProfit()
    {
        $profits = Profit::where('status', 1)->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.profits.profits', compact('profits'));
    }

    public function deleteProfit($id)
    {
        $profit = Profit::findOrFail($id);
        $buy = Buy::where('order_id', $profit->id)->delete();
        $profit->delete();
        return redirect()->route('index.profits')->with('success', 'Profit deleted successfully');
    }

    public function editProfit($id)
    {
            $profit = Profit::where('id', $id)->with('getMyOrders', 'getUserAddService', 'services', 'comments')->first();
            if ($profit) {

                $profitOwnerCharge = Pay::where('user_id', $profit->getMyOrders->id)->sum('price');

                $profitOwnerPays = Buy::where('user_id', $profit->getMyOrders->id)->where('finish', '!=', 2)->sum('buy_price');

                $profitOwnerProfits = Buy::where('recive_id', $profit->getMyOrders->id)->where('finish', 1)->sum('buy_price');

                $serviceOwnerCharge = Pay::where('user_id', $profit->getUserAddService->id)->sum('price');

                $serviceOwnerPays = Buy::where('user_id', $profit->getUserAddService->id)->where('finish', '!=', 2)->sum('buy_price');

                $serviceOwnerProfits = Buy::where('recive_id', $profit->getUserAddService->id)->where('finish', 1)->sum('buy_price');

                return view('admin.profits.edit', compact('order', 'orderOwnerCharge', 'orderOwnerPays', 'orderOwnerProfits',
                                                            'serviceOwnerCharge', 'serviceOwnerPays', 'serviceOwnerProfits'));
            }
        return App::abort(404);
    }

    public function updateProfit($id, Request $request)
    {
        $status = [0, 1, 2, 3, 4];
        if (in_array($request->status, $status)) {
            $profit = Profit::findOrFail($id);
            $profit->status = $request->status;
            /*
            | -------------------------------------------------------------------
            | Update The Buy Order If The Admin make It New || Old || In prgress
            | -------------------------------------------------------------------
            |
            */
            if ($request->status == 0 || $request->status == 1 || $request->status == 2) {
                if ($request->status == 2) {
                    $adminStatus = 'AdminAccepted';
                }
                $buy = Buy::where('order_id', $profit->id)->first();
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
                $adminStatus = 'AdminRejected';
                $buy = Buy::where('order_id', $profit->id)->first();
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
                $adminStatus = 'AdminCompeleted';
                $buy = Buy::where('order_id', $profit->id)->first();
                $buy->finish = 1;
                $buy->update();
            }
            $user = \Auth::user();
            /*
            | -----------------------------------------------------------
            | make New Notifications For The Order Owner
            | -----------------------------------------------------------
            */

            Event::fire(new CreateNotify($profit->id, $user->id, $profit->user_order, $adminStatus));

            /*
            | -----------------------------------------------------------
            | make New Notifications For The service Owner
            | -----------------------------------------------------------
            */

            Event::fire(new CreateNotify($profit->id, $user->id, $profit->user_id, $adminStatus));

            $updateOrder = $profit->update();
            if ($updateOrder) {
                return redirect()->back()->with('success', 'Profit Updated successfully');
            }
            return redirect()->back()->with('error', 'Error Happend Tray Again');
        }
        return redirect()->back()->with('error', 'Error Miss With The Status values');


    }


    public function filter_by($status = null)
    {
        if ($status != null) {
            $statusCheck = [0, 1, 2, 'id-ASC', 'id-DESC'];
            if (in_array($status, $statusCheck)) {
                if ($status == 2) { // NOTE Mean Get All Profits
                    $profits = Profit::with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
                } else if ($status == 'id-ASC' || $status == 'id-DESC') {
                    $explode = explode('-', $status);
                    $profits = Profit::with('user')->orderBy($explode[0], $explode[1])->paginate(env('LIMIT_SERVICES'));
                } else {
                    $profits = Profit::where('status', $status)->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
                }
            } else {
                return redirect()->back()->with('error', 'Error With The Values');
            }
        } else {
            $profits = Profit::with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        }

        return view('admin.profits.profits', compact('profits'));
    }

    public function filter_by_search(Request $request)
    {
        $this->validate($request, [
            'search' => 'required'
        ]);

        $search = strip_tags($request->search);
        $profits = Profit::where('id', "$search")->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.profits.profits', compact('profits'));
    }

    public function filter_by_search_date(Request $request)
    {
        $this->validate($request, [
            'date_search' => 'required|date'
        ]);
        $search = \Carbon\Carbon::parse($request->date_search)->subDays(env('PROFIT_DAYS'));
        $startOfDay = $search->startOfDay()->toDateTimeString();
        $endOfDay = $search->endOfDay()->toDateTimeString();

        $profits = Profit::where(function ($q) use ($startOfDay, $endOfDay) {
            $q->where('created_at', '>=' , $startOfDay);
            $q->where('created_at', '<=' , $endOfDay);
            $q->where('status', 0);
        })->with('user')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.profits.profits', compact('profits'));
    }
}
