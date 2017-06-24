<template lang="html">
    <ol class="breadcrumb">

      <li v-if="pathUrl == '/GetMyRecivedMessages'">
          <a v-link="{path: '/GetMyRecivedMessages'}">Inbox Messages</a>
      </li>

      <li v-if="pathUrl == '/GetMySendMessages'">
          <a v-link="{path: '/GetMySendMessages'}">Send Messages</a>
      </li>

      <li v-if="pathUrl == '/GetUnReadMessages'">
          <a v-link="{path: '/GetUnReadMessages'}">UnRead Messages</a>
      </li>
      <li v-if="pathUrl == '/GetReadMessages'">
          <a v-link="{path: '/GetReadMessages'}">Read Messages</a>
      </li>

      <li v-if="pathUrl == '/GetMyRecivedMessages'">
          Inbox Messages ({{ messages.length }})
      </li>

      <li v-if="pathUrl == '/GetMySendMessages'">
          Send Messages ({{ messages.length }})
      </li>

      <li v-if="pathUrl == '/GetUnReadMessages'">
          UnRead Messages ({{ messages.length }})
      </li>
      <li v-if="pathUrl == '/GetReadMessages'">
          Read Messages ({{ messages.length }})
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
    <th>
        <span v-if="type == 'income'">
            Recived From
        </span>
        <span v-else>
            Send To
        </span>
    </th>
    <th>Title</th>
    <th>Message</th>
    <th>On</th>
    <th>Status</th>
    <th>See</th>
    <th>Reply</th>
</thead>
<tbody v-if="messages.length > 0">
    <tr v-for="message in messages | orderBy sortKey reverse | filterBy title in 'title'" track-by="$index">
        <td>
            <span class="name" style="min-width: 120px; display: inline-block;">
                <span v-if="message.get_received_user">
                    <a v-link="{name: '/User', params:{userId:message.get_received_user.id, userName: message.get_received_user.name}}">

                        {{ message.get_received_user.name }}
                    </a>
                </span>
                <span v-else>
                    <a v-link="{name: '/User', params:{userId:message.get_send_user.id, userName: message.get_send_user.name}}">

                        {{ message.get_send_user.name }}
                    </a>
                </span>

            </span>
        </td>
        <td style="width: 20%;">
            <a v-link="{name: '/messageDetails', params: {message_id: message.id, viewType: type}}">
                {{ message.title }}
            </a>
        </td>
        <td style="width: 30%; word-break: break-word;">{{ message.message }}</td>
        <td>{{ message.created_at | moment 'calendar' }}</td>
        <td>
            <span v-if="message.seen == 1">
                <span class="badge badge-success">seen</span>
            </span>
            <span v-else>
                <span class="badge">New</span>
            </span>
        </td>
        <td>
            <a class="btn btn-info" v-link="{name: '/messageDetails', params: {message_id: message.id, viewType: type}}">
                <i class="fa fa-eye"></i>
            </a>
        </td>
        <td>
            <span v-if="message.get_received_user">
                <a v-link="{name: '/SendMessage', params: {userId: message.get_received_user.id}}" class="btn btn-primary btn-block">
                    <i class="fa fa-reply"></i>
                </a>
            </span>
            <span v-else>
                <a v-link="{name: '/SendMessage', params: {userId: message.get_send_user.id}}" class="btn btn-primary btn-block">
                    <i class="fa fa-reply"></i>
                </a>
            </span>
        </td>
    </tr>
</tbody>
<tbody v-else>
    <tr>
        <td colspan="7"><div class="alert alert-info text-center">No Messages Right No!</div></td>
    </tr>
</tbody>
</table>
    <div  class="list-group">

    </div>

</template>

<script>
export default {
    props: ['messages', 'type'],
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
