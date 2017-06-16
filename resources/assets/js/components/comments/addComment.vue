<template lang="html">
    <validator name="validation1">
        <form novalidate>
            <div class="form-group">
              <textarea class="form-control" rows="3" placeholder="Write Your Comment" v-model="message" @valid="valid" @invalid="invalid" v-validate:message="{ required: true, minlength: 20, maxlength: 1000 }"></textarea>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary btn-block" v-bind:disabled="disabled">
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
            message: '',
            disabled: true
        }
    },
    methods: {
        valid: function () {
            this.disabled = false;
        },
        invalid: function () {
            this.disabled = true;
        }
    }

}
</script>

<style lang="css">
</style>
