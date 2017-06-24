<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App;

use Auth;

use App\Vote;

use App\Service;

class VoteController extends Controller
{
    public function addNewVote(Request $request)
    {
        $service = Service::findOrFail($request->serviceId);
        if ($service) {
            $voteArray = [1, 2, 3, 4, 5];
            if (in_array($request->vote, $voteArray)) {
                $user = Auth::user();
                $voteBefore = Vote::where(function ($q) use ($user, $service) {
                    $q->where('user_id', $user->id);
                    $q->where('service_id', $service->id);
                })->count();
                if ($voteBefore == 0) {
                    if ($user->id != $service->user_id) {
                        $vote = new Vote();
                        $vote->user_id = $user->id;
                        $vote->service_id = $service->id;
                        $vote->vote = intval($request->vote);
                        if ($vote->save()) {
                            return "done";
                        }
                        App::abort(403);
                    }
                    App::abort(403);
                }
                App::abort(403);
            }
            App::abort(403);
        }
        App::abort(403);
    }
}
