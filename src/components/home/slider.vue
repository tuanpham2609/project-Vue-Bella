<template>
    <div>
        <section class="slider">
            <div id="layerslider" style="width:1920px;height:650px;" v-if="data && data.allow_show" 
                :data-navbar="theme_uri + 'static/vendor/layerslider/skins/'">
                <div class="ls-slide" data-ls="slidedelay:5000;  transition2d: all;timeshift:-1000;" v-for="(item, index) in data.data" :key="index">
                    <a :href="item.info.link" :title="item.info.title">
                        <img :src="$store.state.domain + '/' + item.path" :title="item.info.title" class="ls-bg" alt="Slide background" />
                    </a>
                    <p class="ls-l" style="top:150px;left:350px;font-weight: 600;height:60px;padding-right:10px;padding-left:10px;font-size:50px;line-height:60px;color:#333;border-radius:3px;white-space: nowrap;"
                        data-ls="offsetxin:0;durationin:2000;delayin:1500;easingin:easeOutElastic;rotatexin:-90;transformoriginin:50% top 0;offsetxout:-200;durationout:1000;">
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        props:["data"],
        mounted(){
            if ($('#layerslider').length) {
                var slider = $('#layerslider');
                slider.layerSlider({
                    skin: 'v5',
                    autoPlayVideos: false,
                    skinsPath: slider.data('navbar'),
                    navButtons: true,
                    navStartStop: true,
                    hoverPrevNext: false,
                    hoverBottomNav: false,
                    touchNav: true,
                    navStartStop: false,
                    responsive : true,
                    showBarTimer: true,
                    showCircleTimer: true,
                });
            }
        }
    }
</script>

