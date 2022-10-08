<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);

Route::group(['middleware'=>'api'],function(){
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::get('me', [AuthController::class,'me']);
    Route::get('logout', [AuthController::class,'logout']);
});

