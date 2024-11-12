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
        Schema::table('coc', function (Blueprint $table) {
            $table->string('tech_name')->nullable();
            $table->string('tech_photo')->nullable(); 
            $table->string('admin_name')->nullable(); 
            $table->string('admin_photo')->nullable();
        });
    }

    public function down()
    {
        Schema::table('coc', function (Blueprint $table) {
            $table->dropColumn('tech_id'); // Remove tech_photo field
        });
    }
};
