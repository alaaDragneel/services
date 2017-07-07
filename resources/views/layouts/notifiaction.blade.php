@foreach (getAllNotificationObjects(Auth::user()->id) as $notify)
    <li>
        @if ($notify->type == 'ReviceOrders')
            <a v-link="{name: '/Order', params:{orderId: {{ $notify->notify_id }}}}">
                You Recived A New Buying Order number #{{ $notify->notify_id }}
            </a>
        @endif
    </li>
    <li class="divider"></li>
@endforeach
