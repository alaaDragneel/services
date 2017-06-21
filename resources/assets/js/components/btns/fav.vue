<template lang="html">
    <button @click.prevent="addFavorite" type="button" class="btn btn-danger btn-sm">
        <i class="fa fa-heart"></i> Add to Favorites
    </button>
</template>

<script>
export default {
    props: ['service'],
    data() {
        return {

        }
    },
    methods: {
        addFavorite: function () {
            this.$http.get('Addfavorite/' + this.service.id).then(function (res) {
                swal('Success', 'The Service Added TO Fivorite Sucessfully', 'success');

            }, function (res) {

                alertify.error('Error: Some Problems occure Maybe because the Following Resons');
                alertify.error('The Service Is Your Service');
                alertify.error('The Service Already Favorited');
                alertify.error('The Service Not Found');


            });
        }
    }

}
</script>

<style lang="css">
</style>
