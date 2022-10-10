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

    protected $connection = 'mongodb';
	protected $collection = 'users';


    protected $fillable = [
        'name',
        'email',
        'password',
        'external_id',
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
}
