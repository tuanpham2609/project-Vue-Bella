<template>
    <div>
        <section class=" section section-hot-product" id="hot-product">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="title" v-if="source">
                            <h3>{{source.title}}</h3>
                        </div>
                    </div>
                </div>
                <div class="list-hot-product" v-if="source && source.data && source.allow_show">
                    <div class="row row-flex" itemscope itemtype="http://schema.org/ItemList">
                        <span itemprop="numberOfItems" hidden>{{ source.data.length }}</span>
                        <div class="col-xs-6 col-sm-4 col-md-3 col-flex" itemprop="itemListElement" itemscope
                            v-for="(item, index) in source.data"
                            :key="index">
                            <div class="item-product-thumb">
                                <div class="product-inner">
                                    <div class="product-image">
                                        <router-link :to="alias(item.Alias)">
                                            <img :src="$store.state.domain + '/' + item.Image.path"
                                                itemprop="image" >
                                        </router-link>
                                        <div class="product-btn-groups">
                                            <button @click.stop.prevent="$store.commit('showQuickView', item)" class="btn-add-item-to-cart"></button>
                                            <button @click.stop.prevent="$store.commit('toggleFavorite', item)"
                                                class="">
                                                <i style="line-height: 50px;"
                                                    :class="{ 'text-danger ' : inFavorite($store,item._id) }" class="fa fa-heart">
                                                </i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <router-link itemprop="url" :to="alias(item.Alias)"
                                                        :title="item.name" class="product-title">
                                            <span itemprop="name" style="font-weight: 600;">{{item.name}}</span>
                                        </router-link>
                                        <p v-line-clamp:20="2" style="font-size: 14px;">{{item.description}}</p>
                                        <div class="product-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
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
                        <!-- <div class="col-xs-12">
                            <div class="text-center">
                                <a href="san-pham-5ba47030e3afed160400ec78.html" class="btn btn-trans">Xem tất cả</a>
                            </div>
                        </div> -->
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>
<script>
export default {
    props:['source'],
}
</script>

