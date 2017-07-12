<div class="sidebar content-box" style="display: block;">
    <ul class="nav">
        <!-- Main menu -->
        <li class="{{ Request::is('/admin/dashboard') ? 'active' : '' }}"><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li class="submenu {{ Request::is('/admin/services*') ? 'active' : '' }}">
            <a href="#">
                <i class="glyphicon glyphicon-list"></i> Services
                <span class="caret pull-right"></span>
            </a>
            <!-- Sub menu -->
            <ul>
                <li class="{{ Request::is('/admin/services') ? 'active' : '' }}"><a href="{{ route('index.services') }}"><i class="fa fa-building"></i> All Services</a></li>
            </ul>
        </li>
    </ul>
</div>
