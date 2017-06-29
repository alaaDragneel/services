<template>
    <div class="thumbnail" >
        <a v-link="{name: '/ServicesDetails', params: { serviceId: service.id, serviceName: service.name }}">
            <h4 class="text-center">{{ service.name }}</h4>
        </a>

        <img v-bind:src="service.image" class="img-responsive">
        <div class="caption">
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <a v-link="{name: '/User', params: {userId: service.user.id, userName: service.user.name}}">
                        <h4>{{ service.user.name }}</h4>
                    </a>

                </div>
                <div class="col-md-6 col-xs-6 price text-right" style="margin-top: -10px;">
                    <h3>
                        <label class="badge">${{ service.price }}</label>
                    </h3>
                </div>
            </div>
            <div class="product-rating">
                <!-- Rating run Here -->
                <div class="col-md-12" v-if="service.votes_count > 0">
                    <div class="row">
                      <div class="col-md-4 col-sm-12 col-xs-12">
                          <!-- Number Of Users Whose Rate -->
                          <span class="label label-primary">
                              <i class="fa fa-user"></i>
                              {{ service.votes_count }}
                          </span>
                      </div>
                      <div class="col-md-4 col-sm-12 col-xs-12">
                          <!-- The Service Rates -->
                          <span class="label label-warning">
                              <i class="fa fa-star"></i>
                              {{ parseInt(service.votes_sum) }}
                          </span>
                      </div>
                      <div class="col-md-4 col-sm-12 col-xs-12">

                          <span class="label label-info">
                              <!--
                                  Percent =>
                                  [
                                  NOTE This Is The Service Score
                                  (total votes * 100)
                                  =============================================
                                  (number Of rated users * max rate value[ 5 ])
                                  NOTE this is the final score
                                  ]
                                  0/0 => NaN
                              -->
                              % {{ parseInt((service.votes_sum * 100) / (service.votes_count * 5)) }}
                        </span>
                      </div>
                    </div>
                </div>
                <!-- Rating run Here -->
                <!-- Rating run Here -->
                <div class="col-md-12" v-else>
                    <div class="row">
                      <div class="col-md-4 col-sm-12 col-xs-12">
                          <!-- Number Of Users Whose Rate -->
                          <span class="label label-primary">
                              <i class="fa fa-user"></i>
                              0
                          </span>
                      </div>
                      <div class="col-md-4 col-sm-12 col-xs-12">
                          <!-- The Service Rates -->
                          <span class="label label-warning" style="margin-right: 5px;">
                              <i class="fa fa-star"></i>
                              0
                          </span>
                      </div>
                      <div class="col-md-4 col-sm-12 col-xs-12">

                          <span class="label label-success" style="margin-right: 5px;">
                              <!--
                                  Percent =>
                                  [
                                  NOTE This Is The Service Score
                                  (total votes * 100)
                                  =============================================
                                  (number Of rated users * max rate value[ 5 ])
                                  NOTE this is the final score
                                  ]
                                  0/0 => NaN
                              -->
                              % 0
                        </span>
                      </div>
                    </div>
                </div>
                <!-- Rating run Here -->
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <!-- buy Order -->
                    <buy_btn :service="service"></buy_btn>
                    <!-- Favorite -->
                    <fav_btn :service="service"></fav_btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import buyBtn from '../btns/buy.vue';
import favBtn from '../btns/fav.vue';
import Rating from '../btns/rating.vue';
export default {
    props: ['service'],
    components: {
        buy_btn: buyBtn,
        rating: Rating,
        fav_btn: favBtn
    },
    data: function () {
        return {

        }
    },
    filters: {
        limit: function (string, value) {
            return string.substring(0, value) + '...';
        }
    },
}
</script>
