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

        Schema::dropIfExists('equipment');
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('equip_category');
            $table->string('equip_name');
            $table->string('image_path')->nullable(); // Add this line to include an image column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       
    }
};
