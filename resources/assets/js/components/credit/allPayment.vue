<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <h2 class="text-center">
                        <div class="row">
                            <div class="col-md-12">

                                <i class="fa fa-minus-circle"></i> {{ user.name }} Payment Section
                            </div>
                            <div class="col-md-12">
                                <small class="text-danger"><strong>Here All Payments Of Member {{ user.name }} Will Appear</strong></small>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <small class="text-primary"><strong><i class="fa fa-gear fa-spin"></i> {{ buys.length }} Payment/s</strong></small>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <small class="text-success"><strong><i class="fa fa-money"></i> {{ sumPrice }} Total Payments</strong></small>
                            </div>
                        </div>
                    </h2>
                    <div class="row">
                        <table class="table table-bordered table-hover table-responsive table-striped">
                            <thead>
                                <th>Payment Number</th>
                                <th>Payment Order</th>
                                <th>Payment State</th>
                                <th>payment Value</th>
                                <th>Payment Date</th>
                            </thead>
                            <tbody v-if="buys.length > 0">
                                <tr v-for="buy in buys" track-by="$index">
                                    <td>{{ buy.id }}</td>
                                    <td><a v-link="{name: '/Order', params:{orderId: buy.order_id}}">Order Number #{{ buy.order_id }}</a></td>
                                    <td>
                                        <span class="label label-primary" v-if="buy.finish == 0">UnPayed Yet</span>
                                        <span class="label label-success" v-if="buy.finish == 1">Payed</span>
                                        <span class="label label-danger" v-if="buy.finish == 2">Rejected</span>
                                    </td>
                                    <td>${{ buy.buy_price }}</td>
                                    <td>{{ buy.created_at | moment "calendar" }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6"><div class="alert alert-danger text-center">No Payment Operations Happend!</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </span>
            </div>
        </div>
    </div>
    <spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

    export default {
        components: {
            spinner: Spinner
        },
        data () {
            return {
                isLoading: false,
                user: '',
                buys: '',
                sumPrice: 0,

            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetAllPayment();
        },
        methods: {
          GetAllPayment: function () {
          	this.$http.get('/GetAllPaymentOperation').then(function (res) {
                this.user = res.body['user'];
                this.buys = res.body['buys'];
                this.sumPrice = res.body['sumPrice'] == null ? 0 : res.body['sumPrice'];
	            this.$refs.spinner.hide();
                this.isLoading = true;
          	}, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
          	});
          },
        },
        route: {
            canReuse: false // Force reload data
        },
    }
</script>
