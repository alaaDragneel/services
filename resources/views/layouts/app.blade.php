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
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- Branding Image -->
          <a class="navbar-brand" href="{{ url('/') }}">
              Services Site
          </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse" aria-expanded="false" style="height: 1px;">
             <!-- Left Side Of Navbar -->
             <ul class="nav navbar-nav">
                 <li><a href="{{ url('/home') }}">Home</a></li>
             </ul>
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
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
            <button type="button" class="btn btn-primary">
                 <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>

    @yield('content')

    <!-- JavaScripts -->
    {{ Html::script('js/main.js') }}
    {{ Html::script('js/app.js') }}
</body>
</html>
