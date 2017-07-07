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
                @if (Auth::check())
                    {{-- Orders Section --}}
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            <i class="fa fa-first-order"></i>
                            <span class="hidden-lg hidden-md">Orders</span>
                            <span class="caret"></span>
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
                            <i class="fa fa-server"></i>
                            <span class="hidden-lg hidden-md">Services</span>
                            <span class="caret"></span>
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
                @endif
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <!-- Authentication Links -->
                @if (Auth::guest())
                    <li><a href="{{ url('/login') }}">Login</a></li>
                    <li><a href="{{ url('/register') }}">Register</a></li>
                @else

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            {{-- Credit Section --}}
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-money"></i> <span class="hidden-lg hidden-md">Payments</span> <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li><a v-link="{path: '/AddCredit'}"><i class="fa fa-btn fa-plus"></i> Add Credit</a></li>
                                    <li><a v-link="{path: '/AllCharge'}"><i class="fa fa-btn fa-gear fa-spin"></i> Charge</a></li>
                                    <li><a v-link="{path: '/AllPayment'}"><i class="fa fa-btn fa-minus-circle"></i> Payment</a></li>
                                    <li><a v-link="{path: '/AllProfit'}"><i class="fa fa-btn fa-briefcase"></i> Profit</a></li>
                                    <li><a v-link="{path: '/AllBalance'}"><i class="fa fa-btn fa-money"></i> Balance</a></li>
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
                                    <li>
                                        <a v-link="{path: '/GetUnReadMessages'}">
                                            <i class="fa fa-eye-slash"></i>
                                            UnRead Messages
                                        </a>
                                    </li>
                                    <li>
                                        <a v-link="{path: '/GetReadMessages'}">
                                            <i class="fa fa-eye"></i>
                                            Read Messages
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {{-- Notification --}}
                            <li class="dropdown notifications-menu" id="notifications-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-bell"></i>
                                    <span id="counter" class="label label-warning"></span>
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="header">You have <span id="counter-header"></span> notifications</li>
                                    <li>
                                        <!-- inner menu: contains the actual data -->
                                        <ul class="menu" style="overflow: hidden; width: 100%; height: 200px;">
                                            <li id="loading" style="position: absolute; top: 50%; left: 44%; font-size: 30px; color: #999;"><i class="fa fa-spinner fa-spin"></i></li>
                                        </ul>
                                    </li>
                                    <li class="footer"><a v-link="{path: '/Notification'}">View all</a></li>
                                </ul>
                            </li>
                            {{-- Favorite --}}
                            <li class="dropdown">
                                <a v-link="{path: '/GetMyFavorites'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <span class="fa fa-heart"></span>
                                    <span class="hidden-lg hidden-md">Favorite</span>
                                    @php $favorite = getFavCounter(Auth::user()->id); @endphp
                                    @if ($favorite > 0)
                                        <span class="label label-danger">{{ $favorite }}</span>
                                    @endif
                                </a>
                            </li>
                            {{-- Purchase Orders --}}
                            <li class="dropdown">
                                <a v-link="{path: '/PurchaseOrders'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-cart-plus"></i>
                                    <span class="hidden-lg hidden-md">Purchase Orders</span>
                                    @php $purchaseOrders = getAllPurchesOrderCounter(Auth::user()->id); @endphp
                                    @if ($purchaseOrders > 0)
                                        <span class="label label-primary" >{{ $purchaseOrders }}</span>
                                    @endif
                                </a>
                            </li>
                            {{-- unReadMessages --}}
                            <li class="dropdown">
                                <a v-link="{path: '/GetUnReadMessages'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-eye-slash"></i>
                                    <span class="hidden-lg hidden-md">Unread Messages</span>
                                    @php $unreadMessages = getUnReadMessages(Auth::user()->id); @endphp
                                    @if ($unreadMessages > 0)
                                        <span class="label label-info" >{{ $unreadMessages }}</span>
                                    @endif
                                </a>
                            </li>
                            {{-- User Section --}}
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-user"></i> <span class="hidden-lg hidden-md">{{ Auth::user()->name }}</span> <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-edit"></i> My Information</a></li>
                                    <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i> Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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
