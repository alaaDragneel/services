<template lang="html">
    <div class="container">
        <ul v-if="section3" class="list-group" style="padding:0px;">
              <li class="list-group-item active">
                  <h5>
                      <i class="fa fa-shopping-cart"></i>
                      Best seller
                  </h5>
              </li>
              <li v-for="mostPurchased in section3" track-by="$index" class="list-group-item ">
                  <a v-link="{name: '/ServicesDetails', params:{serviceId: mostPurchased.id, serviceName: mostPurchased.name}}">
                      <span class="pull-left">{{ mostPurchased.name }}</span>
                      <span class="label label-danger pull-right"><i class="fa fa-cart-plus"></i> {{ mostPurchased.order_count }}</span>
                      <div class="clearfix"></div>
                  </a>
              </li>
        </ul>
        <ul v-if="section2" class="list-group" style="padding:0px;">
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
        <ul v-if="section1" class="list-group" style="padding:0px;">
              <li class="list-group-item active">
                  <h5>
                      <i class="fa fa-eye-slash"></i>
                      Most Viewd
                  </h5>
              </li>
              <li v-for="view in section1" track-by="$index" class="list-group-item ">
                  <a v-link="{name: '/ServicesDetails', params:{serviceId: view.id, serviceName: view.name}}">
                      <span class="pull-left">{{ view.name }}</span>
                      <span class="label label-success pull-right"><i class="fa fa-eye"></i>{{ view.view_count }}</span>
                      <div class="clearfix"></div>
                  </a>
              </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['category', 'section1', 'section2', 'section3'],
}
</script>
