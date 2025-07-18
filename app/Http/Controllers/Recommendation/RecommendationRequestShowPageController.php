<?php 
namespace App\Http\Controllers\Recommendation;

use App\Http\Controllers\Controller;
use App\Models\RecommendationRequest;
use Inertia\Inertia;

class RecommendationRequestShowPageController extends Controller
{
    public function index($id)
    {
        $recommendation = RecommendationRequest::with(['user', 'approver'])->findOrFail($id);

        return Inertia::render('recommendation/show', [
            'data' => [
                'id'            => $recommendation->id,
                'user_id'       => $recommendation->user_id,
                'employeeName'  => $recommendation->user->name ?? '',
                'employeeCode'  => 'EMP00' . $recommendation->user->id ?? '',
                'to'            => $recommendation->to ?? '',
                'created_at'    => $recommendation->created_at->format('Y-m-d H:i:s'),
                'status'        => $recommendation->status,
                'comment'       => $recommendation->comment,
                'approver'      => $recommendation->approver ? [
                    'id'    => $recommendation->approver->id,
                    'name'  => $recommendation->approver->name,
                    'email' => $recommendation->approver->email,
                ] : null,
            ],
        ]);
    }
}
