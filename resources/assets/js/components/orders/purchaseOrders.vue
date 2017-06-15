<template>
    <span v-if="isLoading">

        <h2 class="text-center"><i class="fa fa-user"></i> {{ user.name }} Purchase Orders Section
            <br>
            <small><i class="fa fa-clock-o"></i> {{ user.created_at | moment "calendar" }}</small>
            <br>
            <small><strong><i class="fa fa-cart-plus"></i> {{ orders.length }} Purchase Order/s</strong></small>
        </h2>
        <hr>
        <div class="row">
        <div class="col-md-4">
            <div class="col-md-11">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="serviceName"></label>
                        <input type="text" class="form-control" id="serviceName" placeholder="Search By  Service name or Service provider" v-model="serviceName">
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-8 text-right ">
            <div class="btn-group">
                <button type="button" class="btn btn-default" @click="filter('')"><i class="fa fa-list-ol"></i>  All Order</button>
                <button type="button" class="btn btn-info" @click="filter('0')"><i class="fa fa-pagelines"></i>  New Order</button>
                <button type="button" class="btn btn-warning" @click="filter('1')"><i class="fa fa-history"></i> Old Order</button>
                <button type="button" class="btn btn-primary" @click="filter('2')"><i class="fa fa-spinner fa-spin"></i>  In Prograss Order</button>
                <button type="button" class="btn btn-danger" @click="filter('3')"><i class="fa fa-close"></i>  Cancelled</button>
                <button type="button" class="btn btn-success" @click="filter('4')"><i class="fa fa-check"></i>  Finished</button>
            </div>
        </div>

    </div>
    <hr>
    <div class="container">
        <div class="row" id="head">
            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">#</div>
            <div class="col-lg-5 col-md-5 col-sm-2 col-xs-2">Service Number</div>
            <div  class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Service Provider</div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Ordered On</div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Order Status</div>
        </div>
        <hr>

        <div v-if="orders.length > 0">
            <div v-for="order in orders | filterBy filterData in 'status' | filterBy serviceName in 'services.name' 'get_user_add_service.name'" track-by="$index">
                <purchase_orders :order="order" :user_to_show="order.get_user_add_service"></purchase_orders>
            </div>

        </div>
        <div v-else>
            <div class="alert alert-info">You Have No Orders!</div>
        </div>
    </div>



</span>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
    import orders from './orderStructure.vue';
    export default {
        components: {
            purchase_orders: orders,
            spinner: Spinner
        },
        data: function () {
            return {
                isLoading: false,
                orders: [],
                user: '',
                filterData: '',
                serviceName: ''
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.getMyPurchaseOrders();
        },
        methods: {
            getMyPurchaseOrders: function () {
                this.$http.get('purchaseOrders').then(function (res) {
                    this.orders = res.body['orders'];
                    this.user = res.body['user'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }, function (res) {
                    swal('Error', 'Something Wrong Happend Contact With the Adminstratore Please', 'error');
                });
            },
            filter: function (status) {
                this.filterData = status;
            }
        }
    }
</script>
<style>
    #head div {
        word-break: break-all;
    }
</style>
