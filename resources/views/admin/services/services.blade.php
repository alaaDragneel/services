@extends('admin.layouts.master')
@section('content')

    <div class="page-content">
        	<div class="row">
                <h2 class="h2 text-center">
                    <div class="col-md-12">
                        <i class="fa fa-server"></i> All Services
                    </div>
                    <div class="col-md-12">
                        <small><strong class="text-info">Here You Can Controll On All Services In The Site</strong></small>
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
                            <div class="col-md-8 col-sm-12 col-xs-12 col-md-offset-2">
                                <form action="{{ route('filter.search.services') }}" method="get">
                                    {{ csrf_field() }}
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                                         <input type="text" name="search" class="form-control" placeholder="Search..." required>
                                         <span class="input-group-btn">
                                           <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i> Search</button>
                                         </span>
                                    </div>
                                </form>
                            </div>
                            <hr>
                            <div class="col-md-9 col-sm-12 col-xs-12">
                                <div class="btn-group">
                                    <a class="btn btn-primary" href="{{ route('filter.services', ['status' => 2]) }}"><i class="fa fa-server"></i> All Services</a>
                                    <a class="btn btn-success" href="{{ route('filter.services', ['status' => 1]) }}"><i class="fa fa-check-circle"></i> Approved Services</a>
                                    <a class="btn btn-danger" href="{{ route('filter.services', ['status' => 0]) }}"><i class="fa fa-close"></i> Rejected Services</a>
                                    <a class="btn btn-warning" href="{{ route('filter.services', ['status' => 'id-ASC']) }}"><i class="fa fa-sort-numeric-asc"></i> First Added</a>
                                    <a class="btn btn-info" href="{{ route('filter.services', ['status' => 'id-DESC']) }}"><i class="fa fa-sort-numeric-desc"></i> Last Added</a>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-12">
                                <div class="btn-group  pull-right">
                                    <button type="button" class="btn btn-default">Filter By Category</button>
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <span class="caret"></span>
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu" role="menu">
                                        @foreach ($cat as $c)
                                            <li><a href="{{ route('filter.category.services', ['cat_id' => $c->id]) }}">{{ $c->name }}</a></li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <hr>
                            <ul class="cd-items cd-container">
                                @forelse ($services as $service)
                                    <li class="cd-item">
                                        <img src="{{ asset($service->image) }}" alt="{{ $service->name }}" width="257" height="280">
                                        <a href="#" class="cd-trigger" data-id="{{ $service->id }}" title="Bullding {{ $service->name }} Preview">Quick View</a>
                                    </li> <!-- cd-item -->
                                @empty
                                    <div class="alert alert-danger text-center">No Services!</div>
                                @endforelse

                            </ul> <!-- cd-items -->
                            <div class="clearfix"></div>
                            <ul class="col-md-6 col-md-offset-3">
                                {{ $services->appends(Request::query())->render() }}
                            </ul>
                            <div class="clearfix"></div>

                            <div class="cd-quick-view">
                                <div class="cd-slider-wrapper">
                                    <ul class="cd-slider">
                                        <li><img src="{{ asset('admin/images/card/card.jpg') }}" width="257" height="280" class="imgBox" alt="Product 1"></li>
                                    </ul> <!-- cd-slider -->
                                </div> <!-- cd-slider-wrapper -->

                                <div class="cd-item-info">
                                    <h2 class="title"></h2>
                                    <p class="disBox"></p>
                                    <div class="btn-group" role="group">
                                        <a href="#" class="moreBox btn btn-primary"><i class="fa fa-edit"></i> Edit</a>
                                        <a href="{{ route('delete.services') }}" class="deleteBox btn btn-danger"><i class="fa fa-trash"></i> Delete</a>
                                        <span class="priceBox btn btn-warning"></span>
                                        <a href="{{ route('changeStatus.services') }}" class="statusBox btn "></a>
                                        <span href="#" class="btn btn-primary order-count"></span>
                                        <span href="#" class="btn btn-inverse provider"></span>
                                        </div> <!-- cd-item-action -->
                                    </div> <!-- cd-item-info -->
                                    <a href="#0" class="cd-close">Close</a>
                                </div> <!-- cd-quick-view -->
                        </div>

                    </div>
                </div>
            </div>
        </div>
@endsection
