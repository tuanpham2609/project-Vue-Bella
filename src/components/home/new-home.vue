<template>
    <div>
        <section class="section section-posts" v-if="source">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="title">
                            <h3>
                                {{source.title}}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="list-home-post">
                    <div class="row row-flex" itemscope itemtype="http://schema.org/ItemList">
                        <div class="col-xs-12 col-sm-6 col-md-4 " v-for="(item, index) in source.data" :key="index">
                            <div class="item-post" itemscope itemtype="http://schema.org/Article">
                                <div class="item-post-inner">
                                   <router-link :title="item.name" :to="alias(item.alias)" class="item-post-image">
                                        <img  v-if="item.photo && item.photo.path"
                                            :src="domain + '/' + item.photo.path"
                                            :alt="item.name" :title="item.name">
                                        <img v-else :src="theme_uri + 'static/images/product-404.png'" />
                                    </router-link>
                                    <div class="item-post-content">
                                        <span itemprop="author" class="item-post-info">{{item.user.date_start | dd-mm-yyyy}}
                                            / {{item.user.name}} </span>
                                        <div>
                                           <router-link itemprop="name" :title="item.name" :to="alias(item.alias)" class="item-post-title">
                                                {{ item.name }}
                                            </router-link>
                                        </div>
                                        <div itemprop="description" class="item-post-description"  v-line-clamp:20="2">
                                            <span  v-line-clamp:20="3" class="ellip" v-html="item.description"></span>
                                        </div>
                                        <router-link :to="alias(item.alias)" class="item-post-readmore">
                                            xem thêm
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    props:['source']
}
</script>

