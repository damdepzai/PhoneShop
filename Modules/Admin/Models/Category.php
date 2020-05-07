<?php
/**
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/19/20, 11:00 AM
 * Author: tuannq < Nguyễn Quang Tuấn >
 * Email: tuannq@ominext.com
 * File name: CodeMaster.php
 * File path: D:/Projects/PMS/Source/Modules/CRM/Models/CodeMaster.php
 */

namespace Modules\CMT\Models;

use App\Helpers\Node\NodeTrait;

class Category extends BaseCmtModel
{
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'type',
        'description',
        'sort',
    ];

//    protected $convert_full_half = ['name'];

    use NodeTrait;

    public function getLftName()
    {
        return '_lft';
    }

    public function getRgtName()
    {
        return '_rgt';
    }

    public function getParentIdName()
    {
        return 'parent_id';
    }

    // Specify parent id attribute mutator
    public function setParentAttribute($value)
    {
        $this->setParentIdAttribute($value);
    }

    public static function search($parent, $name)
    {
        return self::when($parent, function ($p) use ($parent) {
        $p->where('parent_id', $parent);
    })
        ->when($name, function ($p) use ($name) {
            $p->where('name', 'like', '%' . $name . '%');
        })
        ->get()->toTree();
//        ->paginate($limit);
    }
}
