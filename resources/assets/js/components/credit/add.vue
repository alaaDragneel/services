<template lang="html">
    <span v-if="isLoading">
        <h2 class="text-center">
            <i class="fa fa-user"></i> {{ user.name }} Add Credit Section
            <br>
            <small>
	            <strong>
	               Now You Add Credit To Member {{ user.name }} 
	            </strong>
            </small>
        </h2>
         <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Add Credit</h3>
                </div>
                <div class="panel-body">
                    <form>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" class="form-control" id="email" name="email" v-model="email" placeholder="Enter your email">
                            <p class="help-block alert alert-danger text-center" v-if="err">{{ message }}</p>
                        </div>
                         <div class="form-group">
                            <label for="price">Credite</label>
                            <select class="form-control" id="price" name="price" v-model="price">
                                <option selected disabled>Choose Mount</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
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
    <spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

    export default {
        components: {
            spinner: Spinner
        },
        data: function () {
            return {
                isLoading: false,
                user: '',
                email: '',
                price: '',
                err: false,
                message: false,
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
          		this.email = this.user.email;
	            this.$refs.spinner.hide();
                this.isLoading = true;
          	}, function (res) {

          	});
          },
          AddCredit: function () {
            this.$refs.spinner.show();
            this.disable = true;
          } 
        },
        route: {
            canReuse: false // Force reload data
        },
        computed: {
            disable: function () {
                if (this.email != '') {
                    if (this.email.length >= 6) {
                        if (this.email.length <= 100) {
                            this.err = false;
                            this.message = '';
                            return false;
                        } else {
                             this.message = 'This Field Must Not Be Greater Than 100 charecters';
                            this.err = true;
                            return true;
                        }
                        this.err = false;
                        this.message = '';
                        return false;
                    } else {
                        this.message = 'This Field Must Be At Lest More Than 6 charecters';
                        this.err = true;
                        return true;
                    }
                    this.err = false;
                    this.message = '';
                    return false;
                } else {
                    this.message = 'This Field Is Required';
                    this.err = true;
                    return true;
                }
            }

        },
    }
</script>
