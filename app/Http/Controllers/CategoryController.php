<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Auth;

use DB;

use Response;

use App;

use App\Service;

use App\View;

use App\Order;

use App\Category as Cat;

class CategoryController extends Controller
{
    public function getServicesByCategoryId($catId, $length = null)
    {
        $singleCat = Cat::findOrFail($catId);
        if ($singleCat) {
            if ($length === null) {
                $skipLengthOfServices = 0;
            } else {
                $skipLengthOfServices = $length;
            }
            // all services Depinding On Category Id
            $services =
                Service::join('users', 'users.id', '=', 'services.user_id')
                    ->leftJoin('votes', 'services.id', '=', 'votes.service_id')
                    ->select('services.*',
                        DB::raw('SUM(votes.vote) as votes_sum'),
                        DB::raw('COUNT(votes.vote) as votes_count'))
                    ->with('user')
                    ->groupBy('services.id')
                    ->where('services.status', 1)
                    ->where('services.cat_id', $catId)
                    ->skip($skipLengthOfServices)
                    ->take(env('LIMIT_SERVICES'))
                    ->orderBy('votes_sum', 'DESC')
                    ->get();
            if ($length === null) {
                // All Cateogries
                $cat = Cat::where('id', '!=', $catId)->orderBy('id', 'DESC')->get(['id', 'name']);

                // Related Services

                // most Viewd Services
                $sidebarSection1 =
                Service::join('users', 'users.id', '=', 'services.user_id')
                    ->leftJoin('views', 'services.id', '=', 'views.service_id')
                    ->select('services.id', 'services.name', DB::raw('COUNT(views.id) as view_count'))
                    ->groupBy('services.id')
                    ->where('services.status', 1)
                    ->where('services.cat_id', $catId)
                    ->orderBy('view_count', 'DESC')
                    ->take(6)
                    ->get();
                    if ($sidebarSection1->count() <= 0) {
                        $sidebarSection1 = null;
                    }


                // append to User Orders Get the services from the same category

                $guest = Auth::guest();
                if (!$guest) {
                    $user = Auth::user();
                    $orderCat = Order::join('services', 'orders.service_id', '=', 'services.id')
                        ->where('user_order', $user->id)
                        ->lists('services.cat_id')->all();
                    $sidebarSection2 =
                    Service::join('users', 'users.id', '=', 'services.user_id')
                        ->select('services.id', 'services.name')
                        ->whereIn('services.cat_id', $orderCat)
                        ->where('services.status', 1)
                        ->inRandomOrder()
                        ->take(6)
                        ->get();
                } else {
                    $sidebarSection2 = null;
                }

                // most purshed Services From Same Category
                $sidebarSection3 =
                Service::join('orders', 'services.id', '=', 'orders.service_id')
                    ->select('services.id', 'services.name', DB::raw('COUNT(orders.id) as order_count'))
                    ->groupBy('services.id')
                    ->where('services.status', 1)
                    ->where('services.cat_id', $catId)
                    ->orderBy('order_count', 'DESC')
                    ->take(6)
                    ->get();
                    if ($sidebarSection3->count() <= 0) {
                        $sidebarSection3 = null;
                    }
                    $array = [
                        'services' => $services,
                        'cat' => $cat,
                        'singleCat' => $singleCat,
                        'sidebarSection1' => $sidebarSection1,
                        'sidebarSection2' => $sidebarSection2,
                        'sidebarSection3' => $sidebarSection3,
                    ];
                    return Response::json($array, 200);
            }
            $array = [
                'services' => $services,
            ];
            return Response::json($array, 200);

        }

        App::abort(403);
    }
}
