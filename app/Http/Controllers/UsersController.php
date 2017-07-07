<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Auth;

use Response;

use App\Pay;

use App\Buy;

class UsersController extends Controller
{
    public function GetAuthUser()
    {
    	return Auth::user();
    }

    public function GetAllChargeOperation()
    {
        $user = Auth::user();
        $pays = Pay::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        $sumPrice = Pay::where('user_id', $user->id)->sum('price');

        return Response::json(['user' => $user, 'pays' => $pays, 'sumPrice' => $sumPrice], 200);
    }

    public function GetAllPaymentOperation()
    {
        $user = Auth::user();
        $buys = Buy::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        $sumPrice = Buy::where(function ($q) use ($user) {
            $q->where('user_id', $user->id);
            $q->where('finish', '!=', 2);
        })->sum('buy_price');

        return Response::json(['user' => $user, 'buys' => $buys, 'sumPrice' => $sumPrice], 200);
    }

    public function GetAllProfitOperation()
    {
        $user = Auth::user();

        $profits = Buy::where(function ($q) use ($user) {
            $q->where('recive_id', $user->id);
            $q->where('finish', 1);
        })->orderBy('id', 'DESC')->get();

        $sumPrice = Buy::where(function ($q) use ($user) {
            $q->where('recive_id', $user->id);
            $q->where('finish', 1);
        })->sum('buy_price');

        return Response::json(['user' => $user, 'profits' => $profits, 'sumPrice' => $sumPrice], 200);
    }

    public function GetAllBalanceOperation()
    {
        /*
        |-----------------------------------------
        | Operations
        |-----------------------------------------
        | Charge Operations
        | Payment Operations
        | Profit Operations
        */

        $user = Auth::user();

        /*
        |-----------------------------------------
        | Operations
        |-----------------------------------------
        | Charge Operations
        |
        */

        $userCharge = Pay::where('user_id', $user->id)->sum('price');

        /*
        |-----------------------------------------
        | Operations
        |-----------------------------------------
        | Payment Operations
        | NOTE Don't Calculate The Rejected Orders [2 => rejected]
        |
        */

        $userPays = Buy::where(function ($q) use ($user) {
            $q->where('user_id', $user->id);
            $q->where('finish', '!=', 2);
        })->sum('buy_price');

        /*
        |-----------------------------------------
        | Operations
        |-----------------------------------------
        | Profits Operations
        | NOTE Only Calculate The Payed [Finished] Orders [1 => Finished]
        |
        */

        $userProfits = Buy::where(function ($q) use ($user) {
            $q->where('recive_id', $user->id);
            $q->where('finish', 1);
        })->sum('buy_price');

        $array = [
            'user' => $user,
            'userCharge' => $userCharge,
            'userPays' => $userPays,
            'userProfits' => $userProfits,
        ];

        return Response::json($array, 200);
    }

}
