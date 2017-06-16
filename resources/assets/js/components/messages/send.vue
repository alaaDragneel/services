<template lang="html">
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
                                <i class="fa fa-comment"></i> Add Comment
                            </button>
                        </div>
                    </form>
                </validator>
                <!-- <div class="list-group">
                    <a class="list-group-item" href="#">
                        <div class="checkbox">
                            <label><input type="checkbox"></label>
                        </div>
                        <span class="glyphicon glyphicon-star-empty"></span>
                        <span class="name" style="min-width: 120px; display: inline-block;">Bhaumik Patel</span>
                        <span class="">This is big title</span>
                        <span class="text-muted" style="font-size: 11px;">- Hi hello how r u ?</span>
                        <span class="badge">12:10 AM</span>
                        <span class="pull-right"><span class="glyphicon glyphicon-paperclip"></span></span>
                    </a>
                </div> -->
            </div>
        </div>
    </div>

</template>

<script>
import menu from './messageMenu.vue';
export default {
    components: {
        message_menu: menu
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
        }
    },
    methods: {
        sendMessage: function () {

                var formData = new FormData();
                formData.append('userId', this.$route.params.userId);
                formData.append('title', this.title);
                formData.append('message', this.message);

                this.$http.post('Messages', formData).then(function (res) {
                    alertify.success('Success: your Message has been Send');
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

<style lang="css">
.nav-tabs .glyphicon:not(.no-margin) { margin-right:10px; }
.tab-pane .list-group-item:first-child {border-top-right-radius: 0px;border-top-left-radius: 0px;}
.tab-pane .list-group-item:last-child {border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;}
.tab-pane .list-group .checkbox { display: inline-block;margin: 0px; }
.tab-pane .list-group input[type="checkbox"]{ margin-top: 2px; }
.tab-pane .list-group .glyphicon { margin-right:5px; }
.tab-pane .list-group .glyphicon:hover { color:#FFBC00; }
a.list-group-item.read { color: #222;background-color: #F3F3F3; }
hr { margin-top: 5px;margin-bottom: 10px; }
.nav-pills>li>a {padding: 5px 10px;}

.ad { padding: 5px;background: #F5F5F5;color: #222;font-size: 80%;border: 1px solid #E5E5E5; }
.ad a.title {color: #15C;text-decoration: none;font-weight: bold;font-size: 110%;}
.ad a.url {color: #093;text-decoration: none;}
</style>
