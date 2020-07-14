<template>
    <div>
        <header v-if="demo_mode" class="header">
            <section class="header-top">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="header-top-left">
                                <div class="hotline"><a href="javascript:void(0)">
                                            Hotline: 0918076446
                                        </a></div>
                            </div>
                            <div class="header-top-right">
                                <div class="btn-groups">
                                    <ul>
                                        <li><a href="/user/register" class=""><i class="fas fa-user-plus"></i>Đăng ký</a></li>
                                        <li><a href="/user/login" class=""><i class="fas fa-sign-in-alt"></i>Đăng nhập</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div id="header-search-box" class="header-top-center">
                                <div class="header-search">
                                    <form class="form-search">
                                        <div class="search-nav-left">
                                            <select name="category" data-type="select" data-target="#search-selected-value">
                                                <option selected="selected" value="san-pham">Tất cả danh mục</option>
                                                <option value="thoi-trang-nam">Thời trang nam</option>
                                                <option value="thoi-trang-nu">Thời trang nữ</option>
                                            </select>
                                        </div>
                                        <div class="search-nav-right">
                                            <button class="btn btn-default"><i class="fa fa-search"></i></button>
                                        </div>
                                        <div class="search-nav-center">
                                            <div class="search-keyword-field">
                                                <input type="text" placeholder="Tìm kiếm ...">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="header-navbar">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <button id="btn-toggle" class="navbar-toggle"><span></span></button>
                            <div class="header-logo">
                                <a href="/" class="router-link-exact-active router-link-active" title="">
                                <img alt="" :src="theme_uri+'static/images/demo/logo.png'" title=""></a>
                            </div>
                            <div class="header-menu" >
                                <nav id="menu" class="menu">
                                    <ul class="btn-groups">
                                        <li class="hidden-md hidden-lg"><a href="#" id="btn-search-toggle"><i class="fa fa-search"></i></a></li>
                                        <li><a href="/favorite"><i class="far fa-heart"></i><span data-type="cart-counter" class="badge number-product">
                                                        3
                                                    </span></a></li>
                                        <li><a href="/cart" id="btn-show-cart"><i class="fas fa-shopping-basket"></i><span data-type="cart-counter" class="badge number-product">
                                                        0
                                                    </span></a></li>
                                    </ul>
                                    <ul class="menubar">
                                        <li class="hidden-md hidden-lg item-top-menu"><a href="/user/register" class=""><i class="fas fa-user-plus"></i>Đăng ký</a></li>
                                        <li class="hidden-md hidden-lg item-top-menu"><a href="/user/login" class=""><i class="fas fa-sign-in-alt"></i>Đăng nhập</a></li>
                                        <li class="has-submenu"><a href="/" class="router-link-exact-active router-link-active"><span>Trang chủ</span>&nbsp;
                                                    <i class="icon-first-submenu"></i></a>
                                            <ul class="submenu">
                                                <li class=""><a href="/gioi-thieu" class=""><span>Giới thiệu</span><!----></a>
                                                    <!---->
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="has-submenu"><a href="/san-pham" class=""><span>Sản phẩm</span>&nbsp;
                                                    <!----></a>
                                            <!---->
                                        </li>
                                        <li class="has-submenu"><a href="/tin-tuc" class=""><span>Tin tức</span>&nbsp;
                                                    <!----></a>
                                            <!---->
                                        </li>
                                        <li class="has-submenu"><a href="/lien-he" class=""><span>Liên hệ</span>&nbsp;
                                                    <!----></a>
                                            <!---->
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <header v-else class="header">
            <section class="header-top">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="header-top-left">
                                <div class="hotline">
                                    <a href="javascript:void(0)" v-if="hotline && hotline.allow_show == true">
                                        Hotline: {{hotline.data}}
                                    </a>
                                </div>
                            </div>
                            <div class="header-top-right">
                                <div class="btn-groups">
                                    <ul v-if="!$store.state.user">
                                        <li>
                                            <router-link to="/user/register"><i class="fas fa-user-plus"></i>Đăng ký</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/user/login"><i class="fas fa-sign-in-alt"></i>Đăng nhập</router-link>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li>
                                            <div class="dropdown">
                                                <div class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                                    <a class="user-image">
                                                        <img v-if="$store.state.user.image" data-type="user-media-image" class="img-responsive"
                                                            :src="domain + '/' + $store.state.user.image" :alt="$store.state.user.fullname">
                                                        <img v-else data-type="user-media-image" class="img-responsive"
                                                            :src="theme_uri  +'static/images/user/user.png'" :alt="$store.state.user.fullname">
                                                    </a>
                                                    <span class="user-name" data-type="user-name">
                                                        <i v-if="$store.state.user.fullname">{{$store.state.user.fullname}}</i>
                                                        <i v-else>{{$store.state.user.email}}</i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu">
                                                    <li>
                                                        <router-link to="/dashboard">
                                                            <i class="fas fa-user"></i>
                                                            <span>Thông tin cá nhân</span>
                                                        </router-link>
                                                    </li>
                                                    <li>
                                                        <router-link to="/dashboard/orders">
                                                            <i class="far fa-list-alt"></i>
                                                            <span>Lịch sử mua hàng</span>
                                                        </router-link>
                                                    </li>
                                                    <li>
                                                        <router-link to="/dashboard/change-password">
                                                            <i class="fas fa-key"></i>
                                                            <span>Đổi mật khẩu</span>
                                                        </router-link>
                                                    </li>
                                                    <li>
                                                        <a @click.stop.prevent="$store.commit('logout', ()=>{$router.push('/')})" href="#">
                                                            <i class="fas fa-sign-out-alt"></i>
                                                            <span>Đăng xuất</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="header-top-center" id="header-search-box" v-if="header_search_category && header_search_category.allow_show == true">
                                <div class="header-search">
                                    <form class="form-search">
                                        <div class="search-nav-left" >
                                            <!-- <span class="category-selected" v-if="categories_is_product" 
                                                selected :value="categories_is_product.alias">
                                                Tất cả mục lục
                                            </span> -->
                                            <select v-model="search_category" name="category" data-type="select" data-target="#search-selected-value">
                                                <option v-if="categories_is_product" selected :value="categories_is_product.alias">Tất cả danh mục</option>
                                                <template v-if="header_search_category">
                                                    <option v-for="(item,index) in header_search_category.data" :value="item.Alias" :key="index">{{item.name}}</option>
                                                </template>
                                            </select>
                                        </div>
                                        <div class="search-nav-right">
                                            <button @click.stop.prevent="changeRouterSearch()" class="btn btn-default"><i class="fa fa-search"></i></button>
                                        </div>
                                        <div class="search-nav-center">
                                            <div class="search-keyword-field">
                                                <input type="text" placeholder="Tìm kiếm ..." v-model="keyword_search" @keyup.enter.stop="changeRouterSearch()" >
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="header-navbar">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <button class="navbar-toggle" id="btn-toggle">
                                <span></span>
                            </button>
                            <div class="header-logo">
                                <router-link to="/" title="">
                                    <img  v-if="logo && logo.data && logo.data.path" :alt="logo.data.info?logo.data.info.title:''"
                                        :src="domain + '/' + logo.data.path" :title="logo.data.info?logo.data.info.title:''"> 
                                </router-link>
                            </div>
                            <div class="header-menu">
                                <nav class="menu" id="menu">
                                    <ul class="btn-groups">
                                        <li class="hidden-md hidden-lg">
                                            <a href="#" id="btn-search-toggle">
                                                <i class="fa fa-search"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/favorite">
                                                <i class="far fa-heart"></i>
                                                <span data-type="cart-counter" class="badge number-product">
                                                    {{ $store.state.favorite_products ? Object.keys($store.state.favorite_products).length : 0 }}
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/cart" id="btn-show-cart">
                                                <i class="fas fa-shopping-basket"></i>
                                                <span data-type="cart-counter" class="badge number-product">
                                                    {{ $store.state.carts? Object.keys($store.state.carts).length : 0 | money }}
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                    
                                    <ul class="menubar" v-if="menu">
                                        <li class="hidden-md hidden-lg item-top-menu">
                                            <router-link to="/user/register"><i class="fas fa-user-plus"></i>Đăng ký</router-link>
                                        </li>
                                        <li class="hidden-md hidden-lg item-top-menu">
                                            <router-link to="/user/login"><i class="fas fa-sign-in-alt"></i>Đăng nhập</router-link>
                                        </li>
                                        <li v-for="(item, index) in menu.data" :key="index" class="has-submenu">
                                            <template v-if="item.alias == '/'">
                                                <router-link :to="alias(item.alias)">
                                                    <span>{{item.name}}</span>&nbsp;
                                                    <i v-if="item.children" class="icon-first-submenu"></i>
                                                </router-link>
                                            </template>
                                            <template v-else>
                                                <router-link :to="'/'+alias(item.alias)">
                                                    <span>{{item.name}}</span>&nbsp;
                                                    <i v-if="item.children" class="icon-first-submenu"></i>
                                                </router-link>
                                            </template>
                                            <ul v-if="item.children && item.children.length" class="submenu">
                                                <li v-for="(child, child_index) in item.children"
                                                    :key="child_index"
                                                    :class="{'has-second-submenu' : child.children && child.children.length }">
                                                    <router-link :to="'/'+alias(child.alias)">
                                                        <span>{{ child.name }}</span>
                                                        <i v-if="child.children && child.children.length"  class="icon-second-submenu"></i>
                                                    </router-link>
                                                    <ul v-if="child.children && child.children.length" class="second-submenu">
                                                        <li  v-for="(sub_child, sub_child_index) in child.children" :key="sub_child_index">
                                                            <router-link :to="alias(sub_child.alias)">
                                                                <span>{{ sub_child.name }}</span>
                                                            </router-link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<style>
    .dropdown.open .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: none;
        top: 40px;
    }
    .header-top .btn-groups > ul > li .dropdown {
        padding: 8px 0;
    }
    
