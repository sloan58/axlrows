<?php

namespace App\Http\Controllers\Api;

use App\Models\Ucm;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;

class UcmController extends Controller
{
    /**
     * Return a listing of the resource.
     *
     * @return Collection
     */
    public function index(): Collection
    {
        return Ucm::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Ucm
     */
    public function store(Request $request): Ucm
    {
        return Ucm::create($request->all());
    }

    /**
     * Return the specified resource.
     *
     * @param Ucm $ucm
     * @return Ucm
     */
    public function show(Ucm $ucm): Ucm
    {
        return $ucm;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Ucm $ucm
     * @return bool
     */
    public function update(Request $request, Ucm $ucm): bool
    {
        return $ucm->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Ucm $ucm
     * @return bool
     */
    public function destroy(Ucm $ucm): bool
    {
        return $ucm->delete();
    }
}
