<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <span v-if="isLoading">
                    <h2 class="text-center">
                        <i class="fa fa-user"></i> {{ user.name }} Services Section
                        <br>
                        <small class="text-primary"><strong><i class="fa fa-cart-plus"></i> {{ services.length }} Service/s</strong></small>
                    </h2>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="col-md-11">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label for="serviceName"></label>
                                        <input type="text" class="form-control" id="serviceName" placeholder="Search By  Service name or Service Price" v-model="serviceName">
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-6 text-right ">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary" @click="sort('price')"><i class="fa fa-dollar"></i>  By Price</button>
                                <button type="button" class="btn btn-success" @click="sort('name')"><i class="fa fa-sort-alpha-asc"></i> By Name</button>
                                <button type="button" class="btn btn-info" @click="sort('status')"><i class="fa fa-clock-o"></i>  waiting</button>
                                <button type="button" class="btn btn-danger" @click="sort('id')"><i class="fa fa-sort-numeric-desc"></i>  By Add Order</button>
                            </div>
                        </div>

                    </div>
                    <hr>
                    <div class="row">
                        <span v-if="services.length > 0">
                            <div class="col-sm-3 col-md-3" v-for="service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'" track-by="$index">
                                <single_services :service="service"></single_services>
                            </div>
                            <div v-if="services.length >= 6">
                                <div class="col-lg-12 btn btn-info" v-if="moreServices" @click="showMore()">Show More</div>
                                <div class="col-lg-12 alert alert-danger text-center" v-if="!moreServices">NO More Services</div>
                                <div class="clearfix"></div>
                                <br>
                            </div>
                        </span>
                        <span v-else>
                            <div class="alert alert-warning">
                                {{ user.name }} Don't have Any Servicess Currently
                            </div>
                        </span>
                    </div>
                </span>
            </div>
        </div>
    </div>
    <spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
    import SingleServices from './SingleServices.vue';
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

    export default {
        components: {
            single_services: SingleServices,
            spinner: Spinner
        },
        data: function () {
            return {
                isLoading: false,
                user: '',
                services: [],
                sortKey: '',
                reverse: 1,
                serviceName: '',
                moreServices: true
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.getUserServices();
        },
        methods: {
            getUserServices: function (length) {
                if (length !== undefined) {
                    var sendLen = '/' + length;
                } else {
                    sendLen = '';
                }
                var url = '/getUserServices/' + this.$route.params.userId + sendLen;
                this.$http.get(url).then(function (res) {
                    if (length !== undefined) {
                        if (res.body['services'].length > 0) {
                            // use push if the result to add object in the array
                            // use concat because res.body['services'] return as array
                            this.services = this.services.concat(res.body['services']);
                        } else {
                            this.moreServices = false;
                            alertify.error('No More Services Found');
                        }
                        this.$refs.spinner.hide();
                        this.isLoading = true;
                    } else {
                        this.services = res.body['services'];
                        this.user = res.body['user'];
                        this.$refs.spinner.hide();
                        this.isLoading = true;
                    }


                }, function (res) {

                    alertify.error('There are Some Erros Try Again later');
                });
            },
            sort: function(sort) {
                this.reverse = (this.sortKey == sort) ? this.reverse * -1 : 1;
                this.sortKey = sort;
            },
            showMore: function () {
                this.$refs.spinner.show();
                var length = this.services.length;
                this.getUserServices(length);
            }
        },
        events: {
            addToParentFavorite: function (value) {
                this.$broadcast('addToChildFavorite', value);
            },
            addToParentBuy: function (value) {
                this.$broadcast('addToChildBuy', value);
            }
        },
        route: {
            canReuse: false // Force reload data
        }
    }
</script>
