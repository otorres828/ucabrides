<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class OrdenesRutas extends Eloquent
{
    use HasFactory;
    public $timestamps = false;
    protected $primarykey = "_id";

    protected $connection = 'mongodb';
	protected $collection = 'ordenes_rutas';

    public function ruta(){
        return $this->belongsTo(Rutas::class,'ruta_id','_id');
    }

    public function usuarioporaceptar(){
        return $this->hasMany(UsuariosPorAceptar::class);
    }

    public function vehiculo(){
        return $this->belongsTo(Vehiculo::class,"vehiculo_id","_id");
    }
}
