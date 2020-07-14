<template>
    <div>
        <section class="wrapper" style="min-height: 356px;">
            <div class="section section-breadcrumb" style="
            background-image:url('upload/bella.iamsale.vn/slider/images/2018-07/8020_1530526598.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Giỏ hàng</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li class="active">Yêu thích</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="cart-page" class="section section-cart">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 ">
                            <table class="table table-cart">
                                <thead>
                                    <tr>
                                        <th class="td-name">TÊN SẢN PHẨM</th>
                                        <th class="td-price text-center">GIÁ TIỀN</th>
                                        <th class="td-quantity text-center">Lưu giỏ hàng</th>
                                        <th class="td-action"></th>
                                    </tr>
                                </thead>
                                <tbody style="border-bottom: 1px solid #ccc;">
                                    <template>
                                        <tr v-for="(item, index) in data" :key="index">
                                            <td class="td-product" width="20%">
                                                <div class="product">
                                                <div class="product-image">
                                                    <img v-if="$store.state.domain" :src="$store.state.domain +'/'+ item.Image.path" itemprop="image" :alt="item.name" class="img-responsive" />
                                                </div>
                                                <div class="product-content">
                                                    <div class="product-name"> <router-link :to="alias(item.Alias)">{{ item.name }}</router-link> 
                                                    </div>
                                                
                                                </div>
                                                </div>
                                            </td>
                                            <td class="td-price" data-title="Giá tiền : "> {{ item.price_sale_web | money }}</td>
                                            <td class="td-add-to-cart">
                                                <a href="#" @click.stop.prevent="$store.commit('showQuickView', item)" class="btn btn-cart-like">
                                                <i class="fas fa-shopping-basket"></i>Lưu giỏ hàng
                                                </a>
                                            </td>
                                            <td data-show="true" data-title="" class="td-action"><a @click.stop.prevent="removeFromLike( item)" href="#"></a></td>
                                        </tr>
                                    </template>
                                    <template>
                                        <tr v-if="data.length <= 0">
                                            <td colspan="4" class="text-center"><h2>Danh sách yêu thích hàng rỗng</h2></td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-xs-12 text-right" >
                            <div class="cart-buttons">
                                <a href="/" class="btn btn-default btn-black mg-right-15">TIẾP TỤC MUA SẮM<i class="fa fa-arrow-right mg-left-10"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<style>
    .btn-cart-like {
        background: #4cb050;
        padding: 6px 15px;
        color: #fff;
    }
    .btn-cart-like:hover{
        color: #fff;
    }
</style>

<script>
    export default{
        data(){
            return{

                title : '',
                current_url:'',
            }
        },
        head: {
            title: function () {
                return {
                    inner:'Sản phẩm Yêu thích',
                    separator: '|',
                    complement : window.location.hostname
                }
            }
        },
        computed:{
            title1(){

                 return (  this.$store.state &&this.$store.state.hasOwnProperty('default_data') && this.$store.state.default_data.default_meta && this.$store.state.default_data.default_meta.data ) ? this.$store.state.default_data.default_meta.data.meta_title : '';
            },
            data : function(){
                return Object.values(this.$store.state.favorite_products);
            }
        },
        // metaInfo(){
        //     return {
        //         title :  this.$store.state.default_data.default_meta.data.meta_title,
        //          titleTemplate: '%s '+' | '+'Yêu thích'
        //     }
        // },
        
        created(){
            this.current_url = window.location.href;
        },
        mounted(){
            if(this.$store.state.open_footer_cart == true){

                this.$store.state.open_footer_cart = false;
            }
            this.title = this.title1;
        },
        methods:{
            removeFromLike(item){
                this.$store.commit('removeFromLike', item);
            }
        },
        watch:{
            
        }
    }
</script>
