<template>
    <div>
        <section class="wrapper">
            <template v-if="aliasData.alias_appends.product_detail_breadcrumb && aliasData.alias_appends.product_detail_breadcrumb.allow_show">
                <div v-if="aliasData.alias_appends.product_detail_breadcrumb && aliasData.alias_appends.product_detail_breadcrumb.info == 'image'" class="section-breadcrumb" 
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + aliasData.alias_appends.product_detail_breadcrumb.data.background_image.path+')'}">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li> <router-link to="/">Trang chủ</router-link></li>
                            <li><a href="#">{{source.name}}</a></li>
                        </ol>
                    </div>
                </div>
                <div v-if="aliasData.alias_appends.product_detail_breadcrumb && aliasData.alias_appends.product_detail_breadcrumb.info == 'color'" class="section-breadcrumb" 
                    v-bind:style="{'background-color':aliasData.alias_appends.product_detail_breadcrumb.data.background_color}">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><router-link to="/">Trang chủ</router-link></li>
                            <li><a href="#">{{source.name}}</a></li>
                        
                        </ol>
                    </div>
                </div>
            </template>
            <section class="section section-product-detail">
                <div class="container section-product-detail-container" itemscope="" itemtype="http://schema.org/Product">
                    <div class="row product-detail-header" id="vue-product-detail">
                        <div class="col-xs-12 col-sm-5 col-md-4">
                            <div class="product-media">
                                <template v-if="source.current_variant">
                                    <div class="big-thumb-slider" id="big-thumb-slider">
                                        <template v-if="(source.Image || source.current_variant.Image) && (source.current_variant.Albums.length <= 0)">
                                            <a class="item"
                                            v-if="source.current_variant.Image"
                                                data-fancybox="gallery"
                                            :href="domain + '/' + source.current_variant.Image.path">
                                                <img    class="img-responsive"
                                                        :src="domain + '/' + source.current_variant.Image.path"
                                                        :alt="source.current_variant.VariantName">
                                            </a>
                                            <a class="item" v-else data-fancybox="gallery" :href="domain + '/' + source.Image.path">
                                                <img    class="img-responsive"
                                                        :src="domain + '/' + source.Image.path"
                                                        :alt="source.current_variant.VariantName">
                                            </a>
                                        </template>

                                        <template v-if="source.current_variant.Albums && source.current_variant.Albums.length > 0">
                                            <template v-for="(album, album_index) in source.current_variant.Albums">
                                                <a class="item" v-if="album.path" data-fancybox="gallery"
                                                :href="domain + '/' + album.path" :key="album_index">
                                                    <img    class="img-responsive"
                                                            :src="domain + '/' + album.path"
                                                            :alt="source.current_variant.VariantName + '_' + album_index">
                                                </a>
                                            </template>

                                        </template>
                                    </div>
                                    <div class="list-thumb-slider" id="list-thumb-slider">
                                        <template v-if="source.current_variant.Albums">
                                            <div v-for="(album, album_index) in source.current_variant.Albums"
                                                v-if="album.path" :key="album_index">
                                                <div class="item" :style="{'background-image': 'url(' + domain + '/' + album.path + ')'}">
                                                    <img  :src="theme_uri + 'static/images/icons/grid.png'" alt="">
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                                <!-- none variant -->
                                <template v-else>
                                    <div id="big-thumb-slider" class="big-thumb-slider">
                                        <template v-if="(source.Image && source.Image.path) || (source.Albums && source.Albums.length)">
                                            <a v-show="source.Image" class="item" data-fancybox="gallery" :href="domain + '/' + source.Image.path" >
                                                <img  class="img-responsive"
                                                    :src="domain + '/' + source.Image.path" 
                                                    :alt="source.name">
                                            </a>
                                            <template v-if="source.Albums">
                                                <template v-for="(album, album_index) in source.Albums">
                                                    <a class="item" v-if="album.path" data-fancybox="gallery"  :href="domain + '/' + album.path">
                                                        <img  class="img-responsive"
                                                            :src="domain + '/' + album.path" 
                                                            :alt="source.name + '_' + album_index">
                                                    </a>
                                                </template>
                                            </template>
                                        </template>
                                    </div>
                                    <div class="list-thumb-slider" id="list-thumb-slider">
                                        <div v-if="source.Image "  :href="domain + '/' + source.Image.path">
                                            <!-- <img    :src="domain + '/' + source.Image.path" :alt="source.name"> -->
                                            <div class="item" :style="{'background-image': 'url(' + domain + '/' + source.Image.path + ')'}">
                                                <img  :src="theme_uri + 'static/images/icons/grid.png'" >
                                            </div>
                                        </div>
                                        <template v-if="source.Albums  && source.Albums.length">
                                            <div v-for="(album, album_index) in source.Albums" v-if="album.path" :key="album_index">
                                                <div class="item" :style="{'background-image': 'url(' + domain + '/' + album.path + ')'}">
                                                    <img  :src="theme_uri + 'static/images/icons/grid.png'" >
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-7 col-md-8">
                            <div class="product-properties">
                                <div class="product-name">
                                    <h1 itemprop="name">
                                        {{source.name}}
                                    </h1>
                                     <p v-if="source.current_variant">
                                        <strong>Đang chọn:</strong>
                                        <span class="mg-left-5 text-success">{{ source.current_variant.VariantName }}</span>
                                    </p>
                                </div>
                                <div class="product-price">
                                    <span itemprop="priceCurrency" content="VND"></span>
                                    <template v-if="source.current_variant">
                                        <template v-if="source.current_variant.price_promotion_web && isPrice(source.current_variant.price_promotion_web)">
                                                <div class="product-price-new " itemprop="offers"
                                                    :content="source.current_variant.price_promotion_web">
                                                    {{ source.current_variant.price_promotion_web | money }}đ
                                                </div>
                                                <div class="product-price-old " itemprop="price"
                                                    :content="source.current_variant.price_sale_web ? source.current_variant.price_sale_web : 0">
                                                    {{ source.current_variant.price_sale_web ?
                                                    source.current_variant.price_sale_web : 0 | money }}đ
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="product-price-new " itemprop="price"
                                                    :content="source.current_variant.price_sale_web">
                                                    {{ source.current_variant.price_sale_web | money }}đ
                                                </div>
                                            </template>
                                        </template>
                                        <template v-else>
                                        <template v-if="source.children && source.children.length > 0">
                                    
                                            
                                                    <div class="product-price-new " itemprop="price"
                                                        :content="source.price_sale_web">
                                                        {{ source.price_sale_web | money }}đ
                                                    </div>
                                            
                                        </template>
                                        <template v-else>
                                            <template
                                                    v-if="source.price_promotion_web && isPrice(source.price_promotion_web)">
                                                <div class="product-price-new " itemprop="offers"
                                                    :content="source.price_promotion_web">
                                                    {{ source.price_promotion_web | money }}đ
                                                </div>
                                                <div class="product-price-old " itemprop="price"
                                                    :content="source.price_sale_web ? source.price_sale_web : 0">
                                                    {{ source.price_sale_web ?
                                                    source.price_sale_web : 0 | money }}đ
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="product-price-new " itemprop="price"
                                                    :content="source.price_sale_web">
                                                    {{ source.price_sale_web | money }}đ
                                                </div>
                                            </template>
                                        </template>
                                    </template>
                                </div>
                                <div class="product-description" itemprop="description" v-html="source.description"></div>
                                <div class="product-state">
                                    <p>
                                        <span class="product-state-title">Tình trạng : </span>
                                        <span v-if="source.available_quantity && source.available_quantity > 0">Còn Hàng</span>
                                        <span v-else class="product-state-value">Hết hàng</span>
                                    </p>
                                </div>
                                <template v-if="source.children_variant && source.children_variant.length ">
                                    <div class="product-filter"
                                        v-if="source.properties_info && source.properties_info.length">
                                        <div v-for="(property, property_index) in source.properties_info"
                                            class="item-filter" :key="property_index">
                                            <template v-if="property.childs">
                                                <span class="product-state-title">{{ property.name }} : </span>
                                                <label v-for="(child, key) in property.childs "
                                                    class="product-state-value checkbox" :key="key">
                                                    <input
                                                            @click="switchProperty( child, property )"
                                                            :checked="child.selected"
                                                            :value="child._id"
                                                            type="radio"
                                                            class="variant_checked"
                                                            :name="property._id">
                                                    {{ child.name }}
                                                </label>
                                            </template>

                                        </div>
                                    </div>
                                </template>
                                <div class="product-spinner">
                                    <div class="input-spinner-title">
                                        <span>Số lượng : </span>
                                    </div>
                                    <div class="input-spinner-inner" v-if="source.current_variant">
                                        <div class="input-group" data-type="input-spinner" data-target="#btn_add_to_cart">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" 
                                                    type="button" data-type="input-spinner-btn" 
                                                    @click.stop.prevent="incrementQuantity(source.current_variant, false)"
                                                    data-input-type="false">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                            </span>
                                            <input type="number" class="form-control" v-model="source.current_variant.quantity"
                                                data-type="input-spinner-field" readonly="">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" type="button" data-type="input-spinner-btn" 
                                                    @click.stop.prevent="incrementQuantity(source.current_variant)"
                                                    data-input-type="true">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="input-spinner-inner" v-else>
                                        <div class="input-group" data-type="input-spinner" data-target="#btn_add_to_cart">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" 
                                                    type="button" data-type="input-spinner-btn" 
                                                    @click.stop.prevent="incrementQuantity(source, false)"
                                                    data-input-type="false">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                            </span>
                                            <input type="number" class="form-control" v-model="source.quantity"
                                                data-type="input-spinner-field" readonly="">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" type="button" data-type="input-spinner-btn" 
                                                   @click.stop.prevent="incrementQuantity(source)"
                                                    data-input-type="true">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <small v-if="inCart($store, source._id)" class="text-success">đã thêm : <strong>{{
                                        $store.state.carts[source._id].quantity | money }}</strong> sản phẩm
                                    </small>
                                </div>
                                <div class="product-btn-groups" >
                                    <template v-if="source.current_variant">
                                        <button v-if="source.current_variant"
                                                :disabled="source.current_variant.quantity < 1"
                                                @click.stop.prevent="$store.commit('updateCartQuantity', { product : source.current_variant })"
                                                class="btn btn-add-item-to-cart btn-lg">
                                            <i class="fas fa-shopping-basket"></i>
                                            <span v-if="!inCart($store, source.current_variant._id)">Thêm vào giỏ hàng</span>
                                            <span v-else>Cập nhật giỏ hàng</span>
                                        </button>
                                        <a class="btn btn-add-item-to-wishlist"
                                            @click.stop.prevent="$store.commit('toggleFavorite', source.current_variant)"
                                            data-type="add-to-wishlist">
                                            <i class="fas fa-heart"
                                                :class="{ 'text-danger' : inFavorite($store,source.current_variant._id) }"></i>
                                            <span v-if="!inFavorite($store,source.current_variant._id)">Thêm vào yêu thích</span>
                                            <span v-else>Bỏ yêu thích</span>
                                        </a>
                                    </template>
                                    <template v-else>
                                        <button
                                                :disabled="source.quantity < 1"
                                                @click.stop.prevent="$store.commit('updateCartQuantity', { product : source })"
                                                class="btn btn-add-item-to-cart btn-lg">
                                            <i class="fas fa-shopping-basket"></i>
                                            <span v-if="!inCart($store, source._id)">Thêm vào giỏ hàng</span>
                                            <span v-else>Cập nhật giỏ hàng</span>
                                        </button>
                                        <a class="btn btn-add-item-to-wishlist"
                                            @click.stop.prevent="$store.commit('toggleFavorite', source)"
                                            data-type="add-to-wishlist">
                                            <i class="fas fa-heart"
                                            :class="{ 'text-danger ' : inFavorite($store,source._id) }"></i>
                                            <span v-if="!inFavorite($store,source._id)">Thêm vào yêu thích</span>
                                            <span v-else>Bỏ yêu thích</span>
                                        </a>
                                    </template>
                                </div>
                                <table class="table table-dark" v-if="source && source.children.length > 0" style="margin-top: 10px;">
                                    <thead> 
                                        <tr>
                                            <th style="font-size:16px;border-bottom: 1px solid #ddd" colspan="2" data-count="4" v-if="source.TypeOf && source.TypeOf == 'group'">Sản phẩm nhóm:</th>
                                            <th style="font-size:16px;border-bottom: 1px solid #ddd" colspan="2" data-count="4" v-if="source.TypeOf && source.TypeOf == 'combo'">Khuyến mãi:</th>
                                        </tr>
                                    </thead>
                                    <tbody style="border: 1px solid #ccc;">
                                        <tr v-for="(item,index) in source.children" :key="index" v-if="item && item.product">
                                            <td style="width:30%;">
                                                <img style="margin: auto;width:100px;"  class="img-responsive" :src="domain +'/'+ item.product.Image.path"  title="">
                                            </td>
                                            <td>
                                                <p class="m-0"> <strong> {{item.product.VariantName}}</strong></p>
                                                <span> {{ item.product.price_sale_web | money }}đ</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row product-detail-body">
                        <div class="col-xs-12 product-body">
                            <ul class="nav nav-pills product-nav" role="tablist">
                                <li role="presentation" class="active">
                                    <a href="#tab-product-description" role="tab" data-toggle="tab">Mô tả</a>
                                </li>
                                <li role="presentation" class="">
                                    <a href="#tab-product-infomation" role="tab" data-toggle="tab">Thông tin</a>
                                </li>
                            </ul>
                            <div class="tab-content product-tab-content">
                                <div role="tabpanel" class="tab-pane fade in active" id="tab-product-description">
                                    <div class="page-content" v-html="source.content"></div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="tab-product-infomation">
                                    <div class="page-content" v-html="source.content">
                                        
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row product-detail-footer" id="list-product-relate" v-if="related_products && related_products.allow_show && related_products.data.length">
                        <div class="col-xs-12">
                            <div class="title">
                                <h3>{{ related_products.title }}</h3>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="product-list-related" id="list-related-product-slider">
                                <div v-for="(item, index) in related_products.data" :key="index">
                                    <div class="item">
                                        <div class="item-product-thumb">
                                            <div class="product-inner">
                                                <router-link itemprop="url" class="product-image" :to="alias(item.Alias)">
                                                    <img v-if="item.Image && item.Image.path" 
                                                        itemprop="image" 
                                                        :src="domain + '/' + item.Image.path " 
                                                        :alt="item.name">
                                                    <img v-else 
                                                        itemprop="image" 
                                                        :src="theme_uri + 'static/images/default.png'" 
                                                        :alt="item.name">
                                                    <div class="product-btn-groups">
                                                        <button style="border-radius: 100px!important;"
                                                            @click.stop.prevent="$store.commit('showQuickView', item)"  class="btn btn-add-item-to-cart">
                                                        </button>
                                                        <button style="border-radius: 100px!important;"
                                                            @click.stop.prevent="$store.commit('toggleFavorite', item)" class="btn ">
                                                            <i style="margin-right: 0px;"
                                                                :class="{ 'text-danger ' : inFavorite($store,item._id) }" class="fa fa-heart"></i>
                                                        </button>
                                                    </div>
                                                    <!-- <span v-if="item.current_discounted && item.current_discounted > 0" class="icon-sale">{{ item.current_discounted.toFixed(0) }}%</span> -->
                                                </router-link>
                                                <div class="product-content">
                                                    <router-link itemprop="url" :to="alias(item.Alias)" class="product-title" data-max-line="2">
                                                        {{ item.name }}
                                                    </router-link>
                                                    <div class="product-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                                                        <!-- has propmotion -->
                                                        <template v-if="item.current_price_promotion && item.current_price_promotion > 0">
                                                            <span class="product-price-new" 
                                                                itemprop="lowPrice"
                                                                :content="item.current_price_promotion">
                                                            {{ item.current_price_promotion | money }}đ
                                                            </span>
                                                            <span v-if="item.price_sale_web" 
                                                                class="product-price-old" itemprop="highPrice" 
                                                                :content="item.price_sale_web">
                                                                {{ item.price_sale_web | money }}đ
                                                            </span>
                                                        </template>
                                                        <!-- none promotion -->
                                                        <template v-else>
                                                            <span
                                                                class="product-price-new" 
                                                                itemprop="lowPrice" 
                                                                :content="item.price_sale_web">
                                                                {{ item.price_sale_web | money }}đ
                                                            </span>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        props: ['source', 'aliasData'],   
        data() {
            return {
                current_url:'',
                title : '',
                star:0,
                content_comment:'',
                success: false,
                message: '',
                loading: false,
                loading_more:false,
                id_view_more:'',
                
            }
        },
        created() {
            this.current_url = window.location.href;
            this.mappingSource(this.source);
        },
        mounted() {
            if( this.source.hasOwnProperty('current_variant')){
                if(this.source.current_variant == null ){

                }else{
                    this.source.current_variant.quantity = 1;
                }
                
            }
            this.initUI();
            this.slickImage();
        },
        computed: {
            related_products(){
                var related = (this.aliasData.alias_appends && this.aliasData.alias_appends.related_product) ? this.aliasData.alias_appends.related_product : [];
                related.data.map((item)=>{
                    item.current_price_promotion = this.PromotionPrice(item)
                    item.current_discounted = this.discountPersen(item)
                })
                return related
                
            },
        },
        
        methods: {
            changeLove:function(num){
                
                this.star = num;

            },
            clickLove:function(num){

                this.star = num;
                var _this = this;
                var api_link = this.$store.state.api+'comment1/update-star';
                 var headers = {
                    Domain :  this.$store.state.domain,
                    Authorization:  this.$store.state.user_token
                };
                var send_data = {
                    star:this.star
                };
                axios.post(api_link, send_data, { headers :headers })
                    .then((res)=>{
                        
                        _this.content_comment = '';
                        _this.listComment(function(){});
                        _this.$forceUpdate();
                });
            },
            viewMore:function(item){
            
                this.id_view_more = item._id;
                this.comments.pagination.limit_child += 4;
                item.loading_more = true;
                this.listComment(function(){
                    item.loading_more = false;

                });
                this.$forceUpdate();
            },
            mappingResponse (resource, object) {

                if (!object.hasOwnProperty('pagination')) {
                    object.pagination = {};
                }
                object.data = resource.hasOwnProperty('data') ? resource.data : [];
                for (var key in object.pagination) {

                    if (resource.hasOwnProperty(key)) {
                        object.pagination[key] = resource[key];
                    }
                }
                var delay = object.hasOwnProperty('delay') && !isNaN(object.delay) ? object.delay : 10;
                setTimeout(function () {
                    object.loading = false;
                }, delay);
            },
            initUI(){
                $('#list-related-product-slider').not('.lick-initialized').slick({
                    dots: false,
                    slidesToShow:4,
                    slidesToScroll: 1,
                    infinite:true,
                    arrows: true,
                    nextArrow : '<i class="fal fa-chevron-right icon-next"></i>',
                    prevArrow : '<i class="fal fa-chevron-left icon-prev"></i>',
                    appendArrows: '#product-detail-footer-nav',
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 540,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                    ]
                });
            },
            switchProperty(child, parent) {
                var selected_properties = [];
                var current_variant = null
                for (var id in parent.childs) {
                    parent.childs[id].selected = id == child._id;
                }
                if (this.source.properties_info) {
                    this.source.properties_info.forEach(function (i) {
                        var current_keys = Object.keys(i.childs)
                        if (current_keys.length) {
                            for (var a = 0; a < current_keys.length; a++) {
                                if (i.childs[current_keys[a]].selected && selected_properties.indexOf(current_keys[a]) === -1) {
                                    selected_properties.push(current_keys[a])
                                }
                            }
                        }
                    })
                }
                this.source.selected_properties = selected_properties;
                if (this.source.children_variant && this.source.children_variant.length) {
                    this.source.children_variant.forEach((variant) => {
                        if (variant.properties) {
                            if (this.comparseArray(variant.properties, this.source.selected_properties)) {
                                if (!variant.hasOwnProperty('quantity')) {
                                    variant.quantity = 1
                                }
                                current_variant = variant
                            }
                        }
                    })
                }
                var thumb = $('#big-thumb-slider');
                var list = $('#list-thumb-slider');

                if (thumb.hasClass('slick-initialized')) {
                    thumb.slick('unslick');
                }
                if (list.hasClass('slick-initialized')) {
                    list.slick('unslick');
                }

                this.source.current_variant = current_variant
                this.$forceUpdate();
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.slickImage();
                    })
                }, 100)
                this.$forceUpdate();
            },
            slickImage() {
                var thumb = $('#big-thumb-slider');
                var list = $('#list-thumb-slider');
                if (list.length) {

                    if (list.hasClass('slick-initialized')) {
                        list.slick('unslick');
                    }
                    list.slick({
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: true,
                        swipe: false,
                        infinite: true,
                        arrows: true,
                        asNavFor: '#big-thumb-slider',
                        focusOnSelect: true,
                        adaptiveHeight: true,
                        prevArrow: '<button class="fal fa-chevron-right slick-prev slick-arrow"></button>',
                        nextArrow: '<button class="fal fa-chevron-left slick-next slick-arrow"></button>',
                        responsive: [
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                        ]
                    });
                }
                if (thumb.length) {
                    if (thumb.hasClass('slick-initialized')) {
                        thumb.slick('unslick');
                    }
                    thumb.slick({
                        arrows: false,
                        slidesToScroll: 1,
                        fade: true,
                        asNavFor: '#list-thumb-slider'
                    });
                }
            },
            updated(){
                this.slickImage()
            },
            mappingSource(new_val) {
                if (!new_val) {
                    return
                }
                if (new_val && (!new_val.hasOwnProperty('quantity') || isNaN(new_val.quantity))) {
                    new_val.quantity = 1
                }
                var current_variant = null;
                var selected_properties = [];
                if (new_val.children_variant && new_val.children_variant.length) {
                    if (new_val.properties_info) {
                        new_val.properties_info.forEach(function (i) {
                            var current_keys = Object.keys(i.childs)
                            if (current_keys.length) {
                                i.childs[current_keys[0]].selected = true;
                                for (var a = 1; a < current_keys.length; a++) {
                                    i.childs[current_keys[a]].selected = false;
                                }
                            }
                            if (selected_properties.indexOf(current_keys[a]) === -1) {
                                selected_properties.push(current_keys[a])
                            }
                        })
                    }
                    current_variant = new_val.children_variant[0]
                    if (!current_variant.hasOwnProperty('quantity')) {
                        current_variant.quantity = 1
                    }
                }
                if (this.$store.state.carts.hasOwnProperty(this.source._id)) {
                    this.source.quantity = this.$store.state.carts[this.source._id].quantity
                } else {
                    this.source.quantity = 1
                }

                this.source.selected_properties = selected_properties
                this.source.current_variant = current_variant
                this.$forceUpdate()
            },
        },
        watch: {
            '$store.state.default_data.default_meta':function(new_val){
                    
               this.title = new_val.data.meta_title;
               if(new_val.data.meta_title != ''){
                    this.$emit('updateHead')
                     this.$forceUpdate();
               }
            },
            'title':function(){
                this.$emit('updateHead')
            },
            source(new_val) {
                this.mappingSource(new_val);
            },
        }
    }
</script>
