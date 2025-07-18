<?php

namespace App\Http\Controllers\Recommendation;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\RecommendationRequest;

class RecommendationRequestPageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = RecommendationRequest::query()
            ->with(['user'])
            ->when(!$user->is_admin, fn($q) => $q->where('user_id', $user->id));

        $recommendationRequests = $query->latest()->get()->map(function ($recommendation) {
            return [
                'id'            => $recommendation->id,
                'employeeName'  => $recommendation->user->name,
                'employeeCode'  => "EMP00" . $recommendation->user->id,
                'to'            => $recommendation->to,
                'status'        => $recommendation->status,
                'createdAt'     => $recommendation->created_at->format('Y-m-d H:i:s'),
            ];
        });

        return Inertia::render('recommendation/index', [
            'recommendationRequests' => $recommendationRequests,
        ]);
    }
}
