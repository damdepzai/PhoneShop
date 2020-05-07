<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnsToRoleUserTable extends Migration
{
    public function up()
    {
        Schema::table('role_user', function (Blueprint $table) {
            $table->bigInteger('user_id')->change();
            $table->bigInteger('role_id')->change();
        });
    }

    public function down()
    {
        Schema::table('role_user', function (Blueprint $table) {
            $table->tinyInteger('role_id');
            $table->tinyInteger('user_id');
        });
    }
}
