<template>
    <div>
        <section class="wrapper">
            <template  v-if="source.append && source.append.about_breadcrumb && source.append.about_breadcrumb.allow_show == true">
                <div v-if="source.append && source.append.about_breadcrumb && source.append.about_breadcrumb.info == 'image'" class="section section-breadcrumb" 
                    v-bind:style="{'background-image':'url('+$store.state.domain + '/' + source.append.about_breadcrumb.data.background_image.path+')'}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.about_page_title ? source.append.about_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.about_page_title ? source.append.about_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="source.append.about_breadcrumb && source.append.about_breadcrumb.info == 'color' " class="section-breadcrumb" 
                    v-bind:style="{'background-color':source.append.about_breadcrumb.data.background_color}">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="breadcrumb-inner">
                                    <div class="page-title">
                                        <strong>{{ source.append.about_page_title ? source.append.about_page_title.data : ''}}</strong>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li>
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li class="active">{{ source.append.about_page_title ? source.append.about_page_title.data : ''}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div v-html="source.alias_object.content"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style>
    img {
        width: 100%;
        height: auto;
    }
</style>

<script>
    export default {
        props : ['source']  
    }
</script>