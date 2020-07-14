<template>
    <div>
        <section class="wrapper" >
            <div class="section section-breadcrumb" style="
                background-image:url('upload/bella.iamsale.vn/slider/images/2018-07/8020_1530526598.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Thanh toán</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li class="active">Thanh toán</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="section section-payment">
                <div id="payment-page" class="container payment">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-md-7 ">
                            <div class="row">
                                <template v-if="!user"> 
                                    <div class="col-xs-12">
                                        <h3>Thông tin khách hàng</h3>
                                        <ul>
                                            <li>
                                                <label>
                                                    <input type="radio" v-model="custom" value="noaccount"> Tôi muốn mua hàng không cầntài khoản
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input type="radio" v-model="custom" value="login"> Đăng nhập
                                                </label>
                                            </li>
                                            <!-- <li>
                                                <label>
                                                    <input type="radio" v-model="custom" value="register"> Tạo tài khoản
                                                </label>
                                            </li> -->
                                        </ul>
                                    </div>
                                    <div class="col-xs-12">
                                        <!---->
                                        <form class="form-login" name="formLogin" data-vv-scope="formLogin"  @submit.prevent="submitLogin" v-if="custom == 'login'"
                                            >
                                            <div class="text-center">
                                                <h4>Đăng nhập</h4>
                                            </div>
                                            <div class="form-group">
                                                <input
                                                    v-validate="'required|email'" 
                                                    v-model="login.email"
                                                    name="login_email" 
                                                    id="login_email" 
                                                    class="form-control" />
                                                <span class="text-danger">
                                                    {{ errors.first('formLogin.login_email') }}
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="login_password">Mật khẩu</label>
                                                <input 
                                                    type="password"
                                                    v-validate="'required'"
                                                    v-model="login.password"
                                                    name="login_password" 
                                                    id="login_password" 
                                                    class="form-control" />
                                                <span class="text-danger">
                                                    {{ errors.first('formLogin.login_password') }}
                                                </span>
                                            </div>
                                            <div class="text-center">
                                                <button type="submit" class="btn btn-submit">
                                                    ĐĂNG NHẬP
                                                </button>
                                            </div>
                                        </form>
                                        <form v-if="custom == 'register'" class="form-login" method="post"  @submit.prevent="submitRegister"
                                            >
                                            <div class="text-center">
                                                <h4>Đăng ký</h4>
                                            </div>
                                            <div class="form-group"><label for="">Tên người dùng</label>
                                                <span class="help-block">
                                                    {{ errors.first('register.fullname') }}
                                                </span>
                                                <input type="text" v-model="form_register.fullname" name="fullname" v-validate="'required'" class="form-control" placeholder="Họ tên">
                                            </div>
                                            <div class="form-group"><label for="">Email</label>
                                                <span class="help-block">
                                                    {{ errors.first('register.email') }}
                                                </span>
                                                <input type="email" v-model="form_register.email" name="email" v-validate="'required|email'" class="form-control" placeholder="Email">
                                            </div>
                                            <div class="form-group"><label for="">Số điện thoại</label>
                                                <span class="help-block">{{ errors.first('register.phone') }}</span>
                                                <input type="text" v-model="form_register.phone" name="phone" v-validate="'required'" class="form-control" placeholder="Số điện thoại">
                                            </div>
                                            <div class="form-group"><label for="">Mật khẩu</label>
                                            <span class="help-block">
                                                    {{ errors.first('register.password') }}
                                                </span>
                                                <input type="password" v-model="form_register.password" name="password" v-validate="'required'" ref="password" class="form-control" placeholder="Mật khẩu">
                                            </div>
                                            <div class="form-group"><label for="">Xác nhận mật khẩu</label>
                                                <span class="help-block">
                                                    {{ errors.first('register.confirm_password') }}
                                                </span>
                                                <input type="password" v-model="form_register.confirm_password" name="confirm_password" v-validate="'required|confirmed:password'" class="form-control" placeholder="Xác nhận lại mật khẩu">
                                            </div>
                                            <div class="form-footer">
                                                <div class="form-group ">
                                                    <div class="text-center">
                                                        <button :disabled="form.inValid( fields.$register ) || sending" class="btn btn-submit">
                                                            <i v-if="sending" class="fa fa-spinner fa-spin" ></i> Đăng ký
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="text-center">
                                                        <p>Bạn đã tài khoản? <router-link to="/user/login" class="btn-link">Đăng nhập tại đây</router-link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-xs-12">
                                        <hr>
                                    </div>
                                </template>
                                <div class="col-xs-12">
                                    <h3>Thông tin người nhận</h3>
                                    <form  class="" data-vv-scope="formCustomer"  name="formCustomer">
                                        <div class="row row-flex">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <input v-validate="'required'" 
                                                        class="form-control" 
                                                        name="customer_full_name"
                                                        placeholder="Nhập tên"
                                                        v-model="form.fullname" />
                                                    <span class="text-danger">
                                                        {{ errors.first('formCustomer.customer_full_name') }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <input v-validate="'required|email'" name="customer_email" 
                                                        type="email" 
                                                        placeholder="Email liên hệ" v-model="form.email"  class="form-control">
                                                    <span class="text-danger">{{ errors.first('formCustomer.customer_email') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <input v-validate="'required'" name="customer_phone"  type="tel" placeholder="Số điện thoại" v-model="form.phone"  class="form-control">
                                                    <span class="text-danger">{{ errors.first('formCustomer.customer_phone') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <select v-validate="'required'" name="customer_province" v-model="form.city_id"   class="form-control">
                                                        <option value="">-- Chọn Tỉnh TP --</option>
                                                        <option v-for="(item,index) in $store.state.alias_data.provinces" :key="index" :value="item._id">{{item.name}}</option>
                                                    </select>
                                                    <span class="text-danger">{{ errors.first('formCustomer.customer_province') }}</span>
                                                
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <select :disabled="form.city_id ==''" 
                                                        :title="form.city_id == '' ? 'Vui lòng chọn tỉnh thành' : ''"
                                                        v-validate="'required'" name="customer_district" v-model="form.district_id"   class="form-control">
                                                        <option value="" >-- Chọn Quận/Huyện --</option>
                                                        <option v-for="(item,index) in districts" :key="index" :value="item._id">{{item.name}}</option>
                                                    </select>
                                                    <span class="text-danger">{{ errors.first('formCustomer.customer_district') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <select :disabled="form.district_id ==''" 
                                                        :title="form.district_id == '' ? 'Vui lòng chọn quận huyện' : ''"
                                                        v-validate="'required'" name="customer_ward" v-model="form.wards_id"   class="form-control">
                                                        <option value="" >-- Chọn Phường/Xã --</option>
                                                        <option v-for="(item,index) in wards" :value="item._id"  :key="index">{{item.name}}</option>
                                                    </select>
                                                    <span class="text-danger">{{ errors.first('formCustomer.customer_ward') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 ">
                                                <div class="form-group">
                                                    <input v-validate="'required'" name="customer_address"  type="text" placeholder="Địa chỉ" v-model="form.address"  class="form-control">
                                                    <span class="text-danger">{{ errors.first('formCustomer.customer_address') }}</span>
                                                </div>  
                                            </div>
                                            <div class="col-xs-12 ">
                                                <div class="form-group">
                                                    <textarea name="note" placeholder="Ghi chú đơn hàng" class="form-control" v-model="form.note"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-xs-12">
                                    <hr>
                                </div>
                                <div class="col-xs-12">
                                    <h3>Hình thức thanh toán</h3>
                                    <ul>
                                        <li class="mg-bottom-10"><label>
                                            <input type="radio" value="COD" v-model="form.payment_method">COD (Thanh toán tiền mặt khi mua hàng)</label></li>
                                        <!-- <li class="mg-bottom-10">
                                            <label><input type="radio" value="VnPay" v-model="form.payment_method">
                                                <img :src="theme_uri + 'static/images/icons/vnpay.png'" >
                                            </label>
                                        </li>
                                        <li class="mg-bottom-10">
                                            <label>
                                                <input type="radio" value="EWallet" v-model="form.payment_method">
                                                <img :src="theme_uri + 'static/images/icons/onepay.png'" >
                                            </label>
                                        </li> -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-5">
                            <h3>Đơn hàng của bạn</h3>
                            <hr>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th></th>
                                        <th class="td-total">Giá</th>
                                        <th class="td-total">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in $store.state.carts" :key="index">
                                        <td v-if="item.VariantName && item.VariantName!=''">
                                            <strong class="product-name" v-if="item.VariantName && item.VariantName!=''">
                                                {{ item.VariantName }}
                                            </strong>
                                            <strong class="product-name" v-else>
                                                {{ item.name }}
                                            </strong>
                                        </td>
                                        <td>x {{item.quantity}} </td>
                                        <td v-if="item.price_promotion_web > 0">{{item.price_promotion_web | money }}</td>
                                        <td v-else>{{item.price_sale_web | money}}</td>
                                        <td  v-if="item.price_promotion_web > 0" class="td-total">{{item.quantity * item.price_promotion_web | money}}đ</td>
                                        <td v-else class="td-total">{{item.quantity * item.price_sale_web | money}}đ</td>
                                    </tr>
                                    <template v-if="gift.length > 0">
                                        <tr>
                                            <td colspan="4" style="text-align:center;"><strong style="font-size:12pt;">Sản phẩm được tặng</strong></td>
                                        </tr>
                                        <tr v-for="(item,index) in gift" :key="index">
                                            <td class="td-name-product">
                                                <strong class="product-name" v-if="item.VariantName && item.VariantName!=''">
                                                    <router-link :to="$helper.alias(item.Alias)">{{ item.VariantName }}</router-link>
                                                </strong>
                                                <strong class="product-name" v-else>
                                                    <router-link :to="$helper.alias(item.Alias)">  {{ item.name }}</router-link>
                                                </strong>
                                            </td>
                                            <td>x {{item.value.quantity}}</td>
                                            <td v-if="item.price_promotion_web > 0">{{item.price_promotion_web | money }}</td>
                                            <td v-else>{{item.price_sale_web | money}}</td>
                                            <td  v-if="item.price_promotion_web > 0" class="td-total">{{item.value.quantity * item.price_promotion_web | money}}đ</td>
                                            <td v-else class="td-total">{{item.value.quantity * item.price_sale_web | money}}đ</td>
                                        </tr>
                                    </template>
                                    <template v-if="list_product_check_coupon.length > 0">
                                        <tr>
                                            <td colspan="4" style="text-align:center;"><strong style="font-size:12pt;">Bạn cần những sản phẩm này để giảm giá</strong></td>
                                        </tr>
                                        <tr v-for="(item,index) in list_product_check_coupon" :key="index">
                                            <td class="td-name-product">
                                                <strong class="product-name" v-if="item.VariantName && item.VariantName!=''">
                                                    <router-link :to="$helper.alias(item.Alias)">{{ item.VariantName }}</router-link>
                                                </strong>
                                                <strong class="product-name" v-else>
                                                    <router-link :to="$helper.alias(item.Alias)">  {{ item.name }}</router-link>
                                                </strong>
                                            </td>
                                            <td>x {{item.quntity}}</td>
                                            <td v-if="item.price_promotion_web > 0">{{item.price_promotion_web | money }}</td>
                                            <td v-else>{{item.price_sale_web | money}}</td>
                                            <td  v-if="item.price_promotion_web > 0" class="td-total">{{item.quntity * item.price_promotion_web | money}}đ</td>
                                            <td v-else class="td-total">{{item.quntity * item.price_sale_web | money}}đ</td>
                                        </tr>
                                    </template>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="4">
                                            <div class="coupon">
                                                <input type="text" v-model="form.coupon" placeholder="Mã giảm giá" class="form-control">
                                                <button class="btn btn-submit" @click.stop.prevent="_checkCoupon">Áp dụng</button>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colspan="3">Phí vận chuyển</th>
                                        <th class="td-fee">{{form.fee | money}}đ</th>
                                    </tr>
                                    <tr>
                                        <th colspan="3">Giảm giá : </th>
                                        <th class="td-discount">{{form.discount | money}}đ</th>
                                    </tr>
                                    <tr>
                                        <th colspan="3">Tạm tính : </th>
                                        <th class="td-discount">{{total | money}}đ</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4" class="td-total-price">
                                            <h4>Tổng tiền :{{total + form.fee | money}}đ</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colspan="4">
                                            <button :disabled="!canCheckout" class="btn  btn-block" 
                                                    :class="{ 'btn-submit' :  canCheckout }"  
                                                      @click.stop.prevent="submitChekout()">
                                                THANH TOÁN
                                            </button>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data() {
            return { 
                custom: 'noaccount',
                loading_login : false,
                login_message : '',
                login_success : true,
                loading_checkout : false,
                current_district : null,
                total_price :0.0,
                list_product_check_coupon:[],
                login : {
                    email : '',
                    password : ''
                },
                form_register:{
                    fullname : '',
                    email: '',
                    password : '',
                    confirm_password : '',
                    phone : ''
                },
                gift:{},
               list_order_map:{},
               quantity:0,
               form : {
                    fullname : '',
                    email : '',
                    phone : '',
                    city_id : '',
                    district_id : '',
                    wards_id : '',
                    address : '',
                    note : '',
                    payment_method: 'COD',
                    fee : 0,
                    discount : 0,
                    percent:0,
                    coupon : '',
                    discount_type : '',
               },
               has_coupon:false,
               check_type_coupon:'',
            }
        },
        computed:{
            
            total(){
                var total = 0;
                var _this = this;
                _this.list_order_map = [];
                if( this.$store.state.carts ){
                    Object.values(this.$store.state.carts).forEach((item)=>{

                        var _order = {

                            id:item._id,
                            quantity:item.quantity,
                        };
                        _this.quantity += item.quantity;
                        _this.list_order_map.push(_order);
                        if(item.price_promotion_web > 0){
                            total += item.quantity * item.price_promotion_web;
                        }else{
                            total += item.quantity * item.price_sale_web;
                        }
                    });
                }
                this.total_price = total;
                total = total - this.form.discount;
                return total;
            },
            districts(){
                this.form.district_id = '';
                if( this.$store.state.alias_data.districts ){
                    return this.$store.state.alias_data.districts.filter((item)=>{
                        return item.id_province == this.form.city_id;
                    });
                }else{
                    return [];
                }
             
            },
            wards(){
               
                if( this.$store.state.alias_data.wards && this.current_district ){
                     
                    return this.$store.state.alias_data.wards.filter((item)=>{
                        return item.district_id == this.current_district.vt_id;
                    });
                }else{
                    return [];
                }
             
            },
            error_login ( ){
                return this.errors.items.filter(function(i){
                    return i.scope == 'formLogin'
                }).length > 0;
            },
            user(){
                var user = this.$store.state.user;
                return user;
            },
            data : function(){
                return Object.values(this.$store.state.carts);
            },
            canCheckout(){
                return this.isValidForm('$formCustomer');
            }
        },
        created(){
           
             this.$store.state.append.resources = ['provinces','districts','wards'];
             
            this.$store.dispatch('loadPageResource', this.$route.name);
            console.log(this.$store.state);
          
            if(this.user){
                for( var key in this.user ){
                    if( this.user[key] ){
                        this.form[key] = this.user[key];
                    }
                  
                }
            }
            this.$validator.dictionary.merge({
                vi: {
                    custom: {
                        login_email: {
                            required: 'Vui lòng nhập email',
                            email : 'Email không hợp lệ'
                        },
                        login_password : {
                            required : 'Vui lòng nhập mật khẩu'
                        },
                        customer_full_name: {
                            required : 'Vui lòng nhập họ tên người nhận hàng'
                        },
                        customer_email:{
                            required : 'Vui lòng nhập email liên hệ',
                            email : 'Email không hợp lệ'
                        },
                        customer_phone:{
                            required : 'Vui lòng cung cấp số điện thoại liên hệ'
                        },
                        customer_province:{
                            required : 'Vui lòng chọn thành phố'
                        },
                        customer_district : {
                            required : 'Vui lòng chọn phường xã'
                        },
                        customer_ward:{
                            required : "Vui lòng chọn phường xã"
                        },
                        customer_address:{
                            required : "Vui lòng nhập dịa chỉ nhận hàng"
                        }
                    }
                }
            });
            
        },
        mounted(){
       
             $('body').removeClass('open-cart');
             $('#toggle-cart').trigger('click');
        },
        methods: {
            submitRegister(){
                this.$validator.validateAll('register')
                    .then((result)=>{
                        if( result ){
                            var clone = this.clone( this.form_register )
                            this.sending = true
                            delete clone.confirm_password
                            this.$axios.post( this.api('user/register'), clone, { headers : { Domain : this.domain } })
                                .then((res)=>{
                                    this.first = false
                                    setTimeout(()=>{
                                        this.sending = false
                                        this.success = res.data.success
                                        this.message = res.data.message
                                        if( res.data.success ){
                                            this.$store.commit('saveUserData', res.data)
                                            this.showNotification(res.data.message, 'done', 'success')
                                            
                                        }else{
                                            this.showNotification(res.data.message, 'error_outline', 'danger')
                                        }
                                    }, 200)
                                })
                        }
                    })
            },
            _checkCoupon: function(){
                if(this.form.coupon == ''){

                    this.showNotification('Vui lòng nhập mã giảm giá!', 'sentiment_satisfied_alt', 'danger' ); 
                }else{

                    var _this = this;
                var send_data = {
                    code: this.form.coupon,
                    token:this.$store.state.user_token,
                    sum_product:this.quantity,
                    total_price:this.total_price,
                    orders:this.list_order_map
                    
                };
                    var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain :this.domain
                };
                this.list_product_check_coupon = [];
                // axios.post(this.api('sale-orders/promotion-to-order'),send_data,{ headers :headers } )
                this.callAPI( 'sale-orders/promotion-to-order','post', send_data, headers)
                .then((res)=>{
                    if( res.data.success ){
                    
                        if(res.data.promotion && res.data.promotion.product_gift && res.data.promotion.product_gift.length > 0){

                                _this.gift = res.data.promotion.product_gift;
                        }

                        if(res.data.promotion &&  res.data.promotion.info_discount_order_fee && res.data.promotion.info_discount_order_fee >0){

                                if(_this.form.fee > res.data.promotion.info_discount_order_fee){

                                    _this.form.fee = res.data.promotion.info_discount_order_fee;
                                }
                                this.$forceUpdate();
                        }
                        if(res.data.promotion &&  res.data.promotion.info_discount_order_percent == ''){

                                _this.form.percent = 0;

                                
                                if(res.data.promotion &&  res.data.promotion.info_discount_order_price && isNaN(res.data.promotion.info_discount_order_price) == false){

                                    _this.form.discount = res.data.promotion.info_discount_order_price;  
                                }else{

                                    _this.form.discount = 0;
                                }
                                _this.check_type_coupon = 'price';
                        }else{

                            _this.form.discount = 0;
                            _this.form.percent = res.data.promotion.info_discount_order_percent;
                            _this.check_type_coupon = 'percent';
                        }
                        
                        this.has_coupon = true;
                        _this.showNotification('Giảm giá thành công', 'sentiment_satisfied_alt', 'success' );    
                    }else{
                            _this.check_type_coupon = '';
                        this.has_coupon = false;
                        
                        if(res.hasOwnProperty('data') && res.data.data && res.data.data.length > 0){
                            
                            _this.list_product_check_coupon =  res.data.data;
                        }
                        _this.showNotification(res.data.msg, 'sentiment_satisfied_alt', 'danger' ); 
                    }


                })      
                }
                                
            },
            isTouchForm( formName ){
                if( ! this.fields[formName] ){
                    return false;
                }
                return Object.values(this.fields[formName])
                    .filter(function(field){ return field.dirty })
                    .length > 0
            },
            isValidForm( formName ){
                if( ! this.fields[formName] ){
                    return false;
                }
                return Object.values(this.fields[formName])
                    .filter(function(field){ return !field.valid })
                    .length == 0
            },
            submitLogin(){
                this.$validator.validateAll('formLogin')
                    .then((result)=>{
                        if( result ){
                            this.sending = true
                            // this.$axios.post( this.api('user/login'), this.login, { headers : {Domain : this.domain } } )
                            var headers = {
                                Domain : this.$store.state.domain
                            };
                            this.callAPI( 'user/login','post', this.login, headers)
                                .then((res)=>{
                                    this.sending = false
                                    this.message = res.data.message
                                    this.success = res.data.success
                                    if( res.data.success ){
                                        this.showNotification(res.data.message, 'sentiment_satisfied_alt', 'success' )
                                            this.$store.commit('saveUserData', res.data);
                                        
                    
                                        // setTimeout(()=>{ this.$router.push('/') })
                                    }else{
                                        this.showNotification(res.data.message, 'sentiment_satisfied_alt', 'danger' ) 
                                    }
                                        setTimeout(()=>{$('#message').fadeOut()}, 1200)
                                })
                            
                        }
                    })

            }
            ,
            submitChekout(){
                var _this =this;
                if( ! this.canCheckout ){ return; }
                var send_data = JSON.parse(JSON.stringify( this.form ));
                var carts = [];
                for( var product_id in this.$store.state.carts ){
                    carts.push({
                        product_id : product_id,
                        quantity : this.$store.state.carts[ product_id ].quantity
                    });
                }
                send_data.carts = carts;
                var headers = {
                    Domain :  this.$store.state.domain
                };
                if( this.$store.state.user_token ){
                        headers.Authorization =  this.$store.state.user_token;
                }
                this.callAPI( 'cart/payment-cart','post', send_data, headers)
                    .then((res)=>{

                        if( res.data.success ){
                            // xóa giỏ hàng
                            
                            _this.$store.commit('clearCart');
                            // cập nhật thông tin user
                            if( this.$store.state.user ){
                                for( var k in this.from ){
                                    if( !_this.$store.state.user.hasOwnProperty(k) || !_this.$store.state.user[k] || _this.$store.state.user[k] == '' ){
                                        _this.$store.state.user[k] = _this.form[k];
                                    }
                                }
                                sessionStorage.setItem('user', JSON.stringify(_this.$store.state.user));
                            }
                            
                            // thực hiện gửi email cho khách hàng
                            var order_token = {
                                order_token : res.order_token
                            }
                            var headers = {
                                Domain :  _this.$store.state.domain
                            }
                            // axios.post( _this.$store.state.api+'cart/send-email',{ order_token : res.order_token }, { headers : { Domain :  _this.$store.state.domain } });
                            this.callAPI( 'cart/send-email','post', order_token, headers)
                            this.showNotification(res.data.message, 'sentiment_satisfied_alt', 'success', 300 )
                            /** chuyển hướng sang trang chi tiết đơn hàng */
                            if( this.$store.user ){
                                 _this.$router.push({
                                    path : '/dashboard/order-detail',
                                    query:{  
                                        token : res.data.order_token
                                    }
                                });
                            }else{
                                  _this.$router.push({
                                    path : '/order-detail',
                                    query:{  
                                        token : res.data.order_token
                                    }
                                });
                            }
                        }
                    });
                carts = [];
            },
            _getFeeShip(arr , key){
                var max  = 0;
                for (var index in arr) {
                    if( arr[index][key] > max){
                        max = arr[index][key];
                    }
                }
                return max;
            },
        
        },
        watch:{
            user : {
            deep : true,
            handler : function( new_value ){
                for( var key in new_value ){
                    if( new_value[key] ){
                            this.form[key] = new_value[key];
                    }
                    
                }
            }
            },
            'form.district_id' : function(new_val){
            
                this.form.wards_id = '';
                if(  this.$store.state.alias_data.districts ){
                    this.$store.state.alias_data.districts.forEach((item)=>{
                    if( item._id == new_val ){
                        this.current_district = item;
                        return true;
                    }
                });
                }
            if( this.$store.state.alias_data.wards && this.current_district ){
                    
                this.$store.state.alias_data.wards;
                this.$store.state.alias_data.wards.filter((item)=>{
                    return item.district_id == this.current_district.vt_id;
                });
            }
                
            }
        }
    
    }
</script>