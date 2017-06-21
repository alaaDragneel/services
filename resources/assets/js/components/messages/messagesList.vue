<template lang="html">

    <div v-for="message in messages" class="list-group">
        <a class="list-group-item" v-link="{name: '/messageDetails', params: {message_id: message.id, viewType: type}}">
            <div class="checkbox">
                <label><input type="checkbox"></label>
            </div>
            <span class="name" style="min-width: 120px; display: inline-block;">
                <span v-if="message.get_received_user">
                    {{ message.get_received_user.name }}
                </span>
                <span v-else>
                    {{ message.get_send_user.name }}
                </span>

            </span>
            <span class="">{{ message.title }}</span>
            <span class="badge">{{ message.created_at | moment 'calendar' }}</span>
        </a>
    </div>

</template>

<script>
export default {
    props: ['messages', 'type']
}
</script>

<style lang="css">
.checkbox, .radio {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
