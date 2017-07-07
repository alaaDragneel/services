<template lang="html">
    <span v-if="isLoading">
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-md-2">
                    <message_menu></message_menu>
                </div>
                <div class="col-sm-9 col-md-10">
                    <ol class="breadcrumb">
                      <li v-if="viewType == 'income'">
                          <a v-link="{path: '/GetMyRecivedMessages'}">Inbox Messages</a>
                      </li>
                      <li v-else><a v-link="{path: '/GetMySendMessages'}">Send  Messages</a></li>
                      <li class="active">{{ message.title }}</li>
                  </ol>
                    <h2>Message Details</h2>
                    <table class="table table-bordered table-hover table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>Message Title</th>
                                <th>Message Description</th>
                                <th>Send On</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ message.title }}</td>
                                <td>{{ message.message }}</td>
                                <td>{{ message.created_at | moment 'calendar' }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <div v-if="viewType == 'send'">
                        <h2>Sender Information</h2>

                        <table class="table table-bordered table-hover table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Send On</th>
                                <th>Replay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a v-link="{name: '/User', params: {userId: message.get_received_user.id, userName: message.get_received_user.name}}">
                                        {{ message.get_received_user.name }}
                                    </a>

                                </td>
                                <td>{{ message.created_at | moment 'calendar' }}</td>
                                <td>
                                    <a v-link="{name: '/SendMessage', params: {userId: message.get_received_user.id}}" class="btn btn-primary btn-block">
                                        <i class="fa fa-reply"></i> Reply
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div v-else>
                        <h2>Recived Information</h2>

                        <table class="table table-bordered table-hover table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Recived On</th>
                                <th>Replay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a v-link="{name: '/User', params: {userId: message.get_send_user.id, userName: message.get_send_user.name}}">
                                        {{ message.get_send_user.name }}
                                    </a>
                                </td>
                                <td>{{ message.created_at | moment 'calendar' }}</td>
                                <td>
                                    <a v-link="{name: '/SendMessage', params: {userId: message.get_send_user.id}}" class="btn btn-primary btn-block">
                                        <i class="fa fa-reply"></i> Reply
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>

                </div>
            </div>
        </div>
    </span>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
import menu from './messageMenu.vue';
import messagesList from './messagesList.vue';
var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
export default {
    components: {
        message_menu: menu,
        message_list: messagesList,
        spinner: Spinner
    },
    data () {
        return {
            message: [],
            isLoading: false,
            viewType: ''
        }
    },
    ready: function () {
        this.viewType = this.$route.params.viewType;
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    methods: {
        GetMySendMessage: function () {
            this.$http.get('Messages/' + this.$route.params.message_id).then(function (res) {
                this.message = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            },function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // force relode the data
    }

}
</script>
