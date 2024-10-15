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
        Schema::create('technician_job_orders', function (Blueprint $table) {
            $table->id(); // This creates an unsigned big integer by default
            $table->unsignedBigInteger('job_id'); // Ensure this is unsigned
            // Update the foreign key reference for job_id
            $table->foreign('job_id')->references('job_id')->on('job_orders')->onDelete('cascade');
            $table->unsignedBigInteger('employeeID'); // This should refer to the employeeID in job_orders
            // Ensure employeeID exists in job_orders and is appropriately referenced
            $table->foreign('employeeID')->references('employeeID')->on('job_orders')->onDelete('cascade');
            $table->timestamp('date_received'); // Date Received
            $table->text('instrument')->nullable(); // Instrument (leave blank)
            $table->text('service_requested')->nullable(); // Service Requested (leave blank)
            $table->string('status'); // Status (approve, completed, cancel)
            $table->string('priority'); // Priority (Low, Mid, High)
            $table->timestamps(); // For created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technician_job_orders');
    }
};
