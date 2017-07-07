<template lang="html">
    <ol class="breadcrumb">

      <li v-if="pathUrl == '/Notification'">
          <a v-link="{path: '/Notification'}"><i class="fa fa-bell"></i> Notification</a>
      </li>

      <li v-if="pathUrl == '/Notification'">
          Notification ({{ notifications.length }})
      </li>

      <li v-if="pathUrl == '/UnReadNotification'">
          <a v-link="{path: '/UnReadNotification'}"><i class="fa fa-bell"></i> UnReadNotification</a>
      </li>

      <li v-if="pathUrl == '/UnReadNotification'">
          UnNotification ({{ notifications.length }})
      </li>


    </ol>
    <div class="row">
        <div class="col-md-6">
            <div class="col-md-11">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="serviceName"></label>
                        <input type="text" class="form-control" id="serviceName" placeholder="Search By Message title" v-model="title">
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-6 text-right ">
            <div class="btn-group">
                <button type="button" class="btn btn-success" @click="sort('seen')"><i class="fa fa-eye"></i>  Seen</button>
                <button type="button" class="btn btn-primary" @click="sort('created_at')"><i class="fa fa-sort-numeric-desc"></i>  By Adding Time </button>
            </div>
        </div>

    </div>
<table class="table table-bordered table-hover table-responsive table-striped">
<thead>
    <th>Recived From</th>
    <th>Notification</th>
    <th>On</th>
    <th>See</th>
</thead>
<tbody v-if="notifications.length > 0">
    <tr v-for="notification in notifications | orderBy sortKey reverse" track-by="$index">

        <td>
            <span class="name" style="min-width: 120px; display: inline-block;">
                    <a v-link="{name: '/User', params:{userId:notification.user_who_send_notification.id, userName: notification.user_who_send_notification.name}}">
                        {{ notification.user_who_send_notification.name }}
                    </a>
            </span>
        </td>
        <td v-if="notification.type == 'ReviceOrders'">
            <a v-link="{name: '/Order', params:{orderId: notification.notify_id}}"
                title="New Buying Order From {{ notification.user_who_send_notification.name }}
            Order #{{notification.notify_id}}">
                    New Buying Order From {{ notification.user_who_send_notification.name }}
                    Order #{{notification.notify_id}}
            </a>
        </td>
        <td v-if="notification.type == 'ReviceMessage'">
            <a v-link="{name: '/messageDetails', params:{message_id: notification.notify_id, viewType: 'income'}}"
                title="New Message From {{ notification.user_who_send_notification.name }}">
                New Message From {{ notification.user_who_send_notification.name }}
            </a>
        </td>
        <td v-if="notification.type == 'AcceptedOrder'">
            <a v-link="{name: '/Order', params:{orderId: notification.notify_id}}"
                title="{{ notification.user_who_send_notification.name }} Accepted Your Order #{{notification.notify_id}}!">
                {{ notification.user_who_send_notification.name }} Accepted Your Order #{{notification.notify_id}}!
            </a>
        </td>
        <td v-if="notification.type == 'RejectedOrder'">
            <a v-link="{name: '/Order', params:{orderId: notification.notify_id}}"
                title="{{ notification.user_who_send_notification.name }} Rejected Your Order #{{notification.notify_id}}!">
                {{ notification.user_who_send_notification.name }} Rejected Your Order #{{notification.notify_id}}!
            </a>
        </td>
        <td v-if="notification.type == 'CompeleteOrder'">
            <a v-link="{name: '/Order', params:{orderId: notification.notify_id}}"
                title="{{ notification.user_who_send_notification.name }} Finished Order #{{notification.notify_id}} Check Your Profit!">
                {{ notification.user_who_send_notification.name }} Finished Order #{{notification.notify_id}} Check Your Profit!
            </a>
        </td>
        <td v-if="notification.type == 'RecivedComment'">
            <a v-link="{name: '/Order', params:{orderId: notification.notify_id}}"
                title="{{ notification.user_who_send_notification.name }} Commented On Order #{{notification.notify_id}}!">
                {{ notification.user_who_send_notification.name }} Commented On Order #{{notification.notify_id}}!
            </a>
        </td>
        <td>{{ notification.created_at | moment 'calendar' }}</td>
        <td>
            <span v-if="notification.seen == 1">
                <span class="badge badge-success">seen</span>
            </span>
            <span v-else>
                <span class="badge">New</span>
            </span>
        </td>
    </tr>
</tbody>
<tbody v-else>
    <tr>
        <td colspan="7"><div class="alert alert-danger text-center">No Notification Right Now!</div></td>
    </tr>
</tbody>
</table>
</template>

<script>
export default {
    props: ['notifications'],
    data() {
        return {
            pathUrl: '',
            sortKey: '',
            reverse: 1,
            title: ''
        }
    },
    ready: function () {
        this.pathUrl = this.$route.path;
    },
    methods: {
        sort: function(sort) {
            this.reverse = (this.sortKey == sort) ? this.reverse * -1 : 1;
            this.sortKey = sort;
        }
    }
}
</script>
