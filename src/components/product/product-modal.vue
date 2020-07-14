
<style>
.modal-quick-view .icon-next {
    top: 25%;
}
.modal-quick-view .icon-prev {
    top: 25%;
}
@media(max-width: 992px) {
    .product-btn-group .btn-add-item-to-cart{
        margin-top: 5px;
        margin-left: 0!important;
    }
}
@media(max-width: 768px) {
    .product-btn-groups {
        /* text-align: left!important; */
    }
}
.product-btn-group .btn-add-item-to-cart {
    background: #f5f5f5;
    border-radius: 17px;
    border: 1px solid transparent;
    color: #333;
    padding: 0 12px;
    line-height: 34px;
    margin-left: 5px;
}
.area_promotion {
    display: block;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative;
    margin: 5px 10px 12px;
    background: #fff;
    padding-bottom: 10px;
}
.area_promotion .infopr span {
    display: block;
    overflow: hidden;
    font-size: 14px;
    color: #333;
    padding: 0 15px 5px 10px;
}
</style>
<template>
    <div class="modal fade modal-quick-view " id="modal-quick-view" style="padding-right: 17px;">
        <div v-if="source" class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body" style="margin:0;">
                    <button @click="$store.commit('hideQuickView')" type="button"  class="close" style="cursor: pointer; z-index: 100"></button>
                    <div class="product-quick-view">
                        <div class="product-quick-view-container">
                            <div class="product-gallery">
                                <div class="product-gallery">
                                    <!-- variant -->
                                    <template v-if="source.hasOwnProperty('current_variant') && source.current_variant">
                                        <div class="big-thumbs">
                                            <div id="big_thumb_quick_view" class="big-thumbs-slider">
                                                 <template v-if="(source.Image || source.current_variant.Image) ">
                                                    <a class="item"
                                                        v-if="source.current_variant.Image"  
                                                       data-fancybox="gallery" :href="domain + '/' + source.current_variant.Image.path">
                                                        <img 
                                                            :src="domain + '/' + source.current_variant.Image.path" 
                                                            :alt="source.current_variant.VariantName">
                                                    </a>
                                                    <a class="item" v-else data-fancybox="gallery" :href="domain + '/' + source.Image.path" >
                                                        <img 
                                                            :src="domain + '/' + source.Image.path" 
                                                            :alt="source.current_variant.VariantName">
                                                    </a>
                                                </template>
                                                <template v-if="source.current_variant.Albums ">
                                                    <template v-for="(album, album_index) in source.current_variant.Albums">
                                                        <a  class="item" v-if="album.path"  data-fancybox="gallery" :href="domain + '/' + album.path">
                                                            <img 
                                                                :src="domain + '/' + album.path" 
                                                                :alt="source.current_variant.VariantName + '_' + album_index">
                                                        </a>
                                                    </template>
                                                
                                                </template>
                                               
                                                
                                            </div>
                                        </div>
                                        <div class="list-thumbs ">
                                            <div id="list_thumb_quick_view" class="list-thumbs-slider">
                                                <template v-if="(source.Image || source.current_variant.Image) ">
                                                    <div  v-if="source.current_variant.Image">
                                                        <!-- <img :src="domain + '/' + source.current_variant.Image.path" 
                                                            :alt="source.current_variant.VariantName"> -->
                                                        <div class="item" :style="{'background-image': 'url(' + domain + '/' + source.current_variant.Image.path + ')'}">
                                                            <img :src="theme_uri + 'static/images/icons/grid.png'" alt="">
                                                        </div>
                                                    </div>
                                                    <div v-else >
                                                        <!-- <img :src="domain + '/' + source.Image.path" 
                                                            :alt="source.current_variant.VariantName"> -->
                                                        <div class="item" :style="{'background-image': 'url(' + domain + '/' + source.Image.path + ')'}">
                                                            <img :src="theme_uri + 'static/images/icons/grid.png'" alt="">
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="source.current_variant.Albums ">
                                                        <div v-for="(album, album_index) in source.current_variant.Albums" :key="album_index" v-if="album.path">
                                                            <div class="item" :style="{'background-image': 'url(' + domain + '/' + album.path + ')'}">
                                                                <img :src="theme_uri + 'static/images/icons/grid.png'" alt="">
                                                            </div>
                                                        </div>
                                                </template>
                                            </div>
                                          
                                        </div>
                                    </template>
                                    <!-- none variant -->
                                    <template v-else >
                                        <div class="big-thumbs">
                                            <div id="big_thumb_quick_view" class="big-thumbs-slider">
                                                <template v-if="(source.Image && source.Image.path) || (source.Albums && source.Albums.length)">
                                                    <a v-if="source.Image" class="item" data-fancybox="gallery" :href="domain + '/' + source.Image.path">
                                                        <img 
                                                            :src="domain + '/' + source.Image.path" 
                                                            :alt="source.name">
                                                    </a>
                                                    <template v-if="source.Albums">
                                                        <template v-for="(album, album_index) in source.Albums">
                                                            <a  class="item" v-if="album.path" data-fancybox="gallery" :href="domain + '/' + album.path">
                                                                <img 
                                                                    :src="domain + '/' + album.path" 
                                                                    :alt="source.name + '_' + album_index">
                                                            </a>
                                                        </template>
                                                    </template>
                                                </template>
                                            </div>
                                        </div>
                                        <div class="list-thumbs ">
                                            <div id="list_thumb_quick_view" class="list-thumbs-slider">
                                                <div v-if="source.Image">
                                                        <!-- <img :src="domain + '/' + source.Image.path" 
                                                            :alt="source.name"> -->
                                                    <div class="item"  :style="{'background-image': 'url(' + domain + '/' + source.Image.path + ')'}">
                                                        <img  :src="theme_uri + 'static/images/icons/grid.png'" alt="">
                                                    </div>
                                                </div>
                                                <!-- <div v-if="source.Image">
                                                    <div class="item" :style="{'background-image': 'url(' + domain + '/' + source.Image.path + ')'}">
                                                            <img 
                                                            :src="domain + '/' + source.Image.path" 
                                                            :alt="source.name">
                                                    </div>
                                                </div> -->
                                                <template v-if="source.Albums">
                                                    <div v-for="(album, album_index) in source.Albums" v-if="album.path" :key="'album_' + album_index">
                                                        <div class="item" :style="{'background-image': 'url(' + domain + '/' + album.path + ')'}">
                                                            <img :src="theme_uri + 'static/images/icons/grid.png'"
                                                                :alt="source.name + '-' + album_index">
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="product-info">
                                <div class="product-info-inner">
                                    <div class="product-name">
                                        <h1 itemprop="name">
                                            {{ source.name }}
                                        </h1>
                                    </div>
                                    <p v-if="source.current_variant">
                                        <strong>Đang chọn:</strong>
                                        <span class="mg-left-5">{{ source.current_variant.VariantName }}</span>
                                    </p>
                                    <div class="product-price" itemprop="offers">
                                        <span itemprop="priceCurrency" content="VND"></span>
                                        <template v-if="source.current_variant">
                                            <template v-if="source.current_variant.price_promotion_web && isPrice(source.current_variant.price_promotion_web)">
                                                <div class="product-price-new " itemprop="offers" :content="source.current_variant.price_promotion_web">
                                                    {{ source.current_variant.price_promotion_web | money }}đ
                                                </div>
                                                <div class="product-price-old " itemprop="price" :content="source.current_variant.price_sale_web ? source.current_variant.price_sale_web : 0">
                                                    {{ source.current_variant.price_sale_web ? source.current_variant.price_sale_web : 0 | money }}đ
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="product-price-new " itemprop="price" :content="source.current_variant.price_sale_web">
                                                    {{ source.current_variant.price_sale_web | money }}đ
                                                </div>
                                            </template>
                                            
                                        </template>
                                        <template v-else>
                                            <template v-if="source.price_promotion_web && isPrice(source.price_promotion_web)">
                                                <div class="product-price-new " style="display: inline-block;"
                                                    itemprop="offers" :content="source.price_promotion_web">
                                                    {{ source.price_promotion_web | money }}đ
                                                </div>
                                                <div class="product-price-old " itemprop="price" style="display: inline-block;margin-left: 10px;text-decoration: line-through;"
                                                    :content="source.price_sale_web ? source.price_sale_web : 0">
                                                    {{ source.price_sale_web ? source.price_sale_web : 0 | money }}đ
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="product-price-new " itemprop="price" :content="source.price_sale_web">
                                                    {{ source.price_sale_web | money }}đ
                                                </div>
                                            </template>
                                        </template>
                                    </div>
                                    <div class="product-description" itemprop="description">
                                        <p data-max-line="3" v-html="source.description"></p>
                                    </div>
                                    <div class="product-state">
                                        <p>
                                            <span class="product-state-title">Tình trạng : </span>
                                            <span v-if="source.available_quantity && source.available_quantity > 0">Còn Hàng</span>
                                            <span v-else class="product-state-value">Hết hàng</span>
                                        </p>
                                    </div>
                                    <template v-if="source.children_variant && source.children_variant.length ">
                                        <div class="product-filter" v-if="source.properties_info && source.properties_info.length">
                                            <div v-for="(property, property_index) in source.properties_info" class="item-filter" :key="property_index">
                                                <template v-if="property.childs">
                                                    <span class="product-state-title">{{ property.name }} : </span>
                                                    <label v-for="(child, key) in property.childs " class="product-state-value checkbox" :key="key">
                                                        <input
                                                                @click="switchProperty( child, property )"
                                                                :checked="child.selected"
                                                               :value="child._id"
                                                               type="radio"
                                                               class="variant_checked"
                                                               :name="property._id" >
                                                        {{ child.name }}
                                                    </label>
                                                </template>

                                            </div>
                                        </div>
                                    </template>
                                    <div class="product-spinner">
                                        <div class="input-spinner-title">
                                            <span class="product-state-title">Số lượng :</span>
                                        </div>
                                        <!-- variant -->
                                        <div v-if="source.current_variant" class="input-spinner-inner">
                                            <div class="input-group input-group-spinner" data-type="input-spinner"
                                                 data-target="#btn_add_to_cart">
                                                <span class="input-group-btn">
                                                    <button @click.stop.prevent="incrementQuantity(source.current_variant, false)" class="btn btn-default" type="button" data-type="input-spinner-btn"
                                                            data-input-type="false"><i class="fas fa-minus"></i>
                                                    </button>
                                                </span>
                                                <input type="number" class="form-control"  
                                                        v-model="source.current_variant.quantity"
                                                       data-type="input-spinner-field">
                                                <span class="input-group-btn">
                                                    <button @click.stop.prevent="incrementQuantity(source.current_variant)" class="btn btn-default" type="button" data-type="input-spinner-btn"
                                                            data-input-type="true"><i class="fas fa-plus"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                        <!-- none variant -->
                                         <div v-else class="input-spinner-inner">
                                            <div class="input-group input-group-spinner" data-type="input-spinner"
                                                 data-target="#btn_add_to_cart">
                                                <span class="input-group-btn">
                                                    <button @click.stop.prevent="incrementQuantity(source, false)" 
                                                        class="btn btn-default" type="button" data-type="input-spinner-btn"
                                                        data-input-type="false"><i class="fas fa-minus"></i></button>
                                                </span>
                                                <input type="number" class="form-control"  v-model="source.quantity"
                                                       data-type="input-spinner-field">
                                                <span class="input-group-btn">
                                                    <button @click.stop.prevent="incrementQuantity(source)" 
                                                        class="btn btn-default" type="button" data-type="input-spinner-btn"
                                                            data-input-type="true"><i class="fas fa-plus"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-btn-group text-left">
                                        <button v-if="source.current_variant" 
                                            :disabled="source.current_variant.quantity < 1"
                                            @click.stop.prevent="$store.commit('updateCartQuantity', { product : source.current_variant })"
                                            class="btn btn-add-item-to-cart btn-lg">
                                            <i class="fas fa-shopping-basket"></i>
                                            <span v-if="!inCart($store, source.current_variant._id)">Thêm vào giỏ hàng</span>
                                            <span v-else>Cập nhật giỏ hàng</span>
                                        </button>
                                        <button v-else 
                                            :disabled="source.quantity < 1"
                                            @click.stop.prevent="$store.commit('updateCartQuantity', { product : source })" class="btn btn-add-item-to-cart btn-lg">
                                            <i class="fas fa-shopping-basket"></i>
                                            <span v-if="!inCart($store, source._id)">Thêm vào giỏ hàng</span>
                                            <span v-else>Cập nhật giỏ hàng</span>
                                        </button>
                                    
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    input[data-type="input-spinner-field"]{
        width: auto;
        max-width: 100px;
    }
    label {
        display: inline-block;
        padding-right: 10px;
    }
    .list-thumbs-slider .item {
        margin: 0 5px!important;
    }
