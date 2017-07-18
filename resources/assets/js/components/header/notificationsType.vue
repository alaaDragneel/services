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

        <!-- Admin Accept Service -->
        <a v-if="notify.type == 'AcceptedService'" v-link="{name: '/ServicesDetails', params:{serviceId: notify.notify_id, serviceName: 'Admin Reject Service'}}"
            title="Admin Was Accepted Service #{{notify.notify_id}}!">
            <i class="fa fa-check-circle text-success"></i> Admin Was Accepted Service #{{notify.notify_id}}!
        </a>
        <!-- Admin Reject Service -->
        <a v-if="notify.type == 'RejectedService'" v-link="{name: '/ServicesDetails', params:{serviceId: notify.notify_id, serviceName: 'Admin Reject Service'}}"
            title="Admin Was Rejected Service #{{notify.notify_id}}!">
            <i class="fa fa-close text-red"></i> Admin Was Rejected Service #{{notify.notify_id}}!
        </a>
        <!-- Admin Accepted Order -->
        <a v-if="notify.type == 'AdminAccepted'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="Admin Was Accepted order #{{notify.notify_id}}!">
            <i class="fa fa-check-square text-aque"></i> Admin Was Accepted order #{{notify.notify_id}}!
        </a>
        <!-- Admin Rejected Order -->
        <a v-if="notify.type == 'AdminRejected'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="Admin Was Rejected Service #{{notify.notify_id}}!">
            <i class="fa fa-close text-red"></i> Admin Was Rejected Order #{{notify.notify_id}}!
        </a>
        <!-- Admin Compeleted Order -->
        <a v-if="notify.type == 'AdminCompeleted'" v-link="{name: '/Order', params:{orderId:  notify.notify_id }}"
            title="Admin Was Rejected Service #{{notify.notify_id}}!">
            <i class="fa fa-check-circle text-green"></i> Admin Was Completed Order #{{notify.notify_id}}!
        </a>
</template>

<script>
export default {
    props: ['notify'],
}
</script>
