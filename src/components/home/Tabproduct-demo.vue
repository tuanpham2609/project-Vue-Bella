<template>
    <div>
        <section class="section section-categories " id="tab-list-product">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-3 col-md-3">
                        <div class="list-home-banners">
                            <a href="#" target="_blank">
                                <img :src="theme_uri+'static/images/demo/img_banner_vertical.jpg'" alt="" class="img-responsive"
                                    title="Hình ảnh quảng cáo">
                            </a>
                            <a href="#" target="_blank">
                                <img :src="theme_uri+'static/images/demo/img_banner_vertical.jpg'" alt="" class="img-responsive"
                                    title="Hình ảnh quảng cáo">
                            </a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-9 col-md-9">

                        <ul class="nav nav-pills">
                            <li role="presentation" class="active">
                                <a href="#tab-new-product-sample-1" role="tab" data-toggle="tab" aria-expanded="true">Tab
                                    sản phẩm 1</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#tab-new-product-sample-2" role="tab" data-toggle="tab" aria-expanded="false">Tab
                                    sản phẩm 2</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#tab-new-product-sample-2" role="tab" data-toggle="tab" aria-expanded="false">Tab
                                    sản phẩm 3</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#tab-new-product-sample-2" role="tab" data-toggle="tab" aria-expanded="false">Tab
                                    sản phẩm 4</a>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div class="tab-pane fade active in" id="tab-new-product-sample-1">
                                <div class="list-tab-product">
                                    <div class="row row-flex">
                                        <div class="col-xs-6 col-sm-6 col-md-4 col-flex" key="1">
                                            <div class="item-product-thumb">
                                                <div class="product-inner">
                                                    <a class="product-image" href="javascript:void(0)">
                                                        <img :src="theme_uri+'static/images//demo/product1.jpg'" alt="Sản phẩm 1">
                                                        <div class="product-btn-groups">
                                                            <button class="btn-add-item-to-cart"></button>
                                                            <button class="btn-add-item-to-wishlist"></button>
                                                        </div>
                                                    </a>
                                                    <div class="product-content">
                                                        <a href="#" class="product-title" data-max-line="2"><span class="ellip"><span
                                                                    style="white-space: nowrap;">Sản</span> <span style="white-space: nowrap;">phẩm</span>
                                                                <span style="white-space: nowrap;">1</span></span></a>
                                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                                        </p>
                                                        <div class="product-price">
                                                            <div class="product-price-new">
                                                                100.000
                                                                đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-4 col-flex" key="2">
                                            <div class="item-product-thumb">
                                                <div class="product-inner">
                                                    <a class="product-image" href="javascript:void(0)">
                                                        <img :src="theme_uri+'static/images//demo/product2.jpg'" alt="Sản phẩm 1">
                                                        <div class="product-btn-groups">
                                                            <button class="btn-add-item-to-cart"></button>
                                                            <button class="btn-add-item-to-wishlist"></button>
                                                        </div>
                                                    </a>
                                                    <div class="product-content">
                                                        <a href="#" class="product-title" data-max-line="2"><span class="ellip"><span
                                                                    style="white-space: nowrap;">Sản</span> <span style="white-space: nowrap;">phẩm</span>
                                                                <span style="white-space: nowrap;">2</span></span></a>
                                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                                        </p>
                                                        <div class="product-price">
                                                            <div class="product-price-new">
                                                                100.000
                                                                đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-4 col-flex" key="3">
                                            <div class="item-product-thumb">
                                                <div class="product-inner">
                                                    <a class="product-image" href="javascript:void(0)">
                                                        <img :src="theme_uri+'static/images//demo/product3.jpg'" alt="Sản phẩm 1">
                                                        <div class="product-btn-groups">
                                                            <button class="btn-add-item-to-cart"></button>
                                                            <button class="btn-add-item-to-wishlist"></button>
                                                        </div>
                                                    </a>
                                                    <div class="product-content">
                                                        <a href="#" class="product-title" data-max-line="2"><span class="ellip"><span
                                                                    style="white-space: nowrap;">Sản</span> <span style="white-space: nowrap;">phẩm</span>
                                                                <span style="white-space: nowrap;">3</span></span></a>
                                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                                        </p>
                                                        <div class="product-price">
                                                            <div class="product-price-new">
                                                                100.000
                                                                đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-4 col-flex" key="4">
                                            <div class="item-product-thumb">
                                                <div class="product-inner">
                                                    <a class="product-image" href="javascript:void(0)">
                                                        <img :src="theme_uri+'static/images//demo/product4.jpg'" alt="Sản phẩm 1">
                                                        <div class="product-btn-groups">
                                                            <button class="btn-add-item-to-cart"></button>
                                                            <button class="btn-add-item-to-wishlist"></button>
                                                        </div>
                                                    </a>
                                                    <div class="product-content">
                                                        <a href="#" class="product-title" data-max-line="2"><span class="ellip"><span
                                                                    style="white-space: nowrap;">Sản</span> <span style="white-space: nowrap;">phẩm</span>
                                                                <span style="white-space: nowrap;">4</span></span></a>
                                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                                        </p>
                                                        <div class="product-price">
                                                            <div class="product-price-new">
                                                                100.000
                                                                đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-4 col-flex" key="5">
                                            <div class="item-product-thumb">
                                                <div class="product-inner">
                                                    <a class="product-image" href="javascript:void(0)">
                                                        <img :src="theme_uri+'static/images//demo/product1.jpg'" alt="Sản phẩm 1">
                                                        <div class="product-btn-groups">
                                                            <button class="btn-add-item-to-cart"></button>
                                                            <button class="btn-add-item-to-wishlist"></button>
                                                        </div>
                                                    </a>
                                                    <div class="product-content">
                                                        <a href="#" class="product-title" data-max-line="2"><span class="ellip"><span
                                                                    style="white-space: nowrap;">Sản</span> <span style="white-space: nowrap;">phẩm</span>
                                                                <span style="white-space: nowrap;">5</span></span></a>
                                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                                        </p>
                                                        <div class="product-price">
                                                            <div class="product-price-new">
                                                                100.000
                                                                đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-4 col-flex" key="6">
                                            <div class="item-product-thumb">
                                                <div class="product-inner">
                                                    <a class="product-image" href="javascript:void(0)">
                                                        <img :src="theme_uri+'static/images//demo/product2.jpg'" alt="Sản phẩm 1">
                                                        <div class="product-btn-groups">
                                                            <button class="btn-add-item-to-cart"></button>
                                                            <button class="btn-add-item-to-wishlist"></button>
                                                        </div>
                                                    </a>
                                                    <div class="product-content">
                                                        <a href="#" class="product-title" data-max-line="2"><span class="ellip"><span
                                                                    style="white-space: nowrap;">Sản</span> <span style="white-space: nowrap;">phẩm</span>
                                                                <span style="white-space: nowrap;">6</span></span></a>
                                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                                        </p>
                                                        <div class="product-price">
                                                            <div class="product-price-new">
                                                                100.000
                                                                đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="tab-new-product-sample-2">
                                <div class="list-tab-product">
                                    <div class="row row-flex">
                                        <div class="col-xs-12 text-center">
                                            <h4>KHÔNG CÓ SẢN PHẨM</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>