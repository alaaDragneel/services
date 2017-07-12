<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <h2 class="text-center">
                        <div class="row">
                            <div class="col-md-12">
                                <i class="fa fa-btn fa-gear fa-spin"></i> {{ user.name }} Charge Section
                            </div>
                            <div class="col-md-12">
                                <small class="text-danger"><strong>Here All Charge Of Member {{ user.name }} Will Appear</strong></small>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <small class="text-primary"><strong><i class="fa fa-gear fa-spin"></i> {{ pays.length }} Charge/s</strong></small>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <small class="text-success"><strong><i class="fa fa-money"></i> {{ sumPrice }} Total Charges </strong></small>
                            </div>
                        </div>
                    </h2>
                    <div class="row">
                        <table class="table table-bordered table-hover table-responsive table-striped">
                            <thead>
                                <th>Charge Number</th>
                                <th>Charge Method</th>
                                <th>Charge State</th>
                                <th>Charge Value</th>
                                <th>Charge Date</th>
                            </thead>
                            <tbody v-if="pays.length > 0">
                                <tr v-for="pay in pays" track-by="$index">
                                    <td>{{ pay.id }}</td>
                                    <td>{{ pay.payment_method }}</td>
                                    <td>{{ pay.state }}</td>
                                    <td>${{ pay.price }}</td>
                                    <td>{{ pay.created_at | moment "calendar" }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6"><div class="alert alert-danger text-center">No Charge  Happend!</div></td>
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
                pays: '',
                sumPrice: 0,

            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetAllCharge();
        },
        methods: {
          GetAllCharge: function () {
          	this.$http.get('/GetAllChargeOperation').then(function (res) {
                this.user = res.body['user'];
                this.pays = res.body['pays'];
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
