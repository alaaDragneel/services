<template lang="html">
    <div class="container">
        <div class="row profile">
            <div class="profile-sidebar">
                <!-- SIDEBAR MENU -->
                <div class="profile-usermenu">
                    <ul class="nav">
                        <li class="active">
                            <a href="#">
                                <i class="fa fa-folder"></i>
                                Categories
                            </a>
                        </li>
                        <li v-for="cat in category">
                            <a v-link="">
                                {{ cat.name }}
                            </a>
                        </li>
                        <li class="active">
                            <a href="#">
                                <i class="fa fa-eye-slash"></i>
                                Most Viewd
                            </a>
                        </li>
                        <li v-for="view in section1" track-by="$index">
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
    props: ['category', 'section1']
}
</script>
