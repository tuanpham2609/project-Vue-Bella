<template>
    <div>
        <section class="wrapper">
            <template  v-if="source.append && source.append.contact_breadcrumb && source.append.contact_breadcrumb.allow_show == true">
                <div v-if="source.append && source.append.contact_breadcrumb && source.append.contact_breadcrumb.info == 'image'" class="section section-breadcrumb" 
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + source.append.contact_breadcrumb.data.background_image.path+')'}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.contact_page_title ? source.append.contact_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.contact_page_title ? source.append.contact_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="source.append.contact_breadcrumb && source.append.contact_breadcrumb.info == 'color' " class="section-breadcrumb" 
                    v-bind:style="{'background-color':source.append.contact_breadcrumb.data.background_color}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.contact_page_title ? source.append.contact_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.contact_page_title ? source.append.contact_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <section class="section section-contact">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="maps row row-flex">
                                <div class="maps-inner  col-xs-12 col-sm-9" v-if="source.append.contact_map.allow_show == true" v-html="source.append.contact_map.data"></div>
                                <div class="maps-info col-xs-12 col-sm-3">
                                    <div class="list-info" v-if="source.append.contact_info.allow_show == true">
                                        <div class="item-info" v-for="(item, index) in source.append.contact_info.data" :key="index">
                                            <p>
                                                <strong>{{item.title}}</strong>
                                            </p>
                                            <p>{{item.description}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contact-form-wrap" v-if="source.append.form_contact_background.data && source.append.form_contact_background.data.background_image "
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + source.append.form_contact_background.data.background_image.path+')'}" >
                    <template v-if="source.append.form_contact.allow_show == true">  
                        <div class="title">
                            <h3>{{source.append.form_contact.data.title}}</h3>
                            <p>{{source.append.form_contact.data.description}}</p>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 ">
                                    <form @submit.prevent="submitContact" method="post" class="form-contact has-error" data-vv-scope="formContact">
                                        <div class="row row-flex">
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <input
                                                        v-model="form.fullname" v-validate="'required'"
                                                        type="text" placeholder="Tên" name="name"
                                                        class="form-control">
                                                    <span class="help-block">
                                                        {{ errors.first('formContact.name') }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <input
                                                        v-model="form.email"
                                                        v-validate="'required|email'" type="email" placeholder="email" name="email"
                                                        class="form-control">
                                                    <span class="help-block">
                                                        {{ errors.first('formContact.email') }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <input
                                                        v-model="form.title" name="title" v-validate="'required'"
                                                        type="text" placeholder="Tiêu đề "
                                                        class="form-control">
                                                    <span class="help-block">{{ errors.first('formContact.title') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <textarea
                                                        v-model="form.content" name="content" v-validate="'required'"
                                                        placeholder="Nội dung"
                                                        class="form-control">
                                                    </textarea>
                                                    <span class="help-block">{{ errors.first('formContact.content') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="text-center">
                                                    <button type="submit" class="btn btn-orange">
                                                       {{source.append.form_contact.data.btn}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="contact-form-wrap" v-if="source.append.form_contact_background.data && source.append.form_contact_background.data.background_color"
                    v-bind:style="{'background-color':source.append.form_contact_background.data.background_color}" >
                    <template v-if="source.append.form_contact.allow_show == true">  
                        <div class="title">
                            <h3>{{source.append.form_contact.data.title}}</h3>
                            <p>{{source.append.form_contact.data.description}}</p>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 ">
                                    <form @submit.prevent="submitContact" method="post" class="form-contact has-error" data-vv-scope="formContact">
                                        <div class="row row-flex">
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <input
                                                        v-model="form.fullname" v-validate="'required'"
                                                        type="text" placeholder="Tên" name="name"
                                                        class="form-control">
                                                    <span class="help-block">
                                                        {{ errors.first('formContact.name') }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <input
                                                        v-model="form.email"
                                                        v-validate="'required|email'" type="email" placeholder="email" name="email"
                                                        class="form-control">
                                                    <span class="help-block">
                                                        {{ errors.first('formContact.email') }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <input
                                                        v-model="form.title" name="title" v-validate="'required'"
                                                        type="text" placeholder="Tiêu đề "
                                                        class="form-control">
                                                    <span class="help-block">{{ errors.first('formContact.title') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <textarea
                                                        v-model="form.content" name="content" v-validate="'required'"
                                                        placeholder="Nội dung"
                                                        class="form-control">
                                                    </textarea>
                                                    <span class="help-block">{{ errors.first('formContact.content') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="text-center">
                                                    <button type="submit" class="btn btn-orange">
                                                       {{source.append.form_contact.data.btn}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        props : ['source'],
        data(){
            return {
                form:{
                    fullname : '',
                    email: '',
                    content : '',
                    title : ''
                },
            }
        }, 
        created(){
            this.$validator.dictionary.merge({
                vi : {
                    custom: {
                        name : {
                            required : 'Vui lòng nhập họ tên đầy đủ'
                        },
                        email : {
                            required : 'Vui lòng nhập địa chỉ email',
                            email : 'Địa chỉ email không hợp lệ'
                        },
                        title : {
                            required     : 'Vui lòng tiêu đề'
                        },
                        content : {
                            required     : 'Vui lòng nhập số điện thoại'
                        },
                    }
                }
            })
        },
        methods:{
            submitContact(){
                this.$validator.validateAll('formContact')
                    .then((result)=>{
                        if( result ){
                            // axios.post( this.$store.state.api+'user/new-feed', { email : this.form.email }, { headers : { Domain : this.domain } } )
                            var headers = {
                                Domain : this.domain
                            };
                            var send_data = {

                                phone : this.form.phone,
                                email : this.form.email,
                                content : this.form.content,
                                title : this.form.fullname,
                                fullname : this.form.fullname
                            }
                            this.callAPI( 'user/contact','post', send_data, headers,)
                            .then((res)=>{ 
                                this.success = res.success;
                                this.message = res.message;
                                // $(this.$refs.newfeed_message).fadeIn();
                                // $(this.$refs.newfeed_message).fadeOut(300);
                                this.showNotification('Cảm ơn bạn đã đăng kí nhận thông tin từ website', 'sentiment_satisfied_alt', 'success' )
                                setTimeout(()=>{
                                    this.$router.push('/')
                                }, 3000000000)
                            });
                        }
                    });
            }
        }
    }
</script>