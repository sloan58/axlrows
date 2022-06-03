<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UcmController;

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

Route::get('/me', function() {
    return \App\Models\User::first();
});
Route::resource('/ucm', UcmController::class)->except(['create', 'edit']);
Route::post('/query', function() {

    $response = [];
    $columns = [];
    $totalRows = 0;
    foreach(request()->get('targets') as $target) {
        $ucm = \App\Models\Ucm::find($target['value']);
        ['data' => $data, 'error' => $error] = $ucm->sendQuery(request()->get('statement'));
        $data = array_map(function($row) use ($ucm) {
            $row['ucm'] = $ucm->name;
            return $row;
        }, $data);
        $columns = count($data) ? array_keys($data[0]) : [];
        $response['results'][] = [
            'target' => $target['label'],
            'data' => $data,
            'error' => $error
        ];
        $totalRows = $totalRows + count($data);
    }

    $response['columns'] = $columns;
    $response['totalRows'] = $totalRows;

    \App\Models\User::first()->updateQueryHistory(request()->get('statement'));

    return response((array) $response);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
