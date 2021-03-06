<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\AddServicesRequest;

use Auth;

use DB;

use Image;

use Response;

use App\User;

use App\Service;

use App\View;

use App\Vote;

use App\Order;

use App\Category as Cat;

use App\Events\ReadNotification as ReadNotify;

use Event;

class ServicesController extends Controller
{

    public function getCategory()
    {
        return Cat::get(['id', 'name']);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddServicesRequest $request)
    {
        $user = Auth::user();
        $prices = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        if (in_array($request->price, $prices)) {

            $services = new Service();
            $services->name = $request->name;
            $services->description = $request->description;
            $services->cat_id = $request->cat_id;
            $services->price = $request->price;
            $services->image = $this->uploadImage($request->file('image'));
            $services->user_id = $user->id;
            $addService = $services->save();
            if (!$addService) {
                return 'error';
            }
            return 'success';
        }
        return 'priceError';

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if (Auth::check()) {
            $userId = Auth::user()->id;
        } else {
            $userId = 0;
        }
        /*Get Data*/
        $service = Service::where('id', $id)->with('user')->withCount('votes')->first();
        $sumVotes = Vote::where('service_id', $service->id)->sum('vote');
        if ($service->status != 1) {
            if (Auth::guest()) {
                abort(403);
            } else {
                if ($userId != $service->user_id) {
                    abort(403);
                }
            }
        }

        /*
        | ----------------------------------------
        | Seen Notification
        | ----------------------------------------
        |
        */

        Event::fire(new ReadNotify($service->id, ['AcceptedService', 'RejectedService']));


        /*Add New view*/
        $ip = $request->server('REMOTE_ADDR');
        $viewCount = View::where(function ($q) use($ip, $userId, $service) {
            $q->where('ip', $ip);
            $q->where('user_id', $userId);
            $q->where('service_id', $service->id);
        })->count();
        if ($viewCount == 0) {
            if ($userId != $service->user_id) {
                $guest = Auth::guest();
                $view = new View();
                $view->service_id = $id; // id prefer to service id
                if ($guest) {
                    $view->user_id = 0;
                } else {
                    $view->user_id = $user->id;
                }
                $view->ip = $ip;
                $view->save();
            }
        }
        /*Add New view*/

        $ordersCount = Order::where(function ($q) use ($service){
            $q->where('service_id', $service->id);
            $q->whereIn('status', [0, 1, 2, 4]); // status => 0 => New, 1 => Old, 2 => inprogress, 4 => finished
        })->count();

        if (Auth::check()) {
            $user = Auth::user();
            $myOwnServicesInSameCat = Service::where(function ($q) use($service, $user) {
                $q->where('cat_id', $service->cat_id); // in same cat
                $q->where('user_id', $user->id); // all my services
                $q->where('id', '!=', $service->id); // not the current services
            })->with('user')->withCount('view')->orderBy('id', 'DESC')->take(4)->get();

            $otherServicesInSameCat =
                Service::join('users', 'users.id', '=', 'services.user_id')
                    ->leftJoin('votes', 'services.id', '=', 'votes.service_id')
                    ->select('services.*',
                                DB::raw('SUM(votes.vote) as votes_sum'),
                                DB::raw('COUNT(votes.vote) as votes_count'))
                    ->groupBy('services.id')
                    ->where('services.cat_id', $service->cat_id)
                    ->where('services.user_id', '!=', $user->id)
                    ->where('services.status', 1)
                    ->with('user')
                    ->orderBy('id', 'DESC')
                    ->take(6)
                    ->get();

            $mostVoted =
                Service::join('users', 'users.id', '=', 'services.user_id')
                        ->leftJoin('votes', 'services.id', '=', 'votes.service_id')
                        ->select('services.id', 'services.name', DB::raw('SUM(votes.vote) as vote_sum'))
                        ->groupBy('services.id')
                        ->where('services.cat_id', $service->cat_id)
                        ->where('services.id', '!=', $service->id)
                        ->where('services.status', 1)
                        ->having('vote_sum', '>', 0)
                        ->orderBy('vote_sum', 'DESC')
                        ->take(6)
                        ->get();
            $mostViewd =
                Service::join('users', 'users.id', '=', 'services.user_id')
                        ->leftJoin('views', 'services.id', '=', 'views.service_id')
                        ->select('services.id', 'services.name', DB::raw('COUNT(views.id) as view_count'))
                        ->groupBy('services.id')
                        ->where('services.cat_id', $service->cat_id)
                        ->where('services.id', '!=', $service->id)
                        ->where('services.status', 1)
                        ->having('view_count', '>', 0)
                        ->orderBy('view_count', 'DESC')
                        ->take(6)
                        ->get();

        } else {
            $myOwnServicesInSameCat = [];
            $otherServicesInSameCat = [];
            $mostVoted = [];
            $mostViewd = [];
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

        // to auto select the stars
        if (Auth::check()) {
            $userRate = Vote::select('id', 'vote')->where(function ($q) use ($user, $service) {
                $q->where('service_id', $service->id)->where('user_id', $user->id);
            })->first();
        }else {
            $userRate = null;
        }

        return Response::json([
            'service' => $service,
            'myOwnServicesInSameCat' => $myOwnServicesInSameCat,
            'otherServicesInSameCat' => $otherServicesInSameCat,
            'ordersCount' => $ordersCount,
            'sumVotes' => intval($sumVotes), // because it return the sum as string
            'mostVoted' => $mostVoted,
            'mostViewd' => $mostViewd,
            'sidebarSection2' => $sidebarSection2,
            'userRate' => $userRate,
        ], 200);
    }

    public function getMyServices($length = null)
    {
        if ($length === null) {
            $skipLengthOfServices = 0;
        } else {
            $skipLengthOfServices = $length;
        }

        $user = Auth::user();

        $services = Service::where('user_id', $user->id)
        ->with('user')
        ->withCount('view')
        ->skip($skipLengthOfServices)
        ->take(env('LIMIT_SERVICES'))
        ->orderBy('id', 'DESC')
        ->get();
        return Response::json([
            'user' => $user,
            'services' => $services
        ], 200);
    }
    public function getAllServices(Request $request, $length = null)
    {
        if ($length === null) {
            $skipLengthOfServices = 0;
        } else {
            $skipLengthOfServices = $length;
        }
        // all services
        $services =
            Service::join('users', 'users.id', '=', 'services.user_id')
                ->leftJoin('votes', 'services.id', '=', 'votes.service_id')
                ->select('services.*',
                    DB::raw('SUM(votes.vote) as votes_sum'),
                    DB::raw('COUNT(votes.vote) as votes_count'))
                ->with('user')
                ->groupBy('services.id')
                ->where('services.status', 1)
                ->skip($skipLengthOfServices)
                ->take(env('LIMIT_SERVICES'))
                ->orderBy('votes_sum', 'DESC')
                ->get();
        if ($length == null) {
            // Related Services

            $ip = $request->server('REMOTE_ADDR');

            $checkIfHasViewBefore = View::where('ip', $ip)->count();

            if ($checkIfHasViewBefore == 0) {
                // most Viewd Services
                $sidebarSection1 =
                Service::join('users', 'users.id', '=', 'services.user_id')
                ->leftJoin('views', 'services.id', '=', 'views.service_id')
                ->select('services.id', 'services.name', DB::raw('COUNT(views.id) as view_count'))
                ->groupBy('services.id')
                ->where('services.status', 1)
                ->orderBy('view_count', 'DESC')
                ->take(6)
                ->get();
            } else {
                $catView = View::join('services', 'views.service_id', '=', 'services.id')
                ->where('ip', $ip)
                ->lists('services.cat_id')->all();
                $sidebarSection1 =
                Service::join('users', 'users.id', '=', 'services.user_id')
                ->leftJoin('views', 'services.id', '=', 'views.service_id')
                ->select('services.id', 'services.name', DB::raw('COUNT(views.id) as view_count'))
                ->groupBy('services.id')
                ->whereIn('services.cat_id', $catView)
                ->where('services.status', 1)
                ->orderBy('view_count', 'DESC')
                ->take(6)
                ->get();
            }
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
                ->orderBy('order_count', 'DESC')
                ->take(6)
                ->get();
            if ($sidebarSection3->count() <= 0) {
                $sidebarSection3 = null;
            }

            $array = [
                'services' => $services,
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

    public function getUserServices($userId, $length = null)
    {
        $user_id = intval($userId);

        $user = User::findOrFail($userId);
        if ($user) {
            if ($length === null) {
                $skipLengthOfServices = 0;
            } else {
                $skipLengthOfServices = $length;
            }
            $services =
            Service::join('users', 'users.id', '=', 'services.user_id')
                ->leftJoin('votes', 'services.id', '=', 'votes.service_id')
                ->select('services.*',
                            DB::raw('SUM(votes.vote) as votes_sum'),
                            DB::raw('COUNT(votes.vote) as votes_count'))
                ->groupBy('services.id')
                ->where('services.user_id', $user_id)
                ->where('services.status', 1)
                ->with('user')
                ->skip($skipLengthOfServices)
                ->take(env('LIMIT_SERVICES'))
                ->orderBy('id', 'DESC')
                ->get();

            return Response::json(['user' => $user, 'services' => $services], 200);
        }

    }

    // uploadImage
    protected function uploadImage($file){

        $extension = $file->getClientOriginalExtension();
        $sha1 = sha1($file->getClientOriginalName());

        $fileName = date("y-m-d-h-i-s") . "_" . $sha1 . "." . $extension;
        $path = public_path('images/services/');

        Image::make($file)->resize(900, 600)->save($path . $fileName, 80);
        return 'images/services/' . $fileName;
    }
}
