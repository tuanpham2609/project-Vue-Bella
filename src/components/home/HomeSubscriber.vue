<template>
    <div>
        <section class="section section-subscribe" 
            :style="{ 'background-image' : source.setting.data.background_image.path ? 'url(' + domain + '/' + source.setting.data.background_image.path + ')' : '', 'background-color' : source.setting.data.background_color ? source.setting.data.background_color : '' }"
            v-if="source.fields"
            id="subscriber_news">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="title white">
                            <h3>
                               {{ source.fields.data.title }}
                            </h3>
                            <p>
                                Đừng bỏ lỡ, điền thông tin để nhận mã quà tặng &amp; ưu đãi HOT ngay nhé!
                            </p>
                        </div>
                        <form class="form-subscribe" novalidate="novalidate" @submit.stop.prevent="submitNewFeed" data-vv-scope="newFeedForm">
                            <input v-validate="'required|email'" 
                                type="email" 
                                name="email" 
                                v-model="form.email"
                                placeholder="Nhập email" 
                                class="form-control input-lg">
                            <button type="submit" class="btn btn-default">
                                {{ source.fields.data.btn }}
                            </button>
                            <div class="col-xs-12" v-show="errors.first('newFeedForm.email')">
                                <div class="" style="width: 100%;color:#da4b77;" role="alert">
                                {{ errors.first('newFeedForm.email') }}    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        data(){
            return {
               form:{ email : '' },
              'message' : '',
              'success' : false,
            
            }
        },
        props : ['source'],
        created(){
            if( this.$store.state.user && this.$store.state.user.hasOwnProperty('email') ){
                this.form.email = this.$store.state.user.email;
            }
            this.$validator.dictionary.merge({
                vi: {
                    custom: {
                        email: {
                            required: 'Vui lòng nhập email',
                            email : 'Email không hợp lệ'
                        }
                    }
                }
            });
        },
        methods : {
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
            submitNewFeed(){
              
                this.$validator.validateAll('newFeedForm')
                    .then((result)=>{
                        if( result ){
                            // axios.post( this.$store.state.api+'user/new-feed', { email : this.form.email }, { headers : { Domain : this.domain } } )
                            var headers = {
                                Domain : this.domain
                            };
                            var email = {
                                email : this.form.email
                            }
                            this.callAPI( 'user/new-feed','post', email, headers)
                            .then((res)=>{ 
                                this.success = res.success;
                                this.message = res.message;
                                // $(this.$refs.newfeed_message).fadeIn();
                                // $(this.$refs.newfeed_message).fadeOut(300);
                                 this.showNotification('Cảm ơn bạn đã đăng kí nhận thông tin từ website', 'sentiment_satisfied_alt', 'success' )
                            });
                        }
                    });
            }
        }
        
    }
</script>
