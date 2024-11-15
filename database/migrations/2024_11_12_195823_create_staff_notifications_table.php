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
        Schema::create('staff_notifications', function (Blueprint $table) {
            $table->id();
            $table->enum('recipient_type', ['admin', 'technician']);
            $table->unsignedBigInteger('recipient_id');
            $table->unsignedBigInteger('job_order_id');
            $table->string('job_order_status')->nullable();
            $table->string('title');
            $table->text('message');
            $table->enum('type', [
                'new_job_order',
                'status_change',
                'job_assignment',
                'job_completion',
                'job_cancellation'
            ])->default('status_change');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->index(['recipient_type', 'recipient_id']);
            $table->index('job_order_id');
            $table->index('read_at');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_notifications');
    }
};
