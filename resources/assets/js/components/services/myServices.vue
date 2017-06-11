<template>
    <div class="alert alert-info">
        <span>Welcome you have {{ services.length }} services on the site</span>
    </div>
    <div class="col-sm-6 col-md-4" v-for="service in services">
        <div class="thumbnail" >
            <h4 class="text-center"><span class="label label-info">{{ service.name }}</span></h4>
            <img v-bind:src="service.image" class="img-responsive">
            <div class="caption">
                <div class="row">
                    <div class="col-md-6 col-xs-6">
                        <h3>{{ service.user.name }}</h3>
                    </div>
                    <div class="col-md-6 col-xs-6 price text-right">
                        <h3>
                            <label>${{ service.price }}</label></h3>
                        </div>
                    </div>
                    <p>{{ service.description | limit 100 }}</p>
                    <div class="row">

                        <div class="col-md-6">

                            <span v-if="service.status == 0">

                                <span class="btn btn-warning btn-product"><i class="fa fa-clock-o"></i> Waiting</span>
                            </span>

                            <span v-if="service.status == 1">

                                <span class="btn btn-info btn-product"><i class="fa fa-check"></i> Approved</span>
                            </span>

                            <span v-if="service.status == 2">

                                <span class="btn btn-danger btn-product"><i class="fa fa-close"></i> Rejected</span>
                            </span>
                        </div>

                        <div class="col-md-6">
                            <a href="#" class="btn btn-success btn-product"><span class="glyphicon glyphicon-shopping-cart"></span> Buy</a></div>
                        </div>

                        <p> </p>
                    </div>
                </div>
            </div>
        </template>

        <style>
        .btn-product{
            width: 100%;
        }
        </style>

        <script>
        export default {
            data: function () {
                return {
                    services: []
                }
            },
            ready: function () {
                this.getMyServices();
            },
            methods: {
                getMyServices: function () {
                    this.$http.get('Services').then(function (res) {
                        this.services = res.body;
                    }, function (res) {
                        alert('unKnown Error Please Contact With The Adminstrators');
                    });
                }
            },
            filters: {
                limit: function (string, value) {
                    return string.substring(0, value) + '...';
                }
            }
        }
    </script>
