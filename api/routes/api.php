<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactoSosController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\RutaDarController;
use App\Http\Controllers\TelefonoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\VehiculoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class,'register']);
Route::post('register/gmail', [AuthController::class,'register_gmail']);
Route::post('login', [AuthController::class,'login']);


Route::get('listado_rutas_disponibles', [RutaController::class,'listado_rutas_disponibles']);
Route::post('refresh', [AuthController::class,'refresh']);

Route::group(['middleware'=>'auth'],function(){
    Route::get('perfil_direccion',[RutaController::class,'perfil_direccion']);
    Route::get('distancia_dispuesto_caminar',[RutaController::class,'distancia_dispuesto_caminar']);
    Route::post('cambiar_distancia_caminar',[RutaController::class,'cambiar_distancia_caminar']);
    Route::post('cambiar_ubicacion',[RutaController::class,'cambiar_ubicacion']);
    Route::post('cambiarclave',[AuthController::class,'cambiarclave']);
    Route::get('telefono',[TelefonoController::class,'index']);
    Route::post('telefono',[TelefonoController::class,'update']);

    Route::get('me',[AuthController::class,'me']);
    Route::get('cambiar_estatus_usuario_activo/{cola}/{orden_ruta_id}',[RutaController::class,'cambiar_estatus_usuario_activo']);
    Route::get('cambiar_estatus_usuario_cancelar',[RutaController::class,'cambiar_estatus_usuario_cancelar']);
    Route::get('usuarios_por_aceptar',[RutaController::class,'usuarios_por_aceptar']);
    Route::get('obtener_conductor/{orden_ruta_id}',[RutaController::class,'obtener_conductor']);
    Route::get('obtener_detalles_orden_abierta/{orden_ruta_id}',[RutaController::class,'obtener_detalles_orden_abierta']);
    Route::post('puntomascerca/',[RutaController::class,'guardar_puntomascerca']);
    Route::get('puntomascerca/{user_id}',[RutaController::class,'obtener_puntomascerca']);

    //VEHICULOS
    Route::get('vehiculos',[VehiculoController::class,'index']);
    Route::post('vehiculos',[VehiculoController::class,'store']);
    Route::put('vehiculos/{id}',[VehiculoController::class,'update']);
    Route::delete('vehiculos/{id}',[VehiculoController::class,'delete']);

    //contactos sos
    Route::get('contactosos',[ContactoSosController::class,'index']);
    Route::post('contactosos',[ContactoSosController::class,'store']);
    Route::put('contactosos/{id}',[ContactoSosController::class,'update']);
    Route::delete('contactosos/{id}',[ContactoSosController::class,'delete']);
    
    //DAR COLA
    Route::get('rutas',[RutaDarController::class,'index']);
    Route::get('ordenes_rutas',[RutaDarController::class,'ordenes_rutas']);
    Route::post('crear_orden',[RutaDarController::class,'crear_orden']);
    Route::post('desactivar',[RutaDarController::class,'desactivar']);
    Route::get('detalles_orden_activa',[RutaDarController::class,'detalles_orden_activa']);
    Route::get('obtener_usuarios_por_aceptar/{orden_id}',[RutaDarController::class,'obtener_usuarios_por_aceptar']);
    Route::post('agregar_usuario_orden',[RutaDarController::class,'agregar_usuario_orden']);
    Route::post('rechazar_usuario_orden',[RutaDarController::class,'rechazar_usuario_orden']);
    Route::post('cancelar_cola_usuario',[RutaDarController::class,'cancelar_cola_usuario']);

});
