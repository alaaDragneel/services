<div class="sidebar content-box" style="display: block;">
    <ul class="nav">
        <!-- Main menu -->
        <li class="{{ Request::is('admin/dashboard') ? 'current' : '' }}"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="submenu {{ Request::is('admin/services*') ? 'open' : '' }}">
            <a href="#">
                <i class="glyphicon glyphicon-list"></i> Services
                <span class="caret pull-right"></span>
            </a>
            <!-- Sub menu -->
            <ul>
                <li class="{{ Request::is('admin/services') ? 'current' : '' }}"><a href="{{ route('index.services') }}"><i class="fa fa-building"></i> All Services</a></li>
                <li class="{{ Request::is('admin/services/waiting') ? 'current' : '' }}">
                    <a href="{{ route('waiting.services') }}">
                        <i class="fa fa-clock-o"></i> Waiting Services
                        <span class="badge">{{ \App\Service::where('status', 0)->count() }}</span>
                    </a>
                </li>
            </ul>
        </li>
        <li class="submenu {{ Request::is('admin/orders*') ? 'open' : '' }}">
            <a href="#">
                <i class="glyphicon glyphicon-tasks"></i> orders
                <span class="caret pull-right"></span>
            </a>
            <!-- Sub menu -->
            <ul>
                <li class="{{ Request::is('admin/orders') ? 'current' : '' }}"><a href="{{ route('index.orders') }}"><i class="fa fa-first-order"></i> All orders</a></li>
            </ul>
        </li>
        <li class="submenu {{ Request::is('admin/users*') ? 'open' : '' }}">
            <a href="#">
                <i class="glyphicon glyphicon-user"></i> users
                <span class="caret pull-right"></span>
            </a>
            <!-- Sub menu -->
            <ul>
                <li class="{{ Request::is('admin/users') ? 'current' : '' }}"><a href="{{ route('index.users') }}"><i class="fa fa-users"></i> All Userss</a></li>
            </ul>
        </li>
    </ul>
</div>
