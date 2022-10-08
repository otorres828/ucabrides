<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
});

 
Route::get('login-google', function () {
    return Socialite::driver('google')->redirect();
});
 
Route::get('google-callback', function () {
    $google = Socialite::driver('google')->user();
 
    $correo=$google->email;
    $sub='.ucab.edu.ve';

    if (strpos($correo, $sub)) {
        $user = User::updateOrCreate([
            'google_id' => $google->id,
        ], [
            'name' => $google->name,
            'email' => $google->email,
            'google_token' => $google->token,
            'google_refresh_token' => $google->refreshToken,
        ]);

        Auth::login($user);
        return redirect()->route('admin.panel.index');
     }
     return redirect()->back()->with('warning', 'Lo siento, solo pueden registrarse usuarios de la ucab');
});