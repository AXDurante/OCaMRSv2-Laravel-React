<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('tsr', function (Blueprint $table) {
            $table->string('admin_photo')->nullable(); // Add tech_photo field
        });
    }

    public function down()
    {
        Schema::table('tsr', function (Blueprint $table) {
            $table->dropColumn('admin_photo'); // Remove tech_photo field
        });
    }
};