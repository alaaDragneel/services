<template lang="html">
    <a @click.prevent="addOrder()" v-bind:disabled="disabled" class="btn btn-success btn-sm buyBtn">
        <i class="fa fa-shopping-cart"></i> Buy
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
            error: ''
        }
    },
    methods: {
        addOrder: function () {
            this.disabled = true;
            this.$http.get('Orders/' + this.service.id).then(function (res) {
                alertify.success('The Service Added Successfully Waiting The Approvment!');
            }, function (res) {
                this.error = "Something Goes Wrong You can't order this Service For The Next Resons!\
                <p>\
                    1 - This Service Added By You\
                    <br>\
                    2 - This Service You Order It Before\
                    <br>\
                    3 - This Service not Found\
                    <br>\
                    4 - You Have No Enough Money\
                </p>";
                alertify.error(this.error);
            });
            this.disabled = false;
        }
    }
}
</script>
