<?php

namespace App\Http\Controllers;

use App\Models\OrdenesRutas;
use App\Models\Rutas;
use Illuminate\Http\Request;

class RutaController extends Controller
{
    public function listado_rutas_disponibles(){
        return response()->json(['rutas'=>OrdenesRutas::with('rutas')->where('estatus','activo')->get()]);
    }

    public function perfil_direccion(){
        $direccion = auth()->user()->direccion;
        return response()->json($direccion);
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
        return response()->json($request->LatLng);
    }
}
