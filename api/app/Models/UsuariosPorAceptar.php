<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class UsuariosPorAceptar extends Eloquent
{
    use HasFactory;
    public $timestamps = false;
    protected $primarykey = "_id";

    protected $connection = 'mongodb';
	protected $collection = 'usuarios_por_aceptar';

    protected $fillable = [
        'user_recibe_id','orden_ruta_id'
    ];
    public function ordenes(){
        return $this->belongsTo(OrdenesRutas::class,'orden_ruta_id','_id');
    }
 
    public function user(){
        return $this->belongsTo(User::class,'user_recibe_id','_id');
    }
}
