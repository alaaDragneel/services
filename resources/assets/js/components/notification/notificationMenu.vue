<template lang="html">
        <ul class="list-group" style="padding:0px;">
            <li class="list-group-item">
                <h5>
                    <i class="fa fa-bell"></i>
                    Notifications
                </h5>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/Notification')}]">
                <a v-link="{path: '/Notification'}">All Notification</a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/GetUnReadMessages')}]"><a  v-link="{path: '/GetUnReadMessages'}">UnRead Messages </a></li>

        </ul>
</template>

<script>
export default {
    methods: {
        checkRoute: function (value) {
            return this.$route.path == value;
        }
    }
}
</script>
