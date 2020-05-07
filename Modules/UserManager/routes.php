<?php

Route::middleware(['auth:sanctum', 'check.status'])
    ->prefix('api/user')
    ->namespace('Modules\UserManager\Controllers')
    ->group(function () {
        Route::get('/all', 'UserController@listUser')->middleware('permission:user-view');
        Route::post('/store', 'UserController@create')->middleware('permission:user-create');
        Route::put('/update/{id}', 'UserController@update')->middleware('permission:user-edit');
        Route::delete('/delete/{id}', 'UserController@delete')->middleware('permission:user-delete');

        Route::get('/role/{id}','UserController@listUserByRole')->middleware('permission:userGroup-detail');
    });
