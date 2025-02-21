<?php

namespace App\Livewire;

use Livewire\Component;

class QueryEditor extends Component
{
    public function setQuery($query): void
    {
        $query = trim($query);
    }
    public function render()
    {
        return view('livewire.query-editor');
    }
}
