<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable =['mensaje','user_id'];
    protected $primarykey = "_id";

    protected $connection = 'mongodb';
	protected $collection = 'messages';

   //relacion uno a muchos inversa
   public function user(){
        return $this->belongsTo(User::class);
    }

}
