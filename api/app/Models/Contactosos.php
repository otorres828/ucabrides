<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Contactosos extends Eloquent
{
    use HasFactory;
    public $timestamps = false;
    protected $primarykey = "_id";

    protected $connection = 'mongodb';
	protected $collection = 'contacto_sos';


    public function user(){
        return $this->belongsTo(User::class,'user_id','_id');
    }

}
