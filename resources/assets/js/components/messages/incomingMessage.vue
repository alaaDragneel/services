<template lang="html">
    <span v-if="isLoading">
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-md-2">
                    <message_menu></message_menu>
                </div>
                <div class="col-sm-9 col-md-10">
                    <message_list :messages="messages" :type="income"></message_list>

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
    ready: function () {
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    data () {
        return {
            messages: [],
            isLoading: false,
            income: 'income'
        }
    },
    methods: {
        GetMySendMessage: function () {
            this.$http.get('GetRecivedMessages').then(function (res) {
                this.messages = res.body;
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
