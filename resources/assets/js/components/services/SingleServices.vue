<template lang="html">
    
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="thumbnail" >
                    <div class="row">
                        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                            <a v-link="{name: '/ServicesDetails', params: { serviceId: service.id, serviceName: service.name }}">
                                <h4>{{ service.name }}</h4>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"style="margin-top: 8px; margin-left: -5px;">
                            <span class="badge"><i class="fa fa-eye"></i> {{ service.view_count }}</span>

                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div style="height: 7px;"></div>
                    <img v-bind:src="service.image" class="img-responsive">
                    <div class="caption">
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div class="col-md-6 col-xs-6">
                                    <a v-link="{name: '/User', params: {userId: service.user.id, userName: service.user.name}}">
                                        <h4>{{ service.user.name }}</h4>
                                    </a>

                                </div>
                                <div class="col-md-6 col-xs-6 price text-right" style="margin-top: -10px;">
                                    <h3>
                                        <label class="badge">${{ service.price }}</label>
                                    </h3>
                                </div>

                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-12 col-sm-12">

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
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
