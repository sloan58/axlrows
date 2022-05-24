<?php

use App\Models\Ucm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/ucm', function(Ucm $ucm) {
    return $ucm->all();
});
Route::get('/ucm/{ucm}', function(Ucm $ucm) {
    return $ucm;
});
Route::post('/ucm', function() {
    return Ucm::create(request()->all());
});
Route::put('/ucm/{ucm}', function(Ucm $ucm) {
    return $ucm->update(request()->all());
});
Route::delete('/ucm/{ucm}', function(Ucm $ucm) {
    return $ucm->delete();
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
