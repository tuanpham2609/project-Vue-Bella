<template>
    <div>
        <div class="col-xs-12 col-sm-8 col-md-9">
            <div class="profile-content">
                <div class="profile-history-orders">
                    <div class="profile-title text-center">
                        <h4>Lịch sử mua hàng</h4>
                    </div>
                    <hr>
                    <div class="table-responsive" v-if="orders.data.length < 0">
                        <div class="text-center">
                            <h4 class="text-primary">
                                Hiện chưa có lịch sử mua hàng nào !
                            </h4>
                        </div>
                    </div>
                    <div class="table-responsive" v-else>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Tổng tiền</th>
                                    <th>Địa chỉ </th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="(item,index) in orders.data" :key="index" @click="viewOrder(item.order_token)">
                                    <td class="td-code"><a  @click="viewOrder(item.order_token)">{{item.code}}</a></td>
                                    <td class="td-created"><a  @click="viewOrder(item.order_token)">{{item.created_at|dd-mm-yyyy}}</a></td>
                                    <td class="td-created"><a  @click="viewOrder(item.order_token)">{{item.total_price|money}}đ</a></td>
                                    <td class="td-address"><a  @click="viewOrder(item.order_token)">{{item.address}}</a></td>
                                    <td class="td-status">
                                        <span :class="['label', 'label-'+item.so_status_class_name]">
                                                <span v-if="item.so_status == 'draft'"><a  @click="viewOrder(item.order_token)">Đơn hàng đang xử lý</a></span>
                                                <span v-else> <a  @click="viewOrder(item.order_token)"> {{item.so_status_name}}</a></span>
                                            
                                        </span>
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {

        data() {

            return {
                title : '',
                orders:{
                    data: [],
                    pagination: {
                        current_page: 1,
                        limit_child: 4,
                        last_page: 1,
                        total: 0,
                        per_page: 10
                    },
                    filter: {
                        keyword: '',
                        status : 'active'
                    },
                }
            }
        },
        head: {
            title: function () {
                return {
                    inner:'Lịch sử mua hàng',
                    separator: '|',
                    complement:this.title
                }
            },
            //omited
        },
        methods:{
            viewOrder:function(token){
      
                 this.$router.push({ path: 'order-detail', query: { token: token }});
            }
        }
        ,
        mounted(){
            if(this.$store.state.open_footer_cart == true){

                this.$store.state.open_footer_cart = false;
            }
            this.title = this.title1;
        },
        created(){
            var _this = this;
            if( this.$store.state.user_token ){
                this.loading = true;
                var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain : this.$store.state.domain
                };
                var token ={
                    'token':this.$store.state.user_token
                }
                // axios.post( this.$store.state.api+'user/list-order', {'token':this.$store.state.user_token}, { headers :headers  })
                    this.callAPI( 'user/list-order','post', token, headers)
                    .then((res)=>{
                      
                       
                       if( res.data.success ){
                          
                            _this.mappingResponse(res.data.data,_this.orders);
                           
                            
                       }else{


                         // _this.$store.commit('logout', ()=>{_this.$router.push('/user/login')})
                       }
                      setTimeout(()=>{ _this.loading = false; }, 100);
                    });
            }
        },
        computed:{
            title1(){
                return (  this.$store.state &&this.$store.state.hasOwnProperty('default_data') && this.$store.state.default_data.default_meta.data ) ? this.$store.state.default_data.default_meta.data.meta_title : '';
            },
        },
        watch:{
            '$store.state.default_data.default_meta':function(new_val){
                    
               this.title = new_val.data.meta_title;
               if(new_val.data.meta_title != ''){
                    this.$emit('updateHead')
                     this.$forceUpdate();
               }
              
            },
             'title':function(){
              
                this.$emit('updateHead')
            }
        },
      
    }
</script>