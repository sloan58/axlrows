<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UcmController;
use App\Http\Controllers\Api\QueryController;

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


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/query', QueryController::class)->only(['store', 'update', 'destroy']);
    Route::resource('/ucm', UcmController::class)->except(['create', 'edit']);
    Route::get('/user', function() {
        return request()->user();
    });
});
