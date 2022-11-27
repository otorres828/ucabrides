<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up()
    {
        Schema::create('rutas', function (Blueprint $table) {
           $table->id();
           $table->string('lat');
           $table->string('lng');
           $table->unsignedBigInteger('user_id');

           $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('rutas');
    }
};
