<template>
    <span v-if="isLoading">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">

            <div class="container-fluid">
                <div class="content-wrapper">
                    <div class="item-container">
                        <div class="container">
                            <div class="col-md-12">
                                <div class="product-title">{{ service.name }} <span class="small"><i class="fa fa-clock-o"></i> {{ service.created_at | moment "calendar" }}</span> </div>
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

                                    <img class="img-responsive" id="item-display" v-bind:src="service.image" alt="{{service.name}}">
                                </div>

                            </div>

                            <div class="col-md-7">
                                <p class="product-desc">
                                    {{ service.description }}
                                </p>
                                <div class="product-price">$ {{ service.price }}</div>
                                <div class="product-stock">Orders Number</div>
                                <hr>
                                <div class="btn-group cart">
                                    <button type="button" class="btn btn-success">
                                        Order This Service
                                    </button>
                                </div>
                                <div class="btn-group wishlist">
                                    <button type="button" class="btn btn-danger">
                                        Add to Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="col-md-12 product-info">
                            <ul id="myTab" class="nav nav-tabs nav_tabs">

                                <li class="active"><a href="#service-one" data-toggle="tab">My Services In Same Category</a></li>
                                <li><a href="#service-two" data-toggle="tab">Members Services In Same Category</a></li>

                            </ul>
                            <div id="myTabContent" class="tab-content">
                                <div class="tab-pane fade in active" id="service-one">
                                    <br>
                                    <div class="row">
                                        <div class="col-md-5 col-sm-4" v-for="service in myOwnServicesInSameCat" track-by="$index">
                                            <my_own_services_in_same_cat :service="service"></my_own_services_in_same_cat>
                                        </div>
                                    </div>

                                </div>
                                <div class="tab-pane fade" id="service-two">

                                    <br>
                                    <div class="row">
                                        <div class="col-md-5 col-sm-4" v-for="service in otherServicesInSameCat" track-by="$index">
                                            <other_services_in_same_cat :service="service"></other_services_in_same_cat>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" ></div>
    </span>
    <span v-else>
        <p class="text-center">
            <b>Loading...</b>
        </p>
    </span>

</template>

<script>

    import myOwnServicesInSameCat from './SingleServices.vue';
    import otherServicesInSameCat from '../users/SingleServices.vue';

    export default {
        components: {
            my_own_services_in_same_cat: myOwnServicesInSameCat,
            other_services_in_same_cat: otherServicesInSameCat
        },
        data(){
            return {
                msg: "service datails",
                service: '',
                isLoading: false,
                myOwnServicesInSameCat: [],
                otherServicesInSameCat: []

            }
        },
        ready: function () {
            this.GetServicesById();
        },
        methods: {
            GetServicesById: function () {
                this.$http.get('Services/' + this.$route.params.serviceId).then(function (res) {
                    this.isLoading = true;
                    this.service = res.body['service'];
                    this.myOwnServicesInSameCat = res.body['myOwnServicesInSameCat'];
                    this.otherServicesInSameCat = res.body['otherServicesInSameCat'];
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

</style>
