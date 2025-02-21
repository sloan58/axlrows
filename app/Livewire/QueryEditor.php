<?php

namespace App\Livewire;

use Livewire\Component;

class QueryEditor extends Component
{
    public string $query = '';

    public function render()
    {
        return view('livewire.query-editor');
    }
}
