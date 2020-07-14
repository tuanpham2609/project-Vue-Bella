export default{
    data(){
        return {
            api : document.body.dataset.api,
            domain : document.body.dataset.domain,
            theme_uri : document.body.dataset.themeUri,
            page_structs : ['news', 'contact', 'about', 'product'],
            form : {
                inValid(scope){
                    var invalid = false
                    if( ! scope || scope == undefined ){ return false }
                    for( var  field in scope ){
                        if( scope[field].invalid ){
                        return true
                        }
                    }
                    return false;
                }
            }
        }
    },
    // created(){
    //     console.log(document.body.dataset)
    // },
    methods : {
        isValidObject( _object ){
            return (typeof _object !== "undefined" && _object === undefined && _object ) 
        },
        closeMobileMenu(){
            $("#body").removeClass("menu-open")
            $("#btn-toggle").removeClass("active")
            $("#menu").removeClass("open")
            $("body").removeClass("menu-open")
            $("body").removeClass("search-open")
        },
        getSeoTitle( _object ){
            var metatag = null;
            _object = (typeof _object === "undefined" || _object === undefined || ! _object ) ? {} : _object
            if( (typeof _object !== "undefined") && _object !== undefined && _object  ){
                metatag = _object.hasOwnProperty('metatag') ? 
                    _object.metatag : 
                    ( _object.hasOwnProperty('data') ? _object.data : null );
            }
            if( ! metatag ){
                metatag = {
                    meta_title : _object.hasOwnProperty('name') ? _object.name : '',
                    meta_description : '',
                    meta_keyword : '',
                };
            }else{
                if(! metatag.meta_description || metatag.meta_description === '' ){
                    metatag.meta_description = _object.hasOwnProperty('meta_description') ? _object.meta_description : '';
                }
            }
            return metatag;
        },
        getSeoTag(store , _object, content_type = 'website' ){
            var default_seo =  store.state.default_data.home_meta ? 
                this.getSeoTitle(store.state.default_data.home_meta) : {};
            if( ! _object ){
                return [
                    // Google+ / Schema.org
                    { i: 'name', c: default_seo.meta_title },
                    { i: 'description', c:  default_seo.meta_description },
                    // twitter
                    { n: 'twitter:title', c: default_seo.meta_title  },
                    { n: 'twitter:description', c: default_seo.meta_description },
                    { p: 'twitter:image', c: default_seo.meta_image ? default_seo.meta_image.path : '' },
                    // Facebook / Open Grap
                    { p: 'og:type', c: content_type }, 
                    { p: 'og:url', c: window.location.href },   
                    { p: 'og:locale', c: 'vi_VN' },
                    { p: 'og:title', c: default_seo.meta_title },
                    { p: 'og:description', c: default_seo.meta_description },
                    { p: 'og:image', c: default_seo.meta_image ? default_seo.meta_image.path : '' }, 
                ];
            }
           
            var object_seo =  _object ? 
                this.getSeoTitle(_object) : {};
                return [
                    // Google+ / Schema.org
                    { i: 'name', c: object_seo.meta_title + ' | ' + default_seo.meta_title },
                    { i: 'description', c:  default_seo.meta_description },
                    // twitter
                    { n: 'twitter:title', c:  object_seo.meta_title + ' | ' + default_seo.meta_title },
                    { n: 'twitter:description', c: default_seo.meta_description },
                    { p: 'twitter:image', c: default_seo.meta_image ? default_seo.meta_image.path : ( default_seo.meta_image ? default_seo.meta_image : '') },
                    // Facebook / Open Grap
                    { p: 'og:type', c: content_type }, 
                    { p: 'og:url', c: window.location.href },   
                    { p: 'og:locale', c: 'vi_VN' },
                    { p: 'og:title', c: object_seo.meta_title + ' | ' + default_seo.meta_title },
                    { p: 'og:description', c: default_seo.meta_description },
                    { p: 'og:image', c: default_seo.meta_image ? default_seo.meta_image.path : ( default_seo.meta_image ? default_seo.meta_image : '') }, 
                ];
        },
        changeFavicon(new_icon){
            var link = document.createElement('link'),
            oldLink = document.getElementById('dynamic-favicon');
            link.id = 'dynamic-favicon';
            link.rel = 'shortcut icon';
            link.href = new_icon;
            if (oldLink) {
                document.head.removeChild(oldLink);
            }
            document.head.appendChild(link);
        },
        callAPI( link = '', method = 'post', data = {}, headers = {} ){
            var link_api = this.api + link
            return this.$axios[method]( link_api, data, { headers : headers } );

        },
        getLocalStore( key, default_value = {}, parse = true ){
            var _local = localStorage.getItem(key);
            if( _local && _local !== undefined ){
                return parse ? JSON.parse(_local) : _local
            }
            return default_value
    
        },
        percenRating(item, index){
            if( ! item || typeof item !== 'object' ){
                return 0;
            }
            var counters = item.hasOwnProperty('comment_counters') ? item.comment_counters : {};
            var rating_number = counters.hasOwnProperty('comment_count') ? counters.comment_count : 0;
            var star_data = counters.hasOwnProperty('comment_count') ? counters.comment_count : 0;
            var star_value = star_data.hasOwnProperty(index) ? star_data[index] : 0;
            return (star_value / rating_number) * 100;
        },
        PromotionPrice( product, type = 'max' ){  
            if( ! product.parent_id || product.parent_id == '' ){
                if(product.children_variant && product.children_variant.length){
                    var max = null;
                    var min = null;
                    product.children_variant.forEach((i)=>{
                        var current_price_promotion_web = i.price_promotion_web && ! isNaN(i.price_promotion_web) ? parseFloat( i.price_promotion_web ) : 0
                        if( current_price_promotion_web != null ){
                            if( min == null || min > current_price_promotion_web ){
                                min = current_price_promotion_web
                            }
                            if( max == null || max < current_price_promotion_web ){
                                max = current_price_promotion_web
                            }
                        }
                    })
                    if( type == 'max' ){
                        return (max != null) ? max : ( (min != null) ? min : 0 )
                    }
                    return (min != null) ? min : ( (max != null) ? max : 0 )
                }
            }
            return product.price_promotion_web && ! isNaN(product.price_promotion_web) ? parseFloat( product.price_promotion_web ) : 0
        },
        getSession(key, default_value = {}){
            var _local = sessionStorage.getItem(key);
            if( _local && _local !== undefined ){
                return JSON.parse(_local)
            }
            return default_value
        },
        getSEOTitle( title, store ){
            if( store.state.default_data.default_meta.title ){
                return title + ' | ' + store.state.default_data.default_meta.title;
            }
            return title;
        },
        /** Lấy giá thực tế của sản phẩm */
        getWebPirce( product ){
            var price = product.price_promotion_web && ! isNaN(product.price_promotion_web) ? parseFloat( product.price_promotion_web ) : null
            if( price ){
                return price
            }
            return product.price_sale_web && ! isNaN(product.price_sale_web) ? parseFloat( product.price_sale_web ) : 0
        },
        
        /** Lấy phần trăm giảm giá của sản phẩm */
        discountPersen( product ){
            if( ! product ){ return 0 }
            
            if( product.parent_id != '' ){
                var price_promotion_web = product.hasOwnProperty('price_promotion_web') && !isNaN(product.price_promotion_web) ? parseFloat( product.price_promotion_web ) : null;
                if( price_promotion_web == null || price_promotion_web == price_sale_web || price_promotion_web == 0){ return 0 }
                var price_sale_web = product.hasOwnProperty('price_sale_web') && !isNaN(product.price_sale_web) ? parseFloat( product.price_sale_web ) : 0;
                if( price_promotion_web >= price_sale_web ){ return 0 }
                var discounted =( price_sale_web * 100 ) / price_promotion_web
                return 100 - discounted
            }else{
                var max_discounted = 0
                if( product.children_variant && product.price_sale_web.length ){
                    product.children_variant.forEach((i)=>{
                        var current_discounted = 0
                        var price_promotion_web = i.hasOwnProperty('price_promotion_web') && !isNaN(i.price_promotion_web) ? parseFloat( i.price_promotion_web ) : null;
                        if( price_promotion_web !=  null && price_promotion_web != price_sale_web ){  
                            var price_sale_web = i.hasOwnProperty('price_sale_web') && !isNaN(i.price_sale_web) ? parseFloat( i.price_sale_web ) : 0;
                            if( price_promotion_web >= price_sale_web ){ current_discounted = 0 }
                            current_discounted = ( 100 * price_promotion_web ) / price_sale_web 
                            if( current_discounted > max_discounted ){ 
                                max_discounted = current_discounted
                            }
                        }
                  
                    }) 
                    return 100 - max_discounted
                }else{
                   
                    var price_promotion_web = product.hasOwnProperty('price_promotion_web') && !isNaN(product.price_promotion_web) ? parseFloat( product.price_promotion_web ) : null;
                    if( price_promotion_web == null || (price_promotion_web == price_sale_web) || price_promotion_web == 0 ){ return 0 }
                    var price_sale_web = product.hasOwnProperty('price_sale_web') && !isNaN(product.price_sale_web) ? parseFloat( product.price_sale_web ) : 0;
                    if( price_promotion_web >= price_sale_web ){ return 0 }
                    var discounted =  (  price_promotion_web * 100 ) / price_sale_web 
                    return 100 - discounted
                }
               
            }
        },
        /** Lấy giá cho sản phẩm  */
        getWebPrice( product ){
            if( product.children_variant && product.children_variant.length ){
                var variant_price = 0
                product.children_variant.forEach((v)=>{
                    if( v.is_represent ){
                        variant_price = v.price_sale_web
                        return variant_price
                    }
                })
                return variant_price
            }else{
                return product.price_sale_web
            }
        },
        incrementQuantity(product, increment = true, callback ){
            if( ! product ){ return; }
            if( ! product.hasOwnProperty('quantity') || isNaN( product.quantity ) ){
                product.quantity = 1;
            }
            if( increment ){
                product.quantity++;
            }else if( product.quantity > 1 ){
                product.quantity--;
            }
            if( typeof callback === 'function' ){
                try{
                    callback()
                }catch(e){}
            }
        },
        showNotification(message, icon , type, time ){
            icon  = icon == null ? 'info' : icon;   
            type  = type == null ? 'success' : type ;
              $.notify({
                  icon: icon,
                  message: message
              }, {
                  type: type,
                  timer: time,
                  delay: 500,
                  newest_on_top: true,
                  animate: {
                      enter: 'animated fadeInDown',
                      exit: 'animated fadeOutRight'
                  },
              });
          },
          mappingResponse(resource, object) {
            if (!object.hasOwnProperty('pagination')) {
                object.pagination = {};
            }
            object.data = resource.hasOwnProperty('data') ? resource.data : [];
            for (var key in object.pagination) {
    
                if (resource.hasOwnProperty(key)) {
                    object.pagination[key] = resource[key];
                }
            }
            var delay = object.hasOwnProperty('delay') && !isNaN(object.delay) ? object.delay : 10;
            setTimeout(function () {
                object.loading = false;
            }, delay);
        },
        inFavorite(store,product_id){
           return store.state.favorite_products && store.state.favorite_products.hasOwnProperty( product_id );
        },
        inCart(store,product_id){
            return store.state.carts && store.state.carts.hasOwnProperty( product_id );
         },
        /** lấy 1 đoạn theo số từ */
        exceprt(str, number_word = 60 ){
            str = str.replace(/^(.{3}[^\s]*).*/, "$1");
            return new DOMParser().parseFromString(str, "text/html").body.innerHTML;
        },
        /** so khớp 2 mảng */
        comparseArray(array1, array2){
            return array2.filter(function(i){
                return array1.indexOf(i) == -1
            }).length == 0
        },
        isPrice( value ){
            return value != '' && ! isNaN(value)
        },
        currentVariant( product, properties ){
            if( ! product.children_variant || product.children_variant.length == 0 ){
                return null;
            }
        },
        alias( alias ){
            
            var result = null
            alias = (typeof alias === "undefined" || alias === undefined || ! alias ) ? '' : alias
            if( alias.length ){
                if( alias[0] == '/' ){
                    alias = alias.substring(1);
                }
            }
            if( alias != '' && alias != '#' ){
                result = {name: 'alias', params: {alias : alias } }
            }
            result = alias != '' ? alias : '/';
            return result
        },
        clone( object ){
            try{
                return JSON.parse( JSON.stringify( object ) );
            }catch(e){
                return null;
            }
        }
    }
    
}