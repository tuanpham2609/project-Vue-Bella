<template>
    <div class="col-xs-12 col-sm-8 col-md-9">
        <div class="profile-order row">
            <div class="col-sm-6 col-xs-12">
                <div class="order-title">
                    <h4>Thông tin người nhận hàng:</h4>
                </div>
                <div class="order-content">
                    <p>
                        <span>Thông tin đơn hàng:</span>
                        <strong v-if="data">{{data.name}}</strong>
                    </p>
                    <p>
                        <span>Email: </span>
                        <span>{{data.email}}</span>
                    </p>
                    <p>
                        <span>Số điện thoại: </span>
                        <span>{{data.phone}}</span>
                    </p>
                    <p>
                        <span>Địa chỉ nhận hàng: </span>
                        <span>{{data.address}}</span>
                    </p>
                </div>
            </div>
            <div class="col-sm-6 col-xs-12">
                <div class="order-title">
                    <h4>Thông tin đơn hàng:</h4>
                </div>
                <div class="order-content">
                    <p>
                        <span>Mã đơn hàng: </span>
                        <strong>{{data.code}}</strong>
                    </p>
                    <p>
                        <span>Ngày đặt: </span>
                        <span>{{data.created_at|dd-mm-yyyy}}</span>
                    </p>
                    <p>
                        <span>Hình thức thanh toán: </span>
                        <span v-if="data">{{data.payment_method_name}}</span>
                    </p>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="order-table">
                    <div class="text-center">
                        <h3>Chi tiết đơn hàng</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="td-index">#</th>
                                    <th class="td-name">Sản phẩm</th>
                                    <th class="td-price">Giá</th>
                                    <th class="td-quantity">Số lượng</th>
                                    <th class="td-total-price">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in data.details" :key="index">
                                    <td class="td-index">{{index}}</td>
                                    <td class="td-name" ><span v-if="item.product">{{item.product.name}}</span> </td>
                                    <td class="td-price">{{item.price|money}}</td>
                                    <td class="td-quantity">{{item.quantity|money}}</td>
                                    <td class="td-total-price">{{item.price*item.quantity|money}}</td>
                                </tr>
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colspan="4" class="td-title">Thành tiền : </th>
                                    <th class="td-value">{{sum_price|money}}</th>
                                </tr>
                                <tr>
                                    <th colspan="4" class="td-title">Giảm giá (#5345345) : </th>
                                    <th class="td-value">{{discount|money}}</th>
                                </tr>
                                <tr>
                                    <th colspan="4" class="td-title">Phí giao hàng : </th>
                                    <th class="td-value">{{delivery_ship|money}}</th>
                                </tr>
                                <tr>
                                    <th colspan="4" class="td-title">Tổng tiền : </th>
                                    <th class="td-value"><strong>{{sum|money}}</strong></th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            </div>
        </div>
        <router-link to="/dashboard/orders" class="btn btn-back"><i class="fa fa-chevron-left"></i>Quay lại</router-link>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            title : '',
            token:'',
            data:[],
            sum_price:0.0,
            sum:0.0,
            discount:0.0,
            delivery_ship:0.0,
        }
    },
    head: {
            title: function () {
                return {
                    inner:'Chi tiết đơn hàng',
                    separator: '|',
                    complement:this.title
                }
            },
            //omited
    },
    methods:{

        loadDetailOrder(callback){

            var _this = this;
            var send_data = {

                order_token:this.token,
                
            }
             var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain :this.domain
                };
              this.callAPI('cart/order-by-token','post',send_data, headers )
                .then((res)=>{
                
                        if(res.data.success){
                            
                            _this.data = res.data.data;

                        }
                         try{
                            callback(  res )
                        }catch(e){}
                       
                })
        },
      
    },
    computed:{
            title1(){

                 return (  this.$store.state &&this.$store.state.hasOwnProperty('default_data') && this.$store.state.default_data.default_meta.data ) ? this.$store.state.default_data.default_meta.data.meta_title : '';
            },
     },
     mounted(){
        if(this.$store.state.open_footer_cart == true){

                this.$store.state.open_footer_cart = false;
        }
        this.title = this.title1;
        this.loadDetailOrder(()=>{
            this.sum_price = 0.0;
            this.discount = 0.0;
            this.data.details.forEach((item)=>{
                
                this.sum_price = this.sum_price + (item.price*item.quantity);
                this.discount = this.discount + (item.discounted_value*item.quantity);
               
             
            });
            this.discount = this.data.discounted_value;
            this.delivery_ship = this.data.delivery_cost;
            this.sum = this.sum_price - this.discount + this.delivery_ship;
            this.$forceUpdate();
        });
    },
    created(){
         if(this.$route.hasOwnProperty('query')){

                if(this.$route.query.hasOwnProperty('token')){

                     this.token = this.$route.query.token;
                }
               
        }
        
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
