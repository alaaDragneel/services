<template lang="html">
            <div id="sidebar" class="well sidebar-nav">
                <ul class="nav nav-pills nav-stacked">
                    <li>
                        <a v-link="{name: '/User', params: {userId: user.id, userName: user.name}}">
                            <i class="fa fa-user"></i> {{ user.name }}
                        </a>
                    </li>
                </ul>
                <h5><i class="glyphicon glyphicon-user"></i>
                    <small><b>USERS</b></small>
                </h5>
                <ul class="nav nav-pills nav-stacked">
                    <li><a href="#">List</a></li>
                    <li><a href="#">Manage</a></li>
                </ul>
            </div>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style lang="css">
</style>
