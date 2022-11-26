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
}
