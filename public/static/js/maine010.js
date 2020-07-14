
$(function () {
    
    window.WebApp = new Main();
    window.WebApp.init();
    var ProfileMedia = new ProfileMediaApp('#profile-media-image');
    var Subscriber   = new SubscriberApp('#subscriber_news');
    var Cart =  new CartApp('#cart');
    var Comment = new CommentApp('#list-comments');
    var contact = new Contact('#vue_contact');
    // var appFilterProducts =  new FitlerProducts('#list-products');
    var ProductPageApp = new ProductPage('#list-products');
});

function Main() {
    var methods = this;
    methods.initMenu = function () {
        var open = false;
        $('#btn-toggle').on('click', function () {
            if (open) {
                $('#menu').removeClass('open');
                $('#btn-toggle').removeClass('active');
                $('body').removeClass('menu-open');
            } else {
                $('#menu').addClass('open');
                $('#btn-toggle').addClass('active');
                $('body').addClass('menu-open');
            }
            open = !open;
        });
        $('body, html').on('click', function (event) {
            var target = $(event.target);
            if (!target.is('#menu .menubar, #menu .menubar * ,#btn-toggle ,#btn-toggle *')) {
                $('#menu').removeClass('open');
                $('#btn-toggle').removeClass('active');
                $('body').removeClass('menu-open');
                open = false;
            }
            if (!target.is('#cart , #cart * ,#btn-show-cart , #btn-show-cart * ')) {
                $('#cart').removeClass('active');
                $('body').removeClass('open-cart');
            }
            if (!target.is('#header-search-box , #header-search-box * , #btn-search-toggle , #btn-search-toggle * ')) {
                $('#header-search-box').removeClass('active');
            }
            if (!target.is('#section-sidebar , #section-sidebar * ,[data-type="toggle-sidebar"] , [data-type="toggle-sidebar"] *')) {
                $('.main').removeClass('sidebar-open');
            }
        });
        $('#menu .has-submenu .icon-first-submenu').on('click', function (event) {
            event.preventDefault();
            var parent = $(this).parents('.has-submenu');
            $('#menu .has-submenu').not(parent).removeClass('open').find('.submenu').slideUp()
            $('#menu .has-submenu').not(parent).find('.has-second-submenu').removeClass('open');
            $('#menu .has-submenu').not(parent).find('.second-submenu').slideUp();
            parent.toggleClass('open').find('.submenu').slideToggle();
        });
        $('#menu .has-second-submenu .icon-second-submenu').on('click', function (event) {
            event.preventDefault();
            var parent = $(this).parents('.has-second-submenu');
            $('#menu .has-second-submenu').not(parent).removeClass('open').find('.second-submenu').slideUp();
            parent.toggleClass('open').find('.second-submenu').slideToggle();
        });
        $(window).on('load resize', function(){
            // $('#menu .has-submenu').each(function(index, el){
            //     var parent = $(el);
            //     var submenu = parent.find('.submenu');
            //     if( parent.offset().left  + submenu.width() > $(window).width() ){
            //         submenu.addClass('show-on-left');
            //     } else {
            //         submenu.removeClass('show-on-left');
            //     }
            // });
            // $('#menu .has-second-submenu').each(function(index, el){
            //     var parent = $(el);
            //     var submenu = parent.find('.second-submenu');
            //     if( parent.offset().left + parent.width() + submenu.width() > $(window).width() ){
            //         submenu.addClass('show-on-left');
            //     } else {
            //         submenu.removeClass('show-on-left');
            //     }
            // });
            $('.wrapper').css('min-height' , $(window).height() - $('.header').outerHeight() - $('.footer').outerHeight());
        });
        $('[data-toggle="slide"]').on('click', function(event){
            var el = $(this);
            var target  = $(this).data('target');
            var parent = $(this).parent();
            if( parent.hasClass('open')){
                $(target).slideUp(function(){
                    parent.removeClass('open');
                })
            }else{
                $(target).slideDown(function(){
                    parent.addClass('open');
                })
            }
        });
        $('[data-type="toggle-sidebar"]').on('click', function(event){
            event.preventDefault();
            $('.main').toggleClass('sidebar-open');
        })
        $('[data-type="select"]').each(function(index,el){
            var el = $(el);
            var target = $( el.data('target') );
            var text  = $(el).find(":selected").text();
                target.text(text);
            el.on('change', function(){
                var value = this.value;
                var text  = $(this).find(":selected").text();
                target.text(text);
            })
        });
        $('#btn-search-toggle').on('click', function(event){
            event.preventDefault();
            if( $('#header-search-box').hasClass('active') ){
                $('#header-search-box').removeClass('active');
            }else{
                $('#header-search-box').addClass('active');
                setTimeout(function() {
                    $('#header-search-box input').select();
                }, 500);
            }
        });
        $('[data-type="view-type"] a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
            var mode = $(event.target).data('mode');
            $.post("/ajax-general-data", {type : 'update-list-view' , view_type: mode}, function (res) {console.log(res)});
        });
        $('[data-max-line]').each(function(index, el){
            var line = parseInt($(el).data('max-line'));
            $(el).ellipsis({
                lines: line == undefined || line == NaN ? 2  : line,
                ellipClass: 'ellip',
                responsive: true 
            })
        });
    }
    methods.initSidebar = function(){
        $('a[data-toggle=sidebar]').on('click', function(event){
            event.preventDefault();
            var li = $(this).parents('li');
            var list = li.find('> ul ');
            if( li.hasClass('open')){
                list.slideUp();
                li.removeClass('open');
            }else{
                list.slideDown();
                li.addClass('open');
            }
        });
        $('.sidebar-filter .list-group .list-group-child .list-group-item').each(function(index , el){
            if( $(el).hasClass('active')){
                $(el).parents('.list-group-child').show();
                $(el).parents('.list-group-item.has-child').addClass('open');
            }
        });
        

    }
    methods.detailProduct = function(){
        $('[data-type="input-spinner"]').each(function(index, el){
            var el = $(el);
            var target = el.data('target');
            var input = el.find('input[data-type="input-spinner-field"]');
            input.prop('readonly',true);
            var btn = el.find('[data-type="input-spinner-btn"]');
            btn.on('click', function(){
                var type = $(this).data('input-type');
                var value = parseInt(input.val());
                if( type == true || type == 'true'){
                    input.val(value+1);
                    $(target).attr('data-quantity' , value+1);
                }else{
                    if(value > 1){
                        input.val(value-1);
                        $(target).attr('data-quantity' , value-1);
                    }
                }
            });
        });
        $('[data-type="variant-filter"]').each(function(index, el){
            var el = $(el);
            var product = el.data('product');
            var variants = product.children_variant;
            el.find('input[type=radio]').on('change', function(event){
                var arr = [];
                el.find('input[type=radio]:checked').each(function(){
                    var name = $(this).attr('name');
                    var value = $(this).attr('value');
                    arr.push(value);
                    updateView(arr);
                });
            });
            var btn_add_to_cart = $('#btn_add_to_cart');
            console.log(btn_add_to_cart.length);
            var product_price = $('#product-price');
            var product_price_sale = $('#product-price-sale');
            var list_thumb = $('#list-thumb-slider');
            var big_thumb = $('#big-thumb-slider');
            var parentElement = big_thumb.parent();
            
            function updateView(arr){
                parentElement.addClass('hidden-visible');
                big_thumb.slick('unslick')
                big_thumb.empty();
                list_thumb.slick('unslick')
                list_thumb.empty();
                var hasImage = false;
                variants.forEach(function(item){
                    if( _.isEqual(arr.sort() , item.properties.sort()) ){
                        btn_add_to_cart.attr('data-id' , item._id);
                        if(item.price_promotion_web == 0){
                            product_price.html(item.price_sale_web.formatMoney());
                            product_price_sale.html('');
                        }else{
                            product_price.html(item.price_promotion_web.formatMoney());
                            product_price_sale.html(item.price_sale_web.formatMoney()+ 'đ');
                        }
                        if( item.Albums.length){
                            hasImage = true;
                            item.Albums.forEach(function(gallery){
                                createImage(gallery);
                            })
                        }else{
                            var img = null;
                            if(item.Image.hasOwnProperty('path')){
                                if( item.Image.hasOwnProperty('path')){
                                    img = item.Image.path;
                                }
                            }else{
                                img = product.Image.path;
                            }
                            createImage(img);
                        }
                        return;
                    }
                })
                if( hasImage ){
                    methods.slickSliderProduct();
                }
                setTimeout(function() {
                    parentElement.removeClass('hidden-visible');
                }, 100);
            }
            function createImage(item ){
                if( typeof item == 'object'){
                    var big = '\
                        <div class="item">\
                            <a  data-fancybox="gallery" href="'+item.path+'">\
                                <img src="'+item.path+'" alt="">\
                            </a>\
                        </div>';
                    var small = '\
                        <div>\
                            <div class="item" style="background-image:url('+item.path+')">\
                                <img src="template/bella/images/icons/grid.png" alt="">\
                            </div>\
                        </div>';
                    $(big).appendTo(big_thumb);
                    $(small).appendTo(list_thumb);
                }else if( typeof item == 'string'){
                    var big = '\
                        <div class="item">\
                            <a  data-fancybox="gallery" href="'+item+'">\
                                <img src="'+item+'" alt="">\
                            </a>\
                        </div>';
                    $(big).appendTo(big_thumb);
                }
                
            }
        })
    }
    methods.slickSliderProduct = function () {
        if( $('#list-thumb-slider').length ){

            if( $('#list-thumb-slider').hasClass('slick-initialized') ){
                $('#list-thumb-slider').slick('destroy');
            }
            $('#list-thumb-slider').slick({
                dots: false,
                slidesToShow:3,
                slidesToScroll: 1,
                centerMode: true,
                swipe: false,
                infinite:true,
                arrows: true,
                asNavFor: '#big-thumb-slider',
                focusOnSelect:true,
                adaptiveHeight:true,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                ]
            });
        }
        if( $('#big-thumb-slider').length ){

            if( $('#big-thumb-slider').hasClass('slick-initialized') ){
                $('#big-thumb-slider').slick('destroy');
            }
            $('#big-thumb-slider').slick({
                arrows:true,
                slidesToScroll: 1,
                fade:true,
                asNavFor: '#list-thumb-slider'
            });
        }
    }

    methods.slickSlider = function(){
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
        $('#home-banner').not('.lick-initialized').slick({
            slidesToShow :1 ,
            slidesToScroll :1,
            dots:true,
            arrows: true,
            speed: 600,
        });
        $('#list-partners').slick({
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
        $('#list-related-product-slider').not('.lick-initialized').slick({
            dots: false,
            slidesToShow:4,
            slidesToScroll: 1,
            infinite:true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });


    }
    methods.totop = function () {
        $(window).on('load scroll' , function () {
            if ($(this).scrollTop() > 100) {
                $('.totop').addClass('active');
            } else {
                $('.totop').removeClass('active');
            }
            if( $(this).scrollTop() > $('.header .header-top').outerHeight() ){
                $('.main').addClass('header-fixed');
            }else{
                $('.main').removeClass('header-fixed');
            }
        });
        $('.totop').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    }
    methods.fixmenu = function () {
        // $(window).bind('scroll load', function () {
        //  if ($(window).scrollTop() > $('header .topbar').height()) {
        //      $('.main').addClass('fixed');
        //  } else {
        //      $('.main').removeClass('fixed');
        //  }
        // });
    }
    methods.socialSharing = function(){
        $("#social-share").jsSocials({
            shareIn: "popup",
            showLabel: false,
            showCount: false,
            shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon"]
        });
    }
    methods.loading = function(){
        $(function(){
            $('#loading').fadeOut(function(){
                $(this).remove();
            });
        })
    }
    methods.init = function(){
        methods.initMenu();
        methods.initSidebar();
        methods.totop();
        methods.fixmenu();
        methods.loading();
        methods.slickSlider();
        methods.socialSharing();
        methods.slickSliderProduct();
        methods.detailProduct();
    }

    return methods;
}
function SubscriberApp(element) {
    if( $(element).length == 0) return ;
    new Vue({
        el:element,
        data:{
            email : '',
            formstate : {},
            isLoading : false,
        },
        methods:{
            onSubmit:function () {
                var vm = this;
                if( vm.formstate.$valid && !vm.isLoading){
                    $.post("/post-subscriber", {
                        email: vm.email,
                    }, function (result) {
                        if (!result.error) {
                            vm.email = '';
                            vm.formstate._reset();
                            helper.showNotification('Đăng ký nhận tin thành công', 'success', 'success', 10000);
                        }else{
                            helper.showNotification(result.msg, 'error', 'danger', 2000);
                        }
                    }).always(function(){
                        vm.isLoading  = false;
                    }).fail(function(){
                        helper.showNotification('Thao tác không thành công !', 'error', 'danger', 2000);
                    });
                }
            }
        },
    });
}
function ProfileMediaApp(element) {
    if ($(element).length == 0) return;
    var cropper = $('<div></div>');
    cropper.appendTo('body');
    var header_image = $('[data-type=user-media-image]');
    var vm = this;

    this.config = {
        maxSizeUpload: 5,
    };
    this.src = null;
    this.user_id = $(element).data('user-id');
    this.newImage = null;
    this.cropper = null;
    var inputFile = $(element).find('[data-type=file-image]');
    inputFile.on('change', function (event) {
        var files = event.target.files || event.dataTransfer.files;
        vm._createImage(files[0]);
        $(event.target).val('');
    })
    vm._readFileData = function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            vm.src = e.target.result;
            vm.renderModal(e.target.result)
        };
        reader.readAsDataURL(file);
    };
    vm._createImage = function (file) {
        if (/^image\/\w+/.test(file.type)) {
            if (file.size <= vm.config.maxSizeUpload * 1024 * 1024) {
                this._readFileData(file);
            } else {
                var msg = 'Chỉ cho phép dung lượng tối đa ' + this.config.maxSizeUpload + 'Mb .';
                showNotification(msg, 'error', 'danger', 5000);
            }
        } else {
            var msg = file.name + ' - định dạng này không hợp lệ .';
            showNotification(msg, 'error', 'danger', 5000);
        }
    };
    vm.renderModal = function (src) {
        var html = '<div class="modal fade modal-cropper">\
            <div class="modal-dialog" >\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                    </div>\
                    <div class="modal-body">\
                        <div class="crop-container">\
                            <img src="' + src + '" alt="" class="img-cropper">\
                        </div>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>\
                        <button type="button" class="btn btn-green btn-submit"><i class="fa fa-spin fa-spinner hide" ></i>&nbsp;&nbsp;Cập nhật</button>\
                    </div>\
                </div>\
            </div>\
        </div>';
        cropper.html(html);
        var crop = cropper.find('.img-cropper')[0];
        vm.cropper = new Cropper(crop, {
            aspectRatio: 1,
        });
        var modal = cropper.find('.modal');
        modal.modal('show');
        modal.on('hidden.bs.modal', function () {
            vm.src = null;
            cropper.empty();
        });
        modal.on('click', '.btn-submit', function () {
            if ($(this).hasClass('is-loading')) return;
            var btn = $(this);
            btn.addClass('is-loading');
            btn.find('.fa.fa-spinner').removeClass('hide');
            var img = vm.getImageData();
            var base64 = img.toDataURL("image/jpeg");

            var formData = new FormData;
            formData.append('file', base64);
            formData.append('user_id', vm.user_id);

            $.ajax({
                    type: 'POST',
                    data: formData,
                    url: '/post-avatar',
                    contentType: false,
                    processData: false,
                    timeout: 15000,
                })
                .always(function () {
                    btn.removeClass('is-loading');
                    btn.find('.fa.fa-spinner').addClass('hide');
                })
                .done(function (res, status, xhr) {
                    modal.modal('hide');
                    $('[data-type=user-media-image]').attr('src', base64);
                    showNotification('Cập nhật thành công !', 'check', 'success', 5000);
                })
                .fail(function (xhr, status, err) {

                });
        });
    };
    vm.getImageData = function () {
        if (vm.cropper != null) {
            var options = {};
            options['width'] = 200;
            options['height'] = 200;
            options['fillColor'] = '#fff';
            options['imageSmoothingQuality'] = 'high';
            return vm.cropper.getCroppedCanvas(options);
        } else {
            return null;
        }
    }
}
function CommentApp(RootElement){
    var container = $(RootElement);
    if( container.length == 0) return;
    var methods = this;
    var user_id = container.data('user');
    var post_id = container.data('post');
    var product_id = container.data('product');
    var avatar = container.data('default-avatar');
    var pagination = container.data('pagination');
    var empty_image = container.data('empty-image');
    var header = container.data('header');
    var formComment = container.find('[data-type=form-comment]');
    var listComments = container.find('[data-type=list-comments]');
    var paginationWrap = container.find('[data-type=pagination]');
    var isLoading = false;
    methods.timeAgo  = function(value){return moment(new Date(value * 1000)).fromNow()};
    methods.init = function(){
        listComments.find('[data-time]').each(function(index,el){
            $(this).text(methods.timeAgo(parseInt($(this).data('time'))));
        });
        container.on('click' , '.btn-reply', function(){
            var form = $(this).parents('[data-type=comment]').find('.item-form-reply');
            form.fadeIn(400 , function(){
                setTimeout(function(){
                    form.find('[data-type=comment-field-reply]').focus();
                }, 0);
            })
        });
        container.find('[data-type=form-reply]').each(function(index,el){
            methods.initReplyForm($(el));
        });
        methods.initFormComment(formComment);
        methods.updatePagination( parseInt(pagination.total), parseInt(pagination.current));
    };
    methods.initFormComment =  function( FormCommentElement ){
        var textarea = FormCommentElement.find('[data-type=comment-field]');
        FormCommentElement.on('submit', function(event){
            event.preventDefault();
            var content = textarea.text();
            if( content == '') return;
            if(product_id =='' && post_id == '') return;
            textarea.text('');
            $.post('/post-comment', {
                title: 'default',
                content: content,
                user_id: user_id,
                post_id: post_id,
                product_id: product_id,
            }, function (res) {
                if (res.success) {
                    methods.renderComment(res.view, 'bottom' , true);
                }else{
                    helper.showNotification(res.msg, 'error', 'danger', 2000);
                }
                
            });
        });
        textarea.on('keypress', function(event){
            var keycode = event.charCode || event.keyCode;
            if (keycode  == 13) { 
                FormCommentElement.trigger('submit');
                $(this).blur();
                return false;
            }
        })
    };
    methods.renderComment  = function(Comment , position , animation){
        var Template =  $(Comment);
        Template.hide();
        console.log(Comment);
        Template.find('[data-time]').each(function(index,el){
            $(this).text(methods.timeAgo(parseInt($(this).data('time'))));
        });
        if( animation == true){
            Template.addClass('active');
            setTimeout( function() {
                Template.removeClass('active');
            }, 5000);
        }
        if( position == 'bottom'){
            Template.appendTo(listComments);
        }else if( position == 'top'){
            Template.prependTo(listComments);
        }
        Template.find('[data-type=form-reply]').each(function(index,el){
            methods.initReplyForm($(el));
        })
        Template.fadeIn();
    };
    methods.renderReply = function(ListReply , Reply , position , animation  ){
        var Template =  $(Reply);
        Template.find('[data-time]').each(function(index,el){
            $(this).text(methods.timeAgo(parseInt($(this).data('time'))));
        });
        if( animation == true){
            Template.addClass('active');
            setTimeout( function() {
                Template.removeClass('active');
            }, 5000);
        }
        if(position == 'bottom'){
            Template.appendTo(ListReply).fadeIn();
        }else if(position == 'top'){
            Template.prependTo(ListReply).fadeIn();
        }
    };
    methods.initReplyForm = function(FormReply){
        var textarea = FormReply.find('[data-type=comment-field-reply]');
        FormReply.on('submit' , function(event){
            event.preventDefault();
            var comment = FormReply.parents('[data-type=comment]');
            var listReplys = comment.find('[data-type=list-replys]');
            var content = textarea.text();
            var id = comment.data('comment');
            textarea.text('');
            $.post('/post-comment', {
                title: 'default',
                content: content,
                user_id:user_id,
                post_id:post_id,
                parent_id: id,
                product_id: product_id,
            }, function (res) {
                if (res.success) {
                    methods.renderReply( listReplys , res.view , 'bottom', true);
                }else{
                    showNotification(res.msg, 'error', 'danger', 2000);
                }

            });
        });
        textarea.on('keypress', function(event){
            var keycode = event.charCode || event.keyCode;
            if (keycode  == 13) { 
                FormReply.trigger('submit');
                $(this).blur();
                return false;
            }
        })
    };
    methods.updatePagination = function(total, current){
        paginationWrap.twbsPagination('destroy');
        if( total > 0){
            paginationWrap.twbsPagination({
                totalPages: total, 
                startPage: current,
                visiblePages: 5,
                initiateStartPageClick: false,
                hideOnlyOnePage: true,
                href: false,
                pageVariable: '',
                totalPagesVariable: '',
                page: null,
                first: false,
                last: false,
                prev: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>',
                loop: false,
                paginationClass: 'pagination',
                nextClass: 'page-item next',
                prevClass: 'page-item prev',
                lastClass: 'page-item last',
                firstClass: 'page-item first',
                pageClass: 'page-item',
                activeClass: 'active',
                disabledClass: 'disabled',
                anchorClass: 'page-link',
                onPageClick: function(event , page){
                    methods.loadCommentPage(page);
                    return false;
                },
            });
        }
    };
    methods.loadCommentPage = function(page){
        if( isLoading == true) return false;
        isLoading = true;
        $.post('/post-list-comment', {
            page: page,
            post_id: post_id,
            product_id: product_id,
        }, function (res) {
            if( res.error == false){
                listComments.html(res.view);
                methods.callbackAfterRender();
                var url = methods.updateUrlParameter( window.location.href , 'page' ,  res.data.current_page  );
                window.history.pushState( url, $('title').html(), url );
                
                $('html, body').animate({
                    scrollTop: container.offset().top - $(header).outerHeight() - 30
                }, 600);
                methods.updatePagination(res.data.last_page , res.data.current_page);
            }
        }).always(function(){
            isLoading = false;
        });
    }
    methods.callbackAfterRender = function(){
        listComments.find('[data-time]').each(function(index,el){
            $(this).text(methods.timeAgo(parseInt($(this).data('time'))));
        });
        listComments.find('[data-type="form-reply"]').each(function(index,el){
            methods.initReplyForm($(el));
        });
    }
    methods.updateUrlParameter = function (uri, key, value) {

        var i = uri.indexOf('#');
        var hash = i === -1 ? ''  : uri.substr(i);
        uri = i === -1 ? uri : uri.substr(0, i);

        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (!value) {
            uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
        
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        
        if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
        } else if (uri.match(re)) {
            uri = uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            uri = uri + separator + key + "=" + value;
        }
        return uri + hash;
    }
    methods.init();
}
function CartApp(RootElement){
    if( $(RootElement).length == 0) return;

    Vue.use(VueForm, {
        validators: {
            matches: function (value, attrValue) {
                if (!attrValue) {
                    return true;
                }
                return value === attrValue;
            },
            phone: function (value) {
                var pattern = /^\d+$/;
                return pattern.test(value);
            },
        }
    });
    Vue.filter('number_format',function(value){
        return (value == undefined) ? '' : value.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    Vue.component('inputSpinner',{
        template:'<div class="input-group">\
                <div class="input-group-btn">\
                    <button @click.stop.prevent="_descrease" class="btn">\
                        <i class="fa fa-minus"></i>\
                    </button>\
                </div>\
                <input readonly class="form-control" v-model="value"/>\
                <div class="input-group-btn">\
                    <button @click.stop.prevent="_increase" class="btn">\
                        <i class="fa fa-plus"></i>\
                    </button>\
                </div>\
            </div>',
        props:{
            value : {},
            min: {
                default : 1,
            },
            max :{},
            change : {},
            id : {}
        },
        data : function(){
            return {
                
            }
        },
        methods:{
            _increase : function(){
                var value ;
                if( this.max != undefined && this.value >= this.max){
                    value = this.max;
                }else{
                    value = this.value + 1;
                }
                if( typeof this.change == 'function'){
                    this.change(this.id , value);
                }
                this.$emit('input', value);
            },
            _descrease : function(){
                var value ;
                if( this.value <= this.min){
                    value = this.min;
                }else{
                    value = this.value - 1;
                }
                if( typeof this.change == 'function'){
                    this.change(this.id , value);
                }
                this.$emit('input', value);
            }
        },
        watch :{
            'value' : function(value){
                
            }
        }
    });
    Vue.component('slickSlider',{
        template : '<div class="product-gallery" ref="container" >\
                <div class="big-thumbs" ref="big_thumb_wrap" style="width:100%;">\
                    <div class="big-thumbs-slider" ref="big_thumb" id="big_thumb_quick_view" >\
                        <div v-for="img in albums">\
                            <a  data-fancybox="gallery"  :href="img"><img :src="img" alt=""></a>\
                        </div>\
                    </div>\
                </div>\
                <div class="list-thumbs hidden-xs" ref="list_thumb_wrap" style="width:100%;">\
                    <div class="list-thumbs-slider" ref="list_thumb" id="list_thumb_quick_view" v-if="albums.length > 1">\
                        <div class="item-inner" v-for="img in albums" >\
                            <div class="item" :style="setBackground(img)">\
                                <img :src="grid" alt="">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
        </div>',
        props:{
            data : {
            }
        },
        data : function(){
            return {
                grid : this.$root.path + '/images/icons/grid.png',
            }
        },
        computed : {
            albums : function(){
                if(this.data.Albums.length){
                    return this.data.Albums.map(function(item){
                        return item.path;
                    });
                }else{
                    var img = [] ;
                    if(this.data.Image.hasOwnProperty('path')){
                        if( this.data.Image.hasOwnProperty('path')){
                            img.push(this.data.Image.path);
                        }
                    }else{
                        img.push(this.$root.product.Image.path);
                    }
                    return img;
                }
            }
        },
        methods :{
            setBackground : function(path){
                return 'background-image:url('+path+')';
            },
            init : function(){
                $(this.$refs.list_thumb).slick({
                    dots: false,
                    slidesToShow:3,
                    slidesToScroll: 1,
                    centerMode: true,
                    infinite:true,
                    arrows: true,
                    asNavFor: '#big_thumb_quick_view',
                    focusOnSelect:true,
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 3,
                                vertical: false,
                            }
                        },
                    ]
                });
                $(this.$refs.big_thumb).slick({
                    arrows:false,
                    slidesToScroll: 1,
                    asNavFor: '#list_thumb_quick_view',
                    autoplay:true,
                    autoplaySpeed:2000,
                    speed:600,
                    fade: true,
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                arrows:true,
                            }
                        },
                    ]
                });
                
                this.setPosition();
            },
            setPosition : function(){
                $(this.$el).removeClass('hidden-visible');
                var vm = this;
                setTimeout(function() {
                    var _big = $(vm.$refs.big_thumb_wrap).outerHeight(true);
                    var _list = $(vm.$refs.list_thumb_wrap).outerHeight(true);
                    var total ;
                    if( vm.albums.length > 1){
                        total = _big + _list;
                    }else{
                        total = _big;
                    }
                    $(vm.$refs.container).animate({ height : total});
                }, 200);
            }
        },
        mounted : function(){
            this.init();
        },
        watch : {
            data : function(value) {
                var vm = this;
                if( $(this.$refs.big_thumb).hasClass('slick-initialized') ){
                    $(this.$refs.big_thumb).slick('destroy');
                }
                if( $(this.$refs.list_thumb).hasClass('slick-initialized') ){
                    $(this.$refs.list_thumb).slick('destroy');
                }
                $(this.$el).addClass('hidden-visible');
               
                this.$nextTick(function () {
                    vm.init();
                });
            }
        }
    });
    Vue.component('cart', {
        template :  '<div class="cart-container" ref="container" :class="{ opened : _total.open}">\
                        <a type="button" class="btn-cart"><i class="btn-cart-icon"></i><span class="badge">{{_total.count}}</span></a>\
                        <div class="cart"  >\
                        <div class="cart-header">\
                            <h4 class="header-title">Có <span>{{_total.count }}</span> sản phẩm trong giỏ hàng</h4><a href="#" class="btn-close" @click.stop.prevent="_close()"><i class="fa fa-arrow-right"></i></a>\
                        </div>\
                        <div class="cart-body">\
                            <transition-group class="list-items" tag="div" @leave="leave" ref="list">\
                                <div v-for="(item , index) in items" class="item" :key="item._id" :data-index="index">\
                                    <a  @click.stop.prevent="_remove( item._id, index)" class="btn-remove"></a>\
                                    <div class="item-image"><img :src="item.image" class="img-responsive"></div>\
                                    <div class="item-info">\
                                        <a target="_blank" :href="\'/\'+item.alias"><h5 class="item-title">{{item.name}}</h5></a>\
                                        <strong class="item-price" v-if="item.price_promotion_web > 0">Giá : {{ item.price_promotion_web | number_format}}</strong>\
                                        <strong class="item-price" v-else>Giá : {{ item.price_sale_web | number_format}}</strong>\
                                        <input-spinner :id="item._id" v-model="item.quantity" :change="_updateQuantity"></input-spinner>\
                                    </div>\
                                </div>\
                            </transition-group>\
                        </div>\
                        <div class="cart-footer">\
                            <div class="row">\
                                <div class="col-xs-12">\
                                    <div class="total">\
                                        <span class="total-title">TỔNG TIỀN:</span>\
                                        <span class="total-price">{{_total.price | number_format}}đ</span>\
                                    </div>\
                                </div>\
                                <div class="col-xs-12">\
                                    <div class="btn-groups">\
                                        <a href="/cart" class="btn btn-block btn-primary btn-go-to-cart"> <i class="fa fa-arrow-left"></i> Giỏ hàng </a>\
                                        <a href="/checkout" class="btn btn-block btn-success btn-go-to-check-out">Thanh toán <i class="fa fa-arrow-right"></i></a>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                     </div>\
                </div>',
        props:{
            data : {

            }
        },
        data : function(){
            return {
                items :  this.data,
                empty: false,
            };
        },
        methods:{
            _updateQuantity(id , quantity){
                var vm = this;
                $.post("/update-quantity-cart", {product_id: id , quantity : quantity}, function (res) {});
            },
            _remove : function(id , index){
                var vm = this;
                $.post("/remove-product-from-cart", {product_id: id}, function (res) {
                    if (res.error == false) {
                        vm.items.splice(index , 1);
                    }
                });
            },
            leave : function(el, done){
                $(el).addClass('deleted');
                setTimeout(function () {
                    done();
                },600);
            },
            _close: function(){
                $('body').removeClass('open-cart');
                $('#cart').removeClass('active');
                var vm = this;
                setTimeout(function(){
                    if(vm._total.open == false){
                        $('#cart').removeClass('is-still-active');
                    }
                }, 3000);
            },
            _open : function(){
                $('body').addClass('open-cart');
                $('#cart').addClass('active is-still-active');
            }
        },
        computed :{
            _total : function(){
                var total = 0;
                var count = 0;
                this.items.forEach(function(item){
                    if(item.price_promotion_web > 0){
                        total += item.price_promotion_web * item.quantity;
                    }else{
                        total += item.price_sale_web * item.quantity;
                    }
                    count += item.quantity;
                })
                $('#btn-show-cart ').find('[data-type=cart-counter]').text(count);
                return {
                    price : total,
                    count : count,
                    open : count > 0 ?  true : false,
                };
            }
        },
        watch : {
            items : function(value){
                if( value.length > 0){
                }
            },
        },
        mounted : function(){
            var vm = this; 
            if( this._total.count  ==  0){
                // $(this.$refs.container).addClass('empty');
            }
        }

    });
    Vue.component('quickView',{
        template : '<div class="modal fade modal-quick-view" ref="modal_quick_view" >\
                        <div class="modal-dialog modal-lg" >\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                    <button type="button" class="close" data-dismiss="modal" ></button>\
                                    <div class="product-quick-view" >\
                                        <div class="product-quick-view-container" ref="container">\
                                            <div class="product-gallery">\
                                                <slick-slider ref="slick_slide"  v-if="current != null" :data="current"></slick-slider>\
                                            </div>\
                                            <div class="product-info">\
                                                <div class="product-info-inner">\
                                                    <h1 class="product-name">{{  product.name }}</h1>\
                                                    <div class="product-price" >\
                                                        Đơn giá :  <strong><span >{{ priceSale.price |number_format }}</span>đ</strong>\
                                                        <small v-if="priceSale.old_price != null "><span >{{ priceSale.old_price |number_format }}</span>đ</small>\
                                                    </div>\
                                                    <p><span class="product-category">{{ product.rela_category.name }}</span></p>\
                                                    <p class="product-description">{{ product.description }} </p>\
                                                    <div class="product-properties" v-if="product.ListProperties != undefined">\
                                                        <h4>Tùy chọn : </h4>\
                                                        <ul v-for="item1 in product.ListProperties">\
                                                            <li class="ul-title">{{ item1.name }}</li>\
                                                            <li v-for="item2 in item1.children">\
                                                                <label>\
                                                                    <input v-on:change="onChange()" class="product-property-filter" type="radio" :value="item2._id" :name="item1._id">{{ item2.name }}\
                                                                </label>\
                                                            </li>\
                                                        </ul>\
                                                    </div>\
                                                    <div class="product-btn-groups">\
                                                        <input-spinner v-model="quantity"></input-spinner>\
                                                        <a :data-quantity="quantity"  class="btn  btn-success btn-text btn-add-item-to-cart"  data-type="add-to-cart" :data-id="current._id">\
                                                            <span><i class="fas fa-shopping-basket"></i> Thêm vào giỏ hàng</span>\
                                                        </a>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
        props:{
            product : {

            }
        },
        data : function(){
            return {
                current : null,
                quantity : 1,
            }
        },
        computed : {
            priceSale : function(){
                if( this.current.price_promotion_web != '' && this.current.price_promotion_web != 0 ){
                    return {
                        price : this.current.price_promotion_web,
                        old_price : this.current.price_sale_web != '' ? this.current.price_sale_web : 0,
                    }
                }
                return {
                    price : this.current.price_sale_web != '' ? this.current.price_sale_web : 0,
                    old_price : null ,
                }
            }
        },
        methods:{
            onChange: function () {
                var vm = this;
                var arr = [];
                $('.product-property-filter:checked').each(function(){
                    var name = $(this).attr('name');
                    var value = $(this).attr('value');
                    arr.push(value);
                });
                vm.current = _.find(vm.product.children_variant , {properties : arr});
            },
            checkPromotionPrice : function(value){
                if( this.current.price_promotion_web  == 0 || this.current.price_promotion_web == ''){
                    return false;
                }
                return true;
            },
        },
        created : function(){
            this.current= _.find(this.product.children_variant , {is_represent : true});
            if( this.product.children_variant.length){
                this.current= _.find(this.product.children_variant , {is_represent : true});
            }else{
                this.current= this.product;
            }
        },
        mounted : function(){
            var vm = this;
            $(vm.$refs.modal_quick_view).modal('show');
            $(vm.$refs.modal_quick_view).on('hidden.bs.modal' , function(){
                vm.$root.product = null ;
            });
            $(vm.$refs.modal_quick_view).on('shown.bs.modal' , function(){
                
            });
            
            if( vm.product.children_variant.length){
                var active_properties = vm.current.properties;
                setTimeout(function () {
                $(vm.$el).find('.product-property-filter').each(function(index, el){
                    var value = $(el).attr('value');
                    if( active_properties.indexOf(value) >= 0){
                        $(el).prop('checked' , true);
                    }
                });
            }, 500);
            }
            
        },
    });
    Vue.component('login', {
        template :'<div class="modal fade modal-login" tabindex="-1" role="dialog" ref="modal_login">\
                <div class="modal-dialog" role="document">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                            <h4 class="modal-title">Đăng nhập</h4>\
                        </div>\
                        <div class="modal-body">\
                            <vue-form class="form-login" :state="state" @submit.stop.prevent="onSubmit">\
                                <validate class="form-group">\
                                    <label>Email</label>\
                                    <input type="email"    v-model="form.email" name="email" required class="form-control"  />\
                                    <field-messages>\
                                        <p class="form-error" slot="required">Chưa nhập email </p>\
                                        <p class="form-error" slot="email">Email chưa đúng định dạng </p>\
                                    </field-messages>\
                                </validate>\
                                <validate class="form-group">\
                                    <label>Mật khẩu</label>\
                                    <input type="password"    v-model="form.password" name="password" required class="form-control"  />\
                                    <field-messages>\
                                        <p class="form-error" slot="required">Chưa nhập email </p>\
                                        <p class="form-error" slot="email">Email chưa đúng định dạng </p>\
                                    </field-messages>\
                                </validate>\
                                <div class="col-xs-12">\
                                    <div class="text-right forget-password">\
                                        <a href="/user-forgot-password">Quên mật khẩu</a>\
                                    </div>\
                                </div>\
                                <div class="text-center">\
                                    <button class="btn btn-warning btn-submit" type="submit">\
                                        <i class="fa fa-spin fa-spinner" v-if="isLoading"></i>&nbsp;Đăng nhập\
                                    </button>\
                                </div>\
                                <div class="note">\
                                    <p><small>Nếu bạn chưa có tài khoản, có thể đăng kí <a href="/user-register">tại đây</a> để nhận được nhiều ưu đãi hơn.</small></p>\
                                </div>\
                            </vue-form>\
                        </div>\
                    </div>\
                </div>\
            </div>',
        props:{
            value : {
                type: Boolean
            }
        },
        data : function(){
            return {
                form :{
                    email : '',
                    password : '',
                },
                state : {},
                isLoading : false,
            }
        },
        watch : {
            value :  function(value){
                if( value ){
                    $(this.$refs.modal_login).modal('show');
                }else{
                    $(this.$refs.modal_login).modal('hide');
                }
            }
        },
        methods:{
            onSubmit : function(){
                var vm = this;
                if( vm.state.$valid && vm.isLoading == false ){
                    var formData = new FormData;
                    for (key in vm.form) {
                        formData.append(key, vm.form[key]);
                    }
                    vm.isLoading = true;
                    $.ajax({
                        type: 'POST',
                        data: formData,
                        url: '/post-loginAjax',
                        contentType: false,
                        processData: false,
                        timeout: 15000,
                    })
                    .always(function(){
                        vm.isLoading = false;
                    })
                    .done(function (res, status, xhr) {
                        if (res.success) {
                            window.location.reload();
                        }else{
                            vm.error = res.msg;
                            helper.showNotification(res.msg, 'error', 'danger', 2000);
                        }
                    })
                    .fail(function (xhr, status, err) {
                        helper.showNotification('Thực hiện thao tác không thành công !!!', 'error', 'danger', 1000);
                    });
                }
            }
        },
        mounted : function(){
            var vm = this;
            $(vm.$refs.modal_login).on('hidden.bs.modal', function(){
                vm.$emit('input', false);
            })
            // $(this.$el).find('input').removeAttr('readonly');
        },

    });
    var cart = new Vue({
        el : RootElement,
        data :{
            items: [],
            product: null,
            user_id : $(RootElement).data('user-id'),
            path : $(RootElement).data('path'),
            login: false,
        },
        created: function(){
            var vm = this;
            var cart = $(RootElement).data('cart');
            if( cart != null ){
                for (var key in cart.products) {
                    if (cart.products.hasOwnProperty(key)) {
                        cart.products[key]['_id'] = key;
                        vm.items.push( cart.products[key] );
                    }
                }
            }
            $(RootElement).append('<cart :data.sync="items" ref="cart"></cart>');
            $(RootElement).append('<quick-view v-if="product != null" :product.sync="product" ref="quick_view"></quick-view>');
            $(RootElement).append('<login v-model="login" v-if="user_id == undefined || user_id == null || user_id == \'\'" ref="login"></login');
        },
        mounted: function(){
            var vm = this;
            $('#btn-show-cart').on('click', function(){
                if( vm.$refs.cart.items.length) {
                    vm.$refs.cart._open();
                }
            });
            $(RootElement).find('.btn-cart').on('click', function(){
                if( $('#cart').hasClass('active') ){
                    vm.$refs.cart._close();
                }else{
                    vm.$refs.cart._open();
                }
                
            });
            $('#modalProduct').on('hidden.bs.modal', function(){
                vm.product = null;
            });
            $('body').on('click','[data-type="add-to-cart"]' , function(event){
                event.preventDefault();
                var item = $(this);
                if( item.hasClass('active') || item.hasClass('is-loading') || item.hasClass('is-active') ) return; 
                var id = item.attr('data-id');
                if( id == undefined || id == '' || id == null ) return; 
                var type = item.data('quick-view');
                var quantity = item.attr('data-quantity') == undefined ? 1 : item.attr('data-quantity');
                if( type != undefined){
                    item.addClass('active');
                    $.post("/get-product-variant", {product_id: id}, function (res) {
                        vm.product= res.Product;
                    }).always(function(){
                        item.removeClass('active');
                    });
                }else{

                    item.addClass('active');
                    $.post("/add-to-cart", {product_id: id, quantity: quantity}, function (res) {
                        if (res.error == false) {
                            if( res.hasOwnProperty('data') ){
                                if( res.data.hasOwnProperty('products')){
                                    if( res.data.products.hasOwnProperty(id)){
                                        var _index = _.findIndex( vm.items ,{ _id : id });
                                        if( _index == -1 ){
                                            res.data.products[id]['_id'] = id;
                                            vm.items.push(res.data.products[id]);
                                            helper.showNotification('Thêm  '+res.data.products[id].name+' vào giỏ hàng !' ,'shopping_basket' ,'success' , 2000);
                                        }else{
                                            vm.items[_index].quantity = res.data.products[id].quantity;
                                            helper.showNotification('Tăng số lượng sản phẩm '+res.data.products[id].name+' thêm  !' ,'shopping_basket' ,'success' , 2000);
                                        }
                                    }
                                }
                            }
                        }
                    }).always(function(){
                        if( vm.product !=  null){
                            $(vm.$refs.quick_view.$refs.modal_quick_view).modal('hide');
                        }
                        item.removeClass('active');
                    });
                }
            });
            $('body').on('click','[data-type=add-to-wishlist]', function(event){
                event.preventDefault();
                var item = $(this);
                if( item.hasClass('active') || item.hasClass('is-loading') ) return;
                item.addClass('active');
                var id = item.data('id');
                if( vm.user_id == undefined || vm.user_id == null || vm.user_id == '' ){
                    if( vm.login == false){
                        vm.login = true;
                        item.removeClass('active');
                    }else{
                        item.removeClass('active');
                    }
                }else{
                    $.post("/post-favorite", {web_user_id: vm.user_id, product_id: id}, function (res) {
                        if (res.success) {
                            item.fadeOut(function(){
                                $(this).remove();
                            });
                            $('[data-type="add-to-wishlist"][data-id='+id+']').fadeOut(function(){
                                $(this).remove();
                            });
                            helper.showNotification('Thêm yêu thích thành công!' ,'favorite' ,'success' , 2000);
                        }
                    })
                    .always(function(){
                        item.removeClass('active')
                    });
                }
            });
            $('body').on('click','[data-type=modal-login]', function(event){
                event.preventDefault();
                if( vm.login == false){
                    vm.login = true;
                }
            });
            $('body').on('click', function(event){
                var target = $(event.target);
                if( !target.is('#cart , #cart * , #btn-show-cart , #btn-show-cart *')){
                    vm.$refs.cart._close();
                }
            })
        }
    });
    if( $('#cart-page').length  ){
        new Vue({
            el : '#cart-page',
            data :{
                show: false,
                cartPage: null,
                items : [],
            },
            methods:{
                _updateQuantity(id , quantity){
                    var vm = this;
                    $.post("/update-quantity-cart", {product_id: id , quantity : quantity}, function (res) {});
                },
                _remove : function(id , index){
                    var vm = this;
    
                    $.post("/remove-product-from-cart", {product_id: id}, function (res) {
                        if (res.error == false) {
                            vm.items.splice(index , 1);
                        }
                    });
    
                },
                leave : function(el, done){
                    $(el).addClass('deleted');
                    setTimeout(function () {
                        done();
                    },600);
                },
                _close: function(){
                    $('body').removeClass('open-cart');
                    $('#cart').removeClass('active');
                },
                _findIndex : function(id){
                    for (var i = 0; i < this.items.length; i++) {
                        if( this.items[i]._id == id){
                            return i;
                        }
                    }
                    return -1;
                },
            },
        
            computed:{
                _total : function(){
                    var total = 0;
                    var count = 0;
                    this.items.forEach(function(item){
                        if(item.price_promotion_web > 0){
                            total += item.price_promotion_web * item.quantity;
                        }else{
                            total += item.price_sale_web * item.quantity;
                        }
                        count += item.quantity;
                    })
                    return {
                        price : total,
                        count : count,
                    };
                }
            },
            created: function(){
                var vm = this;
                if( typeof cart != undefined){
                    this.items = cart.items;
                }
            },
        });
    }
}
function Contact(element) {
    if( $(element).length == 0 ) return; 
    new Vue({
        el: element,
        data: {
            formstate : {},
            dataCreate : {
                fullname:'',
                email :'',
                title :'',
                content:''
            },
            isLoading :false,
            formstate : {}
        },
        methods: {
            onSubmit: function () {
                var vm = this;
                if (vm.formstate.$valid && !vm.isLoading) {
                    var formData = new FormData;
                    for (key in vm.dataCreate) {
                        formData.append(key, vm.dataCreate[key]);
                    }
                    vm.isLoading = true;
                    $.ajax({
                        type: 'POST',
                        data: formData,
                        url: '/post-contact',
                        contentType: false,
                        processData: false,
                        timeout: 15000,
                    })
                    .done(function (res, status, xhr) {
                        if (res.success) {
                            helper.showNotification('Gửi thông tin thành công', 'notifications', 'success', 10000);
                            vm.dataCreate = {
                                fullname:'',
                                email :'',
                                title :'',
                                content:''
                            }
                            vm.formstate._reset();
                        }else{
                            helper.showNotification(res.msg, 'error', 'success', 1500);
                        }
                    })
                    .always(function(){
                        vm.isLoading = false;
                    })
                    .fail(function (xhr, status, err) {
                        helper.showNotification('Thực hiện thao tác không thành công !!!', 'error', 'danger', 1000);
                    });
                }


            }
        },
    });
}

