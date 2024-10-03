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
        Schema::create('job_orders', function (Blueprint $table) {
            $table->id('job_id');
            $table->text('service_type');
            $table->text('trans_type');
            $table->text('dept_name');
            $table->text('lab');
            $table->text('lab_loc');
            $table->text('pos');
            $table->text('employeeID');
            $table->text('remarks');
            $table->timestamp('date_request')->nullable();
            $table->timestamp('date_due')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_orders');
    }
};
