@extends('admin.layouts.master')

@section('content')

    <div class="page-content">
        <h2 class="h2 text-center">
            <div class="row">
                <div class="col-md-12">
                    <i class="fa fa-dashboard"></i> Dashboard
                </div>
            </div>
        </h2>
        	<div class="row">
                {{-- Sidebar --}}
                <div class="col-md-2">
                    @include('admin.includes.sidebar')
                </div>
                {{-- sidebar --}}
                <div class="col-md-10">
                    <!-- Small boxes (Stat box) -->
                    <div class="col-lg-3 col-md-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-green">
                            <div class="inner">
                                <h3>$ {{ $websiteProfit }}</h3>

                                <p>Web Site Profits</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-money"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-md-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-blue">
                            <div class="inner">
                                <h3>$ {{ $usersProfit }}</h3>

                                <p>Users</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-usd"></i>
                            </div>
                            <a href="{{ route('waiting.profits') }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-md-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-yellow">
                            <div class="inner">
                                <h3>{{ $users }}</h3>

                                <p>Users</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-users"></i>
                            </div>
                            <a href="{{ route('filter.users', ['status' => 0]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-md-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-red">
                            <div class="inner">
                                <h3>{{ $admins }}</h3>

                                <p>Admins</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-user-md"></i>
                            </div>
                            <a href="{{ route('filter.users', ['status' => 1]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-inverse">
                            <div class="inner">
                                <h3>{{ $services }}</h3>

                                <p>Services</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-server"></i>
                            </div>
                            <a href="{{ route('index.services') }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-red">
                            <div class="inner">
                                <h3>{{ $waitingServices }}</h3>

                                <p>Waiting Services</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-clock-o"></i>
                            </div>
                            <a href="{{ route('filter.services', ['status' => 0]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-green">
                            <div class="inner">
                                <h3>{{ $approvedServices }}</h3>

                                <p>Approved Services</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-check-circle"></i>
                            </div>
                            <a href="{{ route('filter.services', ['status' => 1]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-red">
                            <div class="inner">
                                <h3>{{ $orders }}</h3>

                                <p>Orders</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-first-order"></i>
                            </div>
                            <a href="{{ route('index.orders') }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-aqua">
                            <div class="inner">
                                <h3>{{ $newOrders }}</h3>

                                <p>New Orders</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-pagelines"></i>
                            </div>
                            <a href="{{ route('filter.orders', ['status' => 0]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-yellow">
                            <div class="inner">
                                <h3>{{ $oldOrders }}</h3>

                                <p>Old Orders</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-history"></i>
                            </div>
                            <a href="{{ route('filter.orders', ['status' => 1]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-blue">
                            <div class="inner">
                                <h3>{{ $inProgressOrders }}</h3>

                                <p>Inprogress Orders</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-spinner fa-spin"></i>
                            </div>
                            <a href="{{ route('filter.orders', ['status' => 2]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-inverse">
                            <div class="inner">
                                <h3>{{ $rejectedOrders }}</h3>

                                <p>Rejected Orders</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-close"></i>
                            </div>
                            <a href="{{ route('filter.orders', ['status' => 3]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-4 col-md-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-green">
                            <div class="inner">
                                <h3>{{ $finshedOrders }}</h3>

                                <p>Finished Orders</p>
                            </div>
                            <div class="icon">
                                <i class="small fa fa-check-circle"></i>
                            </div>
                            <a href="{{ route('filter.orders', ['status' => 4]) }}" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                </div>

    		</div>
        </div>

@endsection
