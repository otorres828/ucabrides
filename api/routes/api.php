<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RutaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class,'register']);
Route::post('register/gmail', [AuthController::class,'register_gmail']);
Route::post('login', [AuthController::class,'login']);


Route::get('listado_rutas_disponibles', [RutaController::class,'listado_rutas_disponibles']);
Route::post('refresh', [AuthController::class,'refresh']);
Route::get('perfil_localizacion',[RutaController::class,'perfil_localizacion']);

Route::group(['middleware'=>'auth'],function(){
    Route::get('distancia_dispuesto_caminar',[RutaController::class,'distancia_dispuesto_caminar']);
    Route::post('cambiar_distancia_caminar',[RutaController::class,'cambiar_distancia_caminar']);
    Route::post('cambiarclave',[AuthController::class,'cambiarclave']);
});

Route::get('hola',function(){
    return "hola mundo";
});