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
    </ul>
</div>
