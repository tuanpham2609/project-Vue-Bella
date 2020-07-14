<template>
    <div>
        <section class="wrapper" style="min-height: 356px;">
            <template  v-if="source.append && source.append.post_breadcrumb && source.append.post_breadcrumb.allow_show == true">
                <div v-if="source.append && source.append.post_breadcrumb && source.append.post_breadcrumb.info == 'image'" class="section section-breadcrumb" 
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + source.append.post_breadcrumb.data.background_image.path+')'}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.post_page_title ? source.append.post_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.post_page_title ? source.append.post_page_title.data: ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="source.append.post_breadcrumb && source.append.post_breadcrumb.info == 'color' " class="section-breadcrumb" 
                    v-bind:style="{'background-color':source.append.post_breadcrumb.data.background_color}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.post_page_title ? source.append.post_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.post_page_title ? source.append.post_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <section class="section section-list-posts">
                <div class="container">
                    <div class="col-xs-12  col-sm-8 col-md-8" v-if="list_post">
                        <div class="list-post-header" v-if="list_post.data.length > 0">
                            <span>Hiển thị từ 1 đến {{list_post.data.length}}</span>
                        </div>
                        <div class="list-post-body">
                            <div class="row row-flex">
                                <div class="col-xs-12 col-sm-6 col-flex" v-for="(item,index) in list_post.data" :key="index">
                                    <div class="item-post">
                                        <div class="item-post-inner">
                                            <router-link :to="alias(item.alias)" class="item-post-image">
                                                <img :src="$store.state.domain+'/'+item.photo.path" :alt="item.name" >
                                            </router-link>
                                            <div class="item-post-content">
                                                <span class="item-post-info"> {{item.created_at|dd-mm-yyyy}}
                                                    / {{item.user.name}} </span>
                                                <router-link  :to="alias(item.alias)" class="item-post-title" data-max-line="2">
                                                    <span class="ellip">{{item.name}}</span>
                                                </router-link>
                                                <div class="item-post-description" data-max-line="3">
                                                    <span  v-line-clamp:20="3" class="ellip" v-html="item.description"></span>
                                                </div>
                                                <router-link  :to="alias(item.alias)" class="item-post-readmore">
                                                    xem thêm
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="list-posts-footer">
                            <div class="col-sm-12">
                                <nav class="text-right sm-text-center" >
                                    <pagi :current="list_post.current_page"
                                        v-model="list_post.current_page"
                                        :total="list_post.last_page">
                                    </pagi>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-4 section-sidebar">
                        <div class="sidebar-filter" v-if="sidebar_categories && sidebar_categories.allow_show == true">
                            <div class="sidebar-title">
                                {{sidebar_categories.title}}
                            </div>
                            <ul class="list-group" v-if="sidebar_categories.data == ''">
                                <li class="list-group-item ">
                                    <a href="#">Hiện tại đang rỗng !!</a>
                                </li>
                            </ul>
                            <ul class="list-group">
                                <li class="list-group-item " v-for="(item, index) in sidebar_categories.data" :class="{ 'has-child' : item.children && item.children.length > 0 }" :key="index">
                                    <a v-if="item.children && item.children.length > 0"  data-toggle="sidebar">
                                        {{ item.name }}
                                    </a>
                                    <a v-else :to="item.alias"   @click="loadPost(item)">
                                        {{ item.name }}
                                    </a>
                                    <ul  :id="item._id+index" class="list-group list-group-child">
                                        <li v-for="(child,child_index) in item.children" :key="child_index" class="list-group-item ">
                                            <a @click="loadPost(child)"> {{ child.name }}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="sidebar-filter" v-if="source.append && source.append.sidebar_post.allow_show == true">
                            <div class="sidebar-title">
                                {{source.append.sidebar_post.name}}
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item" v-for="(item, index) in source.append.sidebar_post.data " :key="index">
                                    <div class="item-hot-post">
                                        <router-link :to="alias(item.alias)">
                                            <div class="item-image">
                                                <img v-if="item.photo.path" :src="$store.state.domain+'/'+item.photo.path" alt="">
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title"  v-line-clamp:20="2">{{item.name}}</div>
                                                <span class="item-info">{{item.created_at|dd-mm-yyyy}}
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
    import Pagi from '@/components/paginate'
    export default {
        props : ['source'],
        components: {Pagi},
        data() {
        return { 
            current_url:'',
                title : '',
            open: false,
            keyword:'',
            list_post:{
                data : [],
                current_page : 1,
                last_page : 0,
                total : 0,
                per_page : 0
            },
            }
        },
        computed:{
            post(){
                return this.$store.state.alias_data.append ? this.$store.state.alias_data.append.post : null;
            },
            sidebar_categories(){
                return (this.source&&this.source.append&&this.source.append.sidebar_post_category) ? this.source.append.sidebar_post_category : null 
            },
        },
        watch : {
            data : {
                deep : true,
                handler : function(){
                        this.$forceUpdate();
                }
            }
        },
        mounted() {
            $('a[data-toggle=sidebar]').on('click', function(event){
                event.preventDefault();
                var li = $(this).parents('li');
                var list = li.find('> ul ');
                if( li.hasClass('open')){
                    list.slideUp();
                    li.removeClass('open');
                }else{
                    list.slideDown();
                    li.addClass('open');
                }
            });
            $('.sidebar-filter .list-group .list-group-child .list-group-item').each(function(index , el){
                if( $(el).hasClass('active')){
                    $(el).parents('.list-group-child').show();
                    $(el).parents('.list-group-item.has-child').addClass('open');
                }
            });
            if( this.source && this.source.append && this.source.append.post ){
                this.list_post = this.source.append.post;
            }
            if(this.$route && this.$route.hasOwnProperty('query')){
                this.keyword = this.$route.query.keyword_search;
                this.loadPost({});
            }
        },
        updated(){
            
        },
        methods:{
            loadPost(item){
                var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain : this.$store.state.domain
                };
                var send_data = {
                    page : this.list_post.current_page,
                    keyword : this.keyword
                }
                if(item.hasOwnProperty('_id')){
                    send_data.category_id = item._id;
                }
                this.callAPI('page-data/filter-post', 'post', send_data, headers)
                    .then((res)=>{
                        if(res.data.success){
                            this.list_post =  res.data.data;
                            this.$forceUpdate();
                        }
                    })
            }
        },
        watch:{
            'list_post.current_page':function(new_val){
                this.loadPost({});
            },
            '$route.query.keyword_search':function(new_val){
                this.keyword = new_val;
                this.loadPost({});
            }
        }
    }
</script>