<template>
    <div>
        <div class="col-xs-12 col-sm-8 col-md-9">
            <div class="profile-content">
                <div id="form-reset-password" class="profile-form-change-password">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-sm-offset-3">
                            <div class="profile-title text-center">
                                <h4>Đổi mật khẩu</h4>
                            </div>
                            <form data-vv-scope="change" class="profile-form-edit" @submit.stop.prevent="changePassword()">
                                <div class="row row-flex">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <input v-validate="'required|min:6'" name="current_password" v-model="form.current_password" type="password" class="form-control" placeholder="Mật khẩu hiện tại">
                                            <span class="text-danger" >{{ errors.first('change.current_password') }}</span>   
                                        </div>
                                       
                                    </div>
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <input v-validate="'required|min:6'" ref="new_password" name="new_password" v-model="form.new_password" type="password" class="form-control" placeholder="Mật khẩu mới">
                                            <span class="text-danger" >{{ errors.first('change.new_password') }}</span>   
                                        </div>
                                    </div>
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <input v-validate="'required|min:6|confirmed:new_password'" ref="confirm_password" name="confirm_password" v-model="form.confirm_password" type="password" class="form-control" placeholder="Nhập lại mật khẩu mới">
                                            <span class="text-danger" >{{ errors.first('change.confirm_password') }}</span> 
                                        </div>
                                    </div>
                                    <div class="col-xs-12">
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-submit">
                                                <!---->Đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {

         data() {
             return{
                title : '',
                form:{
                    current_password : '',
                    new_password : '',
                    confirm_password : ''
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
              
            if(this.$store.state.open_footer_cart == true){

                this.$store.state.open_footer_cart = false;
            }
            this.$validator.dictionary.merge({
                vi : {
                    custom: {
                        current_password : {
                            required : 'Vui lòng nhập mật khẩu hiện tại',
                            min:'Mật khẩu ít nhất 6 ký tự'
                        },
                        new_password : {
                            required : 'Vui lòng nhập mật khẩu mới',
                            min:'Mật khẩu ít nhất 6 ký tự'
                        },
                        confirm_password : {
                            required     : 'Vui lòng nhập lại mật khẩu mới',
                            min:'Mật khẩu ít nhất 6 ký tự',
                            confirmed:'Mật khẩu không trùng với mật khẩu phía trên.'
                        },
                        
                    }
                }
            });
          },
          mounted(){
            this.title = this.title1;
        },
        methods : {
            changePassword(){
                
                var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain : this.$store.state.domain
                };
                this.$validator.validate()
                .then(result => {

                    if(result){
                        axios
                        .post( this.$store.state.api+'user/change-password', this.form,{headers:headers} )
                        .then((res)=>{
                            this.showNotification(res.data.message, 'info', res.data.success ? 'success' : 'danger' );
                        });
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