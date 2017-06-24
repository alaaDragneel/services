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
                <div class="col-md-6 col-xs-8 price text-right" style="margin-top: -10px;">
                    <h3>
                        <label class="badge">${{ service.price }}</label>
                    </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <!-- buy Order -->
                    <buy_btn :service="service"></buy_btn>
                    <!-- Favorite -->
                    <fav_btn :service="service"></fav_btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import buyBtn from '../btns/buy.vue';
import favBtn from '../btns/fav.vue';
export default {
    props: ['service'],
    components: {
        buy_btn: buyBtn,
        fav_btn: favBtn
    },
    data: function () {
        return {

        }
    },
    filters: {
        limit: function (string, value) {
            return string.substring(0, value) + '...';
        }
    },
}
</script>
