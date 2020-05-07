<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseCommonController;
use Illuminate\Support\Facades\Gate;

class PermissionController extends BaseCommonController
{

    public function getPermission()
    {
        $permission = Gate::abilities();
        foreach ($permission as $key => $value) {
            $ex_key[] = explode('-', $key);
        }
        foreach ($ex_key as $key => $val) {
          $test[$val[0]][] = [
              "text" => implode("-",$val),
              "flag"=> false
          ];
        }
        return $this->responseAPI(true, '', $test, 200);
    }

}
