<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Rutas extends Eloquent
{
    use HasFactory;
    public $timestamps = false;
    protected $primarykey = "_id";

    protected $connection = 'mongodb';
	protected $collection = 'rutas';

    //relacion uno a muchos inversa
    public function ordenes(){
        return $this->hasMany(OrdenesRutas::class);
    }
    
    public function user(){
        return $this->belongsTo(User::class,'user_id','_id');
    }
}
