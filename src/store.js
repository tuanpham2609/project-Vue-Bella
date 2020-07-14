
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';
import helper from '@/plugins/helper.js'
Vue.use( Vuex )
export const store = new Vuex.Store({
        state: {
            search:'',
            search_type:'',
            open_footer_cart : false,
            default_data : {
                default_meta : {
                    title : ''
                }
            },
            alias_data : {},
            current_product : null,
            api : $('body').data('api'),
            domain : $('body').data('domain'),
            loading_alias : false,
            static_alias : [ 'checkout', 'login', 'register', 'cart' ],
            alias_pages : {
                contact : {
                    prefix_resources : ['contact','contact_page_title']
                },
                news : {
                    resource_filters :  ['sidebar_post_category', 'sidebar_post', 'post_perpage','post_breadcrumb','post_page_title']
                },
                about:{
                    resource_filters:['about_page_title']
                },
                "product" : {
                    resource_filters :  ['product_sort', 'product_view', 'product_perpage', 'sidebar_price', 'sidebar_property', 'sidebar_category','product_breadcrumb',
                        'product_detail_breadcrumb','product_page_title']
                },
                "product_single":{
                    prefix_resources : ['product_detail_breadcrumb']
                },
                "post_single": {
                    prefix_resources : ['post_detail']
                }
            },
            append : {  
                resources:{
                    checkboxs:[],
                    sort_by:'latest'
                },
            },
            user : helper.getSession('user', null),
            user_token :  helper.getLocalStore('user_token', null, false),
            carts: helper.getLocalStore('carts', {}),
            favorite_products: helper.getLocalStore('favorite_products'),

        },
        getters:{
            carts(state){
                return state.carts
            }
        },
        mutations: {
            /** kiểm tra tính đăng nhập của người dùng */
            checkLogin(state){
            
                if(state.user){
                    var headers = {
                        Authorization : state.user_token,
                        Domain : state.domain
                    };
                    var send_data = {
                        token: state.user_token
                    }

                    axios.post( helper.api('user/check-expired'), send_data, { headers : headers})
                        .then((res)=>{
                            if(res.data.result == false){
                                this.commit('logout');
                            }
                        })
                }
            },
            setDefauldata: function (state, data) {
                state.default_data = data;
            },
            /** đóng/mở khung giỏ hàng */
            toggleFooterCart(state){
                state.open_footer_cart = ! state.open_footer_cart
            },
            /** hiện thị modal quickview sản phẩm */
            showQuickView( state, item ){
                state.current_product = item;
                
                $('#modal-quick-view').on('hidden.bs.modal', function(){
                    state.current_product = null;
                })
                $('#modal-quick-view').on('show.bs.modal', function(){
                    setTimeout(()=>{
                        
                        $('#modal-quick-view .modal-body').css({ height : $('#modal-quick-view .modal-body').height() })
                    }, 1000 * 2)
                })
                $('#modal-quick-view').modal('show');
            
            },
            /** ẩn modal quickview sản phẩm */
            hideQuickView(state){
              
                $('#modal-quick-view').modal('hide');
                if( Object.keys(state.carts).length > 0 && state.current_product ){
                    if( ! state.carts.hasOwnProperty(state.current_product._id) ){
                        state.current_product.quantity = 1
                    }
                    if( state.current_product.children_variant && state.current_product.children_variant.length ){
                        state.current_product.children_variant.forEach((i)=>{
                            if( !state.carts.hasOwnProperty(i._id) ){
                                i.quantity = 1
                            }
                        }); 
                    }
                }
                state.current_product = null;
            },
            
             /** xóa 1 sản phẩm khỏi giỏ hàng */
             removeFromCart(state, product){
                var current_cart = state.carts;
                if( current_cart.hasOwnProperty(product._id) ){
                    delete current_cart[product._id];
                    state.carts = {};
                    state.carts =current_cart;
                    localStorage.setItem('carts', JSON.stringify(state.carts));
                    var name = product.name
                    if( product.parent_id != '' ){
                        name = product.VariantName
                    }
                    helper.showNotification('Đã xóa sản phẩm "' + name + '" khỏi giỏ hàng', 'shopping_cart', 'danger' )
                }
               
                
            },
            /** xóa 1 sản phẩm khỏi yêu thích */
            removeFromLike(state, product){
                var current_likes = state.favorite_products;
                if( current_likes.hasOwnProperty(product._id) ){
                    delete current_likes[product._id];
                    state.favorite_products = {};
                    state.favorite_products =current_likes;
                    localStorage.setItem('favorite_products', JSON.stringify(state.favorite_products));
                    var name = product.name
                    if( product.parent_id != '' ){
                        name = product.VariantName
                    }
                    helper.showNotification('Đã xóa sản phẩm "' + name + '" khỏi yêu thích', 'shopping_cart', 'danger' )
                }
               
                
            },
            /** Cập nhật số lượng giỏ hàng của sản phẫm */
            updateCartQuantity(state, {product }){
                var current_cart = state.carts
                product.quantity = isNaN( product.quantity ) ? 1 : parseInt( product.quantity );
                if( ! current_cart.hasOwnProperty(product._id) ){
                    current_cart[product._id] = product;
                }else{
                    current_cart[product._id].quantity = product.quantity;
                }
                state.carts = {}
                state.carts = current_cart
                localStorage.setItem('carts', JSON.stringify(state.carts));
                helper.showNotification('Cập nhật giỏ hàng thành công!!', 'shopping_cart')
            },
            /** làm sạch giỏ hàng */
            clearCart(state){
                state.carts = {};
                localStorage.removeItem('carts');
            },
            /** chọn & bỏ chọn sản phẩm khỏi danh sách sản phẩm yêu thích */
             toggleFavorite(state, product) {
                var localFavorites = localStorage.getItem('favorite_products');
                if (localFavorites) {
                    localFavorites = JSON.parse(localFavorites);
                    state.favorite_products = localFavorites;
                }
                if (state.favorite_products.hasOwnProperty(product._id)) {
                    
                    helper.showNotification('Bạn vừa loại sản phẩm "' + product.name + '" khỏi danh sách yêu thích!!', 'favorite_border', 'warning');
                    delete state.favorite_products[product._id];
                    product.in_favorite = false;
                } else {
                    helper.showNotification('Bạn vừa thêm sản phẩm "' + product.name + '" vào danh sách yêu thích!!', 'favorite_border');
                    state.favorite_products[product._id] = product;
                    product.in_favorite = true;
                }
                localStorage.setItem('favorite_products', JSON.stringify(state.favorite_products));
            },
            updateUser(state,img){

                state.user.image = img;
                 sessionStorage.setItem('user', JSON.stringify(state.user));
           },
            /** Xử lý thông tin user */
            saveUserData( state, info ){
               
                if( info.hasOwnProperty('data') ){
                    state.user = info.data;
                    sessionStorage.setItem('user', JSON.stringify(info.data));
                    localStorage.setItem('user',JSON.stringify(info.data) );
                }
                if( info.hasOwnProperty('token') ){
                    localStorage.setItem('user_token', info.token );
                    state.user_token = info.token;
                }
            },
            /**  */
            saveUrl( state, url ){
                sessionStorage.setItem('prev_url', url );
                state.prev_url = url;
            },
            /** đăng xuất */
            logout( state, callback ){
               localStorage.removeItem( 'user_token' )
               localStorage.removeItem('user')
               sessionStorage.removeItem('user')
               state.user = null
               if( typeof callback == 'function' ){
                   callback();
               }
            }

        },
        actions: {
             /** lấy data cho layout */
             updateView({commit, state}, html ) {
    
                var send_data = {
                    html: html
                };
                 axios.post(state.api+'view/update-view', send_data, {headers: {'domain': state.domain }});
            },
            /** khởi tạo ứng dụng */
            initClientData(state){
                
                state.alias = {};
                var localCarts = localStorage.getItem('carts');
             
                if (localCarts && typeof localCarts != "undefined") {
                    localCarts = JSON.parse(localCarts);
                    Object.values(localCarts).forEach((product)=>{
                        if(!product.hasOwnProperty('quantity')){
                            product.quantity = 1;
                        }
                    });
                    state.carts = localCarts;
                }
            },
            /** Tải tài nguyên mặc định cho layout */
             async loadDefaultResources({ state,commit }){
                $('#loading-box').removeClass('close');
                var send_data = {
                     resource_filters : [
                         "logo",
                         "favicon",
                         "default_meta",
                         "header_text",
                         "header_search_category",
                         "categories_is_product",
                         "gov",
                         "info_hotline",
                         "info_email",
                         "address",
                         "copyright",
                         "social",
                         "feedback",
                         "default_meta",
                         "hotline",
                         "email",
                         "fanpage",
                         "demo_mode",
                        "theme_color"
                     ],
                     prefix_resources : [
                         "menu",
                         "footer",
                     ]
                 }
                 var headers = {
                    Domain : state.domain
                 }
                /** home page */
                const home_resources = [
                    "slider",
                    "popularproduct",
                    "adv",
                    "full_adv",
                    "hot_products",
                    "policy",
                    "banners",
                    "tabproduct",
                    "advpost",
                    "brand",
                ]
                const home_prefix = [
                    "home",
                    "form_subscribe"
                ]
                home_resources.forEach((i)=>{
                    if( send_data.resource_filters.indexOf( i ) === -1 ){
                        send_data.resource_filters.push(i)
                    }
                })
                home_prefix.forEach((i)=>{
                    if( send_data.prefix_resources.indexOf( i ) === -1 ){
                        send_data.prefix_resources.push(i)
                    }
                })
                /** --- end home page ----*/
               var res = await axios.post( state.api + 'page-data/resources', send_data, { headers : headers })

                res = res.hasOwnProperty('data') ? res.data : {}
                if(res.success){
                    state.default_data = res.data ? res.data : {};
                   
                    //commit('setDefauldata', res.data ? res.data : {} )
                }
                // setTimeout(()=>{
                //     $('#loading-box').addClass('close');
                //     $("html, body").animate({ scrollTop: 0 },0);
                // }, 4000)
            
            
            },
            /** Tải tài nguyên cho trang */
            async loadPageResource({state}, page){
                var send_data = {
                    resource_filters : [],
                    prefix_resources : [],
                    append:state.append,
                    search:state.search,
                    search_type:state.search_type
                }
                switch ( page ){
                    /** load data trang chủ */
                    // case  '' :
                    //     send_data.resource_filters = [
                    //         "slider",
                    //         "popularproduct",
                    //         "adv",
                    //         "policy",
                    //         "banners",
                    //         "tabproduct",
                    //         "brand"
                    //     ];
                    //     send_data.prefix_resources = [
                    //         "home",
                    //         "form_subscribe"
                    //     ];
                    // break;
                    default:

                        break;
                }
                if( (send_data.resource_filters.length == 0 &&  send_data.prefix_resources == 0 ) && page === '' ){ return }

                send_data.alias = page
                send_data.alias_pages = state.alias_pages
                var headers = {
                    Domain : state.domain
                }

                if( page !== '' ){
                    $('#loading-box').removeClass('close');
                    state.loading_alias = true;
                    var res = await axios.post( state.api + 'page-data/alias-resources', send_data, { headers : headers })
                    res = res.hasOwnProperty('data') ? res.data : {}
                    if( res.success ){
                        state.alias_data = res.data
                    }
                    state.loading_alias = false;
                    setTimeout(()=>{$('#loading-box').addClass('close')}, 500);
                    $("html, body").scrollTop(0);
                }



            }
        }
})