<!-- Chuyển hướng hiện thị theo alias -->
<template>
    <div>
        <cart v-if="$route.params.alias == 'cart' " />
        <search  v-if="$route.params.alias == 'search' "></search>
        <template v-if="!$store.state.loading_alias && $route.params.alias !='search'">
            <page404  v-if="!alias_data.alias_data" />
            <template v-else>
                <!-- switch page -->
                <template v-if="alias_data.alias_data.type == 'page' ">
                    <template v-if="page_structs.indexOf(alias_data.alias_object.type) !== -1">
                        <post-category v-if="alias_data.alias_object.type == 'news'" :source="alias_data" />
                        <about v-if="alias_data.alias_object.type == 'about'" :source="alias_data" />
                        <contact v-if="alias_data.alias_object.type == 'contact'" :source="alias_data" />

                        <ProductCategory  v-if="alias_data.alias_object.type == 'product'" :source="alias_data" />
                        
                    </template>
                    <template v-else>
                        <!-- <page :source="alias"  /> -->
                    </template>

                </template>
                <template v-else>
                    <post-single v-if="alias_data.alias_data.type == 'post'" :source="alias_data" />
                    <product-single v-if="alias_data.alias_data.type == 'product'" :source="alias_data.alias_object" :aliasData="alias_data" />
                    <ProductCategory  v-if="alias_data.alias_data.type == 'product_category'" :source="alias_data" />
                    <post-category  v-if="alias_data.alias_data.type == 'post_category'" :source="alias_data" />
                </template>
                <!-- end switch page -->
            </template>

        </template>

    </div>
</template>
<script>
    /** component chung */
    import Page404 from '@/components/_404'
    // import Page from '@/components/page'
    import Contact from '@/components/contact'
    import About from '@/components/about'
    /** Bài viết */
    import PostSingle from '@/components/post/post-single'
    import PostCategory from '@/components/post/post-category'
    // import Posts from '@/components/post/posts'
    /** Sản phẩm */
    import ProductSingle from '@/components/product/product-single'
    import ProductCategory from '@/components/product/product-category'
    // import Products from '@/components/product/products'
    // import Cart from '@/components/product/cart'
    // import Checkout from '@/components/product/checkout'
    // import Favorite from '@/components/product/favorite'
    import Search from '@/components/product/search'
    // import Orders from '@/components/product/orders'
    /** User */

    // import ChangePassword from '@/components/user/change-password'
    // import Profile from '@/components/user/profile'
    import axios from 'axios'
    export default {
        components:{
            // Page,
            Page404,
            Contact,
            About,
            PostSingle,
            PostCategory,
            // Posts,
            ProductSingle,
            ProductCategory,
            // Products,
            // Cart,
            // Checkout,
            // Favorite,
            // Orders,
            // ChangePassword,
            // Profile,
            Search
        },
        head: {
            title: function () {
                return {
                    inner: this.seo.meta_title,
                    separator: '|',
                    complement: this.default_seo.meta_title
                }
            },
            meta: function () {
                return this.getSeoTag( this.$store, this.isValidObject(this.$store.state.alias_data) ? this.$store.state.alias_data.alias_object : null )
            }
        },
        computed:{
            carts(){
                return this.$store.state
            },
            alias_data(){
                // console.log(4444)
                //  console.log(this.$store.state.alias_data.alias_object.TypeOf )
                //  if(this.$store.state && this.$store.state.alias_data && this.$store.state.alias_data.alias_object){
                //      if(this.$store.state.alias_data.alias_object.TypeOf == 'group'){


                //      }
                //  }
                return this.$store.state.alias_data;
            },
            seo(){
                return (this.$store.state.alias_data && this.$store.state.alias_data.alias_object) ? 
                    this.getSeoTitle(this.$store.state.alias_data.alias_object) :  
                    {
                        meta_title : '', 
                        meta_description : ''
                    }
            },
            default_seo(){
               return this.$store.state.default_data.home_meta ? this.getSeoTitle(this.$store.state.default_data.home_meta) : 
                   (this.$store.state.default_data.default_meta ? this.getSeoTitle(this.$store.state.default_data.default_meta) : {} )
            },
        },
        created(){
            if(this.$store.state.user){
                    var _this = this;
                    var api_link = this.$store.state.api+'user/check-expired';
                    var headers = {
                        'Authorization' : this.$store.state.user_token,
                        Domain : this.$store.state.domain
                    };
                    var send_data = {
                        token:this.$store.state.user_token
                    }
                    this.callAPI( 'user/check-expired','post', send_data, headers)
                    // axios.post(api_link, send_data, { headers : headers})
                        .then((res)=>{

                            if(res.data.result == false){

                                _this.$store.commit('logout');
                            }
                        })
            }
            if(this.$route && this.$route.params && this.$route.params.alias =='search'){
                 this.$store.state.search = true;
            }
            this.$store.dispatch('loadPageResource', this.$route.params.alias)
            this.$store.state.open_footer_cart = false;
        },
        watch:{
            '$route.path' : function(){
                 this.$store.dispatch('loadPageResource', this.$route.params.alias)
            },
            '$store.state.alias_data' : function(){
                this.$emit('updateHead')
            },
            '$store.state.default_data' : function(){
                this.$emit('updateHead')
            },
        }
    }
</script>