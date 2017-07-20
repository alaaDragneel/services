@extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        	<div class="row">
                <h2 class="h2 text-center">
                    <div class="col-md-12">
                        <i class="fa fa-server"></i> All Users
                    </div>
                    <div class="col-md-12">
                        <small><strong class="text-info">Here You Can Controll On All Users In The Site</strong></small>
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
                                    <a class="btn btn-default" href="{{ route('filter.users', ['status' => 2]) }}"><i class="fa fa-list-ol"></i> All Users</a>
                                    <a class="btn btn-success" href="{{ route('filter.users', ['status' => 0]) }}"><i class="fa fa-pagelines"></i> Users</a>
                                    <a class="btn btn-warning" href="{{ route('filter.users', ['status' => 1]) }}"><i class="fa fa-history"></i> Admins</a>
                                    <a class="btn btn-danger" href="{{ route('filter.users', ['status' => 'id-ASC']) }}"><i class="fa fa-sort-numeric-asc"></i> First Added</a>
                                    <a class="btn btn-inverse" href="{{ route('filter.users', ['status' => 'id-DESC']) }}"><i class="fa fa-sort-numeric-desc"></i> Last Added</a>
                                </div>
                            </div>
                            <hr>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <form action="{{ route('filter.search.users') }}" method="post">
                                    {{ csrf_field() }}
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                                         <input type="text" name="search" class="form-control" placeholder="Write User Name Or User Email " required>
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
                                            <th><i class="fa fa-server"></i> User Name</th>
                                            <th><i class="fa fa-user"></i> User email</th>
                                            <th><i class="fa fa-certificate"></i> admin</th>
                                            <th><i class="fa fa-server"></i> Service Count</th>
                                            <th><i class="fa fa-first-order"></i> User Orders</th>
                                            <th><i class="fa fa-users"></i> Others Order To User</th>
                                            <th><i class="fa fa-calendar"></i> Add On</th>
                                            <th><i class="fa fa-gear fa-spin"></i> Controll</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($users as $user)
                                            <tr>
                                                <td>{{ $user->id }}</td>
                                                <td>
                                                    <a href="{{ route('edit.user', ['id' => $user->id]) }}">
                                                        {{ $user->name }}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="{{ route('edit.user', ['id' => $user->id]) }}">
                                                        {{ $user->email }}
                                                    </a>
                                                </td>
                                                <td>
                                                    @if ($user->admin == 0)
                                                        <span class="badge bg-inverse">User</span>
                                                    @elseif ($user->admin == 1)
                                                        <span class="badge bg-blue">Admin</span>
                                                    @endif
                                                </td>
                                                <td>
                                                    <a href="{{ route('all.user.services', ['id' => $user->id]) }}">
                                                        {{ $user->services_count }}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="{{ route('all.user.owner.orders', ['id' => $user->id]) }}">
                                                        {{ $user->orders_i_made_count }}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="{{ route('all.user.other.orders', ['id' => $user->id]) }}">
                                                        {{ $user->get_my_service_order_count }}
                                                    </a>
                                                </td>
                                                <td>{{ $user->created_at->format('Y/m/d') }}</td>
                                                <td>
                                                    <a href="{{ route('edit.user', ['id' => $user->id]) }}" class="btn btn-info btn-block btn-xs">
                                                        <i class="fa fa-edit"></i> Edit
                                                    </a>
                                                    <a href="{{ route('delete.users', ['id' => $user->id]) }}" class="btn btn-danger btn-block btn-xs">
                                                        <i class="fa fa-trash"></i> Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <div class="alert alert-danger">NO Users Right Now!</div>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-6 col-md-offset-3">
                                {{ $users->appends(Request::query())->render() }}
                            </div>
                            <div class="clearfix"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
@endsection
