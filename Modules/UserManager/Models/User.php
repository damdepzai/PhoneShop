<?php
/**
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/17/20, 3:45 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: BaseCrmModel.php
 * File path: D:/Projects/PMS/Source/Modules/CRM/Models/BaseCrmModel.php
 */

namespace Modules\UserManager\Models;

use App\Models\SuAdminScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User as UserBase;



class User extends UserBase
{
    use SoftDeletes;

    public static function boot() {
        parent::boot();
        static::addGlobalScope(new SuAdminScope());
    }

    function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }


    protected $keys = [];
    protected $dates = [];
    protected $convert_half_full = [];
    protected $convert_full_half = ['name'];
    protected $convert_katakana_hiragana = [];
    protected $convert_hiragana_katakana = [];



}
