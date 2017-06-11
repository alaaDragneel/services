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
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand" href="{{ url('/') }}">
                    Services Site
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    <li><a href="{{ url('/home') }}">Home</a></li>
                </ul>
                <form class="navbar-form navbar-left">
                     <div class="form-group">
                          <input type="text" class="form-control" placeholder="Search">
                     </div>
                     <button type="submit" class="btn btn-info">
                         <i class="fa fa-search"></i> Submit
                     </button>
                </form>
                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    @if (Auth::guest())
                        <li><a href="{{ url('/login') }}">Login</a></li>
                        <li><a href="{{ url('/register') }}">Register</a></li>
                    @else
                         {{-- Orders Section --}}
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                Orders <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li>
                                     <a v-link="{path: '/IncomingOrders'}">
                                          <i class="fa fa-truck"></i>
                                          Incoming Orders
                                     </a>
                                </li>
                                <li>
                                     <a v-link="{path: '/PurchaseOrders'}">
                                          <i class="fa fa-cart-plus"></i>
                                          Purchase Orders
                                     </a>
                                </li>
                            </ul>
                        </li>
                        {{-- Services Section --}}
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                Services <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                 <li>
                                     <a v-link="{path: '/AddServices'}">
                                          <i class="fa fa-plus"></i>
                                          Add Service
                                     </a>
                                </li>
                                 <li>
                                     <a v-link="{path: '/MyServices'}">
                                          <i class="fa fa-user"></i>
                                          My Services
                                     </a>
                                </li>
                            </ul>
                        </li>
                        {{-- User Section --}}
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-edit"></i> My Information</a></li>
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-money"></i> My account</a></li>
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i> Logout</a></li>
                            </ul>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>

    @yield('content')

    <!-- JavaScripts -->
    {{ Html::script('js/app.js') }}
   {{ Html::script('js/main.js') }}
</body>
</html>
