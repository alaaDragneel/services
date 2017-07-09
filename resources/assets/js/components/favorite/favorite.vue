<template lang="html">
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-md-12">            
                <span v-if="isLoading">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-3 col-md-2">
                                <message_menu></message_menu>
                            </div>
                            <div class="col-sm-9 col-md-10">
                                <fav_list :favorites="fav_list"></fav_list>

                            </div>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    </div>
<spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
import menu from '../messages/messageMenu.vue';
import favList from './favList.vue';
var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
export default {
    components: {
        message_menu: menu,
        fav_list: favList,
        spinner: Spinner
    },
    ready: function () {
        this.$refs.spinner.show();
        this.userFavorites();
    },
    data () {
        return {
            fav_list: [],
            isLoading: false,
            income: 'income'
        }
    },
    methods: {
        userFavorites: function () {
            this.$http.get('userFavorites').then(function (res) {
                this.fav_list = res.body;
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
