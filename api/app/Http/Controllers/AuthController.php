<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PhpParser\Node\Expr\Cast\Object_;

class AuthController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login','register','register_gmail','cambiarclave']]);
    // }

    public function register(Request $request){
        $request->validate( [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);
        $username = strstr($request['email'], '@', true);

        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'username'=>$username,
        ]);
        return response()->json(['message' => 'Usuario creado con exito'],200);


    }
    
    public function register_gmail(Request $request){ 
       $user= User::where('email',$request['email'])->first();
       if(!$user){     
            $correo=$request['email'];
            $sub='ucab.edu';

            if (strpos($correo, $sub)) {
                $username = strstr($request['email'], '@', true);
                $user=User::create([
                    'name' => $request['name'],
                    'email' => $request['email'],
                    'username' => $username,
                    'external_id' => $request['external_id'],
                    'avatar' => $request['avatar'],
                    'distancia'=>0,
                    'direccion'=>null,
                    'estatus'=>['cola'=>false,'orden_ruta_id'=>null],
                    'puntos'=>0
                ]);
            }else{
                return response()->json(['error' => 'Credenciales Incorrectas',401]);
            }
       }else{
            $user->update($request->all());
       }
        $token= Auth::login($user);
        return response()->json(['message' => 'Exito al iniciar sesion',
                                    'access_token' => $token,
                                    'token_type' => 'bearer',
                                    'expires_in' => auth('api')->factory()->getTTL() * 60,
                                    'user'=>auth()->user()
                                ],200);
    }
    
    public function login(Request $request)
    { 
        $credentials_username=  ['username'=> strtolower($request['email']), 'password'=>$request['password']];
        $credentials_email = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials_username) ) {
            if(! $token = auth()->attempt($credentials_email)){
                return response()->json(['error' => 'Credenciales Incorrectas',401]);
            }
        }
        return $this->respondWithToken($token);
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

    public function cambiarclave(Request $request){
        $user = auth()->user();
        $nuevaclave=Hash::make($request->clave);
        $user->update(['password'=>$nuevaclave]);

       return response()->json(['exito'=>$nuevaclave,200]);
    }

    public function me(){
        return response()->json(auth()->user()->estatus);
    }

    public function mis_puntos(){
        return auth()->user()->puntos;
    }
}