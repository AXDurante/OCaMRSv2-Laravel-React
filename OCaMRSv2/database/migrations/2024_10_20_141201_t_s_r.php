<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tsr', function (Blueprint $table) {
            $table->id('tsr_id');
            $table->text('tsr_num');
            $table->text('instrument');
            $table->text('model');
            $table->text('serial_num');
            $table->text('problemReported');
            $table->text('diagnosis');
            $table->text('actionTaken');
            $table->text('recommendation');
            $table->text('tsr_remarks');
            $table->text('date_request');
            $table->text('phone');
            $table->text('job_id');
            $table->text('tech_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tsr');
    }
};
