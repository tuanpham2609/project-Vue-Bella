<template>
    <div>
        <section class="section section-partner">
            <div class="container">
                <div class="col-xs-12">
                    <div class="list-partners demo" id="list-partners">
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                               width="140" title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                              width="140"  title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                              width="140"  title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                               width="140" title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                               width="140" title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                               width="140" title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                               width="140" title="Hình ảnh thương hiệu">
                        </div>
                        <div class="item">
                            <img :src="theme_uri+'static/images/demo/img_article.jpg'" alt="Hình ảnh thương hiệu"
                               width="140" title="Hình ảnh thương hiệu">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style>
    .demo .item {
        padding: 0 5px;  
    }
</style>

<script>
export default {
    mounted() {
        if ($('#list-partners').length) {
            var partners = $('#list-partners');
            partners.slick({
                slidesToShow : 6 ,
                slidesToScroll :1,
                dots:false,
                arrows: false,
                autoplay: true,
                autoplaySpeed : 3000,
                speed: 600,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 540,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                ]
            });
        }
    }
}
</script>