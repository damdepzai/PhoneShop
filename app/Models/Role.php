<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BaseModel as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends BaseModel
{
    use SoftDeletes;

    protected $table = 'roles';
    protected $fillable = ['name','name_slug','permissions', 'created_by', 'updated_by', 'deleted_by'];
    protected $casts = [
        "permissions"=>"json"
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'role_user', 'user_id', 'role_id')
            ->withPivot(['user_id', 'role_id']);
    }
}
