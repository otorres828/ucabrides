<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
 
    public function index()
    {
        return "hola";
    }


    public function create()
    {
        //
    }

   
    public function store(Request $request)
    {
        $mensaje= [
            'mensaje'=>"hola",
            'user_id'=>User::all()->random()->_id
        ];
        return Message::create($mensaje);
    }

 
    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        //
    }

   
    public function destroy($id)
    {
        //
    }
}
