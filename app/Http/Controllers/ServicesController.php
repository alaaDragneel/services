<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\http\Requests\AddServicesRequest;

use Auth;

use Image;

use Response;

use App\User;

use App\Service;

use App\View;

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
        $prices = [5, 10, 15, 20, 25, 30, 40, 50];
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
    public function show($id)
    {
        /*Add New view*/
        $ip = $_SERVER['REMOTE_ADDR'];
        if (View::where('ip', $ip)->count() == 0) {
            $guest = Auth::guest();
            $view = new View();
            $view->service_id = $id; // id prefer to service id
            if ($guest) {
                $view->user_id = 0;
            } else {
                $view->user_id = Auth::user()->id;
            }
            $view->ip = $ip;
            $view->save();
        }

        /*Get Data*/
        $service = Service::where('id', $id)->with('user')->first();
        if ($service->status != 1) {
            if (Auth::guest()) {
                abort(403);
            } else {
                if (Auth::user()->id != $service->user_id) {
                    abort(403);
                }
            }
        }
        $myOwnServicesInSameCat = Service::where(function ($q) use($service) {
            $q->where('cat_id', $service->cat_id);
            $q->where('user_id', $service->user_id);
            $q->where('id', '!=', $service->id);
        })->with('user')->withCount('view')->orderBy(\DB::raw('RAND()'))->take(4)->get();
        $otherServicesInSameCat = Service::where(function ($q) use($service) {
            $q->where('cat_id', $service->cat_id);
            $q->where('user_id', '!=', $service->user_id);
            $q->where('status', 1);
        })->with('user')->orderBy(\DB::raw('RAND()'))->take(4)->get();

        return Response::json([
            'service' => $service,
            'myOwnServicesInSameCat' => $myOwnServicesInSameCat,
            'otherServicesInSameCat' => $otherServicesInSameCat
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
    }
        //


    public function getUserServices($userId)
    {
        $user_id = intval($userId);

        $user = User::findOrFail($userId);
        if ($user) {
            $services = Service::where(function ($q) use ($user_id) {
                $q->where('user_id', $user_id);
                $q->where('status', 1);
            })->with('user')->get();

            return Response::json(['user' => $user, 'services' => $services], 200);
        }

    }

    // uploadImage
    protected function uploadImage($file){

        $extension = $file->getClientOriginalExtension();
        $sha1 = sha1($file->getClientOriginalName());

        $fileName = date("y-m-d-h-i-s") . "_" . $sha1 . "." . $extension;
        $path = public_path('images/services/');

        Image::make($file)->resize(800, 400)->save($path . $fileName, 80);
        return 'images/services/' . $fileName;
    }
}
