<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // اگر کلید خارجی دارد
            $table->dropColumn('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable();

            // اگر قبلاً foreign key بوده:
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
