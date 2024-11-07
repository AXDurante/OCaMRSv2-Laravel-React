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
            $table->string('calibration_cert_no')->nullable();
            $table->string('manufacturer')->nullable();
            $table->string('cert_num')->nullable();
            $table->string('issuing_lab')->nullable();
            $table->string('standard')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coc', function (Blueprint $table) {
            $table->dropColumn([
                'calibration_cert_no',
                'manufacturer',
                'cert_num',
                'issuing_lab',
                'standard'
            ]);
        });
    }
};
