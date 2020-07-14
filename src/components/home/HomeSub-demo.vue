<template>
    <div>
        <section id="subscriber_news" class="section section-subscribe" 
            :style="{'background-image': 'url('+theme_uri+'static/images/demo/slider.jpg)'}">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="title white">
                            <h3>
                                Đăng kí nhận tin khuyến mãi
                            </h3>
                            <p>
                                Đừng bỏ lỡ, điền thông tin để nhận mã quà tặng &amp; ưu đãi HOT ngay nhé!
                            </p>
                        </div>
                        <form novalidate="novalidate" class="form-subscribe vf-form-pristine vf-form-invalid vf-form-untouched">
                            <div class="vf-field-pristine vf-field-invalid vf-field-untouched vf-field-invalid-required"><input
                                    required="required" type="text" onfocus="this.removeAttribute('readonly');" name="email"
                                    placeholder="Nhập email" vue-form-validator="" class="form-control vf-pristine vf-invalid vf-untouched vf-invalid-required">
                                <div></div>
                                <div class="vf-field-pristine vf-field-valid vf-field-untouched"><button type="submit"
                                        class="btn btn-default">Theo dõi</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>