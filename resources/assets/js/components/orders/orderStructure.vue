<template lang="html">
<div class="row" id="items">
    <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">{{ order.id }}</div>
    <div  class="col-lg-5 col-md-5 col-sm-2 col-xs-2">
        <a v-link="{name: '/Order', params: {orderId: order.id}}">
            {{ order.services.name }}
        </a>
    </div>
    <div  class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <a v-link="{name: '/User', params: {userId: user_to_show.id, userName: user_to_show.name}}">
            {{ user_to_show.name }}
        </a>
    </div>
    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">{{ order.created_at | moment "calendar"}}</div>
    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <status :status="order.status"></status>
    </div>
</div>
<hr>
</template>
<script>
import Status from '../btns/status.vue';
export default {
    props: ['order', 'user_to_show'],
    components: {
        status: Status
    }
}
</script>
<style>
    #items div {
        word-break: break-all;
    }
</style>
