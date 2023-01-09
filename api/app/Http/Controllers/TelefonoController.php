<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TelefonoController extends Controller
{

    public function index(){
        $telefono = auth()->user()->telefono;
        return $telefono;
    }

    public function update(Request $request){
        $user = User::where('_id',auth()->user()->_id)->first();
        $user->telefono=$request->telefono;
        $user->save();
        return $user;
    }

}
