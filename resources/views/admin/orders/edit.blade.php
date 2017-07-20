@extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        <div class="row">
            <h2 class="h2 text-center">
                <div class="col-md-12">
                    <i class="fa fa-server"></i> Edit Order number #{{ $order->id }} For Service {{ $order->services->name }}
                </div>
                <div class="col-md-12">
                    <small><strong class="text-info">Here You Can Edit the {{ $order->services->name }} Informations</strong></small>
                </div>
            </h2>
            <hr>
            <div class="col-md-12">

                {{-- Sidebar --}}
                <div class="col-md-2">
                    @include('admin.includes.sidebar')
                </div>
                {{-- sidebar --}}
                <div class="col-md-10">

                    <div class="col-md-6 col-sm-12">
                        <div class="content-box-header bg-green">
                            <div class="panel-title">Order Owner</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <a href="{{ route('edit.user', ['id' => $order->getMyOrders->id]) }}">{{ $order->getMyOrders->name }}</a>
                            <br>
                            <br>
                            <div class="btn-group btn-group-sm">
                              <span class="btn btn-danger">
                                  <i class="fa fa-gear fa-spin"></i>
                                  Charges: $ {{ $orderOwnerCharge > 0 ? $orderOwnerCharge : 0 }}
                              </span>
                              <span class="btn btn-warning">
                                  <i class="fa fa-minus-circle"></i>
                                  Payments: $ {{ $orderOwnerPays > 0 ? $orderOwnerPays : 0 }}
                              </span>
                              <span class="btn btn-success">
                                  <i class="fa fa-briefcase"></i>
                                  Profits: $ {{ $orderOwnerProfits > 0 ? $orderOwnerProfits : 0 }}
                              </span>
                              <span class="btn btn-primary">
                                  <i class="fa fa-money"></i>
                                  @php $ballanceOrderOwner = ($orderOwnerProfits + $orderOwnerCharge) -  $orderOwnerPays; @endphp
                                  Ballance: $ {{ $ballanceOrderOwner > 0 ? $ballanceOrderOwner : 0 }}
                              </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="content-box-header bg-yellow">
                            <div class="panel-title">Service Owner</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <a href="{{ route('edit.user', ['id' => $order->getUserAddService->id]) }}">
                                {{ $order->getUserAddService->name }}
                            </a>
                            <br>
                            <br>
                            <div class="btn-group btn-group-sm">
                              <span class="btn btn-danger">
                                  <i class="fa fa-gear fa-spin"></i>
                                  Charges: $ {{ $serviceOwnerCharge > 0 ? $serviceOwnerCharge : 0 }}
                              </span>
                              <span class="btn btn-warning">
                                  <i class="fa fa-minus-circle"></i>
                                  Payments: $ {{ $serviceOwnerPays > 0 ? $serviceOwnerPays : 0 }}
                              </span>
                              <span class="btn btn-success">
                                  <i class="fa fa-briefcase"></i>
                                  Profits: $ {{ $serviceOwnerProfits > 0 ? $serviceOwnerProfits : 0 }}
                              </span>
                              <span class="btn btn-primary">
                                  <i class="fa fa-money"></i>
                                  @php $ballanceServiceOwner = ($serviceOwnerProfits + $serviceOwnerCharge) -  $serviceOwnerPays; @endphp
                                  Ballance: $ {{ $ballanceServiceOwner > 0 ? $ballanceServiceOwner : 0 }}
                              </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 col-sm-12">
                        <div class="content-box-header bg-blue">
                            <div class="panel-title">Order Status</div>
                        </div>
                        <div class="content-box-large box-with-header">

                            @if ($order->status == 0)
                                <div class="alert alert-info text-center">New Order</div>
                            @elseif ($order->status == 1)
                                <div class="alert alert-warning text-center">Old Order</div>
                            @elseif ($order->status == 2)
                                <div class="alert alert-inverse text-center">In Prograss Order</div>
                            @elseif ($order->status == 3)
                                <div class="alert alert-danger text-center">Cancelled</div>
                            @elseif ($order->status == 4)
                                <div class="alert alert-success text-center">Finished</div>
                            @endif

                        </div>
                    </div>


                    <div class="col-md-12">
                        <div class="content-box-header bg-blue">
                            Edit {{ $order->services->name }}
                            <div class="btn-group btn-group-sm pull-right">
                                <a href="{{ route('delete.orders', ['id' => $order->id]) }}" class="btn btn-danger"><i class="fa fa-trash"></i> Delete</a>
                                <a href="{{ route('index.orders') }}" class="btn btn-inverse"><i class="fa fa-server"></i> All Orders</a>
                            </div>
                            <div class="clearfix"></div>

                        </div>
                        <div class="content-box-large box-with-header">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <p class="help-block h5">
                                            Service Name: {{ $order->services->name }}
                                        </p>
                                    </div>

                                    <div class="form-group">
                                        <p class="help-block h5">
                                            Order Price: $ {{ $order->services->price }}
                                        </p>
                                    </div>
                                    <div class="form-group">
                                      <p class="help-block h5">
                                          Order Status:
                                          @if ($order->status == 0)
                                              <span class="label label-info text-center">New Order</span>
                                          @elseif ($order->status == 1)
                                              <span class="label label-warning text-center">Old Order</span>
                                          @elseif ($order->status == 2)
                                              <span class="label label-inverse text-center">In Prograss Order</span>
                                          @elseif ($order->status == 3)
                                              <span class="label label-danger text-center">Cancelled</span>
                                          @elseif ($order->status == 4)
                                              <span class="label label-success text-center">Finished</span>
                                          @endif
                                      </p>
                                    </div>
                                    <hr>
                                    {!! Form::model($order, ['route' => ['update.order',  $order->id], 'method' => 'post' ]) !!}
                                    <div class="form-group">
                                        <select class="form-control" id="status" name="status">
                                            <option value="0" {{ $order->status == '0' ? 'selected' : '' }}>New Order</option>
                                            <option value="1" {{ $order->status == '1' ? 'selected' : '' }}>Old Order</option>
                                            <option value="2" {{ $order->status == '2' ? 'selected' : '' }}>In Progress Order</option>
                                            <option value="3" {{ $order->status == '3' ? 'selected' : '' }}>Rejected Order</option>
                                            <option value="4" {{ $order->status == '4' ? 'selected' : '' }}>Finished Order</option>
                                        </select>
                                        <br>
                                        <div class="alert alert-danger h5">
                                                <b>Note: </b>
                                                <span>
                                                    change order status will change the profits and the payments of the two users who use this order so please becarfully when change the order status
                                                </span>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fa fa-edit"></i> change Order Status
                                        </button>
                                    </div>
                                    {!! Form::close() !!}
                                </div>
                                <div class="col-md-12">
                                    <h2 class="h2 text-center">
                                        <div class="col-md-12">
                                            <i class="fa fa-comments"></i> Comments ({{ $order->comments->count() }})
                                        </div>
                                        <div class="col-md-12">
                                            <small><strong class="text-info">Here You Can See All Comments of this Order</strong></small>
                                        </div>
                                    </h2>
                                    <hr>
                                    @foreach ($order->comments as $comment)
                                        <section>
                                        <article class="row">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div class="panel panel-default arrow left">
                                                    <div class="panel-body">
                                                        <header class="text-left mainInfo">
                                                            <div class="comment-user pull-left">
                                                                <a href="{{ route('edit.user', ['id' => $comment->user_id]) }}">
                                                                    <i class="fa fa-user"></i>
                                                                    {{ $comment->user_id }}
                                                                </a>
                                                            </div>
                                                            <time class="comment-date pull-right" datetime="{{ $comment->created_at }}">
                                                                <i class="fa fa-clock-o"></i>
                                                                {{ $comment->created_at->diffForHumans() }}
                                                            </time>
                                                            <div class="clearfix"></div>
                                                        </header>
                                                        <div class="comment-post pull-left">
                                                            <p style="word-break: break-word;">
                                                                {{ $comment->comment }}
                                                            </p>
                                                        </div>
                                                        <a href="{{ route('delete.comment', ['id' => $comment->id]) }}" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash"></i></a>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                    @endforeach
                                </div>
                                <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
