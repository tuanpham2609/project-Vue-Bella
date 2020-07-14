<template>
    <div>
        <section id="hot-product" class=" section section-hot-product">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="title">
                            <h3>Sản phẩm phổ biến</h3>
                        </div>
                    </div>
                </div>
                <div class="list-hot-product">
                    <div itemscope="itemscope" itemtype="http://schema.org/ItemList" class="row row-flex"><span
                            itemprop="numberOfItems" hidden="hidden">5</span>
                        <div itemprop="itemListElement" itemscope="itemscope" class="col-xs-6 col-sm-4 col-md-3 col-flex">
                            <div class="item-product-thumb">
                                <div class="product-inner">
                                    <div class="product-image">
                                        <a href="/ao-thun-soc-ngang" class="">
                                            <img :src="theme_uri+'static/images/demo/product1.jpg'" >
                                        </a>
                                        <div class="product-btn-groups"><button class="btn-add-item-to-cart"></button><button
                                                class="btn-add-item-to-wishlist"></button></div>
                                    </div>
                                    <div class="product-content"><a href="/ao-thun-soc-ngang" class="product-title"
                                            itemprop="url" title="Áo thun sọc ngang"><span itemprop="name" style="font-weight: 600;">Sản phẩm 1</span></a>
                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;"
                                        >s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                                        .</p>
                                        <div itemprop="offers" itemscope="itemscope" itemtype="http://schema.org/Offer"
                                            class="product-price"><span itemprop="priceCurrency" content="VND"></span><span
                                                itemprop="price" content="85000" class="product-price-new"><span>85,000
                                                    đ</span></span>
                                            <!---->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div itemprop="itemListElement" itemscope="itemscope" class="col-xs-6 col-sm-4 col-md-3 col-flex">
                            <div class="item-product-thumb">
                                <div class="product-inner">
                                    <div class="product-image">
                                        <a href="/ao-so-mi-soc-tay-dai" class="">
                                            <img :src="theme_uri+'static/images/demo/product2.jpg'" >
                                        </a>
                                        <div class="product-btn-groups"><button class="btn-add-item-to-cart"></button><button
                                                class="btn-add-item-to-wishlist"></button></div>
                                    </div>
                                    <div class="product-content"><a href="/ao-so-mi-soc-tay-dai" class="product-title"
                                            itemprop="url" title="Áo sơ mi sọc tay dài">
                                            <span itemprop="name" style="font-weight: 600;">
                                                Sản phẩm 2
                                                </span>
                                            </a>
                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                        t is a long established fact that a reader will be distracted by the readable 
                                        content of a page when looking at its layout.
                                        </p>
                                        <div itemprop="offers" itemscope="itemscope" itemtype="http://schema.org/Offer"
                                            class="product-price"><span itemprop="priceCurrency" content="VND"></span><span
                                                itemprop="price" content="120000" class="product-price-new"><span>120,000
                                                    đ</span></span>
                                            <!---->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div itemprop="itemListElement" itemscope="itemscope" class="col-xs-6 col-sm-4 col-md-3 col-flex">
                            <div class="item-product-thumb">
                                <div class="product-inner">
                                    <div class="product-image">
                                        <a href="/vay" class="">
                                            <img :src="theme_uri+'static/images/demo/product3.jpg'" >
                                        </a>
                                        <div class="product-btn-groups"><button class="btn-add-item-to-cart"></button><button
                                                class="btn-add-item-to-wishlist"></button></div>
                                    </div>
                                    <div class="product-content"><a href="/vay" class="product-title" itemprop="url"
                                            title="váy"><span itemprop="name" style="font-weight: 600;">Sản phẩm 3</span></a>
                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
                                            by injected humour, 
                                        </p>
                                        <div itemprop="offers" itemscope="itemscope" itemtype="http://schema.org/Offer"
                                            class="product-price"><span itemprop="priceCurrency" content="VND"></span><span
                                                itemprop="price" content="150000" class="product-price-new"><span>150,000
                                                    đ</span></span>
                                            <!---->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div itemprop="itemListElement" itemscope="itemscope" class="col-xs-6 col-sm-4 col-md-3 col-flex">
                            <div class="item-product-thumb">
                                <div class="product-inner">
                                    <div class="product-image">
                                        <a href="/quan-jean-nu" class="">
                                            <img :src="theme_uri+'static/images/demo/product4.jpg'" >
                                        </a>
                                        <div class="product-btn-groups"><button class="btn-add-item-to-cart"></button><button
                                                class="btn-add-item-to-wishlist"></button></div>
                                    </div>
                                    <div class="product-content"><a href="/quan-jean-nu" class="product-title" itemprop="url"
                                            title="Quần jean nữ"><span itemprop="name" style="font-weight: 600;">Sản phẩm 4</span></a>
                                        <p class="vue-line-clamp" style="font-size: 14px; -webkit-line-clamp: 2;">
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                                        </p>
                                        <div itemprop="offers" itemscope="itemscope" itemtype="http://schema.org/Offer"
                                            class="product-price"><span itemprop="priceCurrency" content="VND"></span><span
                                                itemprop="price" content="150000" class="product-price-new"><span>150,000
                                                    đ</span></span>
                                            <!---->
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