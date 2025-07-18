<?php 

namespace App\Http\Controllers\Recommendation;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RecommendationRequestCreatePageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('recommendation/create', [
            'employee_name'     => $user->name,
            'employee_code'     => "EMP00".$user->id,
            'now'               => now()->format('Y-m-d\TH:i'), // datetime-local format
        ]);
    }
}
