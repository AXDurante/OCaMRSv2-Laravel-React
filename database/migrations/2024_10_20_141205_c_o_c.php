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
        Schema::create('coc', function (Blueprint $table) {
            $table->id('coc_id');
            $table->text('coc_num');
            $table->string('equipment');
            $table->string('manufacturer');
            $table->string('model');
            $table->string('serial_num');
            $table->text('calibration');
            $table->text('standard');
            $table->text('calibration_res');
            $table->text('remark');
            $table->text('tsr_num');
            $table->text('tsr_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coc');
    }
};
