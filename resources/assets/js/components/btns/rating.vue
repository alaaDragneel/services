<template lang="html">
   <select id="rating" v-model="rating">
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
   </select>
</template>

<script>
export default {
    props: ['service', 'rate_before'],
    data() {
        return {
            rating: this.rate_before == null ? 0 : this.rate_before.vote
        }
    },
    ready: function () {
        var service_id = this.service.id

        $('#rating').barrating({
            theme: 'fontawesome-stars',
            onSelect: function(value, text, event) {
                event.preventDefault();
                $.ajax({
                    method: 'POST',
                    url: '/addNewVote',
                    data: {
                        vote: value,
                        serviceId: service_id,
                        _token: $('#_token').attr('value')
                    },
                    success: function (response) {
                        if (response == 'voting stored') {
                            alertify.success('Your Vote Has Been Saved');
                        }
                        if (response == 'voting updated') {
                            alertify.success('Your Vote Has Been Updated');
                        }
                        if (response == 'your service') {
                            alertify.error("You CAn't Vote For Your Own Service");
                        }
                        if (response == 'same') {
                            alertify.error("no vote updated You Already Voted By " + value + " before");
                        }
                        if (response == 'error') {
                            alertify.error("there is some errors");
                        }
                        if (response == 'no service') {
                            alertify.error("This Service Does'nt Exist");
                        }
                        if (response == 'guest') {
                            alertify.error("To Rate This Service You must Login First");
                        }
                    }
                });
            }
        });
    },
}
</script>