</style>
<script>
    export default {
        props : ['source'],
        list_image_single:[],
        data(){
            return{
                current_height: null,
                body_class:'margin:10px',
            }
        },
        methods : {
            switchProperty(child, parent){
                var selected_properties = [];
                var current_variant = null
                for( var id in parent.childs ){
                    parent.childs[ id ].selected = id == child._id;
                }
                if(this.source.properties_info){
                    this.source.properties_info.forEach(function(i){
                        var current_keys = Object.keys( i.childs )
                        if( current_keys.length ){
                            for( var a = 0 ; a < current_keys.length; a++ ){
                                if(  i.childs[ current_keys[a] ].selected && selected_properties.indexOf(current_keys[a]) === -1 ){
                                    selected_properties.push( current_keys[a] )
                                }
                            }
                        }
                    })
                }
                this.source.selected_properties = selected_properties
                if( this.source.children_variant && this.source.children_variant.length ){
                    this.source.children_variant.forEach((variant)=>{
                        if( variant.properties ){
                            if( this.comparseArray( variant.properties, this.source.selected_properties  ) ){
                                if( ! variant.hasOwnProperty('quantity') ){
                                    variant.quantity = 1
                                }
                                current_variant = variant
                            }
                        }
                    })
                }
                var thumb  = $('#big_thumb_quick_view');
                var list  = $('#list_thumb_quick_view');
            
                if( thumb.hasClass('slick-initialized') ){
                    thumb.slick('unslick');
                }
                 if( list.hasClass('slick-initialized') ){
                    list.slick('unslick');
                }

                this.source.current_variant = current_variant;

                 if(this.source.current_variant != null){

                   if(this.inCart(this.$store, this.source.current_variant._id)){

                            this.source.current_variant.quantity = this.$store.state.carts[this.source.current_variant._id].quantity;
                      
                   }else{

                       this.source.current_variant.quantity = 1;
                   }
                       
               }
             
                setTimeout(()=>{this.$nextTick(()=>{
                    this.slickImage();
                    
                })}, 100)
                this.$forceUpdate();
            },
            slickImage(){
                var thumb  = $('#big_thumb_quick_view');
                var list  = $('#list_thumb_quick_view');
                if( list.length ){
                    if( list.hasClass('slick-initialized') ){
                       list.slick('unslick');
                       list.removeClass('slick-initialized')
                    }
                    list.slick({
                        dots: false,
                        slidesToShow:3,
                        slidesToScroll: 1,
                        centerMode: true,
                        swipe: false,
                        infinite:true,
                        arrows: true,
                        asNavFor: '#big_thumb_quick_view',
                        focusOnSelect:true,
                        adaptiveHeight:true,
                        nextArrow : '<i class="fal fa-chevron-right icon-next"></i>',
                        prevArrow : '<i class="fal fa-chevron-left icon-prev"></i>',
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
                if( thumb.length ){
                    if( thumb.hasClass('slick-initialized') ){
                        thumb.slick('unslick');
                        thumb.removeClass('slick-initialized')
                    }
                    thumb.slick({
                        arrows:true,
                        slidesToScroll: 1,
                        fade:true,
                        nextArrow : '<i class="hidden fal fa-chevron-right icon-next"></i>',
                        prevArrow : '<i class="hidden fal fa-chevron-left icon-prev"></i>',
                        asNavFor: '#list_thumb_quick_view'
                    });
                }
            }
        },
        watch:{
            source(new_val){
                if( !new_val ){ return }
                if( new_val && (! new_val.hasOwnProperty('quantity') || isNaN( new_val.quantity ) ) ){ new_val.quantity = 1 }
                if( new_val.quantity < 1 ){
                    new_val.quantity = 1;
                }
                var current_variant = null;
                var selected_properties = [];
                if( new_val.children_variant && new_val.children_variant.length ){
                    if(new_val.properties_info){
                        new_val.properties_info.forEach(function(i){
                            var current_keys = Object.keys( i.childs )
                            if( current_keys.length ){
                                i.childs[ current_keys[0] ].selected = true;
                                for( var a = 1 ; a < current_keys.length; a++ ){
                                    i.childs[ current_keys[a] ].selected = false;
                                }
                            }
                            if(  selected_properties.indexOf(current_keys[a]) === -1 ){
                                selected_properties.push( current_keys[a] )
                            }
                        })
                    }
                    current_variant = new_val.children_variant[0]
                    if( ! current_variant.hasOwnProperty('quantity') ){
                        current_variant.quantity = 1
                    }
                }
                if( this.$store.state.carts.hasOwnProperty(this.source._id) ){
                      this.source.quantity = this.$store.state.carts[ this.source._id ].quantity
                }else{
                    this.source.quantity = 1
                }
                if( current_variant && current_variant.quantity < 1 ){
                    current_variant.quantity = 1;
                }
                this.source.selected_properties = selected_properties
                this.source.current_variant = current_variant
               
                this.$forceUpdate()
                // this.slickImage()
            }
        },
        updated(){
            this.slickImage();
        }
    }
</script>