<?php

namespace App\Http\Controllers;

use App\Models\OrdenesRutas;
use App\Models\Rutas;
use App\Models\User;
use App\Models\UsuariosPorAceptar;
use ArrayObject;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;
use stdClass;

class RutaDarController extends Controller
{

    public function index(Request $request)
    {
        return response()->json(Rutas::where('user_id',auth()->user()->_id)->get());
    }

    public function ordenes_rutas(){
        $ruta = Rutas::where('user_id',auth()->user()->_id)->where('estatus',true)->first();
        if($ruta){
            $ordenderuta= OrdenesRutas::where('ruta_id',$ruta->_id)->first();
            return $ordenderuta;
        }
        return ;
    }

    public function crear_orden(Request $request){    
        $ruta = Rutas::where('_id',$request->ruta_id)->first();
        $ruta->estatus=true;
        $ruta->save();
        
        $ordenderuta= new OrdenesRutas();
        $ordenderuta->estatus='activo';
        $ordenderuta->ruta_id=$request->ruta_id;
        $ordenderuta->asientos=(int)$request->asientos;
        $ordenderuta->vehiculo_id=$request->vehiculo_id;
        $ordenderuta->usuarios=[];
        $ordenderuta->hora=$request->hora;
        $ordenderuta->save();
        return $ordenderuta;
    }

    public function desactivar(Request $request){
        $ordenderuta=OrdenesRutas::where('_id',$request->orden_ruta_id)->first();
        $usuariosporaceptar=UsuariosPorAceptar::where('orden_ruta_id',$request->orden_ruta_id)->get();
        $ordenderuta->delete();
        
        $ruta = Rutas::where('_id',$request->ruta_id)->first();
        $ruta->estatus=false;
        $ruta->save();

        foreach($usuariosporaceptar as $usuario){
            $aceptar= UsuariosPorAceptar::where('_id',$usuario->_id)->first();
            $user = User::where('_id',$usuario->user_recibe_id)->first();
            $user->update(['estatus'=>['cola'=>false,'orden_ruta_id'=>null]]);

            $aceptar->delete();
        }
        return $ruta;
    }

    public function detalles_orden_activa(){
        $ruta = Rutas::where('user_id',auth()->user()->_id)->where('estatus',true)->first();
        if($ruta){
            return $ordenderuta= OrdenesRutas::with('rutas')->with('vehiculo')->where('ruta_id',$ruta->_id)->where('estatus','=','activo')->first();
        }
    }

    public function obtener_usuarios_por_aceptar(Request $request){
        return UsuariosPorAceptar::with('user')->where('orden_ruta_id',$request['orden_id'])->get();;
    }

    public function agregar_usuario_orden(Request $request){
        $ordenderuta=OrdenesRutas::where('_id',$request->orden_ruta_id)->first();
        if($ordenderuta->asientos==0){
            return response()->json(['error'=>'Usuarios Completos']);
        }
        $usuarios= $ordenderuta->usuarios;
        $user = $request->user;
        
        array_push($usuarios,$user);
        $ordenderuta->usuarios=$usuarios;
        $ordenderuta->asientos=($ordenderuta->asientos)-1;
        $ordenderuta->save();
        
        //MODIFICAR PERFIL DE USUARIO
        $userconsulta=User::where('_id',$user['_id'])->first();
        $nuevoobjeto = new stdClass(); $nuevoobjeto->cola='aprobado';$nuevoobjeto->orden_ruta_id=$ordenderuta->_id;
       
        $userconsulta->estatus=(object)$nuevoobjeto;
        $userconsulta->save();

        //ELIMINAR USER DE USUARIOS POR ACEPTAR
        $usuariosporaceptar= UsuariosPorAceptar::where('user_recibe_id',$userconsulta->_id)->first();
        $usuariosporaceptar->delete();

        return $ordenderuta;
    }

