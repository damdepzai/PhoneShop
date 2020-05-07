<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseCommonController;
use App\Http\Controllers\Controller;
use App\Mail\Email;
use App\Mail\EmailContact;
use App\Models\ResetPassword;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Password;

class AuthController extends BaseCommonController
{
    use RedirectsUsers;

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $check_user = User::where('email', $request->email)->first();
        if (!$check_user) {
            return response()->json([
                'message' => 'Sai tên đăng nhập hoặc mật khẩu'
            ], Response::HTTP_BAD_REQUEST);
        }
        $user_inactive = User::where('email', $request->email)->where('status', '=', 'inactive')->first();
        if ($user_inactive || $user_inactive != '') {
            return response()->json([
                'message' => 'Tài khoản đăng nhập không còn hoạt động'
            ], Response::HTTP_BAD_REQUEST);
        } else {
            $user_deleted_at = User::withTrashed()->where('email', $request->email)->whereNotNull('deleted_at')->first();
            if ($user_deleted_at) {
                return response()->json([
                    'message' => 'Tài khoản không tồn tại'
                ], Response::HTTP_BAD_REQUEST);
            }
            $user = User::with(['roles'])->where('email', $request->email)->where('status', '=', 'active')->first();
            $permissions = $user->roles->pluck('permissions');
            $permission = [];
            foreach ($permissions as $key => $val) {
                foreach ($val as $value) {
                    $permission[] = $value;
                }
            }
            $permission = array_unique($permission);

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Sai tên đăng nhập hoặc mật khẩu'
                ], Response::HTTP_BAD_REQUEST);
            }
            $user['remember_me'] = $request->get('rememberMe', false);
            return response()->json([
                'token' => $user->createToken($request->email, $permission)->plainTextToken,
                'user' => $user
            ]);
        }

    }

    public function userDetails()
    {
        return response()->json([
            'user' => auth()->user()
        ]);
    }

    public function logout()
    {
        $user = auth()->user();
        $user->tokens()->delete();
        return response()->json([
            'message' => 'Logged out!'
        ], Response::HTTP_NO_CONTENT);
    }

    public function me(Request $request)
    {
        $data['user'] = User::with(['roles'])->find(Auth::id());
        if ($data['user']->status != 'active') {
            return response()->json('Tài khoản của bạn bị chuyển trạng thái Không hoạt động, vui lòng liên hệ với Administrator', Response::HTTP_REQUEST_ENTITY_TOO_LARGE);
        }
        return response()->json($data, 200);
    }

    public function rePassword(Request $request)
    {
        $email = $request->get('email', '');
        $data = User::where('email', '=', $email)->first();
        if ($data) {
            if ($data->status == 'active') {
                $this->broker()->sendResetLink(
                    $this->credentials($request)
                );
                return response()->json('Đường dẫn thay đổi mật khẩu đã được gửi tới email của bạn. Vui lòng kiểm tra email', 200);
            } else {
                return response()->json('Email đăng ký đã bị dừng hoạt động', Response::HTTP_REQUEST_ENTITY_TOO_LARGE);
            }

        } else {
            return response()->json('Địa chỉ email không tồn tại trên hệ thống', 404);
        }
    }

    public function changePassword(Request $request)
    {
        $email=$request->email;
      $token_time=ResetPassword::where('email','=',$email)->first();
      if (!$token_time){
          return response()->json('Link đổi mật khẩu đã được sử dụng', 400);
      }
       $time_c = Carbon::parse($token_time->created_at);
        if (Carbon::now() > Carbon::create($time_c->format('Y-m-d H:i:s'))->addMinutes(config('auth.passwords.users.expire'))) {
            return response()->json('Thời hạn đổi mật khẩu đã hết hạn, vui lòng gửi lại yêu cầu đổi mật khẩu', 400);
        }
        else{
            $response = $this->broker()->reset(
                $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            });
            if ($response) {
                return response()->json('Thay đổi mật khẩu thành công', 200);
            }
        }


    }

    protected function resetPassword($user, $password)
    {
        $this->setUserPassword($user, $password);

        $user->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordReset($user));

        $this->guard()->login($user);
    }

    protected function setUserPassword($user, $password)
    {
        $user->password = Hash::make($password);
    }

    protected function credentials(Request $request)
    {
        return $request->only('email', 'password', 'password_confirmation', 'token');
    }

    public function broker()
    {
        return Password::broker();
    }

    protected function guard()
    {
        return Auth::guard();
    }
}
