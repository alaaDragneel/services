<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <h2 class="text-center">
                        <div class="row">
                            <div class="col-md-12">

                                <i class="fa fa-briefcase"></i> {{ user.name }} Profits Section
                            </div>
                            <div class="col-md-12">
                                <small class="text-danger"><strong>Here All Profits Of Member {{ user.name }} Will Appear</strong></small>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <small class="text-primary"><strong><i class="fa fa-gear fa-spin"></i> {{ profits.length }} Profit/s</strong></small>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <small class="text-success"><strong><i class="fa fa-money"></i> {{ sumPrice }} Total Profit</strong></small>
                            </div>
                        </div>
                    </h2>
                    <div class="row">
                        <table class="table table-bordered table-hover table-responsive table-striped">
                            <thead>
                                <th>Profit Number</th>
                                <th>Profit Order</th>
                                <th>Profit State</th>
                                <th>Profit Value</th>
                                <th>Profit Date</th>
                            </thead>
                            <tbody v-if="profits.length > 0">
                                <tr v-for="profit in profits" track-by="$index">
                                    <td>{{ profit.id }}</td>
                                    <td><a v-link="{name: '/Order', params:{orderId: profit.order_id}}">Order Number #{{ profit.order_id }}</a></td>
                                    <td>
                                        <span class="label label-success">Payed</span>
                                    </td>
                                    <td>${{ profit.buy_price }}</td>
                                    <td>{{ profit.created_at | moment "calendar" }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6"><div class="alert alert-danger text-center">No Profit Operations Happend!</div></td>
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
                profits: '',
                sumPrice: 0,

            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetAllProfit();
        },
        methods: {
          GetAllProfit: function () {
          	this.$http.get('/GetAllProfitOperation').then(function (res) {
                this.user = res.body['user'];
                this.profits = res.body['profits'];
                this.sumPrice = res.body['sumPrice'] == null ? 0 : res.body['sumPrice'];
	            this.$refs.spinner.hide();
                this.isLoading = true;
          	}, function (res) {
    this.$refs.spinner.hide();

                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
          	});
          },
        },
        route: {
            canReuse: false // Force reload data
        },
        events: {
            Auth: function (value) {
                if (value === 'false') {
                    alertify.error("This Action Not Authrized");
                    this.$router.go({
                        path: '/loginError'
                    });
                }
            }
        }
    }
</script>
