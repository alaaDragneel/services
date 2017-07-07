<template lang="html">
    <span v-if="isLoading">
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-md-2">
                    <notification_menu></notification_menu>
                </div>
                <div class="col-sm-9 col-md-10">
                    <notification_list :notifications="notifications"></notification_list>
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
            user: []
        }
    },
    methods: {
        GetMyUnReadNotifications: function () {
            this.$http.get('/GetMyUnReadNotifications').then(function (res) {
                this.user = res.body['user'];
                this.notifications = res.body['notify'];
                this.$refs.spinner.hide();
                this.isLoading = true;
            },function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }

}
</script>
