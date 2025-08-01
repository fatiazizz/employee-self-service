<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void {
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->string('type')->after('user_id')->nullable();;
        });
    }

    public function down(): void {
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};