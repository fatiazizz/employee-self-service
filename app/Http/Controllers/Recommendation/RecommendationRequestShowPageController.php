<?php 
namespace App\Http\Controllers\Recommendation;

use App\Http\Controllers\Controller;
use App\Models\RecommendationRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RecommendationRequestShowPageController extends Controller
{
    public function index(Request $request, $id)
    {

        $recommendation = RecommendationRequest::with(['user', 'approver'])->findOrFail($id);

        $user = $request->user();
        $user_id = $user->id;
        $isOwner = $recommendation->user_id === $user_id;
        $isAdmin = $user->is_admin ===1;
        $isApprover = $recommendation->approver_id === $user_id;
        $isManager = $recommendation->user && $recommendation->user->manager_id === $user_id;
        if (!$isOwner && !$isApprover && !$isManager && !$isAdmin) {
            abort(403, 'Access denied');
        }

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
