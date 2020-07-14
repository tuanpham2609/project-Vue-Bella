<template>
    <div>
        <div class="col-xs-12 col-sm-8 col-md-9">
            <div id="edit-profile-info" class="profile-content">
                <div class="profile-title text-center">
                    <h4>Thông tin cá nhân</h4>
                </div>
                <form  class="profile-form-edit " @submit.stop.prevent="doUpdate">
                    <div class="row row-flex">
                        <div class="col-xs-12">
                            <div class="form-group" >
                                <input v-if="data"  name="fullname" v-validate="'required'" v-model="data.fullname"  placeholder="Nhập họ và tên" type="text"  class="form-control">
                                <span class="help-block">
                                        {{ errors.first('register.fullname') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <select v-model="data.gender" class="form-control">
                                    <option value="">--Chọn--</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <input v-validate="{ required: true}" name="phone" v-model="data.phone"  placeholder="Nhập số điện thoại" type="text"  class="form-control">
                                <span class="help-block">
                                    {{ errors.first('register.phone') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <span class="form-control disabled" v-if="data">{{data.email}}</span>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <input v-model="data.day_of_birth"  placeholder="Nhập ngày sinh" type="text"  class="form-control">
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <select v-model="data.province_id"  class="form-control">
                                    <option   value="">--Chọn Tỉnh/TP--</option>
                                    <option v-for="(item,index) in $store.state.alias_data.provinces" :key="index"  :value="item._id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <select v-model="data.district_id" class="form-control">
                                    <option value="" >--Chọn--</option>
                                    <option v-for="(item,index) in districts" :value="item._id" :key="index" >{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group">
                                <input type="text" v-if="data" v-model="data.address" placeholder="Nhập địa chỉ"  class="form-control">
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="text-center">
                                <button type="submit" class="btn btn-submit">&nbsp;
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
         data() {
            return {
                title : '',
                province_id:'',
                 data : {
                    fullname : '',
                    address: '',
                    gender : '',
                    phone : '',
                    province_id : '',
                    district_id : '',
                    day_of_birth : '',
                    email : ''
                }
            }
        },
        head: {
            title: function () {
            return {
                inner:'Thông tin cá nhân',
                separator: '|',
                complement:this.title
            }
            },
            //omited
        },
        methods:{
            doUpdate(){

                  var _this = this;
                this.$validator.validate()
                    .then((result)=>{

                        if( result ){
                            console.log(this.$store.state.api+'user/profile')
                             var clone = {data:JSON.parse( JSON.stringify( this.data ) )};
                             delete clone.email;
                              var headers = {
                                'Authorization' : this.$store.state.user_token,
                                Domain : this.$store.state.domain
                            }
                             axios.post( this.$store.state.api+'user/profile', clone,{ headers : headers } )
                                .then((res)=>{

                                    this.message = res.message;
                                    this.success = res.success;
                                  
                                    if(res.data.success == true){
                                        this.showNotification(res.data.message, 'sentiment_satisfied_alt', 'success' )
                                         this.$store.commit( 'saveUserData', res.data );
                                        $( '#message' ).fadeIn();
                                        $( '#message' ).fadeOut(2500);
                                        $( '#loading-icon' ).fadeOut(500);
                                    }
                                   
                                });
                        }
                })
            }
        },
        computed:{
            title1(){

                 return (  this.$store.state &&this.$store.state.hasOwnProperty('default_data') && this.$store.state.default_data.default_meta.data ) ? this.$store.state.default_data.default_meta.data.meta_title : '';
            },
            user:function(){

                return this.$store.state.user;
            },
            districts(){
               
                if( this.$store.state.alias_data.districts ){
                    
                    return this.$store.state.alias_data.districts.filter((item)=>{
                        return item.id_province == this.data.province_id;
                    });
                    
                    this.$forceUpdate();
                }else{
                    return [];
                }
             
            },
            
        },
        mounted(){
             if(this.$store.state.open_footer_cart == true){

                this.$store.state.open_footer_cart = false;
            }
            this.title = this.title1;
        },
         created(){
              
              this.$validator.dictionary.merge({
                vi : {
                    custom: {
                        fullname : {
                            required : 'Vui lòng nhập họ tên đầy đủ'
                        },
                        email : {
                            required : 'Vui lòng nhập địa chỉ email',
                            email : 'Địa chỉ email không hợp lệ'
                        },
                        phone : {
                            required     : 'Vui lòng nhập số điện thoại',
                            
                        },
                        
                    }
                }
            });
            this.$store.state.append.resources = ['provinces','districts'];
            this.$store.dispatch('loadPageResource', this.$route.name);
            for( var key in this.$store.state.user ){
                    
                this.data[key] = this.$store.state.user[key];
            }
            console.log(123)
            console.log(this.data)
           
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
