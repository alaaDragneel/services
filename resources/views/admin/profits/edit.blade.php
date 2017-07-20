@extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        <div class="row">
            <h2 class="h2 text-center">
                <div class="col-md-12">
                    <i class="fa fa-server"></i> Edit {{ $service->name }}
                </div>
                <div class="col-md-12">
                    <small><strong class="text-info">Here You Can Edit the {{ $service->name }} Informations</strong></small>
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
                            <div class="panel-title">User Information</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <a href="{{ route('edit.user', ['id' => $service->user->id]) }}">{{ $service->user->name }}</a>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="content-box-header bg-red">
                            <div class="panel-title">Orders ({{ count($service->orders) }})</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            @forelse ($service->orders as $order)
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
                                        <i class="fa fa-calendar"></i> {{ $order->created_at->diffForHumans() }}
                                    </span>
                                    <br>
                                    <br>
                                </div>
                                <div class="clearfix"></div>

                            @empty
                                <div class="alert alert-inverse text-center">No Order For This Service</div>
                            @endforelse
                        </div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="col-md-12 col-sm-12">
                        <div class="content-box-header bg-inverse">
                            <div class="panel-title">Service Votes And Views</div>
                        </div>
                        <div class="content-box-large box-with-header">
                            <div class="col-md-11 col-md-offset-1 col-sm-12">
                                <div class="btn-group btn-group-sm" style="margin-left: 15%;">
                                    <span class="btn btn-primary">
                                        <i class="fa fa-eye"></i> Number Of Views {{ $service->view_count }}
                                    </span>
                                    <span class="btn btn-danger">
                                        <i class="fa fa-user"></i>
                                        Number of voters
                                        {{ $service->votes_count }}
                                    </span>
                                    <!-- The Service Rates -->
                                    <span class="btn btn-warning">
                                        <i class="fa fa-star"></i>
                                        Number of stars
                                        {{ $sumVotes > 0 ? $sumVotes : 0 }}
                                    </span>

                                    @if ($service->votes_count > 0)
                                        <span class="btn btn-success" >
                                            % {{ getParseIntVal(($sumVotes * 100) / ($service->votes_count * 5)) }}
                                            percentage
                                        </span>
                                    @endif
                                </div>
                                <!-- Number Of Users Whose Rate -->
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="col-md-12">
                        <div class="content-box-header bg-blue">
                            Edit {{ $service->name }}
                            <div class="btn-group btn-group-sm pull-right">
                                <a href="{{ route('delete.services', ['id' => $service->id]) }}" class="deleteBox btn btn-danger"><i class="fa fa-trash"></i> Delete</a>
                                <a href="{{ route('changeStatus.services', ['id' => $service->id]) }}" class="statusBox btn {{ $service->status == 0 ? 'btn-success' : 'btn-info' }}">
                                    @if ($service->status == 0)
                                        <i class="fa fa-check-circle"></i>  Publish
                                    @else
                                        <i class="fa fa-clock-o"></i>  Reject
                                    @endif
                                </a>
                                <a href="{{ route('index.services') }}" class="btn btn-inverse"><i class="fa fa-server"></i> All Services</a>
                            </div>
                            <div class="clearfix"></div>

                        </div>
                        <div class="content-box-large box-with-header">
                                {!! Form::model($service, ['route' => ['update.service',  $service->id], 'method' => 'post', 'files' => true ]) !!}
                                <div class="form-group">
                                    <label for="name">Service Name</label>
                                    <input type="text" class="form-control" id="name" required name="name" value="{{ $service->name }}" placeholder="Enter the Service Name">
                                </div>

                                <div class="form-group">
                                    <label for="description">Service Description</label>
                                    <textarea class="form-control" id="description" required name="description" rows="10" placeholder="Enter the Service description">
                                        {!! $service->description !!}
                                    </textarea>
                                </div>

                                <div class="form-group">
                                    <label for="category_id">Service Category</label>
                                    <select class="form-control" id="category_id" name="category_id">
                                        @foreach ($cat as $c)
                                            <option value="{{ $c->id }}" {{ $service->cat_id == $c->id ? 'selected' : '' }}>{{ $c->name }}</option>
                                        @endforeach
                                        {{-- <option value="{{ $service->category->id }}">{{ $service->category->name }}</option> --}}

                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="price">Service Price</label>
                                    <select class="form-control" id="price" name="price">
                                        <option value="5" {{ $service->price == '5' ? 'selected' : '' }}>5</option>
                                        <option value="10" {{ $service->price == '10' ? 'selected' : '' }}>10</option>
                                        <option value="15" {{ $service->price == '15' ? 'selected' : '' }}>15</option>
                                        <option value="20" {{ $service->price == '20' ? 'selected' : '' }}>20</option>
                                        <option value="25" {{ $service->price == '25' ? 'selected' : '' }}>25</option>
                                        <option value="30" {{ $service->price == '30' ? 'selected' : '' }}>30</option>
                                        <option value="35" {{ $service->price == '35' ? 'selected' : '' }}>35</option>
                                        <option value="40" {{ $service->price == '40' ? 'selected' : '' }}>40</option>
                                        <option value="45" {{ $service->price == '45' ? 'selected' : '' }}>45</option>
                                        <option value="50" {{ $service->price == '50' ? 'selected' : '' }}>50</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="image">Service image</label>
                                    <input type="file" class="form-control" name="image">
                                    <p class="help-block">The Image Must Be More Than 300px x 300px and less than 1000px x 1000px</p>
                                    <div width="900">
                                        <img src="{{ asset($service->image) }}" alt="{{ $service->name }}" class="img-thumbnail img-responsive" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fa fa-edit"></i> update Service
                                    </button>
                                </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
