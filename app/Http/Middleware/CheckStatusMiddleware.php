<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CheckStatusMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::user()->status != 'active')
        {
            return response()->json('Tài khoản của bạn bị chuyển trạng thái Không hoạt động, vui lòng liên hệ với Administrator', Response::HTTP_BAD_REQUEST);
        }
        return $next($request);
    }
}
