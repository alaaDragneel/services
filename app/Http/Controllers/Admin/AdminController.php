<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Profit;

use App\User;

use App\Service;

use App\Order;

class AdminController extends Controller
{
    public function index()
    {
        // profits
        $websiteProfit = Profit::sum('website_profit');
        $usersProfit = Profit::where('status', 1)->sum('profit_price');
        // users
        $users = User::where('admin', 0)->count();
        $admins = User::where('admin', 1)->count();
        // services
        $services = Service::count();
        $waitingServices = Service::where('status', 0)->count();
        $approvedServices = Service::where('status', 1)->count();
        // orders
        $orders = Order::count();
        $newOrders = Order::where('status', 0)->count();
        $oldOrders = Order::where('status', 1)->count();
        $inProgressOrders = Order::where('status', 2)->count();
        $rejectedOrders = Order::where('status', 3)->count();
        $finshedOrders = Order::where('status', 4)->count();

        // checks for null
        $websiteProfit = $websiteProfit == null  ? 0  : $websiteProfit;
        $usersProfit = $usersProfit == null ? 0  : $usersProfit;
        return view('admin.dashboard', compact('websiteProfit', 'usersProfit', 'users', 'admins',
                                                'services', 'waitingServices', 'approvedServices',
                                                'orders', 'newOrders', 'oldOrders', 'inProgressOrders',
                                                'rejectedOrders', 'finshedOrders'));
    }
}
