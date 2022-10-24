<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class,'register']);
Route::post('register/gmail', [AuthController::class,'register_gmail']);
Route::post('login', [AuthController::class,'login']);

Route::post('message', [MessageController::class,'store']);

Route::group(['middleware'=>'api'],function(){
    Route::post('refresh', [AuthController::class,'refresh']);
});

