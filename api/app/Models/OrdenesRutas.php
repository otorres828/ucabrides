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


    public function rutas(){
        return $this->belongsTo(Rutas::class,'ruta_id','_id');
    }
}
