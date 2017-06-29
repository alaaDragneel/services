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
        $cat = Cat::findOrFail($catId);
        if ($cat) {
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

            // Related Services
            // $ip = $request->server('REMOTE_ADDR');

            // $checkIfHasViewBefore = View::where('ip', $ip)->count();

            // if ($checkIfHasViewBefore == 0) {
            //     // most Viewd Services
            //     $sidebarSection1 =
            //         Service::join('users', 'users.id', '=', 'services.user_id')
            //                 ->leftJoin('views', 'services.id', '=', 'views.service_id')
            //                 ->select('services.id', 'services.name', DB::raw('COUNT(views.id) as view_count'))
            //                 ->groupBy('services.id')
            //                 ->where('services.status', 1)
            //                 ->where('services.cat_id', $catId)
            //                 ->orderBy('view_count', 'DESC')
            //                 ->take(6)
            //                 ->get();
            // } else {
            //     $catView = View::join('services', 'views.service_id', '=', 'services.id')
            //         ->where('ip', $ip)
            //         ->lists('services.cat_id')->all();
            //     $sidebarSection1 =
            //         Service::join('users', 'users.id', '=', 'services.user_id')
            //                 ->leftJoin('views', 'services.id', '=', 'views.service_id')
            //                 ->select('services.id', 'services.name', DB::raw('COUNT(views.id) as view_count'))
            //                 ->groupBy('services.id')
            //                 ->whereIn('services.cat_id', $catView)
            //                 ->where('services.status', 1)
            //                 ->orderBy('view_count', 'DESC')
            //                 ->take(6)
            //                 ->get();
            // }

            // append to User Orders Get the services from the same category

            // $guest = Auth::guest();
            // if (!$guest) {
            //   $user = Auth::user();
            //     $orderCat = Order::join('services', 'orders.service_id', '=', 'services.id')
            //         ->where('user_order', $user->id)
            //         ->lists('services.cat_id')->all();
            //     $sidebarSection2 =
            //         Service::join('users', 'users.id', '=', 'services.user_id')
            //                 ->select('services.id', 'services.name')
            //                 ->whereIn('services.cat_id', $orderCat)
            //                 ->where('services.status', 1)
            //                 ->inRandomOrder()
            //                 ->take(6)
            //                 ->get();
            // } else {
            //   $sidebarSection2 = null;
            // }

            $array = [
                'services' => $services,
                'cat' => $cat,
                // 'sidebarSection1' => $sidebarSection1,
                // 'sidebarSection2' => $sidebarSection2
            ];
            return Response::json($array, 200);

        }

        App::abort(403);
    }
}
