@php $notifications = getAllNotificationObjects(Auth::user()->id); @endphp
@if ($notifications->count() > 0)
    @foreach ($notifications as $notify)
        <li>
            @if ($notify->type == 'ReviceOrders')
                <a v-link="{name: '/Order', params:{orderId: {{ $notify->notify_id }}}}"
                    title="New Buying Order From {{ $notify->userWhoSendNotification->name }}
                Order #{{ $notify->notify_id }}">
                    <i class="fa fa-cart-plus text-green"></i>
                        New Buying Order From {{ $notify->userWhoSendNotification->name }}
                        Order #{{ $notify->notify_id }}
                </a>
            @endif
            @if ($notify->type == 'ReviceMessage')
                <a v-link="{name: '/messageDetails', params:{message_id: {{ $notify->notify_id }}, viewType: 'income'}}"
                    title="New Message From {{ $notify->userWhoSendNotification->name }}">
                    <i class="fa fa-envelope"></i> New Message From {{ $notify->userWhoSendNotification->name }}
                </a>
            @endif
            @if ($notify->type == 'AcceptedOrder')
                <a v-link="{name: '/Order', params:{orderId: {{ $notify->notify_id }}}}"
                    title="{{ $notify->userWhoSendNotification->name }} Accepted Your Order #{{ $notify->notify_id }}!">
                    <i class="fa fa-check-circle text-green"></i> {{ $notify->userWhoSendNotification->name }} Accepted Your Order #{{ $notify->notify_id }}!
                </a>
            @endif
            @if ($notify->type == 'RejectedOrder')
                <a v-link="{name: '/Order', params:{orderId: {{ $notify->notify_id }}}}"
                    title="{{ $notify->userWhoSendNotification->name }} Rejected Your Order #{{ $notify->notify_id }}!">
                    <i class="fa fa-warning text-red"></i> {{ $notify->userWhoSendNotification->name }} Rejected Your Order #{{ $notify->notify_id }}!
                </a>
            @endif
            @if ($notify->type == 'CompeleteOrder')
                <a v-link="{name: '/Order', params:{orderId: {{ $notify->notify_id }}}}"
                    title="{{ $notify->userWhoSendNotification->name }} Finished Order #{{ $notify->notify_id }} Check Your Profit!">
                    <i class="fa fa-truck text-blue"></i> {{ $notify->userWhoSendNotification->name }} Finished Order #{{ $notify->notify_id }} Check Your Profit!
                </a>
            @endif
            @if ($notify->type == 'RecivedComment')
                <a v-link="{name: '/Order', params:{orderId: {{ $notify->notify_id }}}}"
                    title="{{ $notify->userWhoSendNotification->name }} Commented On Order #{{ $notify->notify_id }}!">
                    <i class="fa fa-comments text-aqua"></i> {{ $notify->userWhoSendNotification->name }} Commented On Order #{{ $notify->notify_id }}!
                </a>
            @endif
        </li>
    @endforeach
@else
    <li style="position: absolute; top: 41%; left: 3%; font-size: 30px; color: #bbb;"><i class="fa fa-bell"></i> No Notifications!</li>
@endif
