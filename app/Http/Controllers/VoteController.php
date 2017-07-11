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
        if (Auth::check()) {
            $voteArray = [1, 2, 3, 4, 5];
            if (in_array($request->vote, $voteArray)) {
                $service = Service::findOrFail($request->serviceId);
                if ($service) {
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
                                return "voting stored";
                            }
                            return 'error';
                        }
                        return 'your service';
                    } else {
                        if ($user->id != $service->user_id) {
                            $vote = Vote::where(function ($q) use ($user, $service) {
                                $q->where('user_id', $user->id);
                                $q->where('service_id', $service->id);
                            })->first();
                            if ($request->vote != $vote->vote) {
                                $vote->vote = intval($request->vote);
                                if ($vote->update()) {
                                    return "voting updated";
                                }
                                return 'error';
                            }
                            return 'same';
                        }
                        return 'your service';
                    }
                    return 'error';
                }
                return 'no service';
            }
            return 'error';
        }
        return 'guest';
    }
}
