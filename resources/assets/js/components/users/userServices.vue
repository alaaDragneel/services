<template lang="html">
    <span v-if="isLoading">
        <h2 class="text-center">
            <i class="fa fa-user"></i> {{ user.name }} Services Section
            <br>
            <small><strong><i class="fa fa-cart-plus"></i> {{ services.length }} Service/s</strong></small>
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
                <div class="col-sm-4 col-md-4" v-for="service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'" track-by="$index">
                    <single_services :service="service"></single_services>
                </div>
            </span>
            <span v-else>
                <div class="alert alert-warning">
                    {{ user.name }} Don't have Any Servicess Currently
                </div>
            </span>
        </div>
    </span>
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
                serviceName: ''
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.getUserServices();
        },
        methods: {
            getUserServices: function () {
                this.$http.get('/getUserServices/' + this.$route.params.userId).then(function (res) {
                    this.services = res.body['services'];
                    this.user = res.body['user'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;

                }, function (res) {

                    alertify.error('There are Some Erros Try Again later');
                });
            },
            sort: function(sort) {
                this.reverse = (this.sortKey == sort) ? this.reverse * -1 : 1;
                this.sortKey = sort;
            }
        },
        route: {
            canReuse: false // Force reload data
        }
    }
</script>
