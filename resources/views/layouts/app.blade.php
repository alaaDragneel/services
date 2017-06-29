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
    {{-- Nav Bar --}}
      <nav class="navbar navbar-inverse">
        <div class="navbar-header">
        	<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
    			<span class="sr-only">Toggle navigation</span>
    			<span class="icon-bar"></span>
    			<span class="icon-bar"></span>
    			<span class="icon-bar"></span>
    		</button>
    		<a class="navbar-brand" v-link="{path: '/'}">My Services Site</a>
    	</div>

    	<div class="collapse navbar-collapse js-navbar-collapse">
    		<ul class="nav navbar-nav">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    <li><a href="{{ url('/home') }}">Home</a></li>
                </ul>
            	<li class="dropdown mega-dropdown">
    				<a href="#" class="dropdown-toggle catFolder" data-toggle="dropdown">
                        <i class="fa fa-folder"></i> Categories <span class="caret"></span>
                    </a>
    				<ul class="dropdown-menu mega-dropdown-menu">
                        @foreach (\App\Category::get(['id', 'name'])->chunk(6) as $category)
                            <li class="col-sm-3">
                                <ul>
                                    @foreach ($category as $cat)
                                                <li class="dropdown-header">
                                                <a v-link="{name: '/Category', params:{catId: {{ $cat->id }}, catName: '{{ $cat->name }}' }}">
                                                    {{ $cat->name }}
                                                </a>
                                                </li>
                                    @endforeach
                                </ul>
                            </li>
                        @endforeach

    				</ul>
    			</li>
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
                          <li><a v-link="{path: '/AddCredit'}"><i class="fa fa-btn fa-plus"></i> Add credit</a></li>
                          <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-money"></i> My account</a></li>
                          <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i> Logout</a></li>
                     </ul>
                  </li>
                  {{-- Messages Section --}}
                  <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                          <i class="fa fa-envelope"></i> <span class="hidden-lg hidden-md">Messages</span> <span class="caret"></span>


                     </a>

                     <ul class="dropdown-menu" role="menu">
                          <li>
                               <a v-link="{path: '/GetMyRecivedMessages'}">
                                    <i class="fa fa-inbox"></i>
                                    Incoming Messages
                               </a>
                          </li>
                          <li>
                               <a v-link="{path: '/GetMySendMessages'}">
                                    <i class="fa fa-send"></i>
                                    Send Messages
                               </a>
                          </li>
                     </ul>
                  </li>
                  {{-- Favorite --}}
                  <li class="dropdown">
                     <a v-link="{path: '/GetMyFavorites'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                          <span class="fa fa-heart"></span>
                          <span class="hidden-lg hidden-md">Favorite</span>
                     </a>
                  </li>
              @endif
          </ul>
          <form class="navbar-form navbar-left">
              <input type="text" class="form-control" placeholder="Search...">
              <button type="button" class="btn btn-primary">
                  <i class="fa fa-search"></i>
              </button>
          </form>


    	</div><!-- /.nav-collapse -->
      </nav>
    {{-- Nav Bar --}}

    @yield('content')

    <!-- JavaScripts -->
    {{ Html::script('js/main.js') }}
    {{ Html::script('js/app.js') }}
</body>
</html>
