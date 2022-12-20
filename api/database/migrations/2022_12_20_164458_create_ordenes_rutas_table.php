<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordenes_rutas', function (Blueprint $table) {
            $table->id();
            $table->enum('estatus',["activo","cancelado","completado"])->default("cancelado");  //1: borrador 2:publicado
            $table->unsignedBigInteger('ruta_id');

            $table->foreign('ruta_id')->references('id')->on('rutas')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ordenes_rutas');
    }
};
