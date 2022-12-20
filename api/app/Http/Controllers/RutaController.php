<?php

namespace App\Http\Controllers;

use App\Models\OrdenesRutas;
use App\Models\Rutas;
use Illuminate\Http\Request;

class RutaController extends Controller
{
    public function listado_rutas_disponibles(){
        return response()->json(['rutas'=>OrdenesRutas::with('rutas')
                                                        ->where('estatus','activo')
                                                        ->where('asientos','>',0)
                                                        ->get()
                                ]);
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

    public function cambiar_estatus_usuario_activo(Request $request){
        $user = auth()->user();
        $user->update(['estatus'=>['cola'=>$request->cola,'orden_ruta_id'=>$request->orden_ruta_id]]);
        //ENVIAR NOTIFICACION AL CONDUCTOR
        return response()->json([$user->estatus],200);
    }

    public function cambiar_estatus_usuario_cancelar(){
        $user = auth()->user();
        $user->update(['estatus'=>['cola'=>false,'orden_ruta_id'=>null]]);
        
        return response()->json([$user->estatus],200);

    }
}
