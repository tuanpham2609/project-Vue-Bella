<template>
    <div>
        <section class="wrapper" style="min-height: 457px;">
            <template v-if="source.alias_appends.post_detail_breadcrumb && source.alias_appends.post_detail_breadcrumb.allow_show == true">
                <div v-if="source.alias_appends.post_detail_breadcrumb && source.alias_appends.post_detail_breadcrumb.info == 'image'" class="section-breadcrumb" 
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + source.alias_appends.post_detail_breadcrumb.data.background_image.path+')'}">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li> <router-link to="/">Trang chủ</router-link></li>
                            <li><a href="#">{{source.alias_object.name}}</a></li>
                        
                        </ol>
                    </div>
                </div>
                <div v-if="source.alias_appends.post_detail_breadcrumb && source.alias_appends.post_detail_breadcrumb.info == 'color'" class="section-breadcrumb" 
                    v-bind:style="{'background-color':source.alias_appends.post_detail_breadcrumb.data.background_color}">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><router-link to="/">Trang chủ</router-link></li>
                            <li><a href="#">{{source.alias_object.name}}</a></li>
                        
                        </ol>
                    </div>
                </div>
            </template>
            <section class="section section-post-detail">
                <div class="container">
                    <div class="col-xs-12  col-sm-8 col-md-8 ">
                        <div class="post-detail-header">
                            <div class="post-title" v-if="source.alias_object">
                                <h1>{{source.alias_object.name}}</h1>
                            </div>
                        </div>
                        <div class="post-detail-body">
                            <div class="page-content" v-html="source.alias_object.content">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-4 section-sidebar">
                        <div class="sidebar-filter">
                            <div class="sidebar-title">
                                Bài viết mới
                            </div>
                            <ul class="list-group" v-if="hot_posts">
                                <li class="list-group-item" v-for="(item, index) in hot_posts" :key="index">
                                    <div class="item-hot-post">
                                        <router-link :to="alias(item.alias)">
                                            <div class="item-image">
                                                <img :src="$store.state.domain+'/'+item.photo.path" alt="">
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title" data-max-line="2"><span class="ellip"  v-line-clamp:20="2">{{item.name}}</span></div>
                                                <span class="item-info">{{item.created_at | dd-mm-yyyy}}
                                                    / {{item.user.name}} </span>
                                            </div>
                                        </router-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        props: ['source'],
        computed:{
            related_posts(){
                return this.$store.state.alias_data.alias_appends.related_post ? this.$store.state.alias_data.alias_appends.related_post : null 
            },
            categories(){
                return this.$store.state.alias_data.alias_appends.related_post ? this.$store.state.alias_data.alias_appends.categories : null 
            },
            hot_posts(){
                return this.$store.state.alias_data.alias_appends.related_post ? this.$store.state.alias_data.alias_appends.hot_posts : null 
            },
            related_posts(){
                return this.$store.state.alias_data.alias_appends.related_posts ? this.$store.state.alias_data.alias_appends.related_posts : null 
            },
        },
        mounted(){
           
        },
        watch:{
        }
    }
</script>
