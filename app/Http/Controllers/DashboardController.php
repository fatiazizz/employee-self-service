<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LeaveRequest;
use App\Models\VehicleRequest;
use App\Models\RecommendationRequest;
use App\Models\EquipmentRequest;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->is_admin;

        $leave = LeaveRequest::when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))->count();
        $vehicle = VehicleRequest::when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))->count();
        $recommendation = RecommendationRequest::when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))->count();
        $equipment = EquipmentRequest::when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))->count();

        $leaveRequests = LeaveRequest::with('user')
            ->when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))
            ->latest()->take(5)->get()->map(function ($r) {
                return [
                    'id' => $r->id,
                    'type' => 'Leave',
                    'url' => 'leave',
                    'employeeName' => $r->user->name ?? '',
                    'employeeCode' => 'EMP00' . ($r->user->id ?? ''),
                                'CreateDate' => Carbon::parse($r->created_at)->format('Y-m-d H:i:s'),

                    'status' => $r->status,
                ];
            });

        $vehicleRequests = VehicleRequest::with('user')
            ->when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))
            ->latest()->take(5)->get()->map(function ($r) {
                return [
                    'id' => $r->id,
                    'type' => 'Vehicle',
                    'url' => 'vehicle',
                    'employeeName' => $r->user->name ?? '',
                    'employeeCode' => 'EMP00' . ($r->user->id ?? ''),
                             'CreateDate' => Carbon::parse($r->created_at)->format('Y-m-d H:i:s'),

                    'status' => $r->status,
                ];
            });

        $recommendationRequests = RecommendationRequest::with('user')
            ->when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))
            ->latest()->take(5)->get()->map(function ($r) {
                return [
                    'id' => $r->id,
                    'type' => 'Recommendation',
                    'url' => 'recommendation',
                    'employeeName' => $r->user->name ?? '',
                    'employeeCode' => 'EMP00' . ($r->user->id ?? ''),
                    'CreateDate' => Carbon::parse($r->created_at)->format('Y-m-d H:i:s'),
                    'status' => $r->status,
                ];
            });

        $equipmentRequests = EquipmentRequest::with('user')
            ->when(!$isAdmin, fn($q) => $q->where('user_id', $user->id))
            ->latest()->take(5)->get()->map(function ($r) {
                return [
                    'id' => $r->id,
                    'type' => 'Equipment',
                    'url' => 'equipment',
                    'employeeName' => $r->user->name ?? '',
                    'employeeCode' => 'EMP00' . ($r->user->id ?? ''),
                    'CreateDate' => Carbon::parse($r->created_at)->format('Y-m-d H:i:s'), // چون equipment start_at نداره
                    'status' => $r->status,
                ];
            });

        $recentRequests = collect()
            ->merge($leaveRequests)
            ->merge($vehicleRequests)
            ->merge($recommendationRequests)
            ->merge($equipmentRequests)
            ->sortByDesc('startDate')
            ->take(10)
            ->values();

        return Inertia::render('dashboard', [
            'stats' => compact('leave', 'vehicle', 'recommendation', 'equipment'),
            'recentRequests' => $recentRequests,
        ]);
    }
}