function FitlerProducts(rootElement){
    var rootElement = $(rootElement);
    if( rootElement.length == 0 ) return;
    var methods = this;
    this.current_page = parseInt(rootElement.data('current-page'));
    this.total_page = parseInt(rootElement.data('total-page'));
    this.category = rootElement.data('category');
    var paginate =  $('[data-type="pagination"]');
    var list_products = $('[data-type="list-products"]');
    $('[data-type="category-page-filter"][type="checkbox"]').on('click', function(){
        methods.updateList();
    });
    $('[data-type="category-page-filter"][type="radio"]').on('click', function(){
        methods.updateList();
    });
    $('[data-type="category-page-filter"][type="select"]').on('change', function(){
        methods.updateList();
    });
    if( methods.total_page  > 1){
        paginate.twbsPagination({
            totalPages: methods.total_page, 
            startPage: methods.current_page,
            visiblePages: 5,
            initiateStartPageClick: false,
            hideOnlyOnePage: false,
            href: false,
            pageVariable: '',
            totalPagesVariable: '',
            page: null,
            first: false,
            last: false,
            prev: '<i class="fas fa-chevron-left"></i>',
            next: '<i class="fas fa-chevron-right"></i>',
            loop: false,
            paginationClass: 'pagination',
            nextClass: 'page-item next',
            prevClass: 'page-item prev',
            lastClass: 'page-item last',
            firstClass: 'page-item first',
            pageClass: 'page-item',
            activeClass: 'active',
            disabledClass: 'disabled',
            anchorClass: 'page-link',
            onPageClick: function(event , page){
                methods.updateList(page);
                return false;
            },
        });
    }
    this.updateList = function(page){
        var filters = {
            category : {},
            property : [],
            price : {},
            sort_by : '',
            page : 1,
        };
        if( page != undefined){
            methods.current_page = parseInt(page);
        }else{
            methods.current_page = 1;
        }
        $('[data-type="category-page-filter"]').each(function(index , el){
            var type = $(el).attr('type');
            var name = $(el).attr('name');
            if( $(el).is(':checked')){
                var value = $(el).attr('value');
                if( type == 'radio' ){
                    filters[name] = value;
                }else if( type == 'checkbox'){
                    if( filters.hasOwnProperty(name) ){
                        filters[name].push(value);
                    }else{
                        filters[name] = [value];
                    }
                }
            }
            if( type == 'select'){
                filters[name] = $(el).val();
            }
        });
        filters['category'] = methods.category;
        filters['page'] = methods.current_page; 
        methods.sendData(filters);
    };
    this.sendData = function(filters){
        methods.scrollToList( );
        $.post("/product-category-pagination", {data : filters}, function (res) {
            
            if( res.success ){
                methods.reRender(res);
                methods.updateUri(filters);
            }
        }).fail(function() {
            // loading.removeClass('hide');
        });
    }
    this.reRender = function(data){
        if( data.products.total > 0){
            $('[data-type="list-title"]').html('<span>Hiển thị từ '+ data.products.from +' đến '+ data.products.to +' của '+ data.products.total +'</span>');
        }else{
            $('[data-type="list-title"]').html('');
        }
        list_products.html(data.products.views);
        methods.updatePagination(data.products.last_page, data.products.current_page);
    };
    this.updatePagination = function(total, current){
        methods.current_page = current;
        methods.total_page = total;
        paginate.twbsPagination('destroy');
        if( total > 0){
            paginate.twbsPagination({
                totalPages: total, 
                startPage: current,
                visiblePages: 5,
                initiateStartPageClick: false,
                hideOnlyOnePage: true,
                href: false,
                pageVariable: '',
                totalPagesVariable: '',
                page: null,
                first: false,
                last: false,
                prev: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>',
                loop: false,
                paginationClass: 'pagination',
                nextClass: 'page-item next',
                prevClass: 'page-item prev',
                lastClass: 'page-item last',
                firstClass: 'page-item first',
                pageClass: 'page-item',
                activeClass: 'active',
                disabledClass: 'disabled',
                anchorClass: 'page-link',
                onPageClick: function(event , page){
                    methods.updateList(page);
                    return false;
                },
            });
        }
    };
    this.getParam = function(key){
        var url = window.location.href;
        var param = window.location.href.indexOf('?');
        if (param == -1) {
            return null;
        }
        var qs = url.substr(param, url.length - param).split('+').join(' ');
        var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params.hasOwnProperty ? params[key] : null;
    }
    this.updateUrlParameter = function (uri, key, value) {

        var i = uri.indexOf('#');
        var hash = i === -1 ? ''  : uri.substr(i);
        uri = i === -1 ? uri : uri.substr(0, i);

        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (!value) {
            uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
        
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        
        if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
        } else if (uri.match(re)) {
            uri = uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            uri = uri + separator + key + "=" + value;
        }
        return uri + hash;
    }
    this.updateUri = function(arr){
        var url = window.location.href;
        for(var key in arr){
            if( arr.hasOwnProperty(key)){
                if( key == 'property'){
                    var uri = '';
                    arr[key].forEach(function(item , index){
                        if( index == 0){
                            uri += item;
                        }else{
                            uri += ','+item;
                        }
                    });
                    url = methods.updateUrlParameter(url , 'properties' , uri  );
                }else if(key != 'category'){
                    url = methods.updateUrlParameter(url , key , arr[key]  );
                }
            }
        }
        window.history.pushState( url, $('title').html(), url );
    }
    this.scrollToList = function(){
        var offset =  $('.header-navbar').outerHeight() + 30;
        $('html, body').animate({
            scrollTop: $('#section-content').offset().top - offset
        }, 500);
    }
}

