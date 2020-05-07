<?php


namespace Modules\UserManager\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes;
    protected $table='roles';
    protected $fillable=['name','name_slug','permissions'];
    protected $casts = [
        'permissions' => 'json'
    ];
    public function users(){
        return $this->belongsToMany(User::class,'role_user');
    }

}
