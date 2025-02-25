<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }}</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-gray-50">
<div class="flex min-h-screen">
    <!-- Left Navbar -->
    <div class="flex-shrink-0">
        <x-layouts.nav/>
    </div>

    <!-- Main Content Area -->
    <main class="flex-grow overflow-auto p-6">
        {{ $slot }}
    </main>
</div>
</body>
</html>
