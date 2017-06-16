<template lang="html">
    <validator name="validation1">
        <form novalidate>
            <div class="form-group">
              <textarea class="form-control" rows="3" placeholder="Write Your Comment" v-model="comment" @valid="valid" @invalid="invalid" v-validate:message="{ required: true, minlength: 20, maxlength: 1000 }"></textarea>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-success btn-block" v-bind:disabled="disabled" @click.prevent="addComment">
                    <i class="fa fa-comment"></i> Add Comment
                </button>
            </div>
            <div class="form-group alert alert-danger text-center" v-if="disabled">
                <p v-if="$validation1.message.required">This Viled Is Requires</p>
                <p v-if="$validation1.message.minlength">Your Comment Must Be More Than 20 Charachters</p>
                <p v-if="$validation1.message.maxlength">Your Comment Must Be Less Than 1000 Charachters</p>
            </div>
        </form>
    </validator>

</template>

<script>
export default {
    props: ['order'],
    data () {
        return {
            comment: '',
            disabled: true,

        }
    },
    methods: {
        valid: function () {
            this.disabled = false;
        },
        invalid: function () {
            this.disabled = true;
        },
        addComment: function () {

            var formData = new FormData();
            formData.append('orderId', this.order.id);
            formData.append('comment', this.comment);

            this.$http.post('Comments', formData).then(function (res) {
                alertify.success('Success: your Comment has been added');                
                this.comment = '';
                this.$dispatch('AddNewComment', res.body);

            },function (res) {
                this.comment = '';
                for (var key in res.body) {
                    alertify.error(res.body[key][0]);
                }
                alertify.error('Try Again Later');
            });
        }
    }

}
</script>

<style lang="css">
</style>
