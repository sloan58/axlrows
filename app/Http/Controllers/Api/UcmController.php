<?php

namespace App\Http\Controllers\Api;

use App\Models\Ucm;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required|unique:ucms|max:255',
            'ipAddress' => 'required|ipv4',
            'username' => 'required|max:255',
            'password' => 'required|max:255',
            'version' => 'required|in:14,12.5,11.5,10.5'
        ]);
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
     * Ucm the specified resource in storage.
     *
     * @param Request $request
     * @param Ucm $ucm
     * @return bool
     */
    public function update(Request $request, Ucm $ucm): bool
    {
        request()->validate([
            'name' => 'required|unique:ucms,name,' . $ucm->id . '|max:255',
            'ipAddress' => 'required|ipv4',
            'username' => 'required|max:255',
            'password' => 'sometimes|max:255',
            'version' => 'required|in:14,12.5,11.5,10.5'
        ]);
        return $ucm->update($request->except(
            request()->filled('password') ?: 'password'
        ));
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
