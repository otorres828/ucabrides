<?php

namespace App\Http\Controllers;

use App\Models\Rutas;
use Illuminate\Http\Request;

class RutaController extends Controller
{
    public function listado_rutas_disponibles(){
        return response()->json(['rutas'=>Rutas::all()]);
    }

    public function perfil_localizacion(){
        return response()->json(['lat'=>'8.36080275666839',
                                'lng'=>'-62.646180711450576']);
    }

    public function distancia_dispuesto_caminar(){
        return auth()->user()->distancia;
    }

    public function cambiar_distancia_caminar(Request $request){
        $user = auth()->user();
        $user->update(['distancia'=>$request->distancia]);
        return response()->json(['exito'=>$request->distancia]);
    }
}
