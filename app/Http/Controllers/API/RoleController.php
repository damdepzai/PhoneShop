<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseCommonController;
use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class RoleController extends BaseCommonController
{
    public function list(Request $request)
    {
        $name = $request->name;
        $limit = 50;
        if ($request->input('limit'))
            $limit = $request->input('limit');
        $role = Role::with(['users' => function ($qr) {
        }])
            ->when($name, function ($qr) use ($name) {
                $qr->where('name', 'like', '%' . $name . '%');
            })->oldest('name')->paginate($limit);
        $array_role = DB::table('users')->select('id','role_id')->get();
        $data = [
            'role' => $role,
            'array_role' => $array_role,

        ];
        return $this->responseAPI(true, '', $data, 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:roles,name,NULL,id,deleted_at,NULL'
        ]);
        if ($validator->fails()) {
            return $this->responseAPI(true, 'Tên nhóm đã tồn tại', null, Response::HTTP_BAD_REQUEST);
        }
        try {
            DB::beginTransaction();
            $data_input = array(
                'name' => $request->get('name', ''),
                'name_slug' => $this->slug($request->get('name', '')),
                'permissions' => $request->get('permissions', []),
                'created_by' => Auth::user()->id,
            );
            $role = Role::create($data_input);
            DB::commit();
            return $this->responseAPI(true, '', $role, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->responseAPI(false, '', $e, 400);
        }
    }

    public function updateRole(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $role = Role::findOrFail($id);
            $validator = Validator::make($request->all(), [
                'name' => 'required|unique:roles,name,' . $role->id . ',id,deleted_at,NULL',
            ]);
            if ($validator->fails()) {
                return $this->responseAPI(true, 'Tên nhóm đã tồn tại', '', 400);
            } else {
                $role->update(array_merge($request->all(), ['updated_by' => Auth::user()->id]));
            }
            DB::commit();
            return $this->responseAPI(true, '', $role, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->responseAPI(false, $e, '', 400);
        }

    }

    public function update(Request $request, $id)
    {
        $role = Role::findorFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:roles,name,' . $role->id
        ]);
        if ($validator->fails()) {
            return $this->responseAPI(true, 'Tên nhóm đã tồn tại', null, Response::HTTP_BAD_REQUEST);
        }
        $data = Role::findorFail($id);
        if ($data || !empty($data)) {
            try {
                DB::beginTransaction();
                $data->name = $request->get('name', '');
                $data->name_slug = $this->slug($request->get('name', ''));
                $data->permissions = $request->get('permissions', '');
                $data->updated_by = Auth::user()->id;
                $data->save();
                DB::commit();
                return $this->responseAPI(true, '', $data, 200);
            } catch (\Exception $e) {
                DB::rollBack();
                return $this->responseAPI(false, '', $e, 400);
            }
        } else {
            return $this->responseAPI(false, 'Group user Not Found', '', 404);
        }
    }

    public function detail($id)
    {
        $data = Role::findorFail($id);
        return $this->responseAPI(true, '', $data, 200);
    }

    public function delete($id)
    {
        $role = Role::findOrFail($id);
        $role->update(['deleted_by' => Auth::user()->id]);
        DB::table('role_user')->where('role_id', $role->id)->delete();
        $role->delete();
        return $this->responseAPI(true, 'Delete Success', '', 200);
    }
}
