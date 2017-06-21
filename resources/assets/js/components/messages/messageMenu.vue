<template lang="html">
        <ul class="nav nav-pills nav-stacked">
            <li v-bind:class="{'active': checkRoute('/GetMyRecivedMessages')}"><a v-link="{path: '/GetMyRecivedMessages'}">Inbox Messages <span class="badge">{{ incoming }}</span></a>
            </li>
            <li v-bind:class="{'active': checkRoute('/GetMySendMessages')}"><a v-link="{path: '/GetMySendMessages'}">Send Messages <span class="badge">{{ send }}</span></a></li>
            <li v-bind:class="{'active': checkRoute('/GetUnReadMessages')}"><a  v-link="{path: '/GetUnReadMessages'}">UnRead Messages <span class="badge">{{ unRead }}</span></a></li>
            <li v-bind:class="{'active': checkRoute('/GetReadMessages')}"><a  v-link="{path: '/GetReadMessages'}">Read Messages <span class="badge">{{ read }}</span></a></li>
        </ul>
</template>

<script>
export default {
    data() {
        return {
            incoming: '',
            send: '',
            unRead: '',
            read: ''
        }
    },
    ready: function () {
        this.getMessagesCount();
    },
    methods: {
        getMessagesCount: function () {
            this.$http.get('getMessagesCount').then(function (res) {
                this.incoming = res.body['incoming'];
                this.send = res.body['send'];
                this.unRead = res.body['unRead'];
                this.read = res.body['read'];
            },function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        },
        checkRoute: function (value) {
            return this.$route.path == value;
        }
    }
}
</script>

<style lang="css">
</style>
