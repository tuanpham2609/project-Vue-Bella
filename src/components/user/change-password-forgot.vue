<template>
    <div>
        <section class="wrapper">
            <div class="section section-breadcrumb"  
                :style="{ 'background-image':'url('+theme_uri+'static/images/product/8020_1530526598.jpg)' }">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Khôi phục mật khẩu</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li class="active">Khôi phục mật khẩu</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="section section-reset-password">
                <div class="container">
                    <div class="row">
                        <div id="forget-password" class="col-xs-12">
                            <div class="title">
                                <h3>Đổi mật khẩu</h3>
                            </div>
                            <form data-vv-scope="change" action=""  @submit.stop.prevent="changePassword()" class="form-reset-password">
                                <div class="row row-flex">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <div class="text-center">
                                                <label>Bạn có thể đổi mật khẩu của mình tại đây</label>
                                            </div>
                                            <div class="form-group">
                                                <input v-validate="'required|min:6'" ref="new_password" name="new_password" v-model="form.new_password"
                                                    type="password" placeholder="Nhập mật khẩu mới" class="form-control">
                                                <span class="text-danger" >{{ errors.first('change.new_password') }}</span> 
                                            </div>
                                            <div class="form-group">
                                                <input v-validate="'required|min:6|confirmed:new_password'" ref="confirm_password" name="confirm_password" v-model="form.confirm_password"
                                                    type="password" placeholder="Nhập lại mật khẩu mới" class="form-control">
                                                <span class="text-danger" >{{ errors.first('change.confirm_password') }}</span> 
                                            </div>
                                        </div>
                                        <div class="text-left">
                                            <button class="btn btn-submit btn-block">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
         data() {
             return{
                title : '',
                form:{
                
                    new_password : '',
                    confirm_password : '',
                    token:'',
                },
             }
         },
         head: {
            title: function () {
                return {
                    inner:'Đổi mật khẩu',
                    separator: '|',
                    complement:this.title
                }
            },
            //omited
        },
          created(){
            this.$validator.dictionary.merge({
                vi : {
                    custom: {
                    
                        new_password : {
                            required : 'Vui lòng nhập mật khẩu mới',
                            min:'Mật khẩu ít nhất 6 ký tự'
                        },
                        confirm_password : {
                            required : 'Vui lòng nhập lại mật khẩu mới',
                            min:'Mật khẩu ít nhất 6 ký tự',
                            confirmed:'Mật khẩu không trùng với mật khẩu phía trên.'
                        },
                        
                    }
                }
            });
          },
          mounted(){
            this.title = this.title1;
            if(this.$route.query.hasOwnProperty('token')){
                this.form.token = this.$route.query.token;
            }
        },
        methods : {
            changePassword(){
                var _this = this;
                var headers = {
        
                    Domain : this.$store.state.domain
                };
                this.$validator.validate()
                .then(result => {

                    if(result){
                        axios
                        .post( this.$store.state.api+'user/change-password-forgot', this.form,{headers:headers} )
                        .then((res)=>{
                          
                            if(res.data.success){

                                 _this.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','info',2000);
                                 setTimeout(function () {
                                      _this.$router.push({ path: '/user/login' })
                                 }, 1000)
                            }
                            
                           
                        })
                    }
                        
                })
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
