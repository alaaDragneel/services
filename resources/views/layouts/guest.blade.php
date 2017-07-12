<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- Custome meta For laravel Requests --}}
    <meta id="_token" value="{{ csrf_token() }}">
    {{-- Custome meta laravel Requests --}}
    <title>Services Site</title>

    <!-- Styles -->
    {{ Html::style('css/style.css') }}

</head>
<body id="app-layout">

    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-nav" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="{{ url('/') }}">My Service Site</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="app-nav">
                <ul class="nav navbar-nav">
                    <!-- Left Side Of Navbar -->
                    <li class="dropdown mega-dropdown">
                        <a href="#" class="dropdown-toggle catFolder" data-toggle="dropdown">
                            <i class="fa fa-folder"></i> Categories <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu mega-dropdown-menu">
                            @foreach (\App\Category::get(['id', 'name']) as $category)
                                <li class="col-sm-3">
                                    <ul>

                                            <li class="dropdown-header">
                                                <a href="{{ url("/#!/Category/{$category->id}/{$category->name}") }}">
                                                    {{ $category->name }}
                                                </a>
                                            </li>

                                    </ul>
                                </li>
                            @endforeach
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    @if (Auth::guest())
                        <li><a href="{{ url('/register') }}"><i class="fa fa-user-plus"></i> register</a></li>
                        <li><a href="{{ url('/login') }}"><i class="fa fa-user"></i> login</a></li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>

    @yield('content')

    <!-- JavaScripts -->
    {{ Html::script('js/main.js') }}
    {{ Html::script('js/app.js') }}
</body>
</html>
