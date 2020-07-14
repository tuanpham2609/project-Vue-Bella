<template>
    <div>
        <footer v-if="demo_mode" class="footer" style="color: rgb(255, 255, 255); background-color: rgb(39, 39, 39);">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4">
                        <div class="footer-info">
                            <a href="#" class="footer-logo">
                                <img :src="theme_uri+'static/images/demo/logofooter.png'"  alt="iamsale.vn" title="iamsale.vn">
                            </a>
                            <ul>
                                <li><span class="icon"><i class="fas fa-phone-square"></i></span><span class="info"><a href="tel:1900969642">1900969642</a></span></li>
                                <li><span class="icon"><i class="fas fa-envelope"></i></span><span class="info">support@polarisvietnam.com}</span></li>
                                <li><span class="icon"><i class="fas fa-map-marker-alt"></i></span><span class="info">Số 20 Cộng Hòa, Phường 12, Quận Tân Bình, TP Hồ Chí Minh</span></li>
                            </ul>
                        </div>
                        <div class="footer-social">
                            <ul>
                                <li><a href="#" target="_blank" class="social-facebook"><i class="fab fa-facebook"></i></a></li>
                                <li><a href="#" target="_blank" class="social-google"><i class="fab fa-google"></i></a></li>
                                <li><a href="#" target="_blank" class="social-instagram"><i class="fab fa-instagram"></i></a></li>
                                <li><a href="#" target="_blank" class="social-pinterest"><i class="fab fa-pinterest"></i></a></li>
                                <li><a href="#" target="_blank" class="social-youtube"><i class="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                        <div class="text-gov-icon">
                            <div target="_blank" class="gov-icon">
                                <img :src="theme_uri+'static/images/demo/logobct.jpg'" alt="logo bo cong thuong" title="logo bo cong thuong">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <div class="footer-navbar">
                            <ul>
                                <li>
                                    <h5>Sản phẩm</h5>
                                    <ul>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Sản phẩm 1</a></li>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Sản phẩm 2</a></li>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Sản phẩm 3</a></li>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Sản phẩm 4</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <h5>Tin tức</h5>
                                    <ul>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Tin tức 1</a></li>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Tin tức 2</a></li>
                                        <li><a href="#" class="vue-line-clamp" style="-webkit-line-clamp: 1;">Tin tức 3</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <div class="footer-navbar">
                            <ul>
                                <li>
                                    <h5>Thông tin fanpage</h5>
                                    <iframe src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/iamsale.vn/&amp;width=340&amp;height=500&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=true&amp;show_facepile=true&amp;appId" width="100%" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="encrypted-media" style="border: none; overflow: hidden;"></iframe>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                Copyright © 2018 Bella. eCommerce Software by iamSale.vn
            </div>
        </footer>
        <footer v-else class="footer" style="color:#FFFFFFFF;background-color:#272727FF">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4">
                        <div class="footer-info">
                            <a :href="footer_logo.info.link" class="footer-logo" v-if="footer_logo && footer_logo.data && footer_logo.allow_show == true">
                                <img :src="domain + '/' + footer_logo.data.path" :alt="footer_logo.info.title" :title="footer_logo.info.title">
                            </a>
                            <ul>
                                <li>
                                    <span class="icon">
                                        <i class="fas fa-phone-square"></i>
                                    </span>
                                    <span class="info" v-if="hotline && hotline.allow_show == true">
                                        <a href="tel:1900969642">{{hotline.data}}</a>
                                    </span>
                                </li>
                                <li>
                                    <span class="icon">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="info" v-if="email && email.allow_show == true">{{email.data}}</span>
                                </li>
                                <li>
                                    <span class="icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <span class="info" v-if="address && address.allow_show == true">{{address.data}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-social">
                            <ul v-if="social && social.allow_show == true">
                                <li v-for="(item, index) in social.data" :key="index">
                                    <a v-if="item.data != ''" :href="item.data" target="_blank" :class="'social-'+item.title"><i :class="'fab fa-'+item.title"></i></a>
                                </li>
                            </ul>
                        </div>

                        <div class="text-gov-icon">
                            <div class="gov-icon" target="_blank" v-if="gov && gov.data && gov.allow_show == true"> 
                                <img :src="domain + '/' + gov.data.path" :alt="gov.info.title" :title="gov.info.title">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <div class="footer-navbar">
                            <ul>
                                <li>
                                    <h5>Sản phẩm</h5>
                                    <ul v-if="menu_footer && menu_footer.allow_show == true">
                                        <li v-for="(item, index) in menu_footer.data" :key="index">
                                            <router-link v-line-clamp:20="1" :to="alias(item.alias)">{{item.name}}</router-link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <h5>Tin tức</h5>
                                    <ul v-if="menu_footer && menu_footer.allow_show == true">
                                        <li v-for="(item, index) in menu_footer1.data" :key="index">
                                            <router-link v-line-clamp:20="1" :to="alias(item.alias)">{{item.name}}</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <div class="footer-navbar">
                            <ul>
                                <li v-if="pagefb && pagefb.allow_show == true">
                                    <h5>Thông tin fanpage</h5>
                                    <iframe :src="'https://www.facebook.com/plugins/page.php?href=' +  pagefb.data + '&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId'" 
                                        width="100%" height="250" style="border:none;overflow:hidden" scrolling="no" 
                                        frameborder="0" allowTransparency="true" allow="encrypted-media">
                                    </iframe>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright" v-if="copyright && copyright.allow_show == true">
                {{copyright.data}}
            </div>
        </footer>
        <a class="totop"><i class="fa fa-arrow-up "></i></a>
        <cart-footer />
    </div>
</template>
<script>
    import CartFooter from '@/layouts/partials/cart-footer'
    export default {
        mounted(){
           this.footer_background,
           $(window).on('load scroll' , function () {
                if ($(this).scrollTop() > 100) {
                    $('.totop').addClass('active');
                } else {
                    $('.totop').removeClass('active');
                }
                if( $(this).scrollTop() > $('.header .header-top').outerHeight() ){
                    $('.main').addClass('header-fixed');
                }else{
                    $('.main').removeClass('header-fixed');
                }
            });
            $('.totop').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
        },
        components : { 
            CartFooter 
        },
        computed:{
            social(){
                return this.$store.state.default_data?this.$store.state.default_data.social : null
            },
            menu_footer(){
                return this.$store.state.default_data ? this.$store.state.default_data.menu_footer : null
            },
            hotline(){
                return this.$store.state.default_data ? this.$store.state.default_data.hotline : null
            },
            email(){
                return this.$store.state.default_data ? this.$store.state.default_data.email : null
            },
            address(){
                return this.$store.state.default_data ? this.$store.state.default_data.address : null
            },
            footer_logo(){
                return this.$store.state.default_data ? this.$store.state.default_data.footer_logo : null
            },
            gov(){
                return this.$store.state.default_data ? this.$store.state.default_data.gov : null
            },
            copyright(){
                return this.$store.state.default_data ? this.$store.state.default_data.copyright : null
            },
            menu_footer(){
                return this.$store.state.default_data ? this.$store.state.default_data.menu_footer : null
            },
            menu_footer1(){
                return this.$store.state.default_data ? this.$store.state.default_data.menu_footer1 : null
            },
            pagefb(){
                return this.$store.state.default_data ? this.$store.state.default_data.fanpage : null
            },
            demo_mode(){
                 return this.$store.state.default_data.demo_mode ? this.$store.state.default_data.demo_mode.allow_show : false
            }
        }
    }
</script>

