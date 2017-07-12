<template lang="html">
    <navbar></navbar>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="alert alert-danger">401 You Don't Have The Permisions.</div>
                    <div class="alert alert-info">Login To Take The Permisions Or Register A New One It's Free.</div>
                    <div class="col-md-6">
                        <a href="/login" class="btn btn-success btn-block"><i class="fa fa-user"></i> Login</a>
                    </div>
                    <div class="col-md-6">
                        <a href="/register" class="btn btn-primary btn-block"><i class="fa fa-user-plus"></i> Register</a>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
export default {
}
</script>
