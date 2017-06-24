<template>

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
                                                <strong v-if="showControll">
                                                    <!--
                                                    authUser => User who Login
                                                    user_order => User Who Order the Service
                                                    user_id => User Who Add the Service
                                                    -->
                                                    <span v-if="authUser.id == user_id.id">
                                                        <!-- 2 => accept -->
                                                        <button @click="changeStatus(2)" type="button" class="label btn btn-success">
                                                            <i class="fa fa-check"></i> Accept
                                                        </button>
                                                        <!-- 3 => desline -->
                                                        <button @click="changeStatus(3)" type="button" class="label btn btn-danger ">
                                                            <i class="fa fa-close"></i> Decline
                                                        </button>
                                                    </span>
                                                </strong>
                                            </span>
                                            <div class="product-rating">
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star-o"></i>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="col-md-12">
                                            <div class=" text-center">

                                                <img class="img-responsive" id="item-display" v-bind:src="order.services.image" alt="{{order.services.name}}">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <p class="product-desc">
                                                {{ order.services.description }}
                                            </p>
                                            <div class="product-price pull-left">$ {{ order.services.price }}</div>
                                            <div class="product-stock pull-right">{{ ordersCount }} Order/s</div>
                                            <div class="clearfix"></div>
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
                    <user_id :user="user_id"></user_id>
                    <user_id :user="user_order"></user_id>
                </div>
            </div>
        </div>
    </span>
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
                showControll: false

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
                    if (this.order.status != 2 && this.order.status != 3) {
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
            }
        },
        route: {
            canReuse: false // force relode the data
        }
    }
</script>
