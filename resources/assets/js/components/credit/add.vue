<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-if="isLoading">
                    <h2 class="text-center">
                        <i class="fa fa-plus"></i> {{ user.name }} Add Credit Section
                        <br>
                        <small class="text-danger">
                            <strong>
                                Now You Add Credit To Member {{ user.name }}
                            </strong>
                        </small>
                    </h2>
                    <div class="row">
                        <div class="col-md-10 col-md-offset-1">
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-plus"></i> Add Credit</h3>
                                </div>
                                <div class="panel-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="price">Credite</label>
                                            <select class="form-control" id="price" name="price" v-model="price">
                                                <option value="" selected disabled>Choose Mount</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                                <option value="60">60</option>
                                                <option value="70">70</option>
                                                <option value="80">80</option>
                                                <option value="90">90</option>
                                                <option value="100">100</option>
                                            </select>
                                            <p class="help-block alert alert-danger text-center" v-if="err">{{ message }}</p>
                                        </div>

                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary" v-bind:disabled="disable" @click="AddCredit">
                                                <i class="fa fa-plus"></i> Add Credit
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
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
                price: '',
                err: false,
                message: '',
                disable: true,
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetAuthUser();
        },
        methods: {
          GetAuthUser: function () {
          	this.$http.get('/GetAuthUser').then(function (res) {
                this.user = res.body;
	            this.$refs.spinner.hide();
                this.isLoading = true;
          	}, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
          	});
          },
          AddCredit: function () {
            this.$refs.spinner.show();
            this.disable = true;
            var formData = new FormData();
            formData.append('price', this.price);
            this.$http.post('/AddCredit', formData).then(function (res) {
                swal('Success', 'You Charges Successfully Now See It in The All Charges Operations', 'success');
                this.$refs.spinner.hide();
                this.isLoading = true;
                this.$router.go({
                    path: '/AllCharge'
                });
          	}, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
          	});
          }
        },
        route: {
            canReuse: false // Force reload data
        },
        computed: {
            disable: function () {
                if (this.price == '') {
                    this.err = true;
                    this.message = 'The Price Value Must Not Be Empty Choose Your Mount';
                    return true;
                } else if (this.price == 5 || this.price == 10 || this.price == 20 ||
                            this.price == 30 || this.price == 40 || this.price == 50||
                            this.price == 60 || this.price == 70 || this.price == 80 ||
                            this.price == 90 || this.price == 100) {
                                this.err = false;
                                this.message = '';
                                return false;
                } else  {
                    this.err = true;
                    this.message = 'Don\'t miss With The Price Value';
                    return true;
                }
            }
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
