<template lang="html">
    <div class="rating" v-if="rating">
        <select id="example">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
    <div class="rating" v-if="!rating">
        <select id="example">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>


</template>

<script>
export default {
    props: ['service'],
    data() {
        return {
            rating: true,
            ratingValue: ''
        }
    },
    ready: function () {
        $('#example').barrating({
            theme: 'fontawesome-stars',

            onSelect:function(value, text, event) {
                alert(value + ' ' + text + ' ' + event);
            }
        });
    },
    // methods: {
    //     AddRate: function (vote) {
    //         var formData = new FormData();
    //         formData.append('vote', vote);
    //         formData.append('serviceId', this.service.id);
    //
    //         this.$http.post('addNewVote', formData).then(function (res) {
    //             this.rating = false;
    //             this.ratingValue = vote;
    //             /*
    //             | NOTE use $dispatch From Childeren To Parent
    //             | NOTE use $broadcast From Parent To Childeren
    //             */
    //             this.$dispatch('AddNewRate', vote);
    //             alertify.success("Service Has Been Rated By "+ vote +" Star/s");
    //         }, function (res) {
    //             alertify.error('Error: Some Problems occure Try Again Later');
    //         });
    //     }
    // }
}
</script>
ipt>
