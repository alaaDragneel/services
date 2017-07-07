<template lang="html">
    <span v-if="isLoading">
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-md-2">
                    <notification_menu></notification_menu>
                </div>
                <div class="col-sm-9 col-md-10">
                    <notification_list :notifications="notifications"></notification_list>
                    <div v-if="notifications.length >= 6">
                        <div class="col-lg-12 btn btn-info" v-if="moreOrders" @click="showMore()">Show More</div>
                        <div class="col-lg-12 alert alert-danger text-center" v-if="!moreOrders">NO More Notifications</div>
                        <div class="clearfix"></div>
                        <br>
                    </div>
                    <div v-else>
                        <div class="alert alert-danger text-center">You Have No Notifications!</div>
                    </div>

                </div>
            </div>
        </div>
    </span>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
import menu from '../messages/messageMenu.vue';
import notificationList from './notificationList.vue';
var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
export default {
    components: {
        notification_menu: menu,
        notification_list: notificationList,
        spinner: Spinner
    },
    ready: function () {
        this.$refs.spinner.show();
        this.GetMyUnReadNotifications();
    },
    data () {
        return {
            notifications: [],
            isLoading: false,
            user: [],
            moreOrders: true
        }
    },
    methods: {
        GetMyUnReadNotifications: function (length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }

            this.$http.get('/GetMyUnReadNotifications' + sendLen).then(function (res) {
                if (length !== undefined) {
                    if (res.body['notify'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['notify'] return as array
                        this.notifications = this.notifications.concat(res.body['notify']);
                    } else {
                        this.moreOrders = false;
                        alertify.error('No More Notifications');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {

                    this.user = res.body['user'];
                    this.notifications = res.body['notify'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            },function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        },
        showMore: function () {
            this.$refs.spinner.show();
            var length = this.notifications.length;
            this.GetMyUnReadNotifications(length);
        }
    },
    route: {
        canReuse: false // Force reload data
    }

}
</script>
