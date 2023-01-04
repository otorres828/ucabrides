<?php

namespace App\Http\Controllers;

use App\Models\OrdenesRutas;
use App\Models\Rutas;
use Illuminate\Http\Request;

class RutaDarController extends Controller
{

    public function index(Request $request)
    {
        return response()->json(Rutas::where('user_id',auth()->user()->_id)->get());
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
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
        $ordenderuta->save();
        return $ordenderuta;
    }

    public function desactivar(Request $request){
        $ordenderuta=OrdenesRutas::where('_id',$request->orden_ruta_id)->first();
        $ordenderuta->delete();
        
        $ruta = Rutas::where('_id',$request->ruta_id)->first();
        $ruta->estatus=false;
        $ruta->save();
        return $ruta;
    }
}
