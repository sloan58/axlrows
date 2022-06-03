<?php

namespace App\Http\Controllers\Api;

use App\Models\Ucm;
use App\Models\User;
use App\Models\Query;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;

class QueryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function store(): Response
    {
        $response = [];
        $columns = [];
        $totalRows = 0;
        foreach(request()->get('targets') as $target) {
            $ucm = Ucm::find($target['value']);
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

        User::first()->queries()->create([
            'statement' => request()->get('statement')
        ]);

        return response((array) $response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Query $query
     * @return bool
     */
    public function update(Query $query): bool
    {
        return $query->update(request()->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Query $query
     * @return bool
     */
    public function destroy(Query $query): bool
    {
        return $query->delete();
    }
}
