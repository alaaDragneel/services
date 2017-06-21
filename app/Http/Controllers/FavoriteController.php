<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App;

use Auth;

use App\Favorite;

use App\Service;

use App\User;

class FavoriteController extends Controller
{
    // add to fivorites
    public function Addfavorite($service_id)
    {
        $service = Service::findOrFail($service_id);
        if ($service) {
            $user = Auth::user();
            $serviceAddBefore = Favorite::where(function ($q) use ($service, $user) {
                $q->where('service_id', $service->id);
                $q->where('user_id', $user->id);
            })->count();
            if ($serviceAddBefore == 0) {
                if ($service->user_id != $user->id) {
                    $fav = new Favorite();
                    $fav->service_id = $service_id;
                    $fav->user_id = $user->id;
                    $fav->own_user = $service->user_id;
                    if ($fav->save()) {
                        return 'done';
                    }
                    App::abort(403);
                }
                App::abort(403);
            }
            App::abort(403);
        }
        App::abort(403);
    }
    // get the user favorites
    public function userFavorites()
    {
        $user = Auth::user();
        return Favorite::where('user_id', $user->id)->with('service', 'getOwnUserService')->orderBy('id', 'DESC')->get();
    }
    // delete fivorites
    public function deleteFav($fav_id)
    {
        $fav = Favorite::findOrFail($fav_id);
        if ($fav) {
            $user = Auth::user();
            if ($fav->user_id == $user->id) {
                if ($fav->delete()) {
                    return 'done';
                }
                App::abort(403);
            }
            App::abort(403);
        }
        App::abort(403);

    }
}
