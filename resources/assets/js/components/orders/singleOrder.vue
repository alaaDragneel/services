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
                                            </span>
                                            <div class="product-rating">
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star gold"></i>
                                                <i class="fa fa-star-o"></i>
                                            </div>
                                            <hr>

                                        </div>
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
                ordersCount: ''

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
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }, function (res) {
                    alertify.error('There are Some Erros Try Again later');
                    this.$router.go({
                        path: '/'
                    });
                });
            }
        },
        route: {
            canReuse: false // force relode the data
        }
    }
</script>


<style>

    /*********************************************
    Theme Elements
    *********************************************/

    .gold{
        color: #FFBF00;
    }

    /*********************************************
    PRODUCTS
    *********************************************/

    .product{
        border: 1px solid #dddddd;
        height: 321px;
    }

    .product>img{
        max-width: 230px;
    }

    .product-rating{
        font-size: 20px;
        margin-bottom: 25px;
    }

    .product-title{
        font-size: 20px;
    }

    .product-desc{
        font-size: 14px;
        word-break:break-all;
    }

    .product-price{
        font-size: 22px;
    }

    .product-stock{
        color: #74DF00;
        font-size: 20px;
        margin-top: 10px;
    }

    .product-info{
        margin-top: 50px;
    }

    /*********************************************
    VIEW
    *********************************************/

    .content-wrapper {
        max-width: 1140px;
        background: #fff;
        margin: 0 auto;
        margin-top: 25px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 0px;
    }

    .container-fluid{
        max-width: 1140px;
        margin: 0 auto;
    }

    .view-wrapper {
        float: right;
        max-width: 70%;
        margin-top: 25px;
    }

    .container {
        padding-left: 0px;
        padding-right: 0px;
        max-width: 100%;
    }

    /*********************************************
    ITEM
    *********************************************/

    .service1-items {
        padding: 0px 0 0px 0;
        float: left;
        position: relative;
        overflow: hidden;
        max-width: 100%;
        height: 321px;
        width: 130px;
    }

    .service1-item {
        height: 107px;
        width: 120px;
        display: block;
        float: left;
        position: relative;
        padding-right: 20px;
        border-right: 1px solid #DDD;
        border-top: 1px solid #DDD;
        border-bottom: 1px solid #DDD;
    }

    .service1-item > img {
        max-height: 110px;
        max-width: 110px;
        opacity: 0.6;
        transition: all .2s ease-in;
        -o-transition: all .2s ease-in;
        -moz-transition: all .2s ease-in;
        -webkit-transition: all .2s ease-in;
    }

    .service1-item > img:hover {
        cursor: pointer;
        opacity: 1;
    }

    .service-image-left {
        padding-right: 50px;
    }

    .service-image-right {
        padding-left: 50px;
    }

    .service-image-left > center > img,.service-image-right > center > img{
        max-height: 155px;
    }

    .sidebar {
        top: 34px;
        padding: 20px;
        background-color: #f5f5f5;
        border-right: 1px solid #eee;
        border-radius: 10px;
    }
</style>
