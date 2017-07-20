@extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        	<div class="row">
                <h2 class="h2 text-center">
                    <div class="col-md-12">
                        <i class="fa fa-server"></i> All Profit Requests
                    </div>
                    <div class="col-md-12">
                        <small><strong class="text-info">Here You Can Controll On All Profit Requests In The Site</strong></small>
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
                            <div class="col-md-6 col-sm-12 col-xs-12">
                                <form action="{{ route('filter.search.profits') }}" method="post">
                                    {{ csrf_field() }}
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                                         <input type="text" name="search" class="form-control" placeholder="Search By Profit Number " required>
                                         <span class="input-group-btn">
                                           <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i> Search</button>
                                         </span>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-6 col-sm-12 col-xs-12">
                                <form action="{{ route('filter.search.date.profits') }}" method="post">
                                    {{ csrf_field() }}
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                         <input type="date" name="date_search" class="form-control" placeholder="Search By Profit Date " required>
                                         <span class="input-group-btn">
                                           <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i> Search</button>
                                         </span>
                                    </div>
                                </form>
                            </div>
                            <hr>
                            <div class="col-md-9 col-sm-12 col-xs-12">
                                <div class="btn-group">
                                    <a class="btn btn-primary" href="{{ route('filter.profits', ['status' => 2]) }}"><i class="fa fa-money"></i> All Profits</a>
                                    <a class="btn btn-success" href="{{ route('filter.profits', ['status' => 1]) }}"><i class="fa fa-check-circle"></i> Done Profits</a>
                                    <a class="btn btn-danger" href="{{ route('filter.profits', ['status' => 0]) }}"><i class="fa fa-close"></i> Waiting Profits</a>
                                    <a class="btn btn-warning" href="{{ route('filter.profits', ['status' => 'id-ASC']) }}"><i class="fa fa-sort-numeric-asc"></i> First Added</a>
                                    <a class="btn btn-info" href="{{ route('filter.profits', ['status' => 'id-DESC']) }}"><i class="fa fa-sort-numeric-desc"></i> Last Added</a>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <hr>
                            <div class='table-responsive'>
                                <table class='table table-striped table-bordered table-hover'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th><i class="fa fa-user"></i> Order Owner Name</th>
                                            <th><i class="fa fa-money"></i> Profit</th>
                                            <th><i class="fa fa-certificate"></i> Status</th>
                                            <th><i class="fa fa-calendar"></i> Add On</th>
                                            <th><i class="fa fa-calendar"></i> Transfeer On</th>
                                            <th><i class="fa fa-gear fa-spin"></i> Controll</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($profits as $profit)
                                            <tr>
                                                <td>{{ $profit->id }}</td>
                                                <td>
                                                    <a href="{{ route('edit.user', ['id' => $profit->user->id]) }}">
                                                        {{ $profit->user->name }}
                                                    </a>
                                                </td>
                                                <td>{{ $profit->profit_price }}</td>
                                                <td>
                                                    @if ($profit->status == 0)
                                                        <span class="label label-inverse">Waiting</span>
                                                    @elseif ($profit->status == 1)
                                                        <span class="label label-success">Done</span>
                                                    @endif
                                                </td>
                                                <td>{{ $profit->created_at->diffForHumans() }}</td>
                                                <td>{{ getTimeAfterDayes($profit->created_at, 'date') . ' (' . getTimeAfterDayes($profit->created_at, 'moment') . ')' }}</td>
                                                <td>
                                                    <a href="{{ route('edit.profits', ['id' => $profit->id]) }}" class="btn btn-info btn-block btn-xs">
                                                        <i class="fa fa-edit"></i> Edit
                                                    </a>
                                                    <a href="{{ route('delete.profits', ['id' => $profit->id]) }}" class="btn btn-danger btn-block btn-xs">
                                                        <i class="fa fa-trash"></i> Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <div class="alert alert-danger">No Profits Right Now!</div>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-6 col-md-offset-3">
                                {{ $profits->appends(Request::query())->render() }}
                            </div>
                            <div class="clearfix"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
@endsection
