<template lang="html">
          <div class="container">
              <ul class="list-group" style="padding:0px;">
                    <li class="list-group-item active">
                        <h5>
                            <a v-link="{name: '/User', params: {userId: user.id, userName: user.name}}" style="color: #FFF;">
                                <i class="fa fa-user"></i> {{ user.name }}
                            </a>
                        </h5>
                    </li>
                    <li class="list-group-item " v-for="service in user.services">
                        <a  v-link="{name: '/ServicesDetails', params: {serviceId: service.id, serviceName: service.name}}">
                            {{ service.name }}
                        </a>
                    </li>
              </ul>
          </div>

</template>

<script>
export default {
    props: ['user']
}
</script>
