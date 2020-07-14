<template>
    <div>
        <section class="section section-partner">
            <div class="container">
                <div class="col-xs-12">
                    <div class="list-partners" id="list-partners" v-if="source">
                        <div class="item" v-for="(item, index) in source.data" :key="index">
                            <img :src="$store.state.domain + '/' + item.path" alt=""
                                title="">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        props:['source'],
        mounted() {
            if ($('#list-partners').length) {
                var partners = $('#list-partners');
                partners.slick({
                    slidesToShow :5 ,
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

