<template>
    <div>
        <section class="wrapper" >
            <div class="section section-breadcrumb">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="breadcrumb-inner">
                                <div class="page-title">
                                    <strong>Không tìm thấy dữ liệu</strong>
                                </div>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="#">Trang chủ</a>
                                    </li>
                                    <li class="active">404</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="section section-404">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <img :src="theme_uri + 'static/images/logo/404.png'" alt="">
                            <h4>Xin lỗi, trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đổi tên</h4>
                            <p>
                                Bạn có thể quay lại
                                <a href="/">Trang chủ</a> hoặc sử dụng tìm kiếm
                            </p>
                            <!-- <div class="form-404">
                                <form action="/search">
                                    <input type="text" class="form-control" name="keyword" placeholder="Tìm kiếm ..." value="">
                                    <button class="btn">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </form>
                            </div> -->
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