    public function rechazar_usuario_orden(Request $request){
        $user = $request->user;

        //ELIMINAR USUARIO DE USUARIOS POR ACEPTAR
        $usuariosporaceptar = UsuariosPorAceptar::where('user_recibe_id',$user['_id'])->first();
        $usuariosporaceptar->delete();

        //Capturamos el nuevo objeto
        $nuevoobjeto = new stdClass(); 
        $nuevoobjeto->cola=false;
        $nuevoobjeto->orden_ruta_id='';

        //BUSCAMOS EL USUARIO
        $usuarioamodificar= User::where('_id',$user['_id'])->first();
        $usuarioamodificar->estatus=(object)$nuevoobjeto;
        $usuarioamodificar->save();
        
        return $usuariosporaceptar;
    }

    public function cancelarle_cola_usuario(Request $request){ //EL CONDUCTOR DECIDE SACAR AL USUARIO DE LA COLA
        $ordenes=OrdenesRutas::where('_id',$request->orden_ruta_id)->first();
        $user=User::where('_id',$request->user_id)->first();
        $newArray = array(); 
        foreach($ordenes->usuarios as $key => $value) { 
            if($value['_id']!=$user->_id)
            $newArray[$key] = $value; 
        } 
        $ordenes->usuarios=$newArray;
        $user->update(['estatus'=>['cola'=>false,'orden_ruta_id'=>null]]);
        $ordenes->asientos=$ordenes->asientos+1;
        $ordenes->save();

        return $ordenes;
    }

    public function cancelar_cola_pasajero_aprobado(Request $request){ //EL USUARIO APROBADO DECIDE CANCELAR LA COLA
        $ordenes=OrdenesRutas::where('_id',$request->orden_ruta_id)->first();
        $user=User::where('_id',$request->user_id)->first();
        $newArray = array(); 
        foreach($ordenes->usuarios as $key => $value) { 
            if($value['_id']!=$user->_id)
            $newArray[$key] = $value; 
        } 
        $ordenes->usuarios=$newArray;
        $user->update(['estatus'=>['cola'=>false,'orden_ruta_id'=>null]]);
        $ordenes->asientos=$ordenes->asientos+1;
        $ordenes->save();
        
        return $ordenes;
    }

    public function modificar_cola_conductor(Request $request){ 
        $orden=OrdenesRutas::where('_id',$request->orden_ruta_id)->first();
        $ruta=Rutas::where('_id',$orden->ruta_id)->first();
        $ruta->estatus=false;
        if($request->bandera=='cancelado'){
            $orden->estatus="cancelado";
        }else{
            $orden->estatus="completado";
        }
        $orden->save();
        $ruta->save();

        foreach($orden->usuarios as $value) { 
            $user=User::where('_id',$value['_id'])->first();
            $user->update(['estatus'=>['cola'=>false,'orden_ruta_id'=>null]]);
            if($request->bandera=="completado"){
                $user->puntos=$user->puntos+1;
                $user->save();
            }
        }
        
        $conductor = User::where('_id',$ruta->user_id)->first();
        $conductor->puntos=$conductor->puntos+3;
        $conductor->save();
        
        return $orden;
    }

    public function crear_ruta(Request $request){ 
        $ruta = new Rutas();
        $ruta->estatus=false;
        $ruta->nombre=$request->nombre;
        $ruta->lat=$request->lat;
        $ruta->lng=$request->lng;
        $ruta->user_id=auth()->user()->_id;
        $ruta->save();
        return $ruta;
    }

    public function eliminar_ruta(Request $request){
        $ruta = Rutas::where('_id',$request->ruta_id)->first();
       $ordenderuta = OrdenesRutas::where('ruta_id',$ruta->_id)->where('estatus','=','activo')->first();
        if($ordenderuta)
            return response()->json(['error'=>"No puede eliminar, tiene una orden de ruta abierta"]);
        $ruta->delete();
        return Rutas::where('user_id',auth()->user()->_id)->get();
    }
}