function ProductPage(rootElement){
    var rootElement = $(rootElement);
    if( rootElement.length == 0 ) return;
    var vm = this;
    var Form =  $('#product_form_filter');
    var Paginate =  $('[data-type="pagination"]');
    var ListProducts = $('[data-type="list-products"]');
    var FormElement = Form.find(".product_filter");
    vm.Category = rootElement.data('category');
    vm.CurrentPage = parseInt(rootElement.data('current-page'));
    vm.TotalPage = parseInt(rootElement.data('total-page'));
    var timeout = null ;
    FormElement.on('change', function(){
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            vm.CurrentPage = 1;
            vm.sendData();
        }, 500);
    })
    vm.scrollToList = function(){
        var offset =  $('.header-navbar').outerHeight() + 30;
        $('html, body').animate({
            scrollTop: $('#section-content').offset().top - offset
        }, 500);
    }
    vm.sendData  = function(){
        var data =  new FormData;
        if( vm.Category != ''){
            data.append('category' , vm.Category );
        }
        data.append('page' , vm.CurrentPage);
        data.append('type' , "get-product-filter" );
        $.each(FormElement.serializeArray(), function () {
            data.append(this.name , this.value);
        });
        
        $.ajax({
            type: 'POST',
            data: data,
            url: '/product-category-pagination',
            contentType: false,
            processData: false,
            timeout: 15000,
            cache: false,
            error: function (xhr, ajaxOptions, thrownError) {

            },
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentValue = (e.loaded / e.total) * 100;
                        $('#loading-ajax').css('width' , percentValue+'%' );
                    }
                };
                return xhr;
            },
            beforeSend: function () {
                $('#loading-ajax').show();
                ListProducts.css('height' ,ListProducts.outerHeight());
                ListProducts.fadeOut(200);
                Paginate.fadeOut(200);
            },
            complete: function () {
                setTimeout(function() {
                    $("#loading-ajax").hide();
                    $('#loading-ajax').css('width' , 0 );
                }, 300);
            },
            success: function (res) {
                if( res.hasOwnProperty('success') && res['success'] == true){
                    if( res.data.total > 0){
                        $('[data-type="list-title"]').html('<span>Hiển thị từ '+ res.data.from +' đến '+ res.data.to +' của '+ res.data.total +'</span>');
                    }else{
                        $('[data-type="list-title"]').html('');
                    }
                    vm.scrollToList();
                    ListProducts.css('height' , 'auto');
                    ListProducts.html(res.data.views);
                    ListProducts.fadeIn();
                    Paginate.fadeIn();
                    vm.TotalPage = res.data.last_page;
                    vm.CurrentPage = res.data.current_page;
                    vm.updatePagination();
                }
            }
        });
    }
    vm.updatePagination = function(){
        Paginate.twbsPagination('destroy');
        if( vm.TotalPage > 0){
            Paginate.twbsPagination({
                totalPages: vm.TotalPage, 
                startPage: vm.CurrentPage,
                visiblePages: 5,
                initiateStartPageClick: false,
                hideOnlyOnePage: true,
                href: false,
                pageVariable: '',
                totalPagesVariable: '',
                page: null,
                first: false,
                last: false,
                prev: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>',
                loop: false,
                paginationClass: 'pagination',
                nextClass: 'page-item next',
                prevClass: 'page-item prev',
                lastClass: 'page-item last',
                firstClass: 'page-item first',
                pageClass: 'page-item',
                activeClass: 'active',
                disabledClass: 'disabled',
                anchorClass: 'page-link',
                onPageClick: function(event , page){
                    vm.CurrentPage = page;
                    vm.sendData();
                    return false;
                },
            });
        }
    };
    vm.init = function(){
        if( vm.TotalPage  > 1){
            Paginate.twbsPagination({
                totalPages: vm.TotalPage, 
                startPage: vm.CurrentPage,
                visiblePages: 5,
                initiateStartPageClick: false,
                hideOnlyOnePage: false,
                href: false,
                pageVariable: '',
                totalPagesVariable: '',
                page: null,
                first: false,
                last: false,
                prev: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>',
                loop: false,
                paginationClass: 'pagination',
                nextClass: 'page-item next',
                prevClass: 'page-item prev',
                lastClass: 'page-item last',
                firstClass: 'page-item first',
                pageClass: 'page-item',
                activeClass: 'active',
                disabledClass: 'disabled',
                anchorClass: 'page-link',
                onPageClick: function(event , page){
                    vm.CurrentPage = page;
                    vm.sendData();
                    return false;
                },
            });
        }
    }
    vm.init();
}