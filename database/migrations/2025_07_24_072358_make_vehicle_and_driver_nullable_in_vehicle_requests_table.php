<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->unsignedBigInteger('vehicle_id')->nullable()->change();
            $table->unsignedBigInteger('driver_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->unsignedBigInteger('vehicle_id')->nullable(false)->change();
            $table->unsignedBigInteger('driver_id')->nullable(false)->change();
        });
    }
};
