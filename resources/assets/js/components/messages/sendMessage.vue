<template lang="html">
    <span v-if="isLoading">
        <div class="container">
            <div class="row">
                <ol class="breadcrumb">
                  <li class="active">
                          <a v-link="{path: '/GetMySendMessages'}">Send  Messages</a>
                  </li>
                </ol>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3 col-md-2">
                    <message_menu></message_menu>
                </div>
                <div class="col-sm-9 col-md-10">
                    <message_list :messages="messages" :type="send"></message_list>

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
            send: 'send'
        }
    },
    methods: {
        GetMySendMessage: function () {
            this.$http.get('Messages').then(function (res) {
                this.messages = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            },function (res) {
                alertify.error('Error Happend Try Again Later');
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
