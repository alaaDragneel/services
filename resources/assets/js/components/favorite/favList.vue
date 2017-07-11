<template lang="html">
    <ol class="breadcrumb">
        <li>
            <a v-link="{path: '/GetMyFavorites'}"> <i class="fa fa-heart"></i> My Favorite</a>

        </li>
        <li>
            Favorites ({{ favorites.length }})
        </li>

    </ol>
    <div class="row">
        <div class="col-md-6">
            <div class="col-md-11">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="serviceName"></label>
                        <input type="text" class="form-control" id="serviceName" placeholder="Search By Service name And Price" v-model="title">
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-6 text-right ">
            <div class="btn-group">
                <button type="button" class="btn btn-primary" @click="sort('created_at')"><i class="fa fa-sort-numeric-desc"></i>  By Adding Time </button>
            </div>
        </div>

    </div>
    <table class="table table-bordered table-hover table-responsive table-striped">
        <thead>
            <th>Service Provider</th>
            <th>Service Name</th>
            <th>Service Price</th>
            <th>On</th>
            <th>Delete</th>

        </thead>
        <tbody v-if="favorites.length > 0">
            <tr v-for="favorite in favorites | orderBy sortKey reverse | filterBy title in 'service.name' 'service.price'" track-by="$index">
                <td>

                    <a v-link="{name: '/User', params:{userId:favorite.get_own_user_service.id, userName: favorite.get_own_user_service.name}}">

                        {{ favorite.get_own_user_service.name }}
                    </a>

                </td>
                <td style="width: 20%;">
                    <a v-link="{name: '/ServicesDetails', params: {serviceId: favorite.service.id, serviceName: favorite.service.name}}">
                        {{ favorite.service.name }}
                    </a>
                </td>
                <td style="width: 20%;">
                    {{ favorite.service.price }}
                </td>
                <td>{{ favorite.created_at | moment 'calendar' }}</td>

                <td>
                    <a @click.prevent="deleteFav(favorite.id, $index)" class="btn btn-danger btn-block" v-link="">
                        <i class="fa fa-trash"></i>
                    </a>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="6"><div class="alert alert-danger text-center">No Favorite Services!</div></td>
            </tr>
        </tbody>
    </table>
    <div  class="list-group">

    </div>
    <spinner v-ref:spinner size="lg" fixed text="Loading...."></spinner>
</template>

<script>
    var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
    export default {
        props: ['favorites'],
        components: {

            spinner: Spinner
        },
        data() {
            return {
                pathUrl: '',
                sortKey: '',
                reverse: 1,
                title: ''
            }
        },
        ready: function () {
            this.pathUrl = this.$route.path;
        },
        methods: {
            sort: function(sort) {
                this.reverse = (this.sortKey == sort) ? this.reverse * -1 : 1;
                this.sortKey = sort;
            },
            deleteFav: function (id, index) {
                this.$refs.spinner.show();
                this.$http.delete('deleteFav/' + id).then(function (res) {
                    this.favorites.splice(index, 1);
                    this.$dispatch('deleteFromParent', res.body);
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                },function (res) {
                    alertify.error('Error Happend Try Again Later');
                });
            }
        }
    }
</script>
