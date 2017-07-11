<template lang="html">
    <div class="container">
        <ul class="list-group" style="padding:0px;">
              <li class="list-group-item active">
                  <h5>
                      <i class="fa fa-user"></i>
                     View Or Contact The Provider
                  </h5>
              </li>
              <li class="list-group-item ">
                  <a class="btn btn-success btn-sm" v-link="{name: '/User', params:{ userId: service.user.id, userName: service.user.name}}">
                      <i class="fa fa-user"></i> {{ service.user.name }}
                  </a>
              </li>
              <li class="list-group-item ">
                  <a class="btn btn-danger btn-sm" v-link="{name: '/SendMessage', params: {userId: service.user.id}}" >
                      <i class="fa fa-send"></i> Send Message
                  </a>
              </li>
        </ul>
        <!-- SIDEBAR MENU -->
        <ul v-if="section2.length > 0" class="list-group" style="padding:0px;">
              <li class="list-group-item active">
                  <h5>
                      <i class="fa fa-heart"></i>
                      Choosed For You
                  </h5>
              </li>
              <li v-for="choosed in section2" track-by="$index" class="list-group-item ">
                  <a v-link="{name: '/ServicesDetails', params:{serviceId: choosed.id, serviceName: choosed.name}}">
                      <span>{{ choosed.name }}</span>
                  </a>
              </li>
        </ul>
        <ul v-if="most_voted.length > 0" class="list-group" style="padding:0px;">
              <li class="list-group-item active">
                  <h5>
                      <i class="fa fa-star-half-o"></i>
                      Most Rated
                  </h5>
              </li>
              <li v-for="vote in most_voted" track-by="$index" class="list-group-item ">
                  <a v-link="{name: '/ServicesDetails', params:{serviceId: vote.id, serviceName: vote.name}}">
                      <span class="pull-left">{{ vote.name }}</span>
                      <span class="label label-warning pull-right"><i class="fa fa-star"></i>{{ vote.vote_sum }}</span>
                      <div class="clearfix"></div>
                  </a>
              </li>
        </ul>
        <ul v-if="most_voted.length > 0" class="list-group" style="padding:0px;">
              <li class="list-group-item active">
                  <h5>
                      <i class="fa fa-eye-slash"></i>
                      Most Viewd
                  </h5>
              </li>
              <li v-for="view in most_viewd" track-by="$index" class="list-group-item ">
                  <a v-link="{name: '/ServicesDetails', params:{serviceId: view.id, serviceName: view.name}}">
                      <span class="pull-left">{{ view.name }}</span>
                      <span class="label label-success pull-right"><i class="fa fa-eye"></i>{{ view.view_count }}</span>
                      <div class="clearfix"></div>
                  </a>
              </li>
        </ul>
        <!-- END MENU -->
    </div>
</template>

<script>
    export default {
        props:['service', 'most_voted', 'most_viewd', 'section2']
    }
</script>
