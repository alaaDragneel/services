<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <h2 class="text-center">
                        <div class="row">
                            <div class="col-md-12">
                                <i class="fa fa-money"></i> {{ user.name }} Balances Section
                            </div>
                            <div class="col-md-12">
                                <small class="text-info"><strong>Here All Balances Of Member {{ user.name }} Will Appear</strong></small>
                            </div>
                        </div>
                    </h2>
                    <div class="row">
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-blue">
                                <div class="inner">
                                    <h3>${{ parseInt(userProfits) + parseInt(userCharge) - parseInt(userPays) }}</h3>

                                    <p>Balance</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-money"></i>
                                </div>
                                <a @click.prevent class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-red">
                                <div class="inner">
                                    <h3>${{ userCharge }}</h3>

                                    <p>Charges</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-btn fa-gear fa-spin"></i>
                                </div>
                                <a v-link="{path: '/AllCharge'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-yellow">
                                <div class="inner">
                                    <h3>${{ userPays }}</h3>

                                    <p>Payments</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-minus-circle"></i>
                                </div>
                                <a v-link="{path: '/AllPayment'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-green">
                                <div class="inner">
                                    <h3>${{ userProfits }}</h3>

                                    <p>Profits</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-briefcase"></i>
                                </div>
                                <a v-link="{path: '/AllProfit'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
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
                userCharge: 0,
                userPays: 0,
                userProfits: 0,

            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetAllBalance();
        },
        methods: {
          GetAllBalance: function () {
          	this.$http.get('/GetAllBalanceOperation').then(function (res) {
                this.user = res.body['user'];
                this.userCharge = res.body['userCharge'] == null ? 0 : res.body['userCharge'];
                this.userPays = res.body['userPays'] == null ? 0 : res.body['userPays'];
                this.userProfits = res.body['userProfits'] == null ? 0 : res.body['userProfits'];
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
