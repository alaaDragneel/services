<template>
    <h2 class="text-center"><i class="fa fa-user"></i> {{ user.name }} Services Section
        <br>
        <small><i class="fa fa-clock-o"></i> {{ user.created_at | moment "calendar" }}</small>
    </h2>
    <hr>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="div-counter">
                <p class="counter-count">{{ services.length }}</p>
                <p class="employee-p">Services</p>
            </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="div-counter">
                <p class="counter-count">652</p>
                <p class="order-p">Orders</p>
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
                        <input type="text" class="form-control" id="serviceName" placeholder="service name" v-model="serviceName">
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
        <div class="col-sm-4 col-md-3" v-for="service in services | orderBy sortKey reverse | filterBy serviceName in 'name'" track-by="$index">
            <single_services :service="service"></single_services>
        </div>
    </div>
</template>

<script>

import SingleServices from './SingleServices.vue';

export default {
    components: {
        single_services: SingleServices
    },
    data: function () {
        return {
            services: [],
            user: '',
            sortKey: '',
            reverse: 1
        }
    },
    ready: function () {
        this.getMyServices();
    },
    methods: {
        getMyServices: function () {
            this.$http.get('Services').then(function (res) {
                this.services = res.body['services'];
                this.user = res.body['user'];
            }, function (res) {
                alert('unKnown Error Please Contact With The Adminstrators');
            });
        },
        sort: function(sort) {
            this.reverse = (this.sortKey == sort) ? this.reverse * -1 : 1;
            this.sortKey = sort;
        }
    },

}
</script>

<style media="screen">
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
