<template lang="html">
    <span v-if="status == 0">
        <span class="label label-info">New Order</span>
    </span>
    <span v-if="status == 1">
        <span class="label label-warning">Old Order</span>
    </span>
    <span v-if="status == 2">
        <span class="label label-primary">In Prograss Order</span>
    </span>
    <span v-if="status == 3">
        <span class="label label-danger">Cancelled</span>
    </span>
    <span v-if="status == 4">
        <span class="label label-success">Finished</span>
    </span>
</template>

<script>
export default {
    props: ['status']
}
</script>
