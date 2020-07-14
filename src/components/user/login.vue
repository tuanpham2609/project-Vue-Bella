<template>
    <div>
        <section class="wrapper" style="min-height: 356px;">
            <div class="section section-breadcrumb" style="
                background-image:url('upload/bella.iamsale.vn/slider/images/2018-07/8020_1530526598.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Đăng nhập</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li class="active">Đăng nhập</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="section section-register">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="title">
                                <h3>Đăng nhập</h3>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">

                            <div id="login-container">
                                <form class="form-login" data-vv-scope="formLogin" @submit.prevent="submitLogin" method="post">
                                    <div class="row">
                                        <div class="col-xs-12">
                                           <div class="form-group" :class="errors.first('formLogin.email') ? 'has-error' : 'has-success'">
                                                <span class="help-block">
                                                    {{ errors.first('formLogin.email') }}
                                                </span>
                                                <input  v-model="form.email"
                                                        v-validate="'required|email'"
                                                        name="email"
                                                        type="email"
                                                        class="form-control"
                                                        placeholder="Địa chỉ email">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-group" :class="{ 'has-error' : errors.first('passowrd') }">
                                                <span class="help-block">{{errors.first('formLogin.password')}}</span>
                                                <input  v-model="form.password"
                                                        v-validate="'required'"
                                                        name="password"
                                                        type="password"
                                                        class="form-control"
                                                        placeholder="Mật khẩu">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="text-right forget-password">
                                                <router-link to="/user/forgot-password">Quên mật khẩu</router-link>
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="text-center">
                                                <button :disabled="form.inValid(fields.$formLogin) " type="submit" class="btn btn-submit btn-block btn-lg">
                                                    &nbsp;Đăng nhập
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="note">
                                                <p>
                                                    <small>Nếu bạn chưa có tài khoản, có thể đăng kí
                                                        <a href="/user/register">tại đây</a> để nhận được nhiều ưu đãi
                                                        hơn.
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                success : false,
                message : '',
                sending : false,
                remember:false,
                form : {
                    email : '',
                    password : '',
                },
                title : '',
            }
        },
        head: {
            title: function () {
            return {
                inner:this.title,
                separator: '|',
                complement:'Đăng Nhập'
            }
            }
        },
        mounted(){
            var user_remmeber = JSON.parse(localStorage.getItem('user_remmeber'))
            if(user_remmeber){
                if(user_remmeber.hasOwnProperty('email') && user_remmeber.hasOwnProperty('password')){
                    this.remember = true
                    this.form = user_remmeber
                    this.$validator.reset()
                }
            }
            
        },
        created(){
            this.$validator.dictionary.merge({
                vi : {
                    custom: {
                        email : {
                            required : 'Vui lòng nhập địa chỉ email',
                            email : 'Địa chỉ email không hợp lệ'
                        },
                        password : {
                            required : 'Vui lòng nhập mật khẩu'
                        }
                    }
                }
            })
        },
        methods : {
            submitLogin(){
                this.$validator.validate()
                    .then((result)=>{
                        if( result ){
                            this.sending = true
                            // this.$axios.post( this.api('user/login'), this.form, { headers : {Domain : this.domain } } )
                            var headers = {
                                Domain : this.$store.state.domain
                            };
                            this.callAPI( 'user/login','post', this.form, headers)
                            .then((res)=>{
                                this.sending = false
                                this.message = res.data.message
                                this.success = res.data.success
                                if( res.data.success ){
                                    this.showNotification(res.data.message, 'sentiment_satisfied_alt', 'success' )
                                        this.$store.commit('saveUserData', res.data)
                                    setTimeout(()=>{ this.$router.push('/') })
                                }else{
                                    this.showNotification(res.data.message, 'sentiment_satisfied_alt', 'danger' ) 
                                }
                                    setTimeout(()=>{$('#message').fadeOut()}, 1200)
                            })
                        }
                    })
            }
        },
         watch:{
            remember(new_val){
                if(new_val){
                    localStorage.setItem('user_remmeber',JSON.stringify(this.form) )
                }else{
                    localStorage.removeItem( 'user_remmeber' )
                }
            }
        }
    }
</script>