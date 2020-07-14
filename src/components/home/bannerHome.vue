<template>
    <div>
        <section class="section section-home-banner">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="list-home-banner" v-if="source">
                            <a :href="item.info.link" v-for="(item, index) in source.data" :key="index"  :class="'item item-' + (index+1)">
                                <div class="item-image" style="background-image:url(static/images/promotion/1.jpg)">
                                    <img :src="$store.state.domain + '/' + item.path" alt="">
                                </div>
                            </a>
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

