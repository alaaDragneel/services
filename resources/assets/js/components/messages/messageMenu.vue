<template lang="html">
        <ul class="list-group" style="padding:0px;" id="menuSide">
            <li class="list-group-item">
                <h5>
                    <i class="fa fa-envelope"></i>
                    Messages
                </h5>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/GetMyRecivedMessages')}]">
                <a v-link="{path: '/GetMyRecivedMessages'}"><i class="fa fa-inbox"></i> Inbox Messages</a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/GetMySendMessages')}]">
                <i class="fa fa-send"></i>
                <a v-link="{path: '/GetMySendMessages'}">Send Messages </a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/GetUnReadMessages')}]">
                <i class="fa fa-eye-slash"></i>
                <a  v-link="{path: '/GetUnReadMessages'}">UnRead Messages </a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/GetReadMessages')}]">
                <i class="fa fa-eye"></i>
                <a  v-link="{path: '/GetReadMessages'}">Read Messages </a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/GetMyFavorites')}]">
                <i class="fa fa-heart"></i>
                <a  v-link="{path: '/GetMyFavorites'}">Favorites </a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/Notification')}]">
                <i class="fa fa-bell"></i>
                <a  v-link="{path: '/Notification'}">Notification </a>
            </li>
            <li v-bind:class="['list-group-item', {'active': checkRoute('/UnReadNotification')}]">
                <i class="fa fa-bell-o"></i>
                <a  v-link="{path: '/UnReadNotification'}">UnRead Notification </a>
            </li>
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
