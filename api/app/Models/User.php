<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;


class User extends Eloquent implements JWTSubject, AuthenticatableContract
{
    use AuthenticableTrait;
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;
    protected $primarykey = "_id";

    protected $connection = 'mongodb';
	protected $collection = 'users';


    protected $fillable = [
        'name',
        'email',
        'password',
        'external_id',
        'username',
        'avatar',
        'distancia',
        'direccion',
        'estatus',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

  
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

  
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function message()
    {
        return $this->hasMany(Message::class);
    }

    public function usuarioporaceptar(){
        return $this->hasMany(UsuariosPorAceptar::class);
    }

    public function ruta(){
        return $this->hasMany(Rutas::class);
    }
}
