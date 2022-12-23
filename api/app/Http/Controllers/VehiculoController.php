<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index(){
        $vehiculos = Vehiculo::where('user_id',auth()->user()->id)->get();
        return response()->json($vehiculos,200);
    }

    public function update(Request $request, $id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->marca = strtoupper($request->marca);
        $vehiculo->color = $request->color;
        $vehiculo->placa = strtoupper($request->placa);

        $vehiculo->save();
        return $vehiculo;
    }
}
