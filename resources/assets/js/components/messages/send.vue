<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">            
                <div class="container">
                    <div class="row">

                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3 col-md-2">
                            <message_menu></message_menu>
                        </div>
                        <div class="col-sm-9 col-md-10">
                            <!-- Tab panes -->
                            <validator name="validation1">
                                <form novalidate>

                                    <div class="form-group">
                                        <label for="title">Message Title</label>
                                        <input type="text" class="form-control" id="title" placeholder="Write Message Title" v-model="title" @valid="showTitle = false" @invalid="showTitle = true" v-validate:title="{ required: true, minlength: 10, maxlength: 50 }">
                                    </div>
                                    <div class="form-group alert alert-danger text-center" v-if="showTitle">
                                        <p v-if="$validation1.title.required">This Viled Is Requires</p>
                                        <p v-if="$validation1.title.minlength">Your Message Must Be More Than 10 Charachters</p>
                                        <p v-if="$validation1.title.maxlength">Your Message Must Be Less Than 50 Charachters</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">Message</label>
                                        <textarea class="form-control" id="message" rows="3" placeholder="Write Your Message" v-model="message" @valid="showMessage = false" @invalid="showMessage = true" v-validate:message="{ required: true, minlength: 20, maxlength: 500 }"></textarea>
                                    </div>
                                    <div class="form-group alert alert-danger text-center" v-if="showMessage">
                                        <p v-if="$validation1.message.required">This Viled Is Requires</p>
                                        <p v-if="$validation1.message.minlength">Your Message Must Be More Than 20 Charachters</p>
                                        <p v-if="$validation1.message.maxlength">Your Message Must Be Less Than 500 Charachters</p>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-success btn-block" v-bind:disabled="disabled" @click.prevent="sendMessage">
                                            <i class="fa fa-send"></i> Send Message
                                        </button>
                                    </div>
                                </form>
                            </validator>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
import menu from './messageMenu.vue';
var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
export default {
    components: {
        message_menu: menu,
        spinner: Spinner
    },
    data () {
        return {
            comment: '',
            showTitle: true,
            showMessage: true,
            title: '',
            message: '',
            disabled: true
        }
    },
    computed: {
        disabled: function () {
            if (this.showTitle == false && this.showMessage == false) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        sendMessage: function () {
            this.$refs.spinner.show();
            var formData = new FormData();
            formData.append('userId', this.$route.params.userId);
            formData.append('title', this.title);
            formData.append('message', this.message);

            this.$http.post('Messages', formData).then(function (res) {
                this.$refs.spinner.hide();
                this.isLoading = true;
                swal('Success', 'your Message has been Send', 'success');
                this.title = '';
                this.message = '';
            },function (res) {
                for (var key in res.body) {
                    alertify.error(res.body[key][0]);
                }
                alertify.error('Try Again Later');
            });
        }
    }

}
</script>
