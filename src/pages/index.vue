<template>
    <div>
        <section class="wrapper">
            <div v-if="demo_mode">
                <sliderDemo />
                <hotproductDemo />
                <BannerHomeDemo />
                <FullAdvDemo />
                <TabProductDemo />
                <NewHomeDemo />
                <brandDemo /> 
                <HomeSubDemo />
            </div>
            <div v-else>
                <slider v-if="slider" :data="slider" />
                <HotProduct v-if="popular_products" :source="popular_products" />
                <BannerHome v-if="advs" :source="advs" />
                <FullAdv v-if="policy" :data="policy" />
                <TabProduct v-if="product_tabs" :source="product_tabs" :banner="banner" />
                <NewHome v-if="homepost" :source="homepost" />
                <HomeSub v-if="$store.state.default_data && $store.state.default_data.form_subscribe" :source="{ fields : $store.state.default_data.form_subscribe, setting : $store.state.default_data.form_subscribe_background }" />
                <brand v-if="brand" :source="brand" />
            </div>
        </section>
    </div>
</template>
<script>
    import brand from '@/components/home/brand'
    import slider from '@/components/home/slider'
    import BannerHome from '@/components/home/bannerHome'
    import HotProduct from '@/components/home/HotProduct'
    import FullAdv from '@/components/home/FullAdv'
    import NewHome from '@/components/home/new-home'
    import HomeSub from '@/components/home/HomeSubscriber'
    import TabProduct from '@/components/home/TabProduct'
    //demo
    import sliderDemo from '@/components/home/slider-demo'
    import hotproductDemo from '@/components/home/hotproduct-demo'
    import BannerHomeDemo from '@/components/home/BannerHome-demo'
    import TabProductDemo from '@/components/home/Tabproduct-demo'
    import NewHomeDemo from '@/components/home/NewHomeDemo-demo'
    import brandDemo from '@/components/home/brad-demo'
    import HomeSubDemo from '@/components/home/HomeSub-demo'
    import FullAdvDemo from '@/components/home/FullAdv-demo'
    //demo
    export default {
        head: {
            title: function () {
                return {
                    inner: this.seo.meta_title ? this.seo.meta_title : '',
                    separator: false,
                    complement: window.location.hostname
                }
            },
            meta: function () {
                return this.getSeoTag( this.$store )
            }
        },
        components:{
            brand,
            slider,
            BannerHome,
            HotProduct,
            FullAdv,
            NewHome,
            HomeSub,
            TabProduct,
            //demo
            sliderDemo,
            hotproductDemo,
            BannerHomeDemo,
            TabProductDemo,
            NewHomeDemo,
            brandDemo,
            HomeSubDemo,
            FullAdvDemo
            // demo
        },
        computed: {
            slider() {
                return this.$store.state.default_data ? this.$store.state.default_data.slider : null;
            },
            popular_products() {
                return this.$store.state.default_data ? this.$store.state.default_data.popularproduct : null;
            },
            advs() {
                return this.$store.state.default_data ? this.$store.state.default_data.adv : null;
            },
            brand() {
                return this.$store.state.default_data ? this.$store.state.default_data.brand : null;
            },
            product_tabs() {
                return this.$store.state.default_data ? this.$store.state.default_data.tabproduct : null;
            },
            banner(){
                return this.$store.state.default_data ? this.$store.state.default_data.banners : null;
            },
            policy(){
                return this.$store.state.default_data ? this.$store.state.default_data.policy : null;
            },
            homepost(){
                return this.$store.state.default_data ? this.$store.state.default_data.homepost : null;
            },
            seo(){
                return this.$store.state.default_data.home_meta ? this.getSeoTitle(this.$store.state.default_data.home_meta) : 
                    (this.$store.state.default_data.default_meta ? this.getSeoTitle(this.$store.state.default_data.default_meta) : {} );
            },
            demo_mode(){
                 return this.$store.state.default_data.demo_mode ? this.$store.state.default_data.demo_mode.allow_show : false ;
            },
            theme_color(){
                 return this.$store.state.default_data.demo_mode ? this.$store.state.default_data.theme_color : true
            }
        },
        created() {  
            this.$store.commit('checkLogin');
            this.$store.dispatch('loadPageResource', '');
            this.$store.state.open_footer_cart = false;
        },
        watch:{
            '$store.state.default_data' : function(new_val){
                this.$emit('updateHead')
            }
        }
    }
</script>


