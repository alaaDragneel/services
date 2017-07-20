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
                        <span class="label label-inverse">{{ waitingServicesCount() }}</span>
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
                <li class="{{ Request::is('admin/users') ? 'current' : '' }}"><a href="{{ route('index.users') }}"><i class="fa fa-users"></i> All Users</a></li>
            </ul>
        </li>
        <li class="submenu {{ Request::is('admin/profits*') ? 'open' : '' }}">
            <a href="#">
                <i class="glyphicon glyphicon-usd"></i> profits
                <span class="caret pull-right"></span>
            </a>
            <!-- Sub menu -->
            <ul>
                <li class="{{ Request::is('admin/profits') ? 'current' : '' }}"><a href="{{ route('index.profits') }}"><i class="fa fa-money"></i> All profits</a></li>
                <li class="{{ Request::is('admin/profits/today') ? 'current' : '' }}">
                    <a href="{{ route('today.profits') }}">
                        <i class="fa fa-arrow-circle-down"></i> Today Profits <br> ({{ getTimeToday('Date Only') }})
                        <span class="label label-primary">
                            {{ getTimeTodaCount() }}
                        </span>
                    </a>
                </li>
                <li class="{{ Request::is('admin/profits/today') ? 'current' : '' }}">
                    <a href="{{ route('today.profits', ['status' => 'waiting']) }}">
                        <i class="fa fa-pause"></i> Today Waiting Profits <br> ({{ getTimeToday('Date Only') }})
                        <span class="label label-danger">
                            {{ getTimeTodaCount() }}
                        </span>
                    </a>
                </li>
                <li class="{{ Request::is('admin/profits/today') ? 'current' : '' }}">
                    <a href="{{ route('today.profits', ['status' => 'done']) }}">
                        <i class="fa fa-check-circle"></i> Today Done Profits <br> ({{ getTimeToday('Date Only') }})
                        <span class="label label-info">
                            {{ getTimeTodaCount() }}
                        </span>
                    </a>
                </li>
                <li class="{{ Request::is('admin/profits/waiting') ? 'current' : '' }}">
                    <a href="{{ route('waiting.profits') }}">
                        <i class="fa fa-clock-o"></i> Waiting Profits
                        <span class="label label-inverse">{{ waitingProfitCount() }}</span>
                    </a>
                </li>
                <li class="{{ Request::is('admin/profits/done') ? 'current' : '' }}">
                    <a href="{{ route('done.profits') }}">
                        <i class="fa fa-credit-card-alt"></i> Done Profits
                        <span class="label label-success">{{ doneProfitCount() }}</span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>
