<template lang="html">
          <ul class="nav nav-sidebar sidebar">
              <li>
                  <a v-link="{name: '/User', params: {userId: user.id, userName: user.name}}">
                      <i class="fa fa-user"></i> {{ user.name }}
                  </a>
              </li>
              <li class="divider"></li>
              <li v-for="service in user.services">
                  <a  v-link="{name: '/ServicesDetails', params: {serviceId: service.id, serviceName: service.name}}">
                      {{ service.name }}
                  </a>
              </li>
          </ul>
          <br>

</template>

<script>
export default {
    props: ['user']
}
</script>

<style lang="css">
</style>
