<template>
    <div>
        <div class="col-xs-12 col-sm-8 col-md-9">
            <div id="edit-profile-info" class="profile-content">
                <div class="profile-title text-center">
                    <h4>Thông tin cá nhân</h4>
                </div>
                <form novalidate="novalidate" class="profile-form-edit vf-form-pristine vf-form-valid vf-form-untouched">
                    <div class="row row-flex">
                        <div class="col-xs-12">
                            <div class="form-group vf-field-pristine vf-field-valid vf-field-untouched"><input
                                    autocomplete="off" autocorrect="off" autocapitalize="off"
                                    spellcheck="false" required="required" name="fullname" type="text"
                                    placeholder="Họ và tên" vue-form-validator="" class="form-control vf-pristine vf-valid vf-untouched">
                                <div></div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"><select class="form-control">
                                    <option value="">Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Không xác định</option>
                                </select></div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"><input type="text" readonly="readonly" class="datepicker form-control hasDatepicker"
                                    id="dp1543479871159"></div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <div disabled="disabled" class="form-control">tuanpd@gmail.com</div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <div class="form-group vf-field-pristine vf-field-valid vf-field-untouched"><input
                                        required="required" name="phone" type="text" placeholder="Họ và tên"
                                        vue-form-validator="" class="form-control vf-pristine vf-valid vf-untouched">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"><select class="form-control">
                                    <option value="">-- Chọn Tỉnh/TP --</option>
                                    <option value="59f7df2a5dc61703f00057b4">Hà Nội</option>
                                    <option value="59f7df2b5dc61703f00057b5">Hồ Chí Minh</option>
                                    <option value="59f7df2b5dc61703f00057b6">Hải Phòng</option>
                                    <option value="59f7df2b5dc61703f00057b7">Đà Nẵng</option>
                                    <option value="59f7df2b5dc61703f00057b8">Hà Giang</option>
                                    <option value="59f7df2b5dc61703f00057b9">Cao Bằng</option>
                                    <option value="59f7df2b5dc61703f00057ba">Lai Châu</option>
                                    <option value="59f7df2b5dc61703f00057bb">Lào Cai</option>
                                    <option value="59f7df2b5dc61703f00057bc">Tuyên Quang</option>
                                    <option value="59f7df2b5dc61703f00057bd">Lạng Sơn</option>
                                    <option value="59f7df2b5dc61703f00057be">Bắc Kạn</option>
                                    <option value="59f7df2b5dc61703f00057bf">Thái Nguyên</option>
                                    <option value="59f7df2b5dc61703f00057c0">Yên Bái</option>
                                    <option value="59f7df2b5dc61703f00057c1">Sơn La</option>
                                    <option value="59f7df2b5dc61703f00057c2">Phú Thọ</option>
                                    <option value="59f7df2b5dc61703f00057c3">Vĩnh Phúc</option>
                                    <option value="59f7df2b5dc61703f00057c4">Quảng Ninh</option>
                                    <option value="59f7df2b5dc61703f00057c5">Bắc Giang</option>
                                    <option value="59f7df2b5dc61703f00057c6">Bắc Ninh</option>
                                    <option value="59f7df2b5dc61703f00057c7">Hải Dương</option>
                                    <option value="59f7df2b5dc61703f00057c8">Hưng Yên</option>
                                    <option value="59f7df2b5dc61703f00057c9">Hoà Bình</option>
                                    <option value="59f7df2b5dc61703f00057ca">Hà Nam</option>
                                    <option value="59f7df2b5dc61703f00057cb">Nam Định</option>
                                    <option value="59f7df2b5dc61703f00057cc">Thái Bình</option>
                                    <option value="59f7df2b5dc61703f00057cd">Ninh Bình</option>
                                    <option value="59f7df2b5dc61703f00057ce">Thanh Hoá</option>
                                    <option value="59f7df2b5dc61703f00057cf">Nghệ An</option>
                                    <option value="59f7df2b5dc61703f00057d0">Hà Tĩnh</option>
                                    <option value="59f7df2b5dc61703f00057d1">Quảng Bình</option>
                                    <option value="59f7df2b5dc61703f00057d2">Quảng Trị</option>
                                    <option value="59f7df2b5dc61703f00057d3">Thừa Thiên Huế</option>
                                    <option value="59f7df2b5dc61703f00057d4">Quảng Nam</option>
                                    <option value="59f7df2b5dc61703f00057d5">Quảng Ngãi</option>
                                    <option value="59f7df2b5dc61703f00057d6">Kontum</option>
                                    <option value="59f7df2b5dc61703f00057d7">Bình Định</option>
                                    <option value="59f7df2b5dc61703f00057d8">Gia Lai</option>
                                    <option value="59f7df2b5dc61703f00057d9">Phú Yên</option>
                                    <option value="59f7df2b5dc61703f00057da">Đăk Lăk</option>
                                    <option value="59f7df2b5dc61703f00057db">Khánh Hoà</option>
                                    <option value="59f7df2b5dc61703f00057dc">Lâm Đồng</option>
                                    <option value="59f7df2b5dc61703f00057dd">Bình Phước</option>
                                    <option value="59f7df2b5dc61703f00057de">Bình Dương</option>
                                    <option value="59f7df2b5dc61703f00057df">Ninh Thuận</option>
                                    <option value="59f7df2b5dc61703f00057e0">Tây Ninh</option>
                                    <option value="59f7df2b5dc61703f00057e1">Bình Thuận</option>
                                    <option value="59f7df2b5dc61703f00057e2">Đồng Nai</option>
                                    <option value="59f7df2b5dc61703f00057e3">Long An</option>
                                    <option value="59f7df2b5dc61703f00057e4">Đồng Tháp</option>
                                    <option value="59f7df2b5dc61703f00057e5">An Giang</option>
                                    <option value="59f7df2b5dc61703f00057e6">Bà Rịa Vũng Tàu</option>
                                    <option value="59f7df2b5dc61703f00057e7">Tiền Giang</option>
                                    <option value="59f7df2b5dc61703f00057e8">Kiên Giang</option>
                                    <option value="59f7df2b5dc61703f00057e9">Cần Thơ</option>
                                    <option value="59f7df2b5dc61703f00057ea">Bến Tre</option>
                                    <option value="59f7df2b5dc61703f00057eb">Vĩnh Long</option>
                                    <option value="59f7df2b5dc61703f00057ec">Trà Vinh</option>
                                    <option value="59f7df2b5dc61703f00057ed">Sóc Trăng</option>
                                    <option value="59f7df2b5dc61703f00057ee">Bạc Liêu</option>
                                    <option value="59f7df2b5dc61703f00057ef">Cà Mau</option>
                                    <option value="59f7df2b5dc61703f00057f0">Điện Biên</option>
                                    <option value="59f7df2b5dc61703f00057f1">Dăk Nông</option>
                                    <option value="59f7df2b5dc61703f00057f2">Hậu Giang</option>
                                </select></div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"><select class="form-control">
                                    <option value="">-- Chọn Quận/Huyện --</option>
                                </select></div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group"><input autocomplete="off" autocorrect="off"
                                    autocapitalize="off" spellcheck="false" type="" placeholder="Địa chỉ"
                                    class="form-control"></div>
                        </div>
                        <div class="col-xs-12">
                            <div class="text-center"><button type="submit" class="btn btn-submit">
                                    &nbsp;
                                    Cập nhật
                                </button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
