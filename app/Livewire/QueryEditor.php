<?php

namespace App\Livewire;

use Livewire\Component;
use App\Actions\ExecuteSqlQueryAction;

class QueryEditor extends Component
{
    public array $results;
    public array $headers;

    public function setQuery($query): void
    {
        $this->results = ExecuteSqlQueryAction::run($query);
        $this->headers = array_keys((array)$this->results[0]) ?? [];
    }

    public function render()
    {
        return view('livewire.query-editor');
    }
}
