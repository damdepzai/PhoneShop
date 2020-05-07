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

namespace Modules\CMT\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\CMT\Models\Category;
use Modules\CMT\Controllers\BaseCmtController;

class CategoryController extends BaseCmtController
{
    public function index(Request $request)
    {
        $parent = $request->input('parent');
        $name = $request->input('name');
//        $limit = $request->input('limit');
        $parents = Category::WhereNull('parent_id')->get();
        $categories = Category::search($parent, $name);
        $data =
            [
                'parents' => $parents,
                'categories' => $categories,
            ];
        return $this->responseAPI(true, 'Success', $data, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        if ($request->parent_id) {
            $target = Category::find($request->parent_id);
            if ($target) {
                $node = new Category([
                    'name' => $request->name,
                    'type' => $request->type,
                    'description' => $request->description
                ]);
                $node->appendToNode($target)->save();
            }
        } else {
            Category::create([
                'name' => $request->name,
                'type' => $request->type,
                'description' => $request->description,
            ]);
        }

        return response()->json([
            'result' => 'OK',
        ], Response::HTTP_OK);

    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->update($request->all());
        return $this->responseAPI(true, 'Success', $category, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id)->delete();
        return $this->responseAPI(true, 'Success', $category, Response::HTTP_OK);
    }
}
