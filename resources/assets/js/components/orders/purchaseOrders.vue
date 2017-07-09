<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">

                    <h2 class="text-center"><i class="fa fa-cart-plus"></i> {{ user.name }} Purchase Orders Section
                        <br>
                        <small class="text-danger"><i class="fa fa-clock-o"></i> {{ user.created_at | moment "calendar" }}</small>
                        <br>
                        <small class="text-primary"><strong><i class="fa fa-cart-plus"></i> {{ orders.length }} Purchase Order/s</strong></small>
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
                            <div v-if="orders.length >= 6">
                                <div class="col-lg-12 btn btn-info" v-if="moreOrders" @click="showMore()">Show More</div>
                                <div class="col-lg-12 alert alert-danger text-center" v-if="!moreOrders">NO More Purchase Orders</div>
                                <div class="clearfix"></div>
                                <br>
                            </div>

                        </div>
                        <div v-else>
                            <div class="alert alert-info">You Have No Orders!</div>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    </div>
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
                serviceName: '',
                moreOrders: true
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.getMyPurchaseOrders();
        },
        methods: {
            getMyPurchaseOrders: function (length) {
                if (length !== undefined) {
                    var sendLen = '/' + length;
                } else {
                    sendLen = '';
                }
                this.$http.get('purchaseOrders' + sendLen).then(function (res) {
                    if (length !== undefined) {
                        if (res.body['orders'].length > 0) {
                            // use push if the result to add object in the array
                            // use concat because res.body['orders'] return as array
                            this.orders = this.orders.concat(res.body['orders']);
                        } else {
                            this.moreOrders = false;
                            alertify.error('No More Services Found In This Category');
                        }
                        this.$refs.spinner.hide();
                        this.isLoading = true;
                    } else {

                        this.orders = res.body['orders'];
                        this.user = res.body['user'];
                        this.$refs.spinner.hide();
                        this.isLoading = true;
                    }
                }, function (res) {
                    swal('Error', 'Something Wrong Happend Contact With the Adminstratore Please', 'error');
                });
            },
            filter: function (status) {
                this.filterData = status;
            },
            showMore: function () {
                this.$refs.spinner.show();
                var length = this.orders.length;
                this.getMyPurchaseOrders(length);
            }
        }
    }
</script>
