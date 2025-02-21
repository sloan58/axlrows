<?php

use App\Livewire\{Ucms, QueryEditor};
use Illuminate\Support\Facades\Route;

Route::get('/', QueryEditor::class)->name('query-editor');
Route::get('/ucms', Ucms::class)->name('ucms');
