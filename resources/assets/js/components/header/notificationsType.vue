<template lang="html">

        <!-- New Order -->
        <a v-if="notify.type == 'ReviceOrders'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="New Buying Order From {{ notify.user_who_send_notification.name }} Order #{{ notify.notify_id }}">
            <i class="fa fa-cart-plus text-green"></i>
                New Buying Order From {{ notify.user_who_send_notification.name }}
                Order #{{ notify.notify_id }}
        </a>
        <!-- recived Message -->
         <a v-if="notify.type == 'ReviceMessage'" v-link="{name: '/messageDetails', params:{message_id:  notify.notify_id , viewType: 'income'}}"
            title="New Message From {{ notify.user_who_send_notification.name }}">
            <i class="fa fa-envelope"></i> New Message From {{ notify.user_who_send_notification.name }}
        </a>

        <!-- Accept order -->
        <a v-if="notify.type == 'AcceptedOrder'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="{{ notify.user_who_send_notification.name }} Accepted Your Order #{{ notify.notify_id }}!">
            <i class="fa fa-check-circle text-green"></i> {{ notify.user_who_send_notification.name }}
            Accepted Your Order #{{ notify.notify_id }}!
        </a>

        <!-- reject order -->
        <a v-if="notify.type == 'RejectedOrder'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="{{ notify.user_who_send_notification.name }} Rejected Your Order #{{ notify.notify_id }}!">
            <i class="fa fa-warning text-red"></i> {{ notify.user_who_send_notification.name }}
            Rejected Your Order #{{ notify.notify_id }}!
        </a>

        <!-- Compelete Order -->
        <a v-if="notify.type == 'CompeleteOrder'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="{{ notify.user_who_send_notification.name }} Finished Order #{{ notify.notify_id }} Check Your Profit!">
            <i class="fa fa-truck text-blue"></i> {{ notify.user_who_send_notification.name }}
            Finished Order #{{ notify.notify_id }} Check Your Profit!
        </a>
        <!-- Comments -->
        <a v-if="notify.type == 'RecivedComment'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="{{ notify.user_who_send_notification.name }} Commented On Order #{{ notify.notify_id }}!">
            <i class="fa fa-comments text-aqua"></i> {{ notify.user_who_send_notification.name }}
            Commented On Order #{{ notify.notify_id }}!
        </a>
</template>

<script>
export default {
    props: ['notify'],
}
</script>