</style>

<script>
    import Product from '@/components/product/product-category';
    export default {
        data(){
            return {
                keyword_search:'',
                select_menu:'product',
                product_category:{},
                post_category:{},
                search_category:"",
            };
        },
        components : {
            Product
        },
        props : ['source'],
        computed: {
            menu(){
                if( this.$store.state.default_data && this.$store.state.default_data.hasOwnProperty('menu_header')){
                    if(this.$store.state.default_data.menu_header.data && this.$store.state.default_data.menu_header.data.length){
                        this.$store.state.default_data.menu_header.data.forEach((item)=>{
                            if(item.name === 'sản phẩm'){
                                this.product_category =  item
                            }
                            if(item.name === 'Tin tuc' || item.name === 'Tin tức'){
                                this.post_category =  item
                            }
                        })
                    }
                }
                return this.$store.state.default_data ? this.$store.state.default_data.menu_header : null
            },
            hotline(){
                return this.$store.state.default_data ? this.$store.state.default_data.header_text : null
            },
            logo(){
                return this.$store.state.default_data ? this.$store.state.default_data.logo : null
            },
            categories_is_product(){
                this.search_category = this.$store.state.default_data && this.$store.state.default_data.categories_is_product ? this.$store.state.default_data.categories_is_product.alias:'';
                return this.$store.state.default_data  ? this.$store.state.default_data.categories_is_product : null
            },
            header_search_category(){
                return this.$store.state.default_data ? this.$store.state.default_data.header_search_category : null;
            },
            demo_mode(){
                 return this.$store.state.default_data.demo_mode ? this.$store.state.default_data.demo_mode.allow_show : false
            }
        },
        mounted(){
           
            var open = false;
            $('#btn-toggle').on('click', function () {
                if (open) {
                    $('#menu').removeClass('open');
                    $('#btn-toggle').removeClass('active');
                    $('body').removeClass('menu-open');
                } else {
                    $('#menu').addClass('open');
                    $('#btn-toggle').addClass('active');
                    $('body').addClass('menu-open');
                }
                open = !open;
            });
            $('body, html').on('click', function (event) {
                var target = $(event.target);
                if (!target.is('#menu .menubar, #menu .menubar * ,#btn-toggle ,#btn-toggle *')) {
                    $('#menu').removeClass('open');
                    $('#btn-toggle').removeClass('active');
                    $('body').removeClass('menu-open');
                    open = false;
                }
                if (!target.is('#cart , #cart * ,#btn-show-cart , #btn-show-cart * ')) {
                    $('#cart').removeClass('active');
                    $('body').removeClass('open-cart');
                }
                if (!target.is('#header-search-box , #header-search-box * , #btn-search-toggle , #btn-search-toggle * ')) {
                    $('#header-search-box').removeClass('active');
                }
                if (!target.is('#section-sidebar , #section-sidebar * ,[data-type="toggle-sidebar"] , [data-type="toggle-sidebar"] *')) {
                    $('.main').removeClass('sidebar-open');
                }
            });
            $('#menu .has-submenu .icon-first-submenu').on('click', function (event) {
                event.preventDefault();
                var parent = $(this).parents('.has-submenu');
                $('#menu .has-submenu').not(parent).removeClass('open').find('.submenu').slideUp()
                $('#menu .has-submenu').not(parent).find('.has-second-submenu').removeClass('open');
                $('#menu .has-submenu').not(parent).find('.second-submenu').slideUp();
                parent.toggleClass('open').find('.submenu').slideToggle();
            });
            $('#menu .has-second-submenu .icon-second-submenu').on('click', function (event) {
                event.preventDefault();
                var parent = $(this).parents('.has-second-submenu');
                $('#menu .has-second-submenu').not(parent).removeClass('open').find('.second-submenu').slideUp();
                parent.toggleClass('open').find('.second-submenu').slideToggle();
            });
            $(window).on('load resize', function(){
                $('.wrapper').css('min-height' , $(window).height() - $('.header').outerHeight() - $('.footer').outerHeight());
            });
            $('[data-toggle="slide"]').on('click', function(event){
                var el = $(this);
                var target  = $(this).data('target');
                var parent = $(this).parent();
                if( parent.hasClass('open')){
                    $(target).slideUp(function(){
                        parent.removeClass('open');
                    })
                }else{
                    $(target).slideDown(function(){
                        parent.addClass('open');
                    })
                }
            });
            $('[data-type="toggle-sidebar"]').on('click', function(event){
                event.preventDefault();
                $('.main').toggleClass('sidebar-open');
            })
            $('[data-type="select"]').each(function(index,el){
                var el = $(el);
                var target = $( el.data('target') );
                var text  = $(el).find(":selected").text();
                    target.text(text);
                el.on('change', function(){
                    var value = this.value;
                    var text  = $(this).find(":selected").text();
                    target.text(text);
                })
            });
            $('#btn-search-toggle').on('click', function(event){
                event.preventDefault();
                if( $('#header-search-box').hasClass('active') ){
                    $('#header-search-box').removeClass('active');
                }else{
                    $('#header-search-box').addClass('active');
                    setTimeout(function() {
                        $('#header-search-box input').select();
                    }, 500);
                }
            });
            $('[data-type="view-type"] a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                var mode = $(event.target).data('mode');
                $.post("/ajax-general-data", {type : 'update-list-view' , view_type: mode}, function (res) {console.log(res)});
            });
            var body = $('body')
            if(this.$route.query.hasOwnProperty('key_search')){
                this.key_search = this.$route.query.key_search;
            }
            if(this.$route.query.hasOwnProperty('type')){
                this.select_menu = this.$route.query.type
            }
             
        },
        updated(){
            var open = false;
            $('#btn-toggle').on('click', function () {
                if (open) {
                    $('#menu').removeClass('open');
                    $('#btn-toggle').removeClass('active');
                    $('body').removeClass('menu-open');
                } else {
                    $('#menu').addClass('open');
                    $('#btn-toggle').addClass('active');
                    $('body').addClass('menu-open');
                }
                open = !open;
            });
            $('body, html').on('click', function (event) {
                var target = $(event.target);
                if (!target.is('#menu .menubar, #menu .menubar * ,#btn-toggle ,#btn-toggle *')) {
                    $('#menu').removeClass('open');
                    $('#btn-toggle').removeClass('active');
                    $('body').removeClass('menu-open');
                    open = false;
                }
                if (!target.is('#cart , #cart * ,#btn-show-cart , #btn-show-cart * ')) {
                    $('#cart').removeClass('active');
                    $('body').removeClass('open-cart');
                }
                if (!target.is('#header-search-box , #header-search-box * , #btn-search-toggle , #btn-search-toggle * ')) {
                    $('#header-search-box').removeClass('active');
                }
                if (!target.is('#section-sidebar , #section-sidebar * ,[data-type="toggle-sidebar"] , [data-type="toggle-sidebar"] *')) {
                    $('.main').removeClass('sidebar-open');
                }
            });
            $('#menu .has-submenu .icon-first-submenu').unbind('click').bind('click', function (event) {
                event.preventDefault();
                var parent = $(this).parents('.has-submenu');
                $('#menu .has-submenu').not(parent).removeClass('open').find('.submenu').slideUp()
                $('#menu .has-submenu').not(parent).find('.has-second-submenu').removeClass('open');
                $('#menu .has-submenu').not(parent).find('.second-submenu').slideUp();
                parent.toggleClass('open').find('.submenu').slideToggle();
            });
            $('#menu .has-second-submenu .icon-second-submenu').unbind('click').bind('click', function (event) {
                event.preventDefault();
                var parent = $(this).parents('.has-second-submenu');
                $('#menu .has-second-submenu').not(parent).removeClass('open').find('.second-submenu').slideUp();
                parent.toggleClass('open').find('.second-submenu').slideToggle();
            });
            $(window).on('load resize', function(){
                // $('#menu .has-submenu').each(function(index, el){
                //     var parent = $(el);
                //     var submenu = parent.find('.submenu');
                //     if( parent.offset().left  + submenu.width() > $(window).width() ){
                //         submenu.addClass('show-on-left');
                //     } else {
                //         submenu.removeClass('show-on-left');
                //     }
                // });
                // $('#menu .has-second-submenu').each(function(index, el){
                //     var parent = $(el);
                //     var submenu = parent.find('.second-submenu');
                //     if( parent.offset().left + parent.width() + submenu.width() > $(window).width() ){
                //         submenu.addClass('show-on-left');
                //     } else {
                //         submenu.removeClass('show-on-left');
                //     }
                // });
                $('.wrapper').css('min-height' , $(window).height() - $('.header').outerHeight() - $('.footer').outerHeight());
            });
            $('[data-toggle="slide"]').on('click', function(event){
                var el = $(this);
                var target  = $(this).data('target');
                var parent = $(this).parent();
                if( parent.hasClass('open')){
                    $(target).slideUp(function(){
                        parent.removeClass('open');
                    })
                }else{
                    $(target).slideDown(function(){
                        parent.addClass('open');
                    })
                }
            });
            $('[data-type="toggle-sidebar"]').on('click', function(event){
                event.preventDefault();
                $('.main').toggleClass('sidebar-open');
            })
            $('[data-type="select"]').each(function(index,el){
                var el = $(el);
                var target = $( el.data('target') );
                var text  = $(el).find(":selected").text();
                    target.text(text);
                el.on('change', function(){
                    var value = this.value;
                    var text  = $(this).find(":selected").text();
                    target.text(text);
                })
            });
            $('#btn-search-toggle').unbind('click').bind('click', function(event){
                event.preventDefault();
                if( $('#header-search-box').hasClass('active') ){
                    $('#header-search-box').removeClass('active');
                }else{
                    $('#header-search-box').addClass('active');
                    setTimeout(function() {
                        $('#header-search-box input').select();
                    }, 500);
                }
            });
            $('[data-type="view-type"] a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
                var mode = $(event.target).data('mode');
                $.post("/ajax-general-data", {type : 'update-list-view' , view_type: mode}, function (res) {console.log(res)});
            });
            var body = $('body')
        },
        methods:{
            search(){ 
                if(this.select_menu == 'product'){
                    this.$router.push({ path: '/search', query: { type:'product',keyword_search: this.keyword_search}})
                }else{
                   this.$router.push({ path: '/search', query: { type:'post',keyword_search: this.keyword_search }}) 
                }
            },
            changeSearch(key){
                this.$store.state.search_type = key
                this.select_menu = key
                this.$forceUpdate()
            },
            changeRouterSearch(){
                      
                if(this.header_search_category && this.header_search_category.data.length > 0){
           
                    if(this.keyword_search != ''){
                       
                        this.$router.push({ path: '/'+this.search_category, query: { keyword_search: this.keyword_search}});
                    }
                    
                }
               $('#search-box').removeClass('open')
            },
        },
        watch:{
            '$route.path' : function(){
                
                if( this.categories_is_product &&  this.categories_is_product.hasOwnProperty('alias')){


                    if(this.search_category == ''){
                       
                         this.search_category = this.categories_is_product.alias;
                         alert(this.search_category)
                    }
                   
                }
                if(!this.$route.query.hasOwnProperty('keyword_search')){
                    this.$store.state.search = ''
                    this.$store.state.search_type = ''
                    this.keyword_search = ''
                    
                } 
            }
        },
    }
</script>

