<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void {
        Schema::table('department', function (Blueprint $table) {
            $table->string('manager_id')->after('name');
        });
    }

    public function down(): void {
        Schema::table('department', function (Blueprint $table) {
            $table->dropColumn('manager_id');
        });
    }
};