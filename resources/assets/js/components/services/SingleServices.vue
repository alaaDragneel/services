<template>

    <div class="thumbnail" >
        <a v-link="{name: 'ServicesDetails', params: { serviceId: service.id, serviceName: service.name }}">
            <h4 class="text-center">{{ service.name }}</h4>
        </a>

        <img v-bind:src="service.image" class="img-responsive">
        <div class="caption">
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <h3>{{ service.user.name }}</h3>
                </div>
                <div class="col-md-6 col-xs-6 price text-right">
                    <h3>
                        <label>${{ service.price }}</label>
                    </h3>
                </div>
            </div>
            <p class="desc">{{ service.description | limit 100 }}</p>
            <div class="row">

                <div class="col-md-6">

                    <span v-if="service.status == 0">

                        <span class="btn btn-warning btn-product"><i class="fa fa-clock-o"></i> Waiting</span>
                    </span>

                    <span v-if="service.status == 1">

                        <span class="btn btn-info btn-product"><i class="fa fa-check"></i> Approved</span>
                    </span>

                    <span v-if="service.status == 2">

                        <span class="btn btn-danger btn-product"><i class="fa fa-close"></i> Rejected</span>
                    </span>
                </div>

                <div class="col-md-6">
                    <a href="#" class="btn btn-success btn-product">
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
</style>
<script>

export default {
    props: ['service'],
    filters: {
        limit: function (string, value) {
            return string.substring(0, value) + '...';
        }
    }
}
</script>
