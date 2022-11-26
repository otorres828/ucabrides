<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RutaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class,'register']);
Route::post('register/gmail', [AuthController::class,'register_gmail']);
Route::post('login', [AuthController::class,'login']);



Route::group(['middleware'=>'auth'],function(){
    Route::get('listado_rutas_disponibles', [RutaController::class,'listado_rutas_disponibles']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::get('distancia_dispuesto_caminar',[RutaController::class,'distancia_dispuesto_caminar']);
    Route::get('perfil_localizacion',[RutaController::class,'perfil_localizacion']);
});

