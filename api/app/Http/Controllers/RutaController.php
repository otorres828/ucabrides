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
        return response()->json(['lat'=>'8.352143',
                                'lng'=>'-62.665064']);
    }

    public function distancia_dispuesto_caminar(){
        return auth()->user()->distancia;
    }

    public function cambiar_distancia_caminar(Request $request){
        $user = auth()->user();
        $user->update(['distancia'=>$request->distancia]);
        return response()->json(['exito'=>$request->distancia]);
    }

    public function cambiar_ubicacion (Request $request){

        $user = auth()->user();
        $user->update(['direccion'=>$request->LatLng]);
        return response()->json(['exito'=>$request->LatLng]);
    }
}
