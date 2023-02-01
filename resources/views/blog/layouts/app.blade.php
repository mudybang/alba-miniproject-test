<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  class="h-100">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @viteReactRefresh
    @vite('resources/sass/app.scss')
    <link href="{{url('css/blog.css')}}" rel="stylesheet">
    <link href="{{url('css/cover.css')}}" rel="stylesheet">
</head>
<body class="d-flex text-center text-bg-dark">
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="mb-2">
        @include('blog.components.navbar')
    </header>

    <main class="p-3" style="min-height:80vh;">
        @yield('content')
    </main>

    <footer class="mt-auto text-white-50">
        @include('blog.components.footer')
    </footer>
</div>
</body>
</html>
