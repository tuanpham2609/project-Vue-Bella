<template>
    <div>
        <section class="wrapper">
            <modal v-if="showModal" v-on:cropImage="getImageCrop"  :imgSrc="userImage" @close="showModal = false"></modal>
            <div class="section section-breadcrumb" style="
                background-image:url('upload/bella.iamsale.vn/slider/images/2018-07/8020_1530526598.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Thông tin cá nhân</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li class="active">Thông tin cá nhân</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="section section-profile">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-4 col-md-3">
                            <div class="profile-sidebar">
                                <div class="profile-media" id="profile-media-image" >
                                    <label class="profile-media-image user-icon">
                                        <img v-if="!$store.state.user.image ||$store.state.user.image == ''" :src="theme_uri + 'static/images/user/user1.png'" alt="">
                                        <img v-else :src="$store.state.domain+'/'+$store.state.user.image" alt="">
                                        <input @change="onFileChanged" :src="theme_uri + '/static/images/user/user1.png'" type="file" accept="image/*" hidden="" class="hide">
                                    </label>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item" :class="{ active : $route.name == 'profile'}">
                                        <router-link to="/dashboard"><i class="fas fa-user"></i>Thông tin cá nhân</router-link>
                                    </li>
                                    <li class="list-group-item" :class="{ active : $route.name == 'orders' }">
                                        <router-link to="/dashboard/orders"><i class="far fa-list-alt"></i>Lịch sử mua hàng</router-link>
                                    </li>
                                    <li class="list-group-item" :class="{ active : $route.name == 'change-password' }">
                                        <router-link to="/dashboard/change-password"> <i class="fas fa-key"></i>Đổi mật khẩu</router-link>
                                    </li>
                                    <li class="list-group-item">
                                        <a @click.stop.prevent="$store.commit('logout', ()=>{$router.push('/')})" href="#">
                                            <i class="fas fa-sign-out-alt"></i>
                                            <span>Đăng xuất</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <router-view />
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
    import Modal from '@/components/user/modal';
    export default{
         components : {
            Modal
         },
         data() {
            return {
                userImage:'',
                showModal:false
            }
        },
        watch:{
           $route (to, from){
                
           }
        },
        methods:{
            onUpload(img) {

                 var _this = this;
                 var api_link = this.$store.state.api+'user/update-image';
                 
            
                 var send_data = {

                    image:img
                 };
                var headers = {
                    'Authorization' : this.$store.state.user_token,
                    Domain : this.$store.state.domain
                };
                // axios
                // .post(api_link, send_data, { headers : headers})
                this.callAPI( 'user/update-image','post',send_data, headers)
                .then((res)=>{
                    console.log(res)
                    if(res.data.success){
                        
                        this.showNotification(res.data.result.message, 'sentiment_satisfied_alt', 'success' );
                         var image = res.data.result.img;
                         this.$store.commit('updateUser', image);
                         _this.showModal = false;
                        _this.$forceUpdate();   
                    }
                });
            },
            getImageCrop:function(img){
               this.onUpload(img);
               this.$forceUpdate();
            },
            onFileChanged:function (event) {
                
                var files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                return;
                }
                this.selected_file = files[0];
                
                this.createImage(files[0]);
            },
            createImage:function(file) {
                
                var reader = new FileReader();
                var _this = this;

                reader.onload = (e) => {
                _this.userImage = e.target.result;
                this.showModal = true;
                }
                reader.readAsDataURL(file);
                
            },
        }
     }
</script>