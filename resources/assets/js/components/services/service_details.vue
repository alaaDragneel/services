<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                        <sidebar :service="service" :most_voted="mostVoted" :most_viewd="mostViewd" :section2="section2"></sidebar>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                        <div class="container-fluid">
                            <div class="content-wrapper">
                                <div class="item-container">
                                    <div class="container">
                                        <div class="col-md-12">
                                            <h3 class="product-title">
                                                <span class="pull-left">{{ service.name }}</span>
                                                <span class="small pull-right">
                                                    <strong>
                                                        <i class="fa fa-clock-o"></i>
                                                        {{ service.created_at | moment "calendar" }}
                                                    </strong>
                                                </span>
                                            </h3>
                                            <div class="clearfix"></div>
                                            <br>
                                            <div class="product-rating">
                                                <!-- Rating run Here -->
                                                <span class="pull-left">
                                                    <rating :service="service"></rating>
                                                </span>
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
                                            <!-- Rating run Here -->
                                        </div>
                                        <div class="clearfix"></div>
                                        <hr>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <div class="mdl-card__media">
                                                <div class="over">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div class="col-md-12 col-sm-6 col-xs-6">
                                                                <div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: 7px;">
                                                                    <div class="label label-info">Price: $ {{ service.price }}</div>
                                                                </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">
                                                                    <div class="product-stock">{{ ordersCount }} Order/s</div>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 col-sm-6 col-xs-6" style="margin-top: 8px;">
                                                                <!-- buy Order -->
                                                                <buy_btn :service="service"></buy_btn>
                                                                <!-- Favorite -->
                                                                <fav_btn :service="service"></fav_btn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img class="img-responsive" id="item-display" v-bind:src="service.image" alt="{{service.name}}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-fluid">
                                <div class="col-md-12 product-info">
                                    <ul id="myTab" class="nav nav-tabs nav_tabs">

                                        <li class="active"><a href="#service-one" data-toggle="tab">Details</a></li>
                                        <li><a href="#service-two" data-toggle="tab">My Services In Same Category</a></li>
                                        <li><a href="#service-three" data-toggle="tab">Members Services In Same Category</a></li>

                                    </ul>
                                    <div id="myTabContent" class="tab-content">
                                        <div class="tab-pane fade in active" id="service-one">
                                            <br>
                                            <p class="product-desc">
                                                {{ service.description }}
                                            </p>

                                        </div>
                                        <div class="tab-pane fade" id="service-two">
                                            <br>
                                            <div class="row">
                                                <div v-id="myOwnServicesInSameCat.length > 0">
                                                    <div class="col-md-5 col-sm-4" v-for="service in myOwnServicesInSameCat" track-by="$index">
                                                        <my_own_services_in_same_cat :service="service"></my_own_services_in_same_cat>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="tab-pane fade" id="service-three">
                                            <br>
                                            <div class="row">
                                                <div v-id="otherServicesInSameCat.length > 0">
                                                    <div class="col-md-5 col-sm-4" v-for="service in otherServicesInSameCat" track-by="$index">
                                                        <other_services_in_same_cat :service="service"></other_services_in_same_cat>
                                                    </div>
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
            </span>
        </div>
    </div>
</div>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>

    import myOwnServicesInSameCat from './SingleServices.vue';
    import otherServicesInSameCat from '../users/SingleServices.vue';
    import sidebar from './sidebar.vue';
    import buyBtn from '../btns/buy.vue';
    import favBtn from '../btns/fav.vue';
    import Rating from '../btns/rating.vue';
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

    export default {

        components: {
            my_own_services_in_same_cat: myOwnServicesInSameCat,
            other_services_in_same_cat: otherServicesInSameCat,
            sidebar: sidebar,
            buy_btn: buyBtn,
            fav_btn: favBtn,
            rating: Rating,
            spinner: Spinner
        },
        data(){
            return {
                msg: "service datails",
                service: '',
                isLoading: false,
                myOwnServicesInSameCat: [],
                otherServicesInSameCat: [],
                ordersCount: 0,
                sumVotes: 0,
                mostVoted: [],
                mostViewd: [],
                section2: []
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetServicesById();

        },
        methods: {
            GetServicesById: function () {
                this.$http.get('Services/' + this.$route.params.serviceId).then(function (res) {
                    this.service = res.body['service'];
                    this.myOwnServicesInSameCat = res.body['myOwnServicesInSameCat'];
                    this.otherServicesInSameCat = res.body['otherServicesInSameCat'];
                    this.ordersCount = res.body['ordersCount'];
                    this.sumVotes = res.body['sumVotes'];
                    this.mostVoted = res.body['mostVoted'];
                    this.mostViewd = res.body['mostViewd'];
                    this.section2 = res.body['sidebarSection2'];
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
        events: {
            AddNewRate: function (val) {
                this.service.votes_count += 1; // users count
                this.sumVotes += val; // stars count
            },
            addToParentFavorite: function (value) {
                this.$broadcast('addToChildFavorite', value);
            },
            addToParentBuy: function (value) {
                this.$broadcast('addToChildBuy', value);
            }
        },
        route: {
            canReuse: false // force relode the data
        }
    }
</script>
