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
            <section class="section section-reset-password" v-if="ok == false">
                <div class="container">
                    <div class="row">
                        <div id="forget-password" class="col-xs-12">
                            <div class="title">
                                <h3>khôi phục mật khẩu</h3>
                            </div>
                            <form data-vv-scope="formforgot" method="post" class="form-reset-password">
                                <div class="row row-flex">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <div class="text-center">
                                                <label>Vui lòng nhập địa chỉ email khôi phục mật khẩu</label>
                                            </div>
                                            <div class="form-group">
                                                <input v-model="email"  v-validate="'required|email'"
                                                    name="email" type="email" placeholder="Email" class="form-control">
                                                <span class="text-danger" >  {{ errors.first('formforgot.email') }}</span>   
                                            </div>
                                        </div>
                                        <div class="text-left">
                                            <button type="button" class="btn btn-submit btn-block" @click="sendMail()">
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
            <div class="section section-reset-password" v-else style="text-align:center;color:red;">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <h4>{{message}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {
            email:'',
            title : '',
            ok:false,
            message:''
        }
    },
    head: {
            title: function () {
            return {
                inner:this.title,
                separator: '|',
                complement:'Quên mật khẩu'
            }
            },
            //omited
    },
    mounted(){

        this.title = this.title1;
    },
    computed:{
        title1(){

            return (  this.$store.state &&this.$store.state.hasOwnProperty('default_data') && this.$store.state.default_data.default_meta.data ) ? this.$store.state.default_data.default_meta.data.meta_title : '';
        },
    },
    created(){
        this.$validator.dictionary.merge({
                vi : {
                    custom: {
                        email : {
                            required : 'Vui lòng nhập địa chỉ email',
                            email : 'Địa chỉ email không hợp lệ'
                        },
                    
                    }
                }
            })
    }
    ,
    methods:{
        sendMail:function(){
            var  _this = this;
             this.$validator.validate()
                    .then((result)=>{
                        if( result ){
                           var headers = {
                               
                                Domain : this.$store.state.domain
                            }
                            var send_data = {
                                email : this.email
                            }
                             axios.post( this.$store.state.api+'user/send-forgot',send_data ,{ headers : headers } )
                                .then((res)=>{
                                   
                                    if(res.data.success){
                                        _this.ok = true;
                                        _this.message = res.data.message;
                                    }
                                    else{

                                        _this.showNotification(res.data.msg,'sentiment_satisfied_alt','danger',2000);
                                    }
                                })
                        }})
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
    }

}
</script>
