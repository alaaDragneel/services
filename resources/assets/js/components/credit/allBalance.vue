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
                        <div class="col-lg-4 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-green">
                                <div class="inner">
                                    <h3>${{ (parseInt(userCharge) + parseInt(realProfits)) - (parseInt(userPays) + parseInt(userProfits)) }}</h3>

                                    <p>Balance</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-money"></i>
                                </div>
                                <a @click.prevent class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-4 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-yellow">
                                <div class="inner">
                                    <h3>${{ parseInt(userCharge) }}</h3>

                                    <p>Charges</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-btn fa-gear fa-spin"></i>
                                </div>
                                <a v-link="{path: '/AllCharge'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-4 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-red">
                                <div class="inner">
                                    <h3>${{ parseInt(userPays) }}</h3>

                                    <p>Payments</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-minus-circle"></i>
                                </div>
                                <a v-link="{path: '/AllPayment'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-4 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-blue">
                                <div class="inner">
                                    <h3>${{ parseInt(totalProfits) }}</h3>

                                    <p>Profits</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-briefcase"></i>
                                </div>
                                <a v-link="{path: '/AllProfit'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-4 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-inverse">
                                <div class="inner">
                                    <h3>${{ parseInt(userWaitingProfits) }}</h3>

                                    <p>Waiting Profits</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                                <a v-link="{path: '/AllWaitingProfit'}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-4 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-aqua">
                                <div class="inner">
                                    <h3>${{ parseInt(totalProfits) + parseInt(userWaitingProfits) }}</h3>

                                    <p>Total Profits</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-credit-card-alt"></i>
                                </div>
                                <a @click.prevent href="#" class="small-box-footer"> No More Info <i class="fa fa-info-circle"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="getProfit">Get Profite</label>
                            <input type="text" class="form-control" id="getProfit" placeholder="Write your Profite To Get It" v-model="profit">
                        </div>
                        <div class="alert alert-danger">
                            <b>Note: </b>
                            <span>
                                You Can Transfeer the Profit Only.
                                <br>
                                You Can't Transfeer Fro Charges.
                            </span>
                        </div>
                        <div class="form-group">
                            <button @click.prevent="getProfit" :disabled="disabled" type="button" name="button" class="btn btn-success"><i class="fa fa-money"></i> Get Profit</button>
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
                realProfits: 0,
                totalProfits: 0,
                userWaitingProfits: 0,
                profit: 0,
                disabled: false,

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
                this.realProfits = res.body['realProfits'] == null ? 0 : res.body['realProfits'];
                this.userWaitingProfits = res.body['userWaitingProfits'] == null ? 0 : parseInt(res.body['userWaitingProfits']);
                this.profit = parseInt(this.realProfits);
                this.$refs.spinner.hide();
                this.isLoading = true;
          	}, function (res) {
                this.$refs.spinner.hide();
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
          	});
          },
          getProfit: function () {
              this.$refs.spinner.show();
              var formData = new FormData();
              formData.append('profit', this.profit);
              this.$http.post('/GetProfit', formData).then(function (res) {
                  this.$refs.spinner.hide();
                  this.isLoading = true;
                  if (res.body['success']) {
                      alertify.success(res.body['success']);
                      this.realProfits -= parseInt(this.profit);
                      this.userWaitingProfits += parseInt(this.profit);
                      this.profit = this.realProfits;
                      this.totalProfits = this.totalProfits;
                  } else if (res.body == 'saving error') {
                      alertify.error('Error During Save the profit Operation Contact With The Adminstrator');
                  } else if (res.body == 'profit error') {
                      alertify.error('Error You Have Enogth Profit');
                  }
              }, function (res) {
                  this.$refs.spinner.hide();
                  for (var key in res.body) {
                      alertify.error(res.body[key][0]);
                  }
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
        },
        computed: {
            disabled: function () {
                if (this.profit == '' ) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>
