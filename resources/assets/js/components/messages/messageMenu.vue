<template lang="html">
    <ul class="nav nav-pills nav-stacked">
        <li><a v-link="{path: '/GetMyRecivedMessages'}">Inbox Messages</a>
        </li>
        <li><a v-link="{path: '/GetMySendMessages'}">Send Messages</a></li>
        <li><a href="">New Messages</a></li>
    </ul>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
