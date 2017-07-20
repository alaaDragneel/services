    @extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        <div class="row">
            <h2 class="h2 text-center">
                <div class="col-md-12">
                    <i class="fa fa-server"></i> Edit user {{ $user->name }}
                </div>
                <div class="col-md-12">
                    <small><strong class="text-info">Here You Can Edit the {{ $user->name }} Informations</strong></small>
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
                    <div class="col-md-12 col-sm-12">
                        <div class="content-box-header bg-inverse">
                            <div class="panel-title">user Ballance</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <!-- Small boxes (Stat box) -->
                            <div class="col-lg-4 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-green">
                                    <div class="inner">
                                        @php $ballanceOrderOwner = ($orderOwnerProfits + $orderOwnerCharge) -  $orderOwnerPays; @endphp
                                        <h3>$ {{ $ballanceOrderOwner > 0 ? $ballanceOrderOwner : 0 }}</h3>

                                        <p>Ballance</p>
                                    </div>
                                    <div class="icon">
                                        <i class="small fa fa-money"></i>
                                    </div>
                                    <a href="#" class="small-box-footer">No More Info <i class="fa fa-info-circle"></i></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="col-lg-4 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-yellow">
                                    <div class="inner">
                                        <h3>$ {{ $orderOwnerCharge > 0 ? $orderOwnerCharge : 0 }}</h3>

                                        <p>Charges</p>
                                    </div>
                                    <div class="icon">
                                        <i class="small fa fa-btn fa-gear fa-spin"></i>
                                    </div>
                                    <a href="#" class="small-box-footer">No More Info <i class="fa fa-info-circle"></i></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="col-lg-4 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-red">
                                    <div class="inner">
                                        <h3>$ {{ $orderOwnerPays > 0 ? $orderOwnerPays : 0 }}</h3>

                                        <p>Payments</p>
                                    </div>
                                    <div class="icon">
                                        <i class="small fa fa-minus-circle"></i>
                                    </div>
                                    <a href="#" class="small-box-footer">No More Info <i class="fa fa-info-circle"></i></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="col-lg-4 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-blue">
                                    <div class="inner">
                                        <h3>$ {{ $orderOwnerProfits > 0 ? $orderOwnerProfits : 0 }}</h3>

                                        <p>Profits</p>
                                    </div>
                                    <div class="icon">
                                        <i class="small fa fa-briefcase"></i>
                                    </div>
                                    <a href="#" class="small-box-footer">No More Info <i class="fa fa-info-circle"></i></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="col-lg-4 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-inverse">
                                    <div class="inner">
                                        <h3>${{ $userWaitingProfits > 0 ? $userWaitingProfits : 0 }}</h3>

                                        <p>Waiting Profits</p>
                                    </div>
                                    <div class="icon">
                                        <i class="small fa fa-clock-o"></i>
                                    </div>
                                    <a href="{{ route('user.waiting.profits', ['id' => $user->id]) }}" class="small-box-footer"> More Info <i class="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="col-lg-4 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-aqua">
                                    <div class="inner">
                                        <h3>${{ $orderOwnerProfits + $userWaitingProfits }}</h3>

                                        <p>Total Profits</p>
                                    </div>
                                    <div class="icon">
                                        <i class="small fa fa-credit-card-alt"></i>
                                    </div>
                                    <a href="{{ route('user.all.profits', ['id' => $user->id]) }}" class="small-box-footer"> More Info <i class="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="content-box-header bg-green">
                            <div class="panel-title">User Services</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <div class="list-group">
                            @forelse ($user->services as $service)
                                    <a class="list-group-item" href="{{ route('edit.services', ['id' => $service->id]) }}">{{ $service->name }}</a>
                            @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="content-box-header bg-yellow">
                            <div class="panel-title">User Request orders ({{ count($user->getMyServiceOrder) }})</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <div class="list-group">
                                @forelse ($user->getMyServiceOrder as $order)
                                <div class="list-group-item">
                                    <span class="col-md-1 text-left">
                                        <a href="{{ route('edit.orders', ['id' => $order->id]) }}">#{{ $order->id }}</a>
                                    </span>
                                    <div class="col-md-6 text-center">
                                        @if ($order->status == 0)
                                            <span class="label label-inverse">New Order</span>
                                            <br>
                                        @elseif ($order->status == 1)
                                            <span class="label label-warning">Old Order</span>
                                            <br>
                                        @elseif ($order->status == 2)
                                            <span class="label label-primary">In Prograss Order</span>
                                            <br>
                                        @elseif ($order->status == 3)
                                            <span class="label label-danger">Cancelled</span>
                                            <br>
                                        @elseif ($order->status == 4)
                                            <span class="label label-success">Finished</span>
                                            <br>
                                        @endif
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <span class="label label-info">
                                            <i class="fa fa-calendar"></i> {{ $order->created_at->format('Y/m/d') }}
                                        </span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>


                                @empty
                                    <div class="alert alert-inverse text-center">No Order For This Service</div>
                                @endforelse
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="content-box-header bg-red">
                            <div class="panel-title">User Own orders ({{ count($user->ordersIMade) }})</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <div class="list-group">
                                @forelse ($user->ordersIMade as $order)
                                    <div class="list-group-item">
                                        <span class="col-md-1 text-left">
                                            <a href="{{ route('edit.orders', ['id' => $order->id]) }}">#{{ $order->id }}</a>
                                        </span>
                                        <div class="col-md-6 text-center">
                                            @if ($order->status == 0)
                                                <span class="label label-inverse">New Order</span>
                                                <br>
                                            @elseif ($order->status == 1)
                                                <span class="label label-warning">Old Order</span>
                                                <br>
                                            @elseif ($order->status == 2)
                                                <span class="label label-primary">In Prograss Order</span>
                                                <br>
                                            @elseif ($order->status == 3)
                                                <span class="label label-danger">Cancelled</span>
                                                <br>
                                            @elseif ($order->status == 4)
                                                <span class="label label-success">Finished</span>
                                                <br>
                                            @endif
                                        </div>
                                        <div class="col-md-4 text-right">
                                            <span class="label label-info">
                                                <i class="fa fa-calendar"></i> {{ $order->created_at->format('Y/m/d') }}
                                            </span>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                @empty
                                    <div class="alert alert-inverse text-center">No Order For This Service</div>
                                @endforelse
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="col-md-12">
                        <div class="content-box-header bg-blue">
                            Edit {{ $user->name }}
                            <div class="btn-group btn-group-sm pull-right">
                                <a href="{{ route('delete.users', ['id' => $user->id]) }}" class="btn btn-danger"><i class="fa fa-trash"></i> Delete</a>
                                <a href="{{ route('index.users') }}" class="btn btn-inverse"><i class="fa fa-users"></i> All users</a>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="content-box-large box-with-header">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <p class="help-block h5">
                                            User Name: {{ $user->name }}
                                        </p>
                                    </div>

                                    <div class="form-group">
                                        <p class="help-block h5">
                                            User Email: {{ $user->email }}
                                        </p>
                                    </div>
                                    <hr>
                                    {!! Form::model($user, ['route' => ['update.user',  $user->id], 'method' => 'post', 'files' => 'true' ]) !!}
                                    <div class="form-group">
                                      <label for="name"></label>
                                      <input type="text" class="form-control" id="name" name="name" placeholder="user name" required value="{{ $user->name }}">
                                    </div>
                                    <div class="form-group">
                                      <label for="email"></label>
                                      <input type="email" class="form-control" id="email" name="email" placeholder="user email" required value="{{ $user->email }}">
                                    </div>
                                    <div class="form-group">
                                      <label for="password"></label>
                                      <input type="password" class="form-control" id="password" name="password" placeholder="user password">
                                    </div>
                                    <div class="form-group">
                                        <label for="admin">User Status</label>
                                        <select class="form-control" id="admin" name="admin">
                                            <option value="0" {{ $user->admin == '0' ? 'selected' : '' }}>User</option>
                                            <option value="1" {{ $user->admin == '1' ? 'selected' : '' }}>Admin</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="image">User image</label>
                                        <input type="file" class="form-control" name="image">
                                        <p class="help-block">The Image Must Be More Than 300px x 300px and less than 1000px x 1000px</p>
                                        <div width="900">
                                            <img src="{{ asset($user->image) }}" alt="{{ $user->name }}" class="img-thumbnail img-responsive" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fa fa-edit"></i> Update User Information
                                        </button>
                                    </div>
                                    {!! Form::close() !!}
                                </div>
                                <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
