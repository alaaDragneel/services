<template lang="html">
    <a v-link="{name: '/User', params:{ userId:service.user.id, userName: service.user.name}}">
        <i class="fa fa-user"></i> {{ service.user.name }}
    </a>
    <br>
    <button type="button" class="btn btn-primary">
        <i class="fa fa-send"></i> Send Message
    </button>
</template>

<script>
export default {
    props:['service']
}
</script>

<style lang="css">
</style>
