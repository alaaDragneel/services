<template lang="html">
    <span v-if="isLoading">
        <h2 class="text-center"><i class="fa fa-user"></i> {{ user.name }} Services Section</h2>
        <hr>
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-lg-offset-3 col-md-offset-3 col-sm-offset-3">
                <div class="div-counter">
                    <p class="counter-count">{{ services.length }}</p>
                    <p class="employee-p">Services</p>
                </div>
            </div>
        </div>
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
                <div class="col-sm-4 col-md-3" v-for="service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'" track-by="$index">
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
    <span v-else>
        <p class="text-center">
            <b>Loading...</b>
        </p>
    </span>
</template>

<script>
    import SingleServices from './SingleServices.vue';

    export default {
        components: {
            single_services: SingleServices
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
            this.getUserServices();
        },
        methods: {
            getUserServices: function () {
                this.$http.get('/getUserServices/' + this.$route.params.userId).then(function (res) {
                    this.isLoading = true;
                    this.services = res.body['services'];
                    this.user = res.body['user'];

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

<style lang="css">
    .btn-product{
        width: 100%;
    }
    .img-container {
        height: 200px;
    }
    .img-container img {
        height: 100%;
        width: 100%;
    }
    .counter
    {
        background-color: #eaecf0;
        text-align: center;
    }
    .div-counter
    {
        margin-left: 42%;
    }
    .counter-count
    {
        font-size: 18px;
        background-color: #286090;
        border-radius: 50%;
        position: relative;
        color: #ffffff;
        text-align: center;
        line-height: 92px;
        width: 92px;
        height: 92px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        display: inline-block;
    }
    .employee-p,.customer-p,.order-p,.design-p
    {
        font-size: 24px;
        color: #000000;
        line-height: 34px;
    }
    .btn-group {
        margin-top: 15px;
    }

</style>
