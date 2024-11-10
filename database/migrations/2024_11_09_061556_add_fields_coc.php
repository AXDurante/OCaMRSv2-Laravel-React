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
            $table->string('college');
            $table->string('lab_loc');
            $table->string('date_req');
            $table->string('date_cal');
            $table->string('date_due');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
