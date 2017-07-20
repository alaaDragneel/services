<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Controllers\Controller;

use App\User;

use App\Pay;

use App\Buy;

use App\Profit;

use File;

use Image;

class AdminUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    public function index()
    {

        $users = User::withCount('services', 'ordersIMade', 'getMyServiceOrder')->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.users.users', compact('users'));
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('index.users')->with('success', 'user deleted successfully');
    }

    public function editUser($id)
    {
        $user = User::where('id', $id)->with('services', 'getMyServiceOrder', 'ordersIMade')->first();

        $orderOwnerCharge = Pay::where('user_id', $user->id)->sum('price');

        $orderOwnerPays = Buy::where('user_id', $user->id)->where('finish', '!=', 2)->sum('buy_price');

        $userWaitingProfits = Profit::where(function ($q) use ($user) {
            $q->where('user_id', $user->id);
            $q->where('status', 0);
        })->sum('profit_price');

        $orderOwnerProfits = Buy::where('recive_id', $user->id)->where('finish', 1)->sum('buy_price');

        $profitDone = Profit::where('user_id', $user->id)->sum('profit_price');

        $orderOwnerProfits = $orderOwnerProfits - $profitDone;


        return view('admin.users.edit', compact('user', 'orderOwnerCharge', 'orderOwnerPays', 'orderOwnerProfits', 'userWaitingProfits'));
    }

    public function updateUser($id, UpdateUserRequest $request)
    {
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->admin = $request->admin;

        if ($user->password != $request->password && $request->password != '') {
            $user->password = bcrypt($request->password);
        }

        if ($user->image != $request->file('image') && $request->file('image') != null) {
            File::delete($user->image);
            $user->image = $this->uploadImage($request->file('image'));
        }
        $user->update();
        return redirect()->back()->with('success', 'user Updated successfully');
    }

    public function filter_by($status = null)
    {
        if ($status != null) {
            $statusCheck = [0, 1, 2, 'id-ASC', 'id-DESC'];
            if (in_array($status, $statusCheck)) {
                if ($status == 2) { // NOTE Mean Get All Services
                    $users = User::orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
                } else if ($status == 'id-ASC' || $status == 'id-DESC') {
                    $explode = explode('-', $status);
                    $users = User::orderBy($explode[0], $explode[1])->paginate(env('LIMIT_SERVICES'));
                } else {
                    $users = User::where('admin', $status)->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
                }
            } else {
                return redirect()->back()->with('error', 'Error With The Values');
            }
        } else {
            $users = User::orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        }
        return view('admin.users.users', compact('users'));
    }

    public function filter_by_search(Request $request)
    {
        $search = strip_tags($request->search);
        $users = User::where('name', 'LIKE', "$search%")->orWhere('email', 'LIKE', "$search%")->orderBy('id', 'DESC')->paginate(env('LIMIT_SERVICES'));
        return view('admin.users.users', compact('users'));
    }

    // uploadImage
    protected function uploadImage($file){

        $extension = $file->getClientOriginalExtension();
        $sha1 = sha1($file->getClientOriginalName());

        $fileName = date("y-m-d-h-i-s") . "_" . $sha1 . "." . $extension;
        $path = public_path('images/users/');

        Image::make($file)->resize(900, 600)->save($path . $fileName, 80);
        return 'images/users/' . $fileName;
    }
}
