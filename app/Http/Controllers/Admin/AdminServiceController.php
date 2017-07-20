<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\UpdateServiceRequest;

use App\Http\Controllers\Controller;

use App\Events\CreateNotification as CreateNotify;

use Event;

use App\Service;

use App\Category;

use App\Vote;

use App;

use File;

use Response;

use Image;

class AdminServiceController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function index()
    {

        $services = Service::orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
        return view('admin.services.services', compact('services', 'cat'));
    }

    public function waiting()
    {

        $services = Service::where('status', 0)->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
        return view('admin.services.services', compact('services', 'cat'));
    }

    public function allUserServices($id)
    {

        $services = Service::where('user_id', $id)->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
        return view('admin.services.services', compact('services', 'cat'));
    }

    public function filter_by($status = null)
    {
        /*
        | 0 => unApproved
        | 1 => Approved
        | 2 => All Service
        | id-ASC => First Added
        | id-DESC => Last Added
        */
        if ($status != null) {
            $statusCheck = [0, 1, 2, 'id-ASC', 'id-DESC'];
            if (in_array($status, $statusCheck)) {
                if ($status == 2) { // NOTE Mean Get All Services
                    $services = Service::paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
                } else if ($status == 'id-ASC' || $status == 'id-DESC') {
                    $explode = explode('-', $status);
                    $services = Service::orderBy($explode[0], $explode[1])->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
                } else {
                    $services = Service::where('status', $status)->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
                }
            } else {
                return redirect()->back()->with('error', 'Error With The Values');
            }
        } else {
            $services = Service::paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        }
        $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
        return view('admin.services.services', compact('services', 'cat'));
    }

    public function filter_by_category($cat_id = null)
    {
        if ($cat_id != null) {
            $services = Service::where('cat_id', $cat_id)->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        } else {
            $services = Service::paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        }
        $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
        return view('admin.services.services', compact('services', 'cat'));
    }

    public function filter_by_search(Request $request)
    {
        $this->validate($request, [
            'search' => 'required'
        ]);
        $search = strip_tags($request->search);
        $services = Service::where('name', 'LIKE' , "$search%")->paginate(env('LIMIT_SERVICES'), ['id', 'name', 'image'], 'Service_List');
        $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
        return view('admin.services.services', compact('services', 'cat'));
    }

    public function changeStatus($id, Request $request)
    {
        $id = $request->route()->id;
        $service = Service::findOrFail($id);
        if ($service->status == 0) {
            $service->status = 1;
            $adminStatus = 'AcceptedService';
            $service->update();
        } elseif ($service->status == 1) {
            $service->status = 0;
            $adminStatus = 'RejectedService';
            $service->update();
        }

        /*
        | -----------------------------------------------------------
        | make New Notifications For The Recived User
        | -----------------------------------------------------------
        */

        Event::fire(new CreateNotify($service->id, \Auth::user()->id, $service->user_id, $adminStatus));

        return redirect()->back()->with('success', 'status of services Updated successfully');
    }

    public function deleteService($id, Request $request)
    {
        $id = $request->route()->id;
        $service = Service::findOrFail($id);
        $service->delete();
        return redirect()->route('index.services')->with('success', 'services deleted successfully');
    }

    public function editService($id, Request $request)
    {
            $id = $request->route()->id;
            $service = Service::where('id', $id)->with('user', 'category', 'orders', 'votes')->withCount('votes', 'view')->first();
            if ($service) {
                $sumVotes = Vote::where('service_id', $service->id)->sum('vote');
                $cat = Category::orderBy('name', 'ASC')->get(['id', 'name']);
                return view('admin.services.edit', compact('service', 'cat', 'sumVotes'));
            }
        return App::abort(404);
    }

    public function updateService($id, UpdateServiceRequest $request)
    {
        $prices = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        if (in_array($request->price, $prices)) {
            $services = Service::findOrFail($id);
            $services->name = $request->name;
            $services->description = $request->description;
            $services->cat_id = $request->category_id;
            $services->price = $request->price;
            if ($services->image != $request->file('image') && $request->file('image') != null) {
                File::delete($services->image);
                $services->image = $this->uploadImage($request->file('image'));
            }
            if ($services->update()) {
                return redirect()->back()->with('success', 'services Updated successfully');
            }
            return redirect()->back()->with('error', 'error during Update service');
        }

    }

    public function getServiceInfo(Request $request)
    {
        $service = Service::with('user')->withCount('orders')->findOrFail($request->id);
        return Response::json(['service' => $service]);
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
