<template lang="html">
    <success_message :show.sync="done" placement="top-right" duration="3000" type="success" width="400px" dismissable>
        <span class="icon-ok-circled alert-icon-float-left"></span>
        <strong>Success!</strong>
        <p>Waiting For Approved.</p>
    </success_message>

    <error_message :show.sync="error" placement="top-right" duration="3000" type="danger" width="400px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <strong>Something Goes Wrong You can't order this Service For The Next Resons!</strong>
        <p>
            1 - This Service Added By You
            <br>
            2 - This Service You Order It Before
            <br>
            3 - This Service not Found
        </p>
    </error_message>

    <a @click.prevent="addOrder()" v-bind:disabled="disabled" class="btn btn-success btn-product btn-block">
        <span class="glyphicon glyphicon-shopping-cart"></span> Buy
    </a>
</template>

<script>

var Alert = require('vue-strap/dist/vue-strap.min').alert;

export default {
    props: ['service'],
    components: {
        success_message: Alert,
        error_message: Alert
    },
    data: function () {
        return {
            disabled: false,
            done: false,
            error: false
        }
    },
    methods: {
        addOrder: function () {
            this.disabled = true;
            this.$http.get('Orders/' + this.service.id).then(function (res) {
                this.done = true;
            }, function (res) {
                this.error = true;
            });
            this.disabled = false;
        }
    }
}
</script>

<style lang="css">
</style>
