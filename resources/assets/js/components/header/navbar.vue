<template lang="html">
    <!-- Nav Bar -->
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
                        <!--NOTE @foreach (\App\Category::get(['id', 'name'])->chunk(6) as $category) -->
                            <li class="col-sm-3">
                                <ul>
                                    <!--NOTE @foreach ($category as $cat) -->
                                        <li class="dropdown-header">
                                            <a v-link="{name: '/Category', params:{catId: 9, catName: 'web design' }}">
                                                Web Design
                                            </a>
                                        </li>
                                    <!--NOTE @endforeach -->
                                </ul>
                            </li>
                        <!--NOTE @endforeach -->
                    </ul>
                </li>
                <!--NOTE @if (Auth::check()) -->
                    <!-- Orders Section -->
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
                    <!-- Services Section -->
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
                <!--NOTE @endif -->
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <!-- Authentication Links -->
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <!-- Credit Section -->
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

                            <!-- Messages Section -->
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
                            <!-- Notification -->
                            <li @click="getAllUserNotifications" class="dropdown notifications-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-bell"></i>
                                    <span class="label label-success">{{ notify }}</span>
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="header">You have {{ notify }} notifications</li>
                                    <li>
                                        <!-- inner menu: contains the actual data -->
                                        <ul class="menu" style="overflow: hidden; width: 100%; height: 200px;">
                                            <li v-if="notifyLoading" style="position: absolute; top: 50%; left: 44%; font-size: 30px; color: #999;">
                                                <i class="fa fa-spinner fa-spin"></i>
                                            </li>
                                            <li v-if="allNotify.length > 0" v-for="notify in allNotify" :class="['main-li', 'text-center', notify.seen == 1 ? 'seen' : '']" track-by="$index">
                                                    <notify_list v-if="!notifyLoading" :notify="notify"></notify_list>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="footer"><a v-link="{path: '/Notification'}">View all</a></li>
                                </ul>
                            </li>
                            <!-- Favorite -->
                            <li class="dropdown">
                                <a v-link="{path: '/GetMyFavorites'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <span class="fa fa-heart"></span>
                                    <span class="hidden-lg hidden-md">Favorite</span>
                                    <span class="label label-danger">{{ favorite }}</span>
                                </a>
                            </li>
                            <!-- Purchase Orders -->
                            <li class="dropdown">
                                <a v-link="{path: '/PurchaseOrders'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-cart-plus"></i>
                                    <span class="hidden-lg hidden-md">Purchase Orders</span>
                                        <span class="label label-primary" >{{ PurchaseOrders }}</span>
                                </a>
                            </li>
                            <!-- unReadMessages -->
                            <li class="dropdown">
                                <a v-link="{path: '/GetUnReadMessages'}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-eye-slash"></i>
                                    <span class="hidden-lg hidden-md">Unread Messages</span>
                                        <span class="label label-info" >{{ unReadMessages }}</span>
                                </a>
                            </li>
                            <!-- User Section -->
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-user"></i> <span class="hidden-lg hidden-md">alaaDragneel</span> <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="logout"><i class="fa fa-btn fa-edit"></i> My Information</a></li>
                                    <li><a href="logout"><i class="fa fa-btn fa-sign-out"></i> Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                <!--NOTE @endif -->
            </ul>
            <form class="navbar-form navbar-left">
                <input type="text" class="form-control" placeholder="Search...">
                <button type="button" class="btn btn-primary">
                    <i class="fa fa-search"></i>
                </button>
            </form>


        </div><!-- /.nav-collapse -->
    </nav>
    <!-- Nav Bar -->
</template>

<script>
import Types from './notificationsType.vue';
export default {
    components: {
        notify_list: Types
    },
    data() {
        return {
            notify: 0,
            favorite: 0,
            PurchaseOrders: 0,
            unReadMessages: 0,
            allNotify:  [],
            notifyLoading: false,
        }
    },
    ready: function () {
        //trigger Slim Scroll
       $(".menu").slimscroll({
          height: '200px',
          alwaysVisible: false,
          size: '3px'
        }).css("width", "100%");

        this.GetNotificationsCount();
    },
    methods: {
        GetNotificationsCount: function () {
            this.$http.get('/GetNotificationsCount').then(function (res) {
                this.notify = res.body['notificationsCount'];
                this.favorite = res.body['favoritesCount'];
                this.PurchaseOrders = res.body['ordersCount'];
                this.unReadMessages = res.body['messagesCount'];
            }, function (res) {
                alertify.error('Some Errors happends, Error Code: 1000');
            });
        },
        getAllUserNotifications: function () {
            this.notifyLoading = true;
            this.$http.get('/getAllUserNotifications').then(function (res) {
                this.allNotify = res.body['notifications'];
                this.notify = res.body['notificationsCount'];
                this.notifyLoading = false;
            }, function (res) {
                alertify.error('Some Errors happends, Error Code: 1001');
            });
        },
    },
    events: {
        // add favorites
        addToChildFavorite: function (value) {
            this.favorite = parseInt(value);
        },
        // delete favorites
        deleteFromChild: function (value) {
            this.favorite = parseInt(value);
        },
        // add Purchase Orders
        addToChildBuy: function (value) {
            this.PurchaseOrders = parseInt(value);
        },
    }
}
</script>
