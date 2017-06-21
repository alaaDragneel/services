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
                        <h4>{{ service.user.name }}</h4>
                    </a>

                </div>
                <div class="col-md-6 col-xs-8 price text-right">
                    <h4>
                        <label class="badge">${{ service.price }}</label>
                    </h4>
                </div>
            </div>
            <div class="row">

                <div class="col-md-8 col-sm-12">

                    <span v-if="service.status == 0">

                        <span class="btn btn-warning btn-product btn-block"><i class="fa fa-clock-o"></i> Waiting</span>
                    </span>

                    <span v-if="service.status == 1">

                        <span class="btn btn-info btn-product btn-block"><i class="fa fa-check"></i> Approved</span>
                    </span>

                    <span v-if="service.status == 2">

                        <span class="btn btn-danger btn-product btn-block"><i class="fa fa-close"></i> Rejected</span>
                    </span>
                </div>
                <div class="col-md-4 col-sm-12">
                    <span class="btn btn-info"><i class="fa fa-eye"></i> {{ service.view_count }}</span>
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
    filters: {
        limit: function (string, value) {
            return string.substring(0, value) + '...';
        }
    }
}
</script>
