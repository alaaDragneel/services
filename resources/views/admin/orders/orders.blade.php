@extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        	<div class="row">
                <h2 class="h2 text-center">
                    <div class="col-md-12">
                        <i class="fa fa-server"></i> All Orders
                    </div>
                    <div class="col-md-12">
                        <small><strong class="text-info">Here You Can Controll On All Orders In The Site</strong></small>
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
                        <div class="content-box-large">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="btn-group btn-group-sm">
                                    <a class="btn btn-default" href="{{ route('filter.orders', ['status' => 5]) }}"><i class="fa fa-list-ol"></i> All orders</a>
                                    <a class="btn btn-success" href="{{ route('filter.orders', ['status' => 0]) }}"><i class="fa fa-pagelines"></i> New orders</a>
                                    <a class="btn btn-warning" href="{{ route('filter.orders', ['status' => 1]) }}"><i class="fa fa-history"></i> Old orders</a>
                                    <a class="btn btn-primary" href="{{ route('filter.orders', ['status' => 2]) }}"><i class="fa fa-spinner fa-spin"></i> In Progress orders</a>
                                    <a class="btn btn-danger" href="{{ route('filter.orders', ['status' => 3]) }}"><i class="fa fa-close"></i> Rejected orders</a>
                                    <a class="btn btn-success" href="{{ route('filter.orders', ['status' => 4]) }}"><i class="fa fa-check-circle"></i> Finished orders</a>
                                    <a class="btn btn-inverse" href="{{ route('filter.orders', ['status' => 'id-ASC']) }}"><i class="fa fa-sort-numeric-asc"></i> First Added</a>
                                    <a class="btn btn-info" href="{{ route('filter.orders', ['status' => 'id-DESC']) }}"><i class="fa fa-sort-numeric-desc"></i> Last Added</a>
                                </div>
                            </div>
                            <hr>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <form action="{{ route('filter.search.orders') }}" method="post">
                                    {{ csrf_field() }}
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                                         <input type="text" name="search" class="form-control" placeholder="Write Service Name" required>
                                         <span class="input-group-btn">
                                           <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i> Search</button>
                                         </span>
                                    </div>
                                </form>
                            </div>
                            <div class="clearfix"></div>
                            <hr>
                            <div class='table-responsive'>
                                <table class='table table-striped table-bordered table-hover'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th><i class="fa fa-server"></i> Service Name</th>
                                            <th><i class="fa fa-user"></i> Service Owner Name</th>
                                            <th><i class="fa fa-first-order"></i> Order Owner Name</th>
                                            <th><i class="fa fa-certificate"></i> Status</th>
                                            <th><i class="fa fa-calendar"></i> Add On</th>
                                            <th><i class="fa fa-gear fa-spin"></i> Controll</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($orders as $order)
                                            <tr>
                                                <td>{{ $order->id }}</td>
                                                <td>
                                                    <a href="{{ route('edit.services', ['id' => $order->services->id]) }}">
                                                        {{ $order->services->name }}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="{{ route('edit.user', ['id' => $order->getUserAddService->id]) }}">
                                                        {{ $order->getUserAddService->name }}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="{{ route('edit.user', ['id' => $order->getMyOrders->id]) }}">
                                                        {{ $order->getMyOrders->name }}
                                                    </a>
                                                </td>
                                                <td>
                                                    @if ($order->status == 0)
                                                        <span class="label label-inverse">New Order</span>
                                                    @elseif ($order->status == 1)
                                                        <span class="label label-warning">Old Order</span>
                                                    @elseif ($order->status == 2)
                                                        <span class="label label-primary">In Prograss Order</span>
                                                    @elseif ($order->status == 3)
                                                        <span class="label label-danger">Cancelled</span>
                                                    @elseif ($order->status == 4)
                                                        <span class="label label-success">Finished</span>
                                                    @endif
                                                </td>
                                                <td>{{ $order->created_at->diffForHumans() }}</td>
                                                <td>
                                                    <a href="{{ route('edit.orders', ['id' => $order->id]) }}" class="btn btn-info btn-block btn-xs">
                                                        <i class="fa fa-edit"></i> Edit
                                                    </a>
                                                    <a href="{{ route('delete.orders', ['id' => $order->id]) }}" class="btn btn-danger btn-block btn-xs">
                                                        <i class="fa fa-trash"></i> Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <div class="alert alert-danger">NO Orders Right Now!</div>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-6 col-md-offset-3">
                                {{ $orders->appends(Request::query())->render() }}
                            </div>
                            <div class="clearfix"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
@endsection
