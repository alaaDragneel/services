<template>
    <div class="thumbnail" >
        <a v-link="{name: '/ServicesDetails', params: { serviceId: service.id, serviceName: service.name }}">
            <h4 class="text-center">{{ service.name }}</h4>
        </a>

        <img v-bind:src="service.image" class="img-responsive">
        <div class="caption">
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <a v-link="{name: '/User', params: {userId: service.user.id, userName: service.user.name}}">
                        <h3>{{ service.user.name }}</h3>
                    </a>

                </div>
                <div class="col-md-6 col-xs-8 price text-right">
                    <h3>
                        <label>${{ service.price }}</label>
                    </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <a @click="addOrder()" class="btn btn-success btn-product btn-block">
                        <span class="glyphicon glyphicon-shopping-cart"></span> Buy
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.btn-product{
    width: 100%;
}
p.desc {
    word-break: break-all;
}
h4.text-center {
    font-size: 18px
}
</style>
<script>

export default {
    props: ['service'],
    data: function () {
        return {
            resons: ''
        }
    },
    filters: {
        limit: function (string, value) {
            return string.substring(0, value) + '...';
        }
    },
    methods: {
        addOrder: function () {
            this.$http.get('Orders/' + this.service.id).then(function (res) {
                this.resons = 'Waiting For The Approved';
                swal('Success', this.resons, 'success');
            }, function (res) {
                this.resons = '1 - This Service Added By You \n';
                this.resons += '1 - This Service You Order It Before \n';
                this.resons += '1 - This Service not Found \n';
                swal('Something Goes Wrong \n You can\'t order this Service For The Next Resons', this.resons, 'error');
            });
        }
    }
}
</script>
