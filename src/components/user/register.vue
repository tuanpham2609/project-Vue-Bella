<template>
    <div>
        <section class="wrapper">
            <div class="section section-breadcrumb" style="
                background-image:url('upload/bella.iamsale.vn/slider/images/2018-07/8020_1530526598.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Đăng ký</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li class="active">Đăng ký</li>
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
                                <h3>Đăng ký</h3>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                            <div id="register-container">
                                <form class="form-register" v-if="!success || first" data-vv-scope="register" method="post" @submit.prevent="submitRegister" >
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="form-group" :class="{ 'has-error' : errors.first('register.fullname') }">
                                                <span class="help-block">
                                                    {{ errors.first('register.fullname') }}
                                                </span>
                                                <input type="text" v-model="form.fullname" name="fullname" v-validate="'required'" class="form-control" placeholder="Họ tên">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-group" :class="{ 'has-error' : errors.first('register.phone') }">
                                                <span class="help-block">{{ errors.first('register.phone') }}</span>
                                                <input type="text" v-model="form.phone" name="phone" v-validate="'required'" class="form-control" placeholder="Số điện thoại">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-group" :class="{ 'has-error' : errors.first('register.email') }">
                                                <span class="help-block">
                                                    {{ errors.first('register.email') }}
                                                </span>
                                                <input type="email" v-model="form.email" name="email" v-validate="'required|email'" class="form-control" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-group" :class="{ 'has-error' : errors.first('register.password') }">
                                                <span class="help-block">
                                                    {{ errors.first('register.password') }}
                                                </span>
                                                <input type="password" v-model="form.password" name="password" v-validate="'required'" ref="password" class="form-control" placeholder="Mật khẩu">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-group" :class="{ 'has-error' : errors.first('register.confirm_password') }">
                                                <span class="help-block">
                                                    {{ errors.first('register.confirm_password') }}
                                                </span>
                                                <input type="password" v-model="form.confirm_password" name="confirm_password" v-validate="'required|confirmed:password'" class="form-control" placeholder="Xác nhận lại mật khẩu">
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-group"><label><input type="checkbox" name="">Tôi đã đọc và
                                                    đồng ý với Chính sách bảo mật và điều khoảng sử dụng
                                                </label></div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="text-center">
                                                <button :disabled="form.inValid( fields.$register ) || sending" class="btn btn-submit">
                                                    <i v-if="sending" class="fa fa-spinner fa-spin" ></i> Đăng ký
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="note">
                                                <p>
                                                    <small>Nếu bạn đã có tài khoản, có thể đăng nhập
                                                        <a href="/user/login">tại đây</a> để nhận được nhiều ưu đãi hơn.
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
    export default{
        data(){
            return {
                first : true,
                sending : false,
                success : false,
                message : '',
                form:{
                    fullname : '',
                    email: '',
                    password : '',
                    confirm_password : '',
                    phone : ''
                },
                title : '',
            }
        },
         head: {
            title: function () {
            return {
                inner:this.title,
                separator: '|',
                complement:'Đăng ký'
            }
            }
        },
        beforeCreate(){
          if( this.$store.state.user ){
              this.$router.push('/')
          }
        },
        computed:{
        },
        mounted(){
            
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
                            required     : 'Vui lòng nhập số điện thoại'
                        },
                        password : {
                            required : 'Vui lòng nhập mật khẩu'
                        },
                        confirm_password: {
                            required : 'Vui lòng xác nhận lại mật khẩu',
                            confirmed : 'Hai mật khẩu không khớp'
                        }
                    }
                }
            })
        },
        methods:{
            submitRegister(){
                this.$validator.validate()
                    .then((result)=>{
                        if( result ){
                            
                            var headers = {
                                Domain : this.$store.state.domain
                            };
                            var clone = this.clone( this.form )
                            this.sending = true
                            delete clone.confirm_password
                            // this.$axios.post( this.api('user/register'), clone, { headers : { Domain : this.domain } })
                            this.callAPI( 'user/register','post', clone, headers)
                                .then((res)=>{
                                    this.first = false
                                    setTimeout(()=>{
                                        this.sending = false
                                        this.success = res.data.success
                                        this.message = res.data.message
                                        if( res.data.success ){
                                            this.$store.commit('saveUserData', res.data)
                                            this.showNotification(res.data.message, 'done', 'success')
                                            setTimeout(()=>{
                                                this.$router.push('/')
                                            }, 300)
                                        }else{
                                            this.showNotification(res.data.message, 'error_outline', 'danger')
                                        }
                                    }, 200)
                                })
                        }
                    })
            }
        }
    }
</script>