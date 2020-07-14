<template>
    <div>
        <section class="wrapper">
            <template  v-if="source.append && source.append.product_breadcrumb && source.append.product_breadcrumb.allow_show == true">
                <div v-if="source.append && source.append.product_breadcrumb && source.append.product_breadcrumb.info == 'image'" class="section section-breadcrumb" 
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + source.append.product_breadcrumb.data.background_image.path+')'}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.product_page_title ? source.append.product_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.product_page_title ? source.append.product_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="source.append.product_breadcrumb && source.append.product_breadcrumb.info == 'color' " class="section-breadcrumb" 
                    v-bind:style="{'background-color':source.append.product_breadcrumb.data.background_color}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.product_page_title ? source.append.product_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.product_page_title ? source.append.product_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <section class="section section-list-products" data-category="" data-current-page="1" data-total-page="4" id="list-products">
                <form class="container" id="product_form_filter">
                    <div class="row">
                        <div class="col-xs-12 col-sm-4 col-md-3 section-sidebar" id="section-sidebar">
                            <div class="sidebar-filter"  v-if="sidebar_category && sidebar_category.allow_show == true"> 
                                <div class="sidebar-title">
                                    {{ sidebar_category.title }}
                                </div>
                                <ul class="list-group" v-if="sidebar_category.data == ''">
                                    <li class="list-group-item">
                                        <a href="#">danh mục rỗng !!!</a>
                                    </li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item" :class="{ 'has-child' : item.children && item.children.length }"
                                            v-for="(item, index) in sidebar_category.data" :key="index">
                                        <a  v-if=" item.children && item.children.length" :href="'#'+item._id+index" data-toggle="sidebar">
                                            {{ item.name }}
                                        </a>
                                        <a  v-else @click="loadFilter(item)">
                                            {{ item.name }}
                                        </a>
                                        <ul  v-if="item.children && item.children.length" :id="item._id+index" class="list-group list-group-child">
                                            <li v-for="(sub_item, sub_index) in item.children" :key="sub_index" class="list-group-item ">
                                                <a @click="loadFilter(sub_item)">{{sub_item.name }}</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="sidebar_property && sidebar_property.allow_show == true" class="sidebar-filter">
                                <template v-for="(item, index) in sidebar_property.data" class="sidebar-filter">
                                    <template v-if="item.children && item.children.length" class="sidebar-filter">
                                        <div class="sidebar-title">
                                           {{ item.name }}
                                        </div>
                                        <ul class="list-group" >
                                            <li v-for="(sub, sub_index) in item.children" :key="sub_index"  class="list-group-item ">
                                                <label >
                                                    <input class="filter_properties product_filter" data-type="category-page-filter"
                                                        name="property[]" v-model="filter_category" type="checkbox" :value="sub._id">
                                                    {{ sub.name }}
                                                </label>
                                            </li>                                             
                                        </ul>
                                    </template>    
                                </template>
                            </div>
                            <div class="sidebar-filter" v-if="sidebar_price && sidebar_price.allow_show == true">
                                <div class="sidebar-title">
                                    {{sidebar_price.title}}
                                </div>
                                <ul class="list-group">
                                    <li v-if="sidebar_price.all" class="list-group-item ">
                                        <label class="checkbox">
                                            <input v-model="radio_price" class="filter_properties product_filter" data-type="category-page-filter"
                                                name="price" type="radio" value="all">{{ sidebar_price.all }}
                                        </label>
                                    </li>
                                    <li v-for="(price, price_index) in sidebar_price.data" class="list-group-item " :key="price_index">
                                        <label class="checkbox">
                                            <input v-model="radio_price" :data-min="price.min" :data-max="price.max" 
                                                class="filter_properties product_filter" data-type="category-page-filter"
                                                name="price" type="radio" :value="price">{{ price.name }}
                                        </label>
                                    </li>         
                                </ul>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-8 col-md-9  section-content" id="section-content">
                            <div class="list-products">
                                <div class="list-products-header">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-sm-push-6">
                                            <div class="list-btn-groups">
                                                <a href="#" class="btn btn-warning btn-sidebar-toggle hidden-md hidden-sm hidden-lg"
                                                    data-type="toggle-sidebar">
                                                    <i class="fas fa-arrow-alt-circle-right"></i>Bộ lọc sản phẩm
                                                </a>
                                                <ul class="nav nav-pills" data-type="view-type">
                                                    <li class="active">
                                                        <a href="#list-product-thumb" data-toggle="tab" data-mode="grid">
                                                            <i class="fas fa-th"></i>
                                                        </a>
                                                    </li>
                                                    <li class="">
                                                        <a href="#list-product-list" data-toggle="tab" data-mode="list">
                                                            <i class="fas fa-list"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div class="dropdown" v-if="product_sort && product_sort.allow_show == true">
                                                    <select data-type="category-page-filter" type="select"  v-model="sort_by"
                                                        class="btn product_filter">
                                                            <option v-for="(item,index) in product_sort.info" :key="index" :value="item._id">{{item.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-pull-6">
                                            <div class="list-title" data-type="list-title" v-if="products.data.length > 0">
                                                <span>Hiển thị từ 1 đến {{products.data.length}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-products-body" id="list-product-category" data-type="list-products" style="height: auto; display: block;">
                                    <div class="tab-content" id="item-product-load" v-if="products && products.data && products.data.length >0">
                                        <div class="tab-pane fade  in active " id="list-product-thumb">
                                            <div class="row row-flex">
                                                <div v-for="(item, index) in products.data" :key="index" class="col-xs-6 col-sm-6 col-md-4 col-flex " data-type="item-product-thumb">
                                                    <div class="item-product-thumb   fadeInUp">
                                                        <div class="product-inner">
                                                            <router-link class="product-image" :to="alias(item.Alias)">
                                                                <img :src="$store.state.domain + '/' + item.Image.path"
                                                                    alt="Quần Jeans">
                                                                <div class="product-btn-groups">
                                                                    <button @click.stop.prevent="$store.commit('showQuickView', item)" class="btn-add-item-to-cart"></button>
                                                                    <button @click.stop.prevent="$store.commit('toggleFavorite', item)"
                                                                        class="">
                                                                        <i style="line-height: 50px;"
                                                                            :class="{ 'text-danger ' : inFavorite($store,item._id) }" class="fa fa-heart"></i>
                                                                    </button>
                                                                </div>
                                                            </router-link>
                                                            <div class="product-content">
                                                                <router-link itemprop="url" :to="alias(item.Alias)"
                                                                            :title="item.name" class="product-title">
                                                                    <span itemprop="name" style="font-weight: 600;">{{item.name}}</span>
                                                                </router-link>
                                                                <p v-line-clamp:20="2" style="font-size: 14px;">{{item.description}}</p>
                                                                <div class="product-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                                                                    <span itemprop="priceCurrency" content="VND"></span>
                                                                    <span itemprop="price" :content="item.price_sale_web"
                                                                        class="product-price-new">
                                                                            <span v-if="item.price_promotion_web&&item.price_promotion_web >0">{{item.price_promotion_web | money}} đ</span>
                                                                            <span v-else>{{getWebPrice(item)  | money}} đ</span>
                                                                    </span>
                                                                    <span v-if="item.price_promotion_web&&item.price_promotion_web >0" :itemprop="item.price_promotion_web" :content="item.price_promotion_web" class="product-price-old">
                                                                        {{getWebPrice(item)  | money}} đ
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade " id="list-product-list">
                                            <div class="row row-flex">
                                                <div class="col-xs-12 col-flex" v-for="(item, index) in products.data" :key="index">
                                                    <div class="item-product-list ">
                                                        <div class="product-inner">
                                                            <div class="product-image">
                                                                <router-link :to="alias(item.Alias)">
                                                                    <img :src="$store.state.domain + '/' + item.Image.path" >
                                                                </router-link>
                                                            </div>
                                                            <div class="product-content">
                                                                <router-link itemprop="url" :to="alias(item.Alias)"
                                                                            :title="item.name" class="product-title">
                                                                    <span itemprop="name">{{item.name}}</span>
                                                                </router-link>
                                                                <p v-line-clamp:20="2" style="font-size: 14px;">{{item.description}}</p>
                                                                <div class="product-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                                                                    <span itemprop="priceCurrency" content="VND"></span>
                                                                    <span itemprop="price" :content="item.price_sale_web"
                                                                        class="product-price-new">
                                                                            <span v-if="item.price_promotion_web&&item.price_promotion_web >0">{{item.price_promotion_web | money}} đ</span>
                                                                            <span v-else>{{getWebPrice(item)  | money}} đ</span>
                                                                    </span>
                                                                    <span v-if="item.price_promotion_web&&item.price_promotion_web >0" :itemprop="item.price_promotion_web" :content="item.price_promotion_web" class="product-price-old">
                                                                        {{getWebPrice(item)  | money}} đ
                                                                    </span>
                                                                </div>
                                                                <div class="product-btn-groups">
                                                                    <button @click.stop.prevent="$store.commit('showQuickView', item)"  class="btn btn-add-item-to-cart"><i
                                                                            class="fas fa-shopping-basket"></i> <span>Thêm vào giỏ
                                                                            hàng</span></button>
                                                                    <button @click.stop.prevent="$store.commit('toggleFavorite', item)"
                                                                        class="btn btn-add-item-to-wishlist">
                                                                        <i :class="{ 'text-danger ' : inFavorite($store,item._id) }"
                                                                            class="fas fa-heart"></i>
                                                                            <span v-if="!inFavorite($store,item._id)">Thêm vào yêu thích</span>
                                                                            <span v-else>Bỏ yêu thích</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-products-body text-center" v-if="products && products.data && products.data.length <= 0">
                                    <h2>Sản phẩm đang rỗng !!</h2>
                                </div>
                                <div class="list-products-footer">
                                    <div class="text-center">
                                        <nav class=" sm-text-center" >
                                            <pagi :current="products.current_page"
                                                v-model="products.current_page"
                                                :total="products.last_page">
                                            </pagi>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    </div>
</template>
<script>
    import Pagi from '@/components/paginate'
    export default {
        props : ['source'],
        components: {Pagi},
        data(){
            return {
                title : '',
                tab:'grid',
                filter_category:[],
                current_category_id:'',
                sort_by:'latest',
                radio_price:'all',
                current_url:'',
                keyword:'',
                products : {
                    data : [],
                    current_page : 1,
                    last_page : 0,
                    total : 0,
                    per_page : 0
                }
            }
        },
        computed:{
            sidebar_category(){
                if(this.source&&this.source.append&&this.source.append.hasOwnProperty('sidebar_category')){
                     return this.source && this.source.append.sidebar_category ? this.source.append.sidebar_category : null 
                } 
            },
            sidebar_price(){
                return this.source && this.source.append &&this.source.append.sidebar_price ? this.source.append.sidebar_price : null 
            },
            sidebar_property(){
                return this.source && this.source.append.sidebar_property ? this.source.append.sidebar_property : null
            },
            product_sort(){
                this.sort_by = this.source && this.source.append && this.source.append.product_sort ? this.source.append.product_sort.data : 'latest' ;
                return this.source && this.source.append && this.source.append.product_sort ? this.source.append.product_sort : null 
            },
            product_view(){
                if(this.source && this.source.append && this.source.append.product_view){

                    if(this.source.append.product_view.data == 'list'){

                         this.changTab('list');
                    }else{

                         this.changTab('grid');
                    }
                   
                }
                return this.source && this.source.append && this.source.append.product_view ? this.source.append.product_view : null 
            }
        },
        mounted(){
            if(this.$route.hasOwnProperty('query')){

                if(this.$route.query.hasOwnProperty('keyword_search')){

                    this.keyword = this.$route.query.keyword_search;
                    this.loadFilter({});
                }
            }
              
            if( this.source &&this.source.append&& this.source.append.products ){

                this.products = this.source.append.products;
            }
          
            if( this.keyword != ''){
               
                this.loadFilter();
            }
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
            $('[data-type="toggle-sidebar"]').on('click', function(event){
                // alert('123')
                event.preventDefault();
                $('.main').toggleClass('sidebar-open');
            })
        },
        updated(){
            $('[data-type="toggle-sidebar"]').on('click', function(){
                $('.sidebar-product').addClass('sidebar-product-open');
            })
            $('.btn-del').on('click',function(){
                $('.sidebar-product').removeClass('sidebar-product-open');
            })  
        },
        methods:{
            loadFilter(item){
                var _this = this;
                var api_link = this.$store.state.api+'page-data/filter-product';
                if(item){

                     if(item.hasOwnProperty('_id')){
                        
                        this.current_category_id = item._id;
                     }
                }
                var send_data = {
                    checkboxs:this.filter_category,
                    sort_by:this.sort_by,
                    radio_price:this.radio_price,
                    page:this.products.current_page,
                    keyword:this.keyword,
                    category_id:this.current_category_id
                };
                if(item){
                     if(item.hasOwnProperty('_id')){

                         send_data.category_id = item._id;
                     }
                }else{
                      if(this.source&&this.source.alias_data&&this.source.alias_data.hasOwnProperty('type') && this.source.alias_data.type == "product_category"){
                    
                        send_data.category_id = this.source.alias_data.object_id;

                     }
                }
                 
                 var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain : this.$store.state.domain
                };
                this.callAPI( 'page-data/filter-product','post',send_data, headers)
                .then((res)=>{
           
                    if(res.data.success){
                           
                        _this.products = res.data.data;
                        console.log(_this.products)
                      
                    }
                })

            }
        },
        watch:{
            'filter_category':function(new_val){
              
               this.loadFilter();
            },
            'radio_price':function(new_val){
                this.loadFilter();
            },
            'sort_by':function(){
                
                this.loadFilter();
            },
            'products.current_page':function(){
                 this.loadFilter();
            },
            '$route.query.keyword_search':function(new_val){

                this.keyword = new_val;
                this.loadFilter({});
            }           
        }
    }
</script>
