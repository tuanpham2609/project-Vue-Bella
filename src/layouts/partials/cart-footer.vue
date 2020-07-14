<template>
   <div id="cart" v-show="$route.path != '/cart' &&  Object.keys($store.state.carts).length" class="cart-wrapper" :class="{active : $store.state.open_footer_cart}">
        <div class="cart-container opened">
            <a @click.stop.prevent="$store.commit('toggleFooterCart')" type="button" class="btn-cart"><i class="btn-cart-icon"></i><span
                    class="badge">{{ Object.keys($store.state.carts).length }}</span></a>
            <div class="cart">
                <div class="cart-header">
                    <h4 class="header-title">Có <strong>{{ Object.keys($store.state.carts).length }}</strong> sản phẩm trong giỏ hàng</h4><a href="#" class="btn-close"><i
                            class="fa fa-arrow-right"></i></a>
                </div>
                <div class="cart-body">
                    <div class="list-items">
                        <div v-for="(item, index) in $store.state.carts" :key="index" class="item">
                            <a @click.stop.prevent="$store.commit('removeFromCart', item)" class="btn-remove"></a>
                            <div class="item-image">
                                <img v-if="item.Image && item.Image.path" :src="domain + '/' + item.Image.path" class="img-responsive">
                                <img v-else :src="theme_uri  +'static/images/default.png'" class="img-responsive">
                            </div>
                            <div class="item-info">
                                <router-link target="_blank" :to="alias(item.Alias)">
                                    <h5 class="item-title">
                                        <span>{{ item.parent_id == '' ? item.name : item.VariantName }}</span>
                                    </h5>
                                </router-link>
                                <strong class="item-price ">
                                    <template v-if="item.price_promotion_web && isPrice(item.price_promotion_web)">
                                        <span itemprop="offers">
                                            {{ item.price_promotion_web | money }}đ
                                        </span>
                                        <span class="product-price-old " style="text-decoration: line-through;" itemprop="price"  >
                                            {{ item.price_sale_web ? item.price_sale_web : 0 | money }}đ
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span class="product-price-new " itemprop="price">
                                            {{ item.price_sale_web | money }}đ
                                        </span>
                                    </template>
                                </strong>
                                <div class="input-spinner-inner">
                                    <div class="input-group " data-type="input-spinner" data-target="#btn_add_to_cart">
                                        <span class="input-group-btn">
                                            <button @click.stop.prevent="incrementQuantity(item, false, saveCart)"  class="btn btn-default" type="button" data-type="input-spinner-btn"
                                                data-input-type="false"><i class="fas fa-minus"></i></button>
                                        </span>
                                        <input type="number" class="form-control" v-model="item.quantity"
                                            data-type="input-spinner-field" readonly="">
                                        <span class="input-group-btn">
                                            <button @click.stop.prevent="incrementQuantity(item, true, saveCart)" class="btn btn-default" type="button" data-type="input-spinner-btn"
                                                data-input-type="true"><i class="fas fa-plus"></i></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-footer">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="total"><span class="total-title">TỔNG TIỀN:</span> <span class="total-price">{{this.total() |money}}</span></div>
                        </div>
                        <div class="col-xs-12">
                            <div class="btn-groups"><a href="/cart" class="btn btn-block btn-primary btn-go-to-cart"><i
                                        class="fa fa-arrow-left"></i> Giỏ hàng </a> <a href="/checkout" class="btn btn-block btn-success btn-go-to-check-out">Thanh
                                    toán <i class="fa fa-arrow-right"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    var timeout = null
    export default{
        data(){
            return {
                price : 0.0
            }
        },
        methods:{
            saveCart(){
                var current_cart = this.$store.state.carts ? this.$store.state.carts : {}
                localStorage.setItem('carts', JSON.stringify(current_cart))
                clearTimeout(timeout)
                timeout = setTimeout(()=>{
                    this.showNotification('Cập nhật giỏ hàng thành công!!', 'shopping_cart', 'success' )
                }, 500)
            },
            total(){
                var total = 0
                if( this.$store.state.carts ){
                    Object.values(this.$store.state.carts).forEach((item)=>{
                        if(item.price_promotion_web > 0){
                            total += item.quantity * item.price_promotion_web;
                        }else{
                            total += item.quantity * item.price_sale_web;
                        }
                    });
                }
                return total 
            }
        }
    }
</script>
