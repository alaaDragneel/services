<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 class="text-center"><i class="fa fa-plus"></i> Add Services Section</h2>
                <hr>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa fa-plus"></i> Add Services</h3>
                            </div>
                            <div class="panel-body">
                                <form>
                                    <div class="form-group">
                                        <label for="name">Service Name</label>
                                        <input type="text" class="form-control" id="name" name="name" v-model="name" placeholder="Enter the Service Name">
                                    </div>

                                    <div class="form-group">
                                        <label for="description">Service Description</label>
                                        <textarea class="form-control" id="description" name="description" v-model="description" rows="10" placeholder="Enter the Service description"></textarea>
                                    </div>

                                    <div class="form-group">
                                        <label for="category_id">Service Category</label>
                                        <select class="form-control" id="category_id" name="category_id" v-model="category_id">
                                            <option v-for="cat in category" track-by="$index" value="{{ cat.id }}">{{ cat.name }}</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="price">Service Price</label>
                                        <select class="form-control" id="price" name="price" v-model="price">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                            <option value="30">30</option>
                                            <option value="35">35</option>
                                            <option value="40">40</option>
                                            <option value="45">45</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="image">Service image</label>
                                        <input type="file" class="form-control" v-el:image>
                                        <p class="help-block">The Image Must Be More Than 300px x 300px and less than 1000px x 1000px</p>
                                    </div>

                                    <div class="form-group">
                                        <button type="button" class="btn btn-primary" @click="AddThisService">
                                            <i class="fa fa-plus"></i> Add Service
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                description: '',
                category_id: '',
                category: [],
                price: '',
                messages: []
            }
        },
        ready: function () {
            this.$refs.spinner.show();
            this.GetCategory();
        },
        methods: {
            GetCategory: function () {
                this.$http.get('/Services/getCategory').then(function(successResponse) {
                    this.$refs.spinner.hide();
                    this.category = successResponse.body;
                    console.log(this.category);
                }, function (res) {
                    this.$refs.spinner.hide();
                    alertify.error(res.body);
                });

            },
            AddThisService: function(e) {
                e.preventDefault();
                var formData = new FormData();
                formData.append('name', this.name);
                formData.append('description', this.description);
                formData.append('cat_id', this.category_id);
                formData.append('price', this.price);
                formData.append('image', this.$els.image.files[0]);
                this.sendData(formData);
            },
            sendData: function (formData) {
                this.$refs.spinner.show();
                this.$http.post('/Services', formData).then(function(successResponse) {
                    this.$refs.spinner.hide();
                    this.name = '';
                    this.description = '';
                    this.category_id = '';
                    this.price = '';
                    $('input[type=file]').val(null);
                    if (successResponse.body == 'success') {
                        swal("Success", "your service has been added Please wait until admin approved!", "success");
                    } else if (successResponse.body == 'error') {
                        alertify.error("error saving the service");
                    } else if (successResponse.body == 'priceError') {
                        alertify.error("Don't Mess With the Price Values!");
                        setInterval(function () {
                            window.location.reload()
                        }, 1500);
                    }
                }, function (errorResponse) {
                    this.$refs.spinner.hide();
                    for (var key in errorResponse.body) {
                        alertify.error(errorResponse.body[key][0]);
                    }
                });
            }
        },
        route: {
            canReuse: false,
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
