<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\http\Requests\AddServicesRequest;

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

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        $services = Service::where('user_id', $user->id)->with('user')->withCount('view')->orderBy('id', 'DESC')->get();

        return Response::json([
            'user' => $user,
            'services' => $services
        ], 200);
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
        $user = Auth::user();
        /*Get Data*/
        $service = Service::where('id', $id)->with('user')->withCount('votes')->first();
        $sumVotes = Vote::where('service_id', $service->id)->sum('vote');
        if ($service->status != 1) {
            if (Auth::guest()) {
                abort(403);
            } else {
                if ($user->id != $service->user_id) {
                    abort(403);
                }
            }
        }

        /*Add New view*/
        $ip = $request->server('REMOTE_ADDR');
        $viewCount = View::where(function ($q) use($ip, $user, $service) {
            $q->where('ip', $ip);
            $q->where('user_id', $user->id);
            $q->where('service_id', $service->id);
        })->count();
        if ($viewCount == 0) {
            if ($user->id != $service->user_id) {
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
        }
        return Response::json([
            'service' => $service,
            'myOwnServicesInSameCat' => $myOwnServicesInSameCat,
            'otherServicesInSameCat' => $otherServicesInSameCat,
            'ordersCount' => $ordersCount,
            'sumVotes' => intval($sumVotes), // because it return the sum as string
            'mostVoted' => $mostVoted,
            'mostViewd' => $mostViewd,
        ], 200);
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
    public function getAllServices(Request $request)
    {
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
                ->orderBy('votes_sum', 'DESC')
                ->get();
        // All Cateogries
        $cat = Cat::orderBy('id', 'DESC')->get(['id', 'name']);

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


        $array = [
            'services' => $services,
            'cat' => $cat,
            'sidebarSection1' => $sidebarSection1
        ];
        return Response::json($array, 200);
    }

    public function getUserServices($userId)
    {
        $user_id = intval($userId);

        $user = User::findOrFail($userId);
        if ($user) {
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
                ->orderBy('id', 'DESC')
                ->take(6)
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
