<?php


namespace Modules\UserManager\Controllers;


use App\Http\Controllers\Controller;

class BaseUserController extends Controller
{
    protected function responseAPI($status, $message, $data, $status_code, $time_update = null)
    {
        $array = array(
            'status' => $status,
            'message' => $message,
            'data' => $data
        );
        if ($time_update != null) {
            $array['time_update'] = $time_update;
        }
        return response()->json($array, $status_code);
    }
}
