<template lang="html">
    <div class="container">
        <div class="row profile">
            <div class="profile-sidebar">
                <!-- SIDEBAR BUTTONS -->
                <div class="profile-userbuttons">
                    <a class="btn btn-info btn-sm" v-link="{name: '/User', params:{ userId: service.user.id, userName: service.user.name}}">
                        <i class="fa fa-user"></i> {{ service.user.name }}
                    </a>
                    <a class="btn btn-primary btn-sm" v-link="{name: '/SendMessage', params: {userId: service.user.id}}" class="btn btn-primary">
                        <i class="fa fa-send"></i> Send Message
                    </a>
                </div>
                <!-- END SIDEBAR BUTTONS -->
                <!-- SIDEBAR MENU -->
                <div class="profile-usermenu">
                    <ul class="nav">
                        <li class="active">
                            <a href="#">
                                <i class="fa fa-star-half-o"></i>
                                Most Rated
                            </a>
                        </li>
                        <li v-for="vote in most_voted">
                            <a v-link="{name: '/ServicesDetails', params:{serviceId: vote.id, serviceName: vote.name}}">
                                <span class="pull-left">{{ vote.name }}</span>
                                <span class="label label-warning pull-right"><i class="fa fa-star"></i>{{ vote.vote_sum }}</span>
                                <div class="clearfix"></div>
                            </a>
                        </li>
                        <li class="active">
                            <a href="#">
                                <i class="fa fa-eye-slash"></i>
                                Most Viewd
                            </a>
                        </li>
                        <li v-for="view in most_viewd">
                            <a v-link="{name: '/ServicesDetails', params:{serviceId: view.id, serviceName: view.name}}">
                                <span class="pull-left">{{ view.name }}</span>
                                <span class="label label-success pull-right"><i class="fa fa-eye"></i>{{ view.view_count }}</span>
                                <div class="clearfix"></div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- END MENU -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['service', 'most_voted', 'most_viewd']
    }
</script>
