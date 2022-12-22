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
}
