<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <h2 class="text-center">
                        <div class="row">
                            <div class="col-md-12">
                                <i class="fa fa-clock-o"></i> {{ user.name }} Waiting Profits Section
                            </div>
                            <div class="col-md-12">
                                <small class="text-danger"><strong>Here All Waiting  Profits Of Member {{ user.name }} Will Appear</strong></small>
                            </div>
                            <div class="col-md-4 col-sm-12">
                                <small class="text-primary"><strong><i class="fa fa-gear fa-spin"></i> {{ waitingProfits.length }} Profit Operations</strong></small>
                            </div>
                            <div class="col-md-4 col-sm-12">
                                <small class="text-warning"><strong><i class="fa fa-clock-o"></i> {{ waitingSum }} Total Waiting Profit</strong></small>
                            </div>
                            <div class="col-md-4 col-sm-12">
                                <small class="text-success"><strong><i class="fa fa-money"></i> {{ doneSum }} Total Done Profit</strong></small>
                            </div>
                        </div>
                    </h2>
                    <div class="row">
                        <table class="table table-bordered table-hover table-responsive table-striped">
                            <thead>
                                <th>Waiting Profit Number</th>
                                <th>Waiting Profit Price</th>
                                <th>Waiting Profit State</th>
                                <th>Waiting Profit Date</th>
                            </thead>
                            <tbody v-if="waitingProfits.length > 0">
                                <tr v-for="waitingProfit in waitingProfits" track-by="$index">
                                    <td>{{ waitingProfit.id }}</td>
                                    <td>${{ waitingProfit.profit_price }}</td>
                                    <td v-if="waitingProfit.status == 0">
                                        <span class="label label-inverse">Witing The Adminstration</span>
                                    </td>
                                    <td v-if="waitingProfit.status == 1">
                                        <span class="label label-success">Success</span>
                                    </td>
                                    <td>{{ waitingProfit.created_at | moment "calendar" }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                        <td colspan="6"><div class="alert alert-danger text-center">No WaitingProfit Operations Happend!</div></td>
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
                waitingProfits: '',
                waitingSum: 0,
                doneSum: 0,

            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetAllWaitingProfit();
        },
        methods: {
          GetAllWaitingProfit: function () {
          	this.$http.get('/GetAllWitingProfitOperation').then(function (res) {
                this.user = res.body['user'];
                this.waitingProfits = res.body['waitingProfits'];
                this.waitingSum = res.body['waitingSum'] == null ? 0 : res.body['waitingSum'];
                this.doneSum = res.body['doneSum'] == null ? 0 : res.body['doneSum'];
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
