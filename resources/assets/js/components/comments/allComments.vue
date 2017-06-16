<template lang="html">
    <span v-if="showCommentSection">
        <add_comment :order="order"></add_comment>
    </span>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 class="page-header">
                    <span class="pull-left">Comments</span>
                    <small class="pull-right"><strong><i class="fa fa-comments"></i> {{ comments.length }} comment/s</strong></small>
                    <div class="clearfix"></div>
                </h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="col-md-11">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="serviceName"></label>
                                    <input type="text" class="form-control" id="serviceName" placeholder="Search By Member name" v-model="userName">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-6 text-right ">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary" @click="sort('id')">
                                <i class="fa fa-sort-numeric-desc"></i>  By Order
                            </button>
                            <button type="button" class="btn btn-success" @click="sort('created_at')">
                                <i class="fa fa-calendar"></i> By Date
                            </button>

                        </div>
                    </div>

                </div>
                <hr>
                <div v-if="comments.length > 0">
                    <section v-for="comment in comments | orderBy sortKey reverse | | filterBy userName in 'user.name'" track-by="$index" class="comment-list">
                        <article class="row">
                            <div class="col-md-2 col-sm-2 col-xs-2">
                                <figure>
                                    <img class="img-responsive img-circle" src="http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg" />
                                </figure>
                            </div>
                            <div class="col-md-10 col-sm-10 col-xs-10">
                                <div class="panel panel-default arrow left">
                                    <div class="panel-body">
                                        <header class="text-left">
                                            <div class="comment-user pull-left">
                                                <a v-link="{name: '/User', params: {userId: comment.user.id, userName: comment.user.name}}">
                                                    <i class="fa fa-user"></i>
                                                    {{ comment.user.name }}
                                                </a>
                                            </div>
                                            <time class="comment-date pull-right" datetime="{{ comment.created_at }}">
                                                <i class="fa fa-clock-o"></i>
                                                {{ comment.created_at | moment 'calendar' }}
                                            </time>
                                            <div class="clearfix"></div>
                                        </header>
                                        <div class="comment-post">
                                            <p>
                                                {{ comment.comment }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>
                <div v-else>
                    <div class="alert alert-info text-center">No Comments On This Service Yet!</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import AddComment from '../comments/addComment.vue';
    export default {
        props: ['order'],
        components: {
            add_comment: AddComment
        },
        data() {
            return {
                comments: [],
                sortKey: '',
                reverse: 1,
                userName: '',
                showCommentSection: true
            }
        },
        ready: function () {
            this.getAllComments();
        },
        methods: {
            getAllComments: function () {
                this.$http.get('Comments/' + this.order.id).then(function (res) {
                    this.comments = res.body;
                },function (res) {

                    alertify.error('Try Again Later');
                });
            },
            sort: function(sort) {
                this.reverse = (this.sortKey == sort) ? this.reverse * -1 : 1;
                this.sortKey = sort;
            }
        },
        events: {
            AddNewComment: function (val) {
                this.comments.unshift(val);
            },
            DisabledAdCommentSection: function (val) {
                alert('here');
                if (val == 'true') {
                    this.showCommentSection = false;
                }
            }
        }
    }
</script>

<style lang="css">
    /*Comment List styles*/
    .comment-list .row {
        margin-bottom: 0px;
    }
    .comment-list .panel .panel-heading {
        padding: 4px 15px;
        position: absolute;
        border:none;
        /*Panel-heading border radius*/
        border-top-right-radius:0px;
        top: 1px;
    }
    .comment-list .panel .panel-heading.right {
        border-right-width: 0px;
        /*Panel-heading border radius*/
        border-top-left-radius:0px;
        right: 16px;
    }
    .comment-list .panel .panel-heading .panel-body {
        padding-top: 6px;
    }
    .comment-list figcaption {
        /*For wrapping text in thumbnail*/
        word-wrap: break-word;
    }
    /* Portrait tablets and medium desktops */
    @media (min-width: 768px) {
        .comment-list .arrow:after, .comment-list .arrow:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            border-color: transparent;
        }
        .comment-list .panel.arrow.left:after, .comment-list .panel.arrow.left:before {
            border-left: 0;
        }
        /*****Left Arrow*****/
        /*Outline effect style*/
        .comment-list .panel.arrow.left:before {
            left: 0px;
            top: 30px;
            /*Use boarder color of panel*/
            border-right-color: inherit;
            border-width: 16px;
        }
        /*Background color effect*/
        .comment-list .panel.arrow.left:after {
            left: 1px;
            top: 31px;
            /*Change for different outline color*/
            border-right-color: #FFFFFF;
            border-width: 15px;
        }
        /*****Right Arrow*****/
        /*Outline effect style*/
        .comment-list .panel.arrow.right:before {
            right: -16px;
            top: 30px;
            /*Use boarder color of panel*/
            border-left-color: inherit;
            border-width: 16px;
        }
        /*Background color effect*/
        .comment-list .panel.arrow.right:after {
            right: -14px;
            top: 31px;
            /*Change for different outline color*/
            border-left-color: #FFFFFF;
            border-width: 15px;
        }
    }
    .comment-list .comment-post {
        margin-top: 6px;
    }
</style>
