<template lang="html">

    <div class="rating" v-if="rating">
        <input type="radio" id="star5" name="rating" value="5" @click.prevent="AddRate(5)"/>
        <label for="star5" title="Rocks!">5 stars</label>
        <input type="radio" id="star4" name="rating" value="4" @click.prevent="AddRate(4)"/>
        <label for="star4" title="Pretty good">4 stars</label>
        <input type="radio" id="star3" name="rating" value="3" @click.prevent="AddRate(3)"/>
        <label for="star3" title="Meh">3 stars</label>
        <input type="radio" id="star2" name="rating" value="2" @click.prevent="AddRate(2)"/>
        <label for="star2" title="Kinda bad">2 stars</label>
        <input type="radio" id="star1" name="rating" value="1" @click.prevent="AddRate(1)"/>
        <label for="star1" title="Sucks big time">1 star</label>
    </div>
    <div class="rating" v-if="!rating">
        <label v-for="rate in ratingValue" class="fa fa-star ratingStyleActive"></label>
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
    methods: {
        AddRate: function (vote) {
            var formData = new FormData();
            formData.append('vote', vote);
            formData.append('serviceId', this.service.id);

            this.$http.post('addNewVote', formData).then(function (res) {
                this.rating = false;
                this.ratingValue = vote;
                /*
                | NOTE use $dispatch From Childeren To Parent
                | NOTE use $broadcast From Parent To Childeren
                */
                this.$dispatch('AddNewRate', vote);
                alertify.success("Service Has Been Rated By "+ vote +" Star/s");
            }, function (res) {
                alertify.error('Error: Some Problems occure Try Again Later');
            });
        }
    }
}
</script>
ipt>
