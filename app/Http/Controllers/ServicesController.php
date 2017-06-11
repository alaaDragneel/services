<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\http\Requests\AddServicesRequest;

use Auth;

use Image;

use Response;

use App\Service;


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

        return Service::where('user_id', $user->id)->with('user')->get();
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

        $image = $this->uploadImage($request->file('image'));

        $services = new Service();
        $services->name = $request->name;
        $services->description = $request->description;
        $services->cat_id = $request->cat_id;
        $services->price = $request->price;
        $services->image = $image;
        $services->user_id = $user->id;

        if($services->save()) {
            return 'done';
        } else {
            return 'error';
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

    // uploadImage
    protected function uploadImage($file){

        $extension = $file->getClientOriginalExtension();
        $sha1 = sha1($file->getClientOriginalName());

        $fileName = date("y-m-d-h-i-s") . "_" . $sha1 . "." . $extension;
        $path = public_path('images/services/');

        Image::make($file)->resize(800, 800)->save($path . $fileName, 100);
        return 'images/services/' . $fileName;
    }
}
