<?php

namespace App\Http\Controllers;

use App\Models\OrdenesRutas;
use App\Models\PuntoCercano;
use App\Models\Rutas;
use App\Models\User;
use App\Models\UsuariosPorAceptar;
use App\Models\Vehiculo;
use Illuminate\Http\Request;

class RutaController extends Controller
{
    public function listado_rutas_disponibles(){
        return response()->json(['rutas'=>OrdenesRutas::with('rutas')->with('vehiculo')
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
        UsuariosPorAceptar::create(['user_recibe_id'=>auth()->user()->_id,'orden_ruta_id'=>$request->orden_ruta_id]);
        return response()->json([$user->estatus],200);
    }

    public function cambiar_estatus_usuario_cancelar(){                                    //ELIMINA AL USUARIO DE USUARIOS POR ACEPTAR Y MODIFICA LOS VALORES DE SU ESTATUS A FALSO Y NULLO
        $user = auth()->user();
        $orden_ruta_id= ($user->estatus)['orden_ruta_id'];
        $usuario_por_aceptar=UsuariosPorAceptar::where('orden_ruta_id',$orden_ruta_id)->first();
        UsuariosPorAceptar::destroy($usuario_por_aceptar->_id);
        $user->update(['estatus'=>['cola'=>false,'orden_ruta_id'=>null]]);
        return response()->json([$user->estatus],200);
    }

    public function usuarios_por_aceptar(){
        //PRIMERO OBTENEMOS EL ID DE LA RUTA ACTIVA DEL CONDUCTOR
        //CON EL ID DE LA RUTA ACTIVA CONSEGUIMOS  LA ORDEN DE RUTA ACTIVA QUE COINCIDE CON ESE ID
        //LUEGO ACCEDEMOS AL ATRIBUTO USUARIOS
        $id_ruta= Rutas::select('_id')->where('user_id',auth()->user()->_id)
                            ->where('estatus',true)
                            ->first()->_id;
        $id_orden_ruta= OrdenesRutas::where('ruta_id',$id_ruta)->where('estatus','activo')->first()->_id;
        $users = UsuariosPorAceptar::with('user')->where('orden_ruta_id',$id_orden_ruta)->get();
       
        return response()->json(['users'=>$users],200);
    }

    public function obtener_conductor(Request $request){
        $ruta_id=OrdenesRutas::where('_id',$request->orden_ruta_id)->first()->ruta_id;
        $user=Rutas::with('user')->where('_id',$ruta_id)->first()->user;
        return response()->json($user,200);
    }

    public function obtener_detalles_orden_abierta(Request $request){
        $detalles= OrdenesRutas::with('rutas')->with('vehiculo')->where('_id',$request->orden_ruta_id)->first();
        $conductor = User::select('name','email')->where('_id',$detalles->rutas->user_id)->first();
        return response()->json([
            'detalles_orden'=>$detalles,"conductor"=>$conductor
        ],200);
    }

    public function guardar_puntomascerca(Request $request){
        $puntocercano= new  PuntoCercano();
        $puntocercano->user_id=$request->user_id;
        $puntocercano->puntomascerca=$request->puntocercano;
        $puntocercano->save();
        return $puntocercano;
    }

    public function obtener_puntomascerca(Request $request){
        return $puntomascerca= PuntoCercano::where('user_id',$request->user_id)->first();

    }

}
