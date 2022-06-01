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

Route::resource('/ucm', UcmController::class)->except(['create', 'edit']);
Route::post('/query', function() {

    $response = [];
    foreach(request()->get('targets') as $target) {
        $ucm = \App\Models\Ucm::find($target['value']);
        ['data' => $data, 'error' => $error] = $ucm->sendQuery(request()->get('statement'));
        $data = array_map(function($row) use ($ucm) {
            $row['ucm'] = $ucm->name;
            return $row;
        }, $data);
        $response[] = [
            'target' => $target['label'],
            'columns' => array_keys($data[0]) ?? [],
            'data' => $data,
            'error' => $error
        ];
    }

    $user = \App\Models\User::first();
    $queryHistory = (array) $user->queryHistory;
    array_unshift($queryHistory, request()->get('statement'));
    $queryHistory = array_slice($queryHistory, 0, 10);
    $user->queryHistory = $queryHistory;
    $user->save();

    return response((array) $response);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
