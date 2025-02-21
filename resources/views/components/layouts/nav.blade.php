<!-- Left Sidebar (Navbar) -->
<nav class="w-64 border-r bg-white">
    <div class="p-4">
        <h2 class="text-lg font-semibold mb-4">Settings</h2>
        <ul class="space-y-2">
            @php
                $routes = [
                    [ 'name' => 'query-editor', 'label' => 'Query Editor'],
                    [ 'name' => 'ucms', 'label' => 'UCMs'],
                ];
            @endphp
            @foreach($routes as $route)
                <li>
                    <a
                        href="{{ route($route['name']) }}"
                        class="block px-3 py-2 rounded-md text-gray-700 {{ request()->routeIs($route['name']) ? 'bg-gray-100 text-gray-900' : '' }}"
                        :class=""
                        wire:navigate
                    >
                        {{ $route['label'] }}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</nav>
