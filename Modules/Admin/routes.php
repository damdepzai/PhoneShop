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

Route::middleware('auth:sanctum')
    ->prefix('api/cmt')
    ->as('api.crm.')
    ->namespace('\Modules\CMT\Controllers')
    ->group(function () {
        Route::group(['prefix'=>'category'],function() {
            Route::get('/', 'CategoryController@index');
            Route::post('/create', 'CategoryController@store');
            Route::put('/update/{id}', 'CategoryController@update');
            Route::delete('/delete/{id}', 'CategoryController@destroy');
        });
    });

