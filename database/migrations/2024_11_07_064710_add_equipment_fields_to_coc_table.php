<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('coc', function (Blueprint $table) {
            $table->string('equipment')->nullable();
            $table->string('model')->nullable();
            $table->string('serial_num')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coc', function (Blueprint $table) {
            $table->dropColumn(['equipment', 'model', 'serial_num']);
        });
    }
};
