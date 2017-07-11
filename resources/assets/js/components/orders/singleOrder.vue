<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="col-md-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="container-fluid">
                                        <div class="content-wrapper">
                                            <div class="item-container">
                                                <div class="container">
                                                    <div class="col-md-12">
                                                        <h3 class="product-title">{{ order.services.name }} <span class="small"><strong><i class="fa fa-clock-o"></i> {{ order.services.created_at | moment "calendar" }}</strong></span> </h3>
                                                        <span class="small">
                                                            <strong>
                                                                <status :status="order.status"></status>
                                                            </strong>
                                                        </span>
                                                        <div class="product-rating">
                                                            <!-- Number Of Users Whose Rate -->
                                                            <span class="pull-right label label-danger">
                                                                <i class="fa fa-user"></i>
                                                                Number of voters
                                                                {{ service.votes_count }}
                                                            </span>
                                                            <!-- The Service Rates -->
                                                            <span class="pull-right label label-warning" style="margin-right: 5px;">
                                                                <i class="fa fa-star"></i>
                                                                Number of stars
                                                                {{ sumVotes }}
                                                            </span>
                                                            <span v-if="service.votes_count > 0">
                                                                <span class="pull-right label label-success" style="margin-right: 5px;">
                                                                    <!--
                                                                    Percent =>
                                                                    [
                                                                    NOTE This Is The Service Score
                                                                    (total votes * 100)
                                                                    =============================================
                                                                    (number Of rated users * max rate value[ 5 ])
                                                                    NOTE this is the final score
                                                                    ]
                                                                    0/0 => NaN
                                                                -->
                                                                % {{ parseInt((sumVotes * 100) / (service.votes_count * 5)) }}
                                                                percentage
                                                            </span>
                                                        </span>
                                                        <div class="clearfix"></div>
                                                        <hr>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="text-center">
                                                        <div class="mdl-card__media">
                                                            <div class="over">
                                                                <div class="container">
                                                                    <div class="row">
                                                                        <div class="col-md-12 col-sm-6 col-xs-6">
                                                                            <div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: 7px;">
                                                                                <div class="label label-info">Price: $ {{ order.services.price }}</div>
                                                                            </div>
                                                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                                                                <div class="product-stock">{{ ordersCount }} Order/s</div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-12 col-sm-6 col-xs-6" style="margin-top: 8px;">
                                                                            <!-- buy Order -->
                                                                            <!-- <buy_btn :service="service"></buy_btn> -->
                                                                            <!-- Favorite -->
                                                                            <!-- <fav_btn :service="service"></fav_btn> -->
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <img class="img-responsive" id="item-display" v-bind:src="order.services.image" alt="{{order.services.name}}">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-12 product-info">
                                                    <ul id="myTab" class="nav nav-tabs nav_tabs">
                                                        <li class="active"><a href="#service-one" data-toggle="tab">Details</a></li>
                                                    </ul>
                                                    <div id="myTabContent" class="tab-content">
                                                        <div class="tab-pane fade in active" id="service-one">
                                                            <br>
                                                            <p class="product-desc">
                                                                {{ order.services.description }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <hr>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-md-12 col-sm-12 col-xs-12">
                                <all_comments :order="order"></all_comments>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div class="container">
                                <ul class="list-group" style="padding:0px;" v-if="showControll">
                                    <!--
                                    authUser => User who Login
                                    user_order => User Who Order the Service
                                    user_id => User Who Add the Service
                                -->

                                <li class="list-group-item active" v-if="authUser.id == user_id.id && order.status == 1">
                                    <h5>
                                        <i class="fa fa-user"></i>
                                        Accept Or Reject The Order
                                    </h5>
                                </li>

                                <li class="list-group-item active" v-if="authUser.id == user_order.id && order.status == 2">
                                    <h5>
                                        <i class="fa fa-user"></i>
                                        Finish The Order
                                    </h5>
                                </li>
                                <li class="list-group-item " v-if="authUser.id == user_id.id && order.status == 1">
                                    <!-- 2 => accept -->
                                    <button @click="changeStatus(2)" type="button" class="btn btn-success btn-block">
                                        <i class="fa fa-check"></i> Accept
                                    </button>

                                </li>
                                <li class="list-group-item " v-if="authUser.id == user_id.id && order.status == 1">

                                    <!-- 3 => desline -->
                                    <button @click="changeStatus(3)" type="button" class="btn btn-danger btn-block">
                                        <i class="fa fa-close"></i> Decline
                                    </button>
                                </li>
                                <li class="list-group-item " v-if="authUser.id == user_order.id && order.status == 2">
                                    <!-- 4 => accept -->
                                    <button @click="finishOrder()" type="button" class="btn btn-info btn-block">
                                        <i class="fa fa-check"></i> Finish
                                    </button>
                                </li>
                            </ul>
                            <user_id :user="user_id"></user_id>
                            <user_id :user="user_order"></user_id>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    </div>
</div>
</div>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>

</template>

<script>
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
    import UserSideBar from './usersidebar.vue';
    import Status from '../btns/status.vue';
    import AllComments from '../comments/allComments.vue';
    export default {
        components: {
            spinner: Spinner,
            user_id: UserSideBar,
            status: Status,
            all_comments: AllComments,
        },
        data(){
            return {
                order: '',
                user_id: '',
                user_order: '',
                isLoading: false,
                ordersCount: '',
                authUser: [],
                showControll: false,
                service: '',
                sumVotes: 0,

            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetServicesById();
        },
        methods: {
            GetServicesById: function () {
                this.$http.get('getOrderById/' + this.$route.params.orderId).then(function (res) {
                    this.order = res.body['order'];
                    this.user_id = res.body['user_id'];
                    this.user_order = res.body['order_user'];
                    this.ordersCount = res.body['ordersCount'];
                    this.authUser = res.body['authUser'];
                    this.service = res.body['service'];
                    this.sumVotes = res.body['sumVotes'];
                    if (this.order.status != 3 && this.order.status != 4) {
                        this.showControll = true;
                    }
                    if (this.order.status == 3) {
                        this.$dispatch('DisabledAdCommentSection', 'true');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }, function (res) {
                    alertify.error('There are Some Erros Try Again later');
                    this.$router.go({
                        path: '/'
                    });
                });
            },
            changeStatus: function (status) {
                this.$refs.spinner.show();
                this.$http.get('changeStatus/' + this.$route.params.orderId +'/'+ status).then(function (res) {
                    if (status == 3) {
                        this.$dispatch('DisabledAdCommentSection', 'true');
                    }
                    this.showControll = false;
                    this.$refs.spinner.hide();
                    alertify.success('Order Status Has been Changed Successfully');
                }, function (res) {
                    this.$refs.spinner.hide();
                    alertify.error('There are Some Erros Try Again later');
                });
            },
            finishOrder: function () {
                this.$refs.spinner.show();
                this.$http.get('finishOrder/' + this.$route.params.orderId).then(function (res) {

                    this.$dispatch('DisabledAdCommentSection', 'true');

                    this.showControll = false;
                    this.$refs.spinner.hide();
                    alertify.success('Order Status Has been Finished Successfully');
                }, function (res) {
                    this.$refs.spinner.hide();
                    alertify.error('There are Some Erros Try Again later');
                });
            }
        },
        route: {
            canReuse: false // force relode the data
        }
    }
</script>
