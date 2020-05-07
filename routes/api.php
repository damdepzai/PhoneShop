<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Broadcast::routes(['middleware' => ['auth:sanctum', 'check.status']]);
Auth::routes();

Route::group(['namespace' => 'API', 'prefix' => 'auth'], function () {
    Route::post('/login', 'AuthController@login')->name('login');
    Route::post('/re-password', 'AuthController@rePassword')->name('reset.password');
    Route::post('/change-password', 'AuthController@changePassword')->name('change.password');
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('/details', 'AuthController@userDetails');
        Route::post('/logout', 'AuthController@logout');
        Route::post('/me', 'AuthController@me');
        Route::get('/permission', 'PermissionController@getPermission');
        Route::group([ 'prefix' => 'role'], function () {
            Route::get('/all', 'RoleController@list');
            Route::post('/store', 'RoleController@create');
            Route::put('/update/{id}', 'RoleController@updateRole');
            Route::delete('/delete/{id}', 'RoleController@delete');
            Route::get('/detail/{id}', 'RoleController@detail');
        });
    });
});


