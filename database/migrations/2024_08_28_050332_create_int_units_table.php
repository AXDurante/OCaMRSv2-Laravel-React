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
        Schema::create('int_units', function (Blueprint $table) {
            $table->id('intUnit_id');
            $table->text('instrument');
            $table->unsignedBigInteger('qty');
            $table->text('model');
            $table->string('instrument_num');
            $table->text('manufacturer');
            $table->text('jobOrderID');
            // $table->timestamp('date_request')->nullable();
            // $table->timestamp('date_due')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('int_units');
    }
};
