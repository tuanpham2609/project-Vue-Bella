<template>
  <div id="default-layout" class="main">
    <div id="loading-box" class="text-center">
        <img :src="theme_uri + 'static/images/grid/load3.gif'" />
    </div>
    <div id="nav"></div>
    <app-header />
    <router-view />
    <app-footer />
    <product-modal :source="$store.state.current_product" />
  </div>
</template>
<style  scope>
    #loading-box{
        z-index: 100000000000;
        background: #fff;
        position: fixed;
        height: 100%;
        width: 100%;
        top: 50%;
        left: 50%;
       transform: translate(-50% , -50%);
        transition: all .4s ease-out;
        opacity: 1;
        height: 100%;
    }
    #loading-box img{
        max-width: 200px;
        height: auto;
        margin: 120px auto;
    }
    #loading-box.close{
        opacity: 0;
        display: none;
    }
</style>
<script>
  import AppHeader from '@/layouts/partials/header'
  import AppFooter from '@/layouts/partials/footer'
  import ProductModal from '@/components/product/product-modal'
  export default {
    name : 'layoutDefault',
    components : {
      AppHeader,
      AppFooter,
      ProductModal
    },
    data(){
        return {
            // domain : '',
            path1:''
        }
    },
    // beforeCreate() {
    //       this.$store.state.carts = this.getLocalStore('carts')
    // },
    created() {
        var user = this.getSession('user', null)
        var user_token = this.getLocalStore('user_token', null, false);
        if( !user ){
            if( user_token ){
                var headers = {
                    Authorization : this.$store.state.user_token,
                    Domain : this.$store.state.domain
                }
                this.callAPI( 'user/view-profile','post', headers)
                .then((res)=>{
                    if(res.data.success){
                        sessionStorage.setItem('user', JSON.stringify(res.data.data))
                        this.$store.state.user = this.getSession('user', null)
                    }
                })
            }
        }else{
            if(!user_token){
                sessionStorage.removeItem('user')
                this.$store.state.user = null
            }
        }
        this.$store.dispatch('initClientData')
        this.$store.dispatch('loadDefaultResources')
    },
    computed:{},
    mounted(){
        this.$store.state.loading_alias = true
        setTimeout(() => {
            var html = document.getElementsByTagName("html")[0].innerHTML
            this.$store.dispatch('updateView', {
                content : html,
                route : this.$route.params.alias
            }) 
        }, 500)
        this.$store.state.open_footer_cart = false
        
    },
    watch:{
        '$store.state.default_data.favicon' : function(new_val){
            if(new_val.data && new_val.data.path != ''){
                if(new_val.data && new_val.data.path !== '' ){
                    this.changeFavicon(this.domain + '/' + new_val.data.path )
                }
            }
        },
         '$store.state.default_data.theme_color' : function(new_val){
             if( typeof new_val !== "undefined" && new_val ){
                 var style_uri = $('body').data('theme-uri') + 'static/css/style-' +  new_val.data +'.css';
                $('#theme_color').attr('href', style_uri)
             }
          
        },
        '$route.path' : function(){
            this.closeMobileMenu()
            this.$store.commit('checkLogin')
            if( this.$route.params.alias && this.$route.params.alias != '' ){
                this.$store.dispatch('loadPageResource', this.$route.params.alias)
            }
            this.$store.state.open_footer_cart = false
            if( ! this.$route.params.alias ){
                $('#loading-box').removeClass('close')
            }
            setTimeout(()=>{$('#loading-box').addClass('close');}, 800)
            if(this.$route && this.$route.params && this.$route.params.alias =='search'){
                this.$store.state.search = true
            }
              if(!this.$route.query.hasOwnProperty('keyword_search')){
                  this.$store.state.search = ''
                  this.$store.state.search_type = ''
            } 
            setTimeout(() => {
                var html = document.getElementsByTagName("html")[0].innerHTML
                this.$store.dispatch('updateView', {
                    content : html,
                    route : this.$route.params.alias
                })
            }, 500)
        },
        '$store.state.default_data': function(){
            clearTimeout(this.$store.state.timeout)
            $('#loading-box').removeClass('close')
            this.$store.state.timeout = setTimeout(()=>{$('#loading-box').addClass('close')}, 800)
        }
    }
  }
</script>
