<?php

namespace App\Http\Controllers;

use App\Models\Contactosos;
use Illuminate\Http\Request;

class ContactoSosController extends Controller
{
    public function index(){
        $contactossos = Contactosos::where('user_id',auth()->user()->id)->get();
        return response()->json($contactossos,200);
    }

    public function store(Request $request){
        $cuenta = Contactosos::where('user_id',auth()->user()->id)->count();
        if($cuenta>2)
            return response()->json(['error'=>'No puede registrar, ha llegado al limite']);
        $contactossos = new Contactosos();
        $contactossos->nombre= $request->nombre;
        $contactossos->telefono= $request->telefono;
        $contactossos->user_id =auth()->user()->_id;
        $contactossos->save();
        return $contactossos;
    }

    public function update(Request $request, $id)
    {
        $contactossos = Contactosos::findOrFail($id);
        $contactossos->marca = strtoupper($request->marca);
        $contactossos->color = $request->color;
        $contactossos->placa = strtoupper($request->placa);

        $contactossos->save();
        return $contactossos;
    }

    public function delete($id){
        $contactossos = Contactosos::findOrFail($id);
        $contactossos->delete();
        return Contactosos::all();
    }

}
