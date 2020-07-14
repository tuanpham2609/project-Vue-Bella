<template>
    <div>
        <div v-if="$route.query.type=='product'">
            <productCategory :source="alias_data"></productCategory>
        </div>
        <div v-else>
            <post :source="alias"></post>
        </div>
    </div>
</template>
<script>
import productCategory from '@/components/product/product-category'
import Post from '@/components/post/post-category'
export default {
     components:{
        productCategory,
        Post
     },
     
     created(){

         
         this.$store.state.search = true;
      
         
     },
     mounted(){
     
          if(this.$route.query.type == 'product'){
              
                this.$store.state.search_type = 'product';
                
            }else{
                
                this.$store.state.search_type = 'post';
                
            }
         this.$store.dispatch('loadPageResource', this.$route.params.alias);
     
     },
     computed:{
          alias(){
                return this.$store.state.alias_data;
            }
     },
     watch:{
         '$route.query' : function(){

                 if(this.$route.query.type == 'product'){
                        this.$store.state.search_type = 'product';
                         
                    }else{
                        
                        this.$store.state.search_type = 'post';
                        
                    }
         }
     }
     
}
</script>

