<?php


namespace Modules\UserManager\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Modules\UserManager\Models\Role;
use Modules\UserManager\Models\User;

class UserController extends BaseUserController
{
    public function listUserByRole(Request $request, $id)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $status = $request->input('status');
        $roleAll = Role::all();
        $role = Role::findorFail($id);
        $limit = 50;
        if ($request->input('limit'))
            $limit = $request->input('limit');
        $user = User::with('roles')
            ->when($name, function ($qr) use ($name) {
                $qr->where('name', 'like', '%' . $name . '%');
            })
            ->when($email, function ($qr) use ($email) {
                $qr->where('email', 'like', '%' . $email . '%');
            })
            ->when($role, function ($qr) use ($role) {
                $qr->where('role_id', $role->id);
            })
            ->when($status, function ($qr) use ($status) {
                $qr->where('status', $status);
            })
            ->latest()->paginate($limit);
        $data = [
            'roleAll' => $roleAll,
            'role' => $role,
            'user' => $user,
        ];
        return $this->responseAPI(true, '', $data, 200);
    }

    public function listUser(Request $request)
    {
        $name = $request->input('name');
        $role_id = $request->input('role_id');
        $email = $request->input('email');
        $status = $request->input('status');
        $limit = 50;
        if ($request->input('limit'))
            $limit = $request->input('limit');
        $roles = Role::oldest('name')->get();
        $user = User::with('roles')
            ->when($name, function ($qr) use ($name) {
                $qr->where('name', 'like', '%' . $name . '%');
            })
            ->when($email, function ($qr) use ($email) {
                $qr->where('email', 'like', '%' . $email . '%');
            })
            ->when($role_id, function ($qr) use ($role_id) {
                $qr->where('role_id', $role_id);
            })
            ->when($status, function ($qr) use ($status) {
                $qr->where('status', $status);
            })
            ->latest()->paginate($limit);
        $data = [
            'roles' => $roles,
            'user' => $user,
        ];
        return $this->responseAPI(true, '', $data, 200);
    }

    public function detail($id)
    {
        $data = User::findorFail($id);
        return $this->responseAPI(true, '', $data, 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email,'
        ]);
        if ($validator->fails()) {
            return $this->responseAPI(true, 'Email đã tồn tại', null, Response::HTTP_BAD_REQUEST);
        }
        $user = User::create(array_merge($request->all(), ['created_by' => Auth::user()->id, 'password' => Hash::make($request->password)]));
        if ($request->input('role_id'))
            $user->roles()->sync($request->input('role_id'));
        return $this->responseAPI(true, '', $user->load('roles'), 201);
    }

    public function update(Request $request, $id)
    {
        $password = $request->input('password');
        $data = User::findorFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email,' . $data->id
        ]);
        if ($validator->fails()) {
            return $this->responseAPI(true, 'Email đã tồn tại', null, Response::HTTP_BAD_REQUEST);
        }
        if ($password != '') {
            $data->update(array_merge($request->all(), ['created_by' => Auth::user()->id, 'password' => Hash::make($password)]));
            if ($request->input('role_id'))
                $data->roles()->sync($request->input('role_id'));
            return $this->responseAPI(true, '', $data->load('roles'), Response::HTTP_OK);
        } else {
            $data->update($request->except('password'));
            if ($request->input('role_id'))
                $data->roles()->sync($request->input('role_id'));
            return $this->responseAPI(true, '', $data->load('roles'), Response::HTTP_OK);
        }
    }

    public function delete($id)
    {
        try {
            DB::beginTransaction();
            $user = User::findOrFail($id);
            $user->update(['deleted_by' => Auth::user()->id]);
            DB::table('role_user')->where('user_id', $user->id)->delete();
            $user->delete();
            DB::commit();
            return $this->responseAPI(true, 'Delete Success', $user, Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

}
