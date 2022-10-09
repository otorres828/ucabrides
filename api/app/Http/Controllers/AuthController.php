<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function register(Request $request){
        $request->validate( [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);
        //  $user = new User();
        // $user->name= $request['name'];
        // $user->email= $request['email'];
        // $user->password=Hash::make($request['password']);
        // $user->save();
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);
        return response()->json(['message' => 'Usuario creado con exito'],200);


    }
    
    public function login()
    { 
      $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Credenciales Incorrectas',401]);
        }
        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }


    public function logout()
    {
        setcookie('access_token',"");
        auth()->logout();
        return response()->json(['message' => 'Ha cerrado sesion con exito']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user'=>auth()->user()
        ]);
    }

  
}