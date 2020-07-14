<template>
    <div>
        <section class="section section-out-services" v-if="data">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4" v-for="(item, index) in data.data" :key="index">
                        <div class="item-service">
                            <div class="item-service-image">
                                <img :src="$store.state.domain + '/' + item.path"
                                    alt="">
                            </div>
                            <div class="item-service-content">
                                <div class="item-service-title">{{item.info.title}}</div>
                                <div class="item-service-description">{{item.info.description}}</div>
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
    props:["data"]
}
</script>

