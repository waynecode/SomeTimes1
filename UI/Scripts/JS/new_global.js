/**
 * 整站可用的js
 **/

$(function(){

    // 模拟ES5 Array.prototype.forEach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(f, oThis) {
            if (!f || f.constructor != Function.toString()) return;
            oThis = oThis || window;
            for (var i = 0, len = this.length; i < len; i++) {
                f.call(oThis, this[i], i, this); //p1 上下文环境 p2 数组元素 p3 索引 p4 数组对象
            }
        }
    }

    //模拟 ES5 Array.prototype.filter
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(f, oThis) {
            if (!f || f.constructor != Function.toString()) return;
            oThis = oThis || window;
            var a = [];
            for (var i = 0, len = this.length; i < len; i++) {
                if (f.call(oThis, this[i], i, this)) a.push(this[i]);
            }
            return a;
        }
    }

    //模拟 ES5 Array.prototype.map
    if (!Array.prototype.map) {
        Array.prototype.map = function(f, oThis) {
            if (!f || f.constructor != Function.toString()) return;
            oThis = oThis || window;
            var a = [];
            for (var i = 0, len = this.length; i < len; i++) {
                a.push(f.call(oThis, this[i], i, this));
            }
            return a;
        }
    }

    //模拟 ES5 Array.prototype.every
    if (!Array.prototype.every) {
        Array.prototype.every = function(f, oThis) {
            if (!f || f.constructor != Function.toString()) return;
            oThis = oThis || window;
            for (var i = 0, len = this.length; i < len; i++) {
                if (!f.call(oThis, this[i], i, this)) return false;
            }
            return true;
        }
    }

    //模拟 ES5 Array.prototype.some
    if (!Array.prototype.some) {
        Array.prototype.some = function(f, oThis) {
            if (!f || f.constructor != Function.toString()) return;
            oThis = oThis || window;
            for (var i = 0, len = this.length; i < len; i++) {
                if (f.call(oThis, this[i], i, this)) return true;
            }
            return false;
        }
    }

        Date.prototype.format = function (format) {
           var args = {
               "M+": this.getMonth() + 1,
               "d+": this.getDate(),
               "h+": this.getHours(),
               "m+": this.getMinutes(),
               "s+": this.getSeconds(),
               "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
               "S": this.getMilliseconds()
           };
           if (/(y+)/.test(format))
               format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           for (var i in args) {
               var n = args[i];
               if (new RegExp("(" + i + ")").test(format))
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
           }
           return format;
       };

    //console.log($('#footer').height())
    $('#main_all').css('min-height',$(window).height()-96-160);

    //输入框自适应高度
    $('textarea.t-autosize').autoTextarea();

    //定位锚平滑滚动
    $(document).on('click', 'a[href*=#]', function(){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 1000);
                return false;
            }
        }
    });

    //增加返回顶部按钮
    $('body').append('<a href="#header" class="returnTop"></a>');
    $(window).scroll(function(){
        if( $(document).scrollTop() > 500 ){
            $('.returnTop').fadeIn();
        } else {
            $('.returnTop').fadeOut();
        }
    });

    //通用的那种label盖在input上的时候使用
    $('.label-holder input').each(function(){
        if( $(this).val() != '' ) $(this).next('label').hide();
    });
    $('.label-holder').on({
        focus: function() {
            $(this).next('label').hide();
        },
        blur: function() {
            if ($(this).val() == '') $(this).next('label').show();
        }
    }, "input");

    //点击弹出窗口遮罩层关闭窗口
    $(document).on('click', '#mask, #nativeMask', function(){ closebox(); });

    //头部下拉菜单
    $('.dropdown-hd').mouseenter(function(){
        $(this).addClass('hover');
    }).mouseleave(function(){
        $(this).removeClass('hover');
    });

    $('#header .menu_profile .plus').each(function() {
        $(this).find('a:first').toggle(
            function() {
                var $subMenu = $(this).next();
                var $indicator = $(this).children('i');
                $subMenu.slideDown(300, function() {
                    $indicator.html('-');
                });
            },
            function() {
                var $subMenu = $(this).next();
                var $indicator = $(this).children('i');
                $subMenu.slideUp(300, function() {
                    $indicator.html('+');
                })
            }
        );
    });

    function doSearch(el){
        var keyword = $.trim($(el).val());
        if(keyword == "" || keyword == "发现你感兴趣的手工相关内容" ){
                return false;
        }
        var baseUrl =  '/search/?';
        if(/\/creation|bazaar|market\//.test(window.location.href)){
            baseUrl = "/search/?type=creations&";
        }else if (/\/blogs?|topic|community|buzzs?|broadcast\//.test(window.location.href)){
            baseUrl = "/search/?type=trends&";
        }else if (/\/r|artist\//.test(window.location.href)){
            baseUrl = "/search/?type=users&";
        }
        window.location.href = baseUrl + "q=" + keyword;
        return false;
    }

    function doSimpleSearch (el) {
        var keyword = $.trim($(el).val());
        var href = window.location.href.split('?')[0];
        var followUrl = window.location.href.split('?')[1];
        if (followUrl && /=/.test(followUrl)) {
            if (/q=/.test(followUrl)) {
                var baseUrl = followUrl.split('q=')[0];
                console.log(baseUrl);
                window.location.href = href + '?' + baseUrl + 'q=' + keyword;
            }else{
                window.location.href = window.location.href + "&q=" + keyword;
            }
        }else{
            window.location.href = href + "?q=" + keyword;
        }
        return false;
    }

    $('#search-form').submit(function(e){
        if ( $('#search-hd-keywords').val() == '' ) {
            sogoke.showfntext2_notice('您还未输入要搜索的内容!');
            $('#search-hd-keywords').focus();
            return false;
        }else{
            return doSearch('#search-hd-keywords');
        }
    });

    $(".search-hd").bind("keydown", function(e){
        if(e.keyCode == 13){
            if ( $('#search-hd-keywords').val() == '' ) {
                return false;
            }else{
                return doSearch('#search-hd-keywords');
            }

        }
    });

    //简单搜索框提交
    $(document).on('submit', '.simple-search-form', function(){
        if ( $(this).find('input').val() == '' ) {
            sogoke.showFntext2_notice('您还未输入要搜索的内容!');
            $(this).find('input').focus();
            return false;
        }else{
            return doSimpleSearch($(this).find('input'));
        }
    });

    if ($().imgLiquid) {
        $('.imgLiquid').imgLiquid({fill:false});
        $('.imgLiquidFill').imgLiquid({fill:true});
    }


});

// 附加自定义滚动条
// API:
//      (1) attachCustomScrollbar($obj)
//      制定的 obj 被附加自定义滚动条
//
//      (2) attachCustomScrollbar()
//      所有包含 .needs-custom-scrollbar 的节点被附加自定义滚动条
//
// 关于参数配置
// 参数配置在 HTML 中设定，具体格式为：
//  <div data-custom-scroll-bar-options="key1:val1|key2:val2"></div>

var attachCustomScrollbar = (function() {
    'use strict';

    function config_parser($candidate) {
        var option = { skin: 'default-skin' };
        var key, val;
        var raw_spec;
        var config = $candidate.attr('data-custom-scroll-bar-options');

        if (!config) {
            return option;
        } else {
            config = config.replace(/\s+/g, '').split('|');
        }

        if (config.length >= 1) {
            for (var i = 0; i < config.length; i++) {
                raw_spec = config[i];
                key = raw_spec.split(':')[0];
                val = raw_spec.split(':')[1];
                if (/true|yes/i.test(val)) {
                    val = true;
                }
                if (/false|no/i.test(val)) {
                    val = false;
                }
                option[key] = val;
            }
        }
        return option;
    }

    return function(candidate) {
        var $candidates = candidate ? $(candidate) : $('.needs-custom-scrollbar');
        $candidates.each(function(i, el) {
            var $el = $(el);
            var config = config_parser($el);
            if ($el.customScrollbar) {
                $el.customScrollbar(config);
            }
        });
    }

})();


// Conditional Runner
function CR(descriptor) {
    if (!(this instanceof CR)) throw 'CR: must be called as a constructor';

    // validate id
    if (!descriptor.id) {
        throw 'Conditional Runner Error: id missing';
    }
    if (typeof descriptor.id !== 'string') {
        throw 'Conditional Runner Error: id should be a string';
    }
    if (descriptor.id in CR) {
        throw 'Conditional Runner Error: id already exist';
    }
    if (/^(length|name|arguments|caller|prototype)$/.test(descriptor.id)) {
        throw 'Conditional Runner Error: invalidate id';
    }

    // validate criteria
    if (!descriptor.criteria) {
        throw 'Conditional Runner Error: criteria missing';
    }
    if (typeof descriptor.criteria !== 'function') {
        throw 'Conditional Runner Error: criteria should be a function';
    }
    this.criteria = descriptor.criteria;

    // validate succeed callback
    if (!descriptor.succeed) {
        throw 'Conditional Runner Error: succeed callback missing';
    }
    if (typeof descriptor.succeed !== 'function') {
        throw 'Conditional Runner Error: succeed callback should be a function';
    }
    this.succeed = descriptor.succeed;

    // validate failure callback
    if (!descriptor.failure) {
        throw 'Conditional Runner Error: failure callback missing';
    }
    if (typeof descriptor.failure !== 'function') {
        throw 'Conditional Runner Error: failure callback should be a function';
    }
    this.failure = descriptor.failure;

    CR[descriptor.id] = this;
}

CR.prototype = {
    constructor: CR,
    run: function(ifnotice,criteria) {
        var status = criteria;
        switch(criteria) {
            case true: // force success condition
                this.succeed();
                return status;
                break;
            case false: // force failure condition
                this.failure();
                return status;
                break;
            default:
                status = this.criteria();
                switch (status) {
                    case true:
                        this.succeed();
                        break;
                    default:
                    case false:
                        if (ifnotice) {
                            this.failure();
                        };
                        break;
                }
                return status;
        }
    }
};


//自定义下拉菜单 风格1
var XselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            XselectT = setTimeout(function(){
                $this.children('.x-select-menu').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            clearTimeout(XselectT);
            $(this).children('.x-select-menu').hide();
        }
    }, '.x-select');
});

//自定义下拉菜单 风格2
var YselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            YselectT = setTimeout(function(){
                $this.addClass('hover');
                $this.css('z-index', 100);
                $this.children('.y-select-menu').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            var $this = $(this);
            clearTimeout(YselectT);
            $this.removeClass('hover');
            $this.css('z-index', 99);
            $this.children('.y-select-menu').hide();
        }
    }, '.y-select');
});

//自定义下拉菜单 风格3
var ZselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            ZselectT = setTimeout(function(){
                $this.children('.x-navi-menu').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            clearTimeout(ZselectT);
            $(this).children('.x-navi-menu').hide();
        }
    }, '.x-navi');
});
//自定义下拉菜单 风格4
var AselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            AselectT = setTimeout(function(){
                $this.children('.x-market-menu').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            clearTimeout(AselectT);
            $(this).children('.x-market-menu').hide();
        }
    }, '.x-market');
});
//自定义下拉菜单 风格5
var MselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            MselectT = setTimeout(function(){
                $this.children('.menu_profile').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            clearTimeout(MselectT);
            $(this).children('.menu_profile').hide();
            $("#header .menu_profile .plus dl").hide();
            $("#header .menu_profile .plus a").children("i").html("+");
        }
    }, '.menu_avatar');
});
//自定义下拉菜单 风格6
var SselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            SselectT = setTimeout(function(){
                $this.children('.menu_shop_dd').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            clearTimeout(SselectT);
            $(this).children('.menu_shop_dd').hide();
        }
    }, '.x-shop');
});
//自定义下拉菜单 风格7
var PselectT;
$(function(){
    $(document).on({
        mouseenter: function(){
            var $this = $(this);
            PselectT = setTimeout(function(){
                $this.children('.x-pub').fadeIn('fast');
            }, 200);
        },
        mouseleave: function(){
            clearTimeout(PselectT);
            $(this).children('.x-pub').hide();
        }
    }, '.ta-addnew');
});

//自定义下拉菜单 风格8
var MarketSelectT;
$(function(){
    $(document).on({
        mouseenter: function(e){
            e.stopPropagation();
            var $this = $(this);
            if ($this.find('.nav-list-a').html() === '男士' || $this.find('.nav-list-a').html() === '女士'){
                var oHeight = 310;
            }else{
                var oHeight = 200;
            }
            MarketSelectT = setTimeout(function(){
                $this.children('.m-subcategory').css('visibility','visible');
                $this.children('.m-subcategory').stop().animate({
                    'height':oHeight + 'px',
                    //'height':200 + 'px',
                    'opacity':1
                },400);
            }, 50);
            return false;
        },
        mouseleave: function(e){
            e.stopPropagation();
            var _this = $(this);
            clearTimeout(MarketSelectT);
            $(this).children('.m-subcategory').stop().animate({
                    'height':0,
                    'opacity':0
                },function(){
                    _this.children('.m-subcategory').css('visibility','hidden');
                });
            return false;
        }
    },'.m-category');
});


//分类筛选器
$(function(){
    $(document).on('click', '.x-filter-trigger', function(){
        $this = $(this);
        $this.toggleClass('active');
        $('#'+$this.attr('data-id')).slideToggle();
    });
    $(document).on('click', '.x-filter-menu a', function(){
        $this = $(this);
        $(this).closest('.x-filter-menu').children('.active').removeClass('active');
        $(this).parent().addClass('active');
    });
});


/* 内容列表中使用 */
$('.mine-list-type').on('click', '.mlt-picpreview', function(){
    $(this).hide().next('.mlt-allpics').slideDown();
});

$('.mine-list-type').on('click', '.mlt-allpics', function(){
    $(this).hide().prev('.mlt-picpreview').show();
    document.body.scrollTop = $(this).parents('li').offset().top;
});

$('.mine-list-type').on('click', '.mlt-video a', function(){
    $(this).parent().hide();
    $(this).parent().next('.mlt-video-player').slideDown();
    $(this).closest('.mlt-video').nextAll('.mlt-video-rel').children('.mlt-link').hide();
    $(this).closest('.mlt-video').nextAll('.mlt-video-rel').children('.mlt-fold').show();
});

$('.mine-list-type').on('click', '.mlt-fold', function(){
    $(this).prev().show();
    $(this).hide();
    $(this).parent().prevAll('.mlt-video').children('.mlt-video-preview').show();
    $(this).parent().prevAll('.mlt-video').children('.mlt-video-player').hide();
    var html = $(this).parent().prevAll('.mlt-video').children('.mlt-video-player').html();
    //reset video state
    $(this).parent().prevAll('.mlt-video').children('.mlt-video-player').html(html);
});

var ALERT_HAS_SHOWN_KEY = 'alert_has_shown';
var alert_has_shown = $.cookie(ALERT_HAS_SHOWN_KEY);

function show_box(){
    $(".covering").show();
    $("#alertLogin").show().animate({opacity:1}, 800);
    $.cookie(ALERT_HAS_SHOWN_KEY, 'true', { path: '/' });
}

function close_box(){
    $("#alertLogin").animate({opacity:0}, 600,function(){
        $('#alertLogin').hide();
    })
    $(".covering").fadeOut();
    var cookietime = new Date();
    cookietime.setTime(cookietime.getTime()+(6 * 60 * 60 * 1000));

    $.cookie(ALERT_HAS_SHOWN_KEY, null, { path: '/'});
}

$(document).on({
    'click':function() {
        close_box();
    }
},'#alertClose')

function check_login(){
    var flag = true;
    var auth_key = $("#auth_key").val();
    if(!auth_key){
        flag = false;
        show_box();
    }
    return flag;
}

//打分函数，第二个参数有分数时，显示分数，否则就是可以打分
function ratyer($target, $score, $type, $id, $loc){
    if($loc==undefined){
       $loc = "ratyer";
    }
    $($target).raty({
        start: $score>0?$score:0,
        readOnly: $score>0?true:false,
        halfShow: true,
        path:'/',
        starOff: (sogoke.STATIC_URL+'img/star-off2.png').substring(1),
        starOn : (sogoke.STATIC_URL+'img/star-on2.png').substring(1),
        starHalf: (sogoke.STATIC_URL+'img/star-half.png').substring(1),
        hints : ['1分', '2分', '3分', '4分', '5分'],
        size: 15,
        click: function(score, evt) {
            //var url = '/actions/rate/'+$type+'/' + $id + '/-/'+$loc+'/';
            //$.ajax({
                //type:"POST",
                //url:url,
                //data:{score:score},
                //dataType:"json",
                //error: function(data) {
                    //sogoke.showFntext2_error('评分失败!');
                //},
                //success:function(data) {
                    //sogoke.showFntext2_bingo('评分成功!');
                //}
            //});
        }
    });
}


function loadComments(el, fetchURL, page, type, raw_id){
    var flag = check_login();

    // Only load comments from server, when commentsNumber > 0,
    // and the comments haven't been load before.
    if(flag){
        $.ajax({
            url:fetchURL,
            dataType:"json",
            error: function(data) {
                sogoke.showFntext2_error('读取评论失败');
            },
            success:function(data) {
                console.log(data);
                var templates = Handlebars.templates,
                    $html = "";

                data.page = page||1;
                data.type = type;
                data.raw_id = raw_id;
                data.user_id =window.user.id;
                data.user_avatar=window.user.avatar;

                $html += templates.dynamic_comments(data);
                $html += templates.dynamic_comments_paginator(data);
                $html += templates.dynamic_comment_form(data);
                $(el).html($html);
                $(el).find('textarea.t-autosize').focus();
                // Scroll to the bottom of container
                var container = $(el).closest('li.clearfix');
                //$('html, body').animate({scrollTop: $(container).offset().top + $(container).height() - $(el).height()- 40}, 1000);
            }
        });
    }
}

$(function(){
    $(document).on('click', '.embed-reply-pic', function(){
        if($(this).hasClass('preview')){
            $(this).removeClass('preview');
            var img = $(this).find('img');
            $(img).attr('src', $(img).data('origin_url'));
        }else{
            $(this).addClass('preview');
            var img = $(this).find('img');
            $(img).attr('src', $(img).data('thumb_url'));
        }
    });
})

//内嵌式回应
function embedReply(obj){
    var fetchURL = $(obj).data('fetchurl'),
        type  = $(obj).data('type'),
        raw_id = $(obj).data('raw_id');

    if( $(obj).hasClass('embedreply') && !$(obj).hasClass('slided') ){
        //一次只能展开一个嵌入式评论，
        $('.embed-reply').slideUp();
        $('.embedreply b').hide();
        $('.embedreply span').show();

        setTimeout(function() {
            $(obj).children('span').hide();
            if ($(obj).find('b').length > 0) {
                $(obj).find('b').html('收起').show();
            }else{
                $(obj).append('<b>收起</b>');  
            }

            $('.slided').removeClass('slided');

            if( $(obj).closest('.mlt-meta').next('.embed-reply').length > 0 ){ //如果刚才已经点击过，则直接显示
                $(obj).addClass('slided');
                $(obj).closest('.mlt-meta').next('.embed-reply').slideDown();
            } else {
                $(obj).addClass('slided');
                $(obj).closest('.mlt-meta').after('<div class="embed-reply" style="display:none;"></div>');
                $(obj).closest('.mlt-meta').next('.embed-reply').slideDown(function(){
                    loadComments(this, fetchURL, 1, type, raw_id);
                });
            }
        },10)
    } else {
        $(obj).removeClass('slided');
        $(obj).children('b').hide();
        $(obj).children('span').show();
        $(obj).closest('.mlt-meta').next('.embed-reply').slideUp();
    }
}

/* ajax分页 */
$(function(){
    $(document).on('click', '.ajaxPages-embedReply a', function(){
        var $html = '';
        $this = $(this);
        $total = $this.parent().children('.page').length;
        $target = parseInt($this.attr('data-page'));

        //这里只是为了演示，从模板中取了重复的数据
        var link = $this.closest('li').find('.mlt-opt .embedreply');
        var raw_id = link.data('raw_id');
        var type = link.data('type');
        var fetchURL = link.data('fetchurl');
        loadComments($this.closest('.embed-reply'), fetchURL+"?batch="+($target-1), $target, type, raw_id);
    });


    //评论ajax
    $(document).on('submit', 'form[name="reply-form"]', function(){
        var $quoteID = '';
        var $html = '';
        //判断是否是内嵌回应
        var $is_embed = $(this).closest('.embed-reply').length;

        var $this = $(this);
        $replyContent = $this.find('.t-autosize').val();
        if ( $replyContent == '' ){
            sogoke.showFntext2_notice('不能发布空回应哦！');
            $this.find('.t-autosize').focus();
            return false;
        }

        if ( $this.find('input[name="quote-id[]"]').length > 0 ) {
            for( $i=0; $i<$this.find('input[name="quote-id[]"]').length; $i++ ) {
                $quoteID += $this.find('input[name="quote-id[]"]').eq($i).val() + ',';
            }
        }

        var trigger = $(this),
            container =  $(this).closest('.embed-reply'),
            loading = container.find('.loading');

        if (parseInt(trigger.data('sending'), 10) === 1 ) {
            sogoke.showFntext2_notice('发送中，请耐心等待');
            return false;
        } else if (trigger.find('button').hasClass('sending')) {
            sogoke.showFntext2_notice('发送中，请耐心等待');
            return false;
        } else {
            var form   = container.find('form'),
                comments   = container.find('.comments'),
                textarea   = container.find('textarea'),
                mentions   = textarea.data('mentions'),
                rawComment = sogoke.stripNewLineHTML(textarea.val());


            if (textarea.val().length > sogoke.MIN_LENGTH_OF_COMMENT) {
                var photos = [];
                var pImg = $(this).find('.icon-upload-img');
                if ( pImg.hasClass('picAdded')){
                    photos.push(pImg.data('id'));
                };
                var data = {
                    comment:rawComment,
                    photos:photos.join(',')
                };

                var options = {
                    data:data,
                    error:function(data) {
                        loading.hide();
                        sogoke.showFntext2_error('回应发布失败！');
                        trigger.data('sending', 0);
                        trigger.find('button').text('回应').removeClass('sending');
                    },
                    success: function(response_text, status_text, xhr, form_elem) {
                        var templates = Handlebars.templates;
                        sogoke.showFntext2_bingo('回应发布成功！');
                        textarea.val('');

                        // clear thumbnail when upon success
                        // not roubust, but works for now
                        textarea.next('.upload-images').find('.icon-upload-img').attr('style', 'position:relative;z-index:0;');

                        if (xhr.status === 201 || xhr.statusText === 'created' || xhr.statusText === 'CREATED') {
                            var d     = new Date(),
                                timestamp = parseInt(d.getTime() / 1000, 10),
                                comment   = sogoke.renderMentions(rawComment, mentions),
                                data      = {id:response_text, user_id:user.id,username:user.username, avatar:user.avatar,comment:comment, photos:photos, timestamp:timestamp};

                            trigger.closest('ul').prevAll('ul.comments').append(templates.dynamic_comment(data));
                            trigger.closest('ul').prevAll('ul.comments').children('li:last').fadeIn();
                            pImg.removeClass('picAdded');
                            pImg.data('id','');
                            loading.hide();
                            trigger.data('sending', 0);
                            trigger.find('button').text('回应').removeClass('sending');
                        }
                    }
                };
                loading.show();

                form.ajaxSubmit(options);
                trigger.data('sending', 1);
                trigger.find('button').text('回应中').addClass('sending');
                return false;
            } else {
                sogoke.showFntext2_notice('多说一些吧');
            }
        }
        return false;
    });
});



//删除回应
function delReply(obj, replyID){
    //replyID是回应的ID，删除之后执行：
    if(replyID && confirm('确定删除此回应吗？')){
        $.ajax({
            type:"POST",
            url:'/comments/delete/' + replyID + '/',
            dataType:"json",
            error: function(response) {
                sogoke.showFntext2_error('删除失败');
            },
            success:function(response) {
                sogoke.showFntext2_bingo('删除成功！');
                $(obj).closest('li').slideUp('normal', function(){
                    $(this).remove();
                });
            }
        });
    }
}

//回应
function response(obj){
    $user = $(obj).parents('.comment-meta').prevAll('.commenter').text().replace(/[\r\n\s]/g, "");
    $('.reply-form textarea').focus().val($('.reply-form textarea').val() + '@'+$user+' ');
}

//通用弹窗函数
function whitebox(title, content, style){
    var $html = '';

    $html += '<div id="mask"></div>';

    if( style == 1 ){
        $html += '<div id="whitebox" style="border:0;padding:20px 40px;border-radius:0;">';
        $html += '<a href="javascript:closebox();" class="closebox" title="关闭">×</a>';
        $html += '<h1 style="border:0;text-align:center;">'+title+'</h1>';
    }else if( style == 2 ){
        $html += '<div id="whitebox">';
        $html += '<a href="javascript:closebox();" class="closebox" title="关闭">×</a>';
        $html += '<h1 style="font-size:20px; font-weight:500; color:#63a485;">'+title+'</h1>';
    }else if( style == 3 ){
        $html += '<div id="whitebox" style="width:520px;">';
        $html += '<a href="javascript:closebox();" class="closebox" title="关闭">×</a>';
        $html += '<h1 style="font-size:20px; font-weight:500; color:#63a485;">'+title+'</h1>';
    }else{
        $html += '<div id="whitebox">';
        $html += '<a href="javascript:closebox();" class="closebox" title="关闭">×</a>';
        $html += '<h1>'+title+'</h1>';
    }

    $html += '<div class="box-content">';
    $html += content;
    $html += '</div>';
    $html += '</div>';

    $('body').append($html);
    $top = ($(window).height() - $('#whitebox').height())/2;
    $left = ($(window).width() - $('#whitebox').width())/2;
    $('#mask').show();
    $('#whitebox').css({top:$top, left:$left}).fadeIn('fast');
}

function nativebox( content ){
    var $html = '';

    $html += '<div id="nativeMask"></div>';
    $html += '<div id="nativebox">';
    $html += '<a href="javascript:closebox();" class="closebox" title="关闭"><i class="icon icon-cross-round"></i></a>';
    $html += '<div class="box-content">';
    $html += content;
    $html += '</div>';
    $html += '</div>';

    $('body').append($html);
    $('#nativeMask').show();
    $('#nativebox').css({top:$('.left-main').offset().top}).fadeIn('fast');
}

function conversationPicBox( content ){
    var $html = '';

    $html += '<div id="nativeMask" style="text-align:center;"></div>';
    $html += '<div id="nativebox" style="width: 1000px; text-align:center; height:'+ $(window).height() +'px; display:table;">';
    $html += '<div class="nativebox-img-wrap" style="display:table-cell; vertical-align:middle;">'
    $html += '<div style="display: inline-block;*display: inline;*zoom: 1; position: relative;">'
    $html += '<a href="javascript:closebox();" class="closebox" title="关闭"><i class="icon icon-cross-round"></i></a>';
    $html += '<div class="box-content">';
    $html += content;
    $html += '</div>';
    $html += '</div>';
    $html += '</div>';

    $('body').append($html);
    $('#nativeMask').show();
    console.log($(window).scrollTop());
    $('#nativebox').css('top',$(window).scrollTop()).fadeIn('fast');
}

//关闭弹窗
function closebox(){
    $('#mask').remove();
    $('#whitebox').fadeOut('fast');
    $('#whitebox').remove();
    $('#nativeMask').remove();
    $('#nativebox').remove();
}


/**
 * 添加到愿望清单按钮和弹出框
 **/

function bindWishListEvent(){
    //弹窗中添加新愿望清单
    //
    $(document).on('click', '.btn-create', function(){
        var that = this;
        var name = $(this).prevAll('input').val();

        if ($(this).hasClass('disabled')) {
            return;
        }

        $(this).addClass('disabled').html('创建中');

        if(name != ''){

            var url = "/wishlists/api/?action=create_new";
            $.ajax({
                    type:'POST',
                    url: url,
                    datatype: 'json',
                    data: {
                        'title': name
                    },
                    cache: false,
                    success: function(response){
                            if(response.status > 0){
                                var item = response.item;
                                var html = '';
                                html += '<li data-wishlistID="'+ item['id']+'">';
                                html += '<label>';
                                html += '<input type="checkbox" name="wishlist-check">&nbsp;';
                                html += '<span>'+name+'</span>';
                                html += '</label>&nbsp;';
                                html += '<a href="/wishlist/'+ item['id']+'/edit/" class="edit">编辑或完善愿望清单</a>';
                                html += '<a href="javascript:;" data-url="/actions/delete/wishlist/'+ item['id'] + '/-/wishlists/" class="del fr wBoxWishlist">x</a>';
                                html += '</li>';

                                $('.wish-list').find('.overview').prepend(html);
                                $(that).prevAll('input').val('');
                                $(that).html('创建');
                                //sogoke.showFntext2_bingo('愿望清单「'+name+'」创建成功');
                            }
                    },
                    error: function() {
                        sogoke.showFntext2_error('愿望清单创建失败');
                        $(that).removeClass('disabled').html('创建');
                    }
           });

        }
    });

    //弹窗中愿望清单checkbox改为单选
    $(document).on('click', '#whitebox .wish-list input[type="checkbox"]', function(){
        $('#whitebox .wish-list input[type="checkbox"]').not($(this)).removeAttr('checked');
    });

    $(document).on('keyup blur', '#addnewWishlist', function() {
        var value = $(this).val();
        var $create_button = $('.create-wishlist .btn-create');
        var $char_limit_notice = $('.wish-list-creation-error');
        var is_empty = value === '' || /^\s+$/.test(value);
        var exceed_char_limit = value.replace(/\s+/g).length > 18;
        if (exceed_char_limit) {
            $char_limit_notice.addClass('active');
        } else {
            $char_limit_notice.removeClass('active');
        }
        if (exceed_char_limit || is_empty) {
            $create_button.addClass('disabled');
        } else {
            $create_button.removeClass('disabled');
        }
    });

}

//添加到愿望清单弹窗: ID 是传送过来的商品的ID
function addToWishList(obj, user_id, type, ID){


    var $content = '';
    $(obj).addClass('current-atwl');
    $title = '添加到你的愿望清单';
    $content += '<div class="mb10 gray">加入已有或新创建的愿望清单</div>';
    $content += '<ul class="wish-list mb20">';
    $content += '</ul>';
    $content += '<div class="create-wishlist">';
    $content += '<input id="addnewWishlist" class="labelaction" placeholder="+ 创建愿望清单" />&nbsp;';
    $content += '<a href="javascript:;" class="btn btn-create disabled">创建</a>';
    $content += '<span class="wish-list-creation-error sgkred">不能超过18个字哦</span>'
    $content += '</div>';
    $content += '<a href="javascript:;" onclick="submitWL(' + type + ',\'' + ID +'\' );" class="btn wish-ok btn-paleblue">确定</a>';
    $content += '<a href="javascript:closebox();" class="btn wish-cancel">取消</a>';

    whitebox($title, $content);

    $('#whitebox .wish-list').html('<img class="spinner" src="'+ sogoke.STATIC_URL +'img/ajax-loader.gif" alt>')
    var url = '/wishlists/api/?action=load_wishlists&user_id='+ user_id + "&item_type="+ type +"&start_index=1&count=20";
    $.ajax({
            type:'GET',
            url: url,
            datatype: 'json',
            data: {},
            cache: false,
            success: function(response){
                    items = response.items;
                    var html = '';
                    if(items.length > 0){
                        for(var i=0; i< items.length ; i++){
                            // var itemListUrl ='/api/workshop/wishlist/' + items[i]['id'] + '/';
                            // var checkMessage;
                            // $.ajax({
                            //     type:'GET',
                            //     url: itemListUrl,
                            //     datatype: 'json',
                            //     data: {},
                            //     cache: false,
                            //     success: function(data){
                            //         checkMessage = data;
                            //         return;
                            //     }
                            // })

                             html += '<li data-wishlistID="'+ items[i]['id']+'">';
                             html += '<label>';
                             if(items[i]['can_add']){
                                html += '<input type="checkbox" name="wishlist-check">';
                                html += '<span>'+ items[i]['title']+'</span>';
                             }else{
                                html += '<input type="checkbox" name="wishlist-check" disabled=true style="color:gray">';
                                html += '<span style="text-decoration:line-through;">'+ items[i]['title']+'</span>';
                             }
                             html += '</label>';
                             html += '<a href="/wishlist/'+ items[i]['id']+'/edit/" class="edit">编辑或完善愿望清单</a>';
                             //html += '<a href="javascript:;" class="fr swi-del remove" title="删除该清单" data-id="' + ID + '" data-type="' + type + '" data-wishlistid="' + items[i]['id']+ '"></a>';
                             html += '<a href="javascript:;" data-url="/actions/delete/wishlist/'+ items[i]['id'] + '/-/wishlists/" class="del fr wBoxWishlist">x</a>';
                             html += '</li>';
                        }

                    }
                    $('#whitebox .wish-list').html(html);
                    attachCustomScrollbar($('#whitebox .wish-list'));
            }
    });

    bindWishListEvent();
}

//添加愿望清单成功之后
function submitWL(type, ID){
    var wishlistEle = $('#whitebox .wish-list input[name="wishlist-check"]:checked').closest('li');
    var wishlistTitle = $(wishlistEle).find('span').text();
    var wishlistID = $(wishlistEle).data('wishlistid');

    if (wishlistEle.length === 0) {
        sogoke.showFntext2_notice('请先选择一个清单');
        return;
    }

    var url = "/wishlists/api/?action=add_to";
    $.ajax({
            type:'POST',
            url: url,
            datatype: 'json',
            data: {
                  'item_pk': ID,
                  'item_type': type,
                  'wishlist_id': wishlistID
            },
            cache: false,
            success: function(response){
                        if(response.status > 0){
                            if (response.status == 1) {
                                var html = '';
                                html += '<div class="box-msg mb10">';
                                html += '<p>添加成功！</p>';
                                html += '<p>已经添加到愿望清单: <a href="/wishlist/'+ wishlistID+'" target="_blank" ><span class="blue">'+ wishlistTitle+'</span></a></p>';
                                html += '</div>';
                                html += '<div style="text-align:right;"><a href="javascript:closebox();" class="btn wish-ok">关闭</a></div>';

                                $('.box-content').html(html);
                                $('.current-atwl').parent().children('b').removeClass('wish-list-icon').addClass('wish-list-added-icon');
                                $('.current-atwl').parent().children('span').text(parseInt($('.current-atwl').parent().children('span').text())+1);
                                $('.current-atwl').removeClass('current-atwl');

                                setTimeout(function() {
                                    closebox();
                                }, 3000);
                            }else if (response.status == 2){
                                sogoke.showFntext2_bingo('已经在您的清单里');
                            }

                        }
            },
            error: function() {
                sogoke.showFntext2_error('加入清单失败，请稍后重试');
            }
    });

}


function delFromWishList(type, ID, wishlistID, callback){
    var url = "/api/workshop/wishlist/delete_item/";
    $.ajax({
            type:'POST',
            url: url,
            datatype: 'json',
            data: {
                  'item_pk': ID,
                  'item_type': type,
                  'wishlist_id': wishlistID
            },
            cache: false,
            success: function(response){
                if(response.status > 0 && callback ){
                     callback();
                }
            },
            error: function() {
                sogoke.showFntext2_error('清单删除失败');
            }
    });
}


/**
 * 侧边栏载入更多愿望清单
 **/
function loadMoreWishListByUser(obj, user_id, start_index, count){
    $(obj).html('<img src="'+ sogoke.STATIC_URL +'img/ajax-loader.gif" style="margin-top:10px;" alt>');

    var url = '/wishlists/api/?action=load_wishlists&user_id='+ user_id+"&start_index="+start_index+"&count="+count;
    loadMoreWishList(obj, url);
    return false;
}

/**
 * 侧边栏载入更多愿望清单
 **/
function loadMoreWishListByCreation(obj, creation_id, start_index, count){

    var url = '/wishlists/api/?action=load_wishlists&creation_id='+ creation_id+"&start_index="+start_index+"&count="+count;
    loadMoreWishList(obj, url);
    return false;
}


function loadMoreWishList(obj, url){
    $(obj).html('<img src="'+ sogoke.STATIC_URL +'img/ajax-loader.gif" style="margin-top:10px;" alt>');
    $.ajax({
            type:'GET',
            url: url,
            datatype: 'json',
            data: {},
            cache: false,
            success: function(response){
                    items = response.items;

                    var html = '';

                    if(items.length > 0){
                        for(var i=0; i< items.length ; i++){
                            html += '<li class="clearfix">';
                            html += '<a href="/wishlist/'+items[i]['id']+'/" class="fl fs0 avatar"><img src="'+ sogoke.MEDIA_PHOTO_URL +'photos/'+ items[i]['cover_suid']+'!small" alt></a>';
                            html += '<div class="fr aside-wishlist-main">';
                            html += '<div class="wish-name">';
                            html += '<div class="fr wish-nums">';
                            html += '热度 <span>'+ items[i]['hot']+'</span>';
                            html += '</div>';
                            html += '<a href="/wishlist/'+ items[i]['id']+'/">+'+items[i]['title'] +'+</a>';
                            html += '</div>';
                            html += '<div class="wish-create">';
                            html += '<a href="/r/'+items[i]['creator_id']+'/">'+ items[i]['creator_username']+'</a>';
                            html += '<span>于'+ $.formatDate.date(new Date(items[i]['created_at']*1000),'yyyy-MM-dd')+'创建</span>';
                            html += '</div>';
                            html += '</div>';
                            html += '</li>';
                        }
                        var h = $('.aside-wishlist').height();
                        $('.aside-wishlist').append(html).animate({height: h+ 71* items.length });
                    }
                    $(obj).removeAttr('onclick').html('发现更多');
            }
    });

}

/**
 * 喜欢这个作品的人也喜欢
 **/

$(function(){
    //喜欢这个作品的人也喜欢: 根据li个数设置滑动条总宽度
    $('.recommend-container ul').width($('.recommend-container ul li').length*250);

    //喜欢这个作品的人也喜欢: 显示遮罩层
    $('.recommend-container').on({
        'mouseenter': function(){
            $(this).children('.mask').show();
        },
        'mouseleave': function(){
            $(this).children('.mask').hide();
        }
    }, 'li');

    //喜欢这个作品的人也喜欢: 左右箭头滑动
    $('.recommend-lists .left-arrow').click(function(){
        $total = $('.recommend-container ul').width();
        $currentLeft = $('.recommend-container ul').css('left');
        if ( parseInt($currentLeft) < 0 ) {
            $('.recommend-lists .right-arrow.none').removeClass('none');
            $prev = Math.ceil( (parseInt($currentLeft)+1)/1000 ) * 1000;
            $('.recommend-container ul').stop().animate({left: $prev}, 800, function(){
                setArrowNone();
            });
        } else {
            $('.recommend-container ul').stop().animate({left: 100}, 300, function(){
                $(this).stop().animate({left:0}, 300);
            });
        }
    });
    $('.recommend-lists .right-arrow').click(function(){
        $total = $('.recommend-container ul').width();
        $currentLeft = $('.recommend-container ul').css('left');
        if ( ($total + parseInt($currentLeft)) > 1000 ) {
            $('.recommend-lists .left-arrow.none').removeClass('none');
            $next = Math.floor( (parseInt($currentLeft)-1)/1000 ) * 1000;
            $('.recommend-container ul').animate({left: $next}, 800, function(){
                setArrowNone();
            });
        } else {
            $trueleft = Math.floor($total/parseInt($currentLeft));
            $next = $trueleft*1000 - 100;
            $('.recommend-container ul').stop().animate({left: $next}, 300, function(){
                $(this).stop().animate({left:$trueleft*1000}, 300);
            });
        }
    });
});

//当左右箭头无法滚动的时候，改为灰色箭头
function setArrowNone(){
    $total = $('.recommend-container ul').width();
    $currentLeft = $('.recommend-container ul').css('left');
    if ( ($total + parseInt($currentLeft)) <= 1000 ){
        $('.recommend-lists .right-arrow').addClass('none');
    } else if ( ($total + parseInt($currentLeft)) == $total ) {
        $('.recommend-lists .left-arrow').addClass('none');
    }
}

/**
 * 一些发布页表单相关
 **/

//限制表单输入字数
function textCounter(obj, num, keepErrorHintOnBlur) {
    var inputL;
    $(obj).on('keydown keyup', function(){
        inputL = $(obj).val().length;
        $(obj).next('.msg')[inputL >= num ? 'addClass' : 'removeClass']('red');
        $(obj).next('.msg').show().children('span').text(num-inputL);
    });
    $(obj).on('blur', function(){
        var exceedCharLimit = $(obj).val().length >= num;
        if (keepErrorHintOnBlur) {
            if (!exceedCharLimit) {
                $(this).next('.msg').hide();
            }
        } else {
            $(this).next('.msg').hide();
        }
    });
}

//输入tags
function inputTags(obj, added, removed){
    $(obj).on('keypress',function(evt){
        inputEvt(evt,obj);
    });

    $('.icon-plusicon').click(function(evt){
        inputEvt(evt,obj);
    })

    function inputEvt(evt,obj){
        var reg = /\s$/;
        var reg2 = /^[a-zA-Z0-9\s\u4e00-\u9fa5]*$/;
        var $value;
        var $new_tag;

        // 禁止换行
        if (evt.keyCode === 13) {
            evt.preventDefault();
        }

        setTimeout(function(){
            $value = $(obj).val();
                if ( $value.replace(/\s+/g, '').length > 16 ){
                    $(obj).next('span').hide();
                    $(obj).nextAll('.msg').text('不能超过16个字符').show();
                } else {
                    $(obj).nextAll('.msg').text('').hide();
                    $(obj).next('span').show();

                    if (evt.keyCode === 13 || reg.test($value) || $(evt.currentTarget).hasClass('icon-plusicon')) {
                        if (!reg2.test($value)) {
                            $(obj).nextAll('.field-missing-notice').text('只能输入中文、英文字母和数字').show();
                        }else{
                            $tag = $value.replace(/\s/g,'');
                            if ( $tag != '' ){
                                $html = '<li data-value="'+$tag+'">'+$tag+'<b>x</b></li>';
                                $new_tag = $($html);
                                $(obj).parent().next('.input-tags-list').append($new_tag);
                                $(obj).val('');
                                $new_tag.find('b').on('click', function() {
                                    rmTag(this);
                                    if (typeof removed == 'function') {
                                        removed($new_tag[0]);
                                    }
                                });
                                $('.input-tags-list').show();
                                if ( $(obj).parent().next('.input-tags-list').children('li').length >= 5 ){
                                    $(obj).attr('disabled', 'disabled');
                                } else {
                                    $(obj).remove('disabled');
                                }
                            }else{
                                $(obj).val('');
                                $(obj).nextAll('.msg').text('请输入至少一个标签！').show();
                                evt.preventDefault;
                                return false;
                            }

                            if (evt.keyCode === 13 || reg.test($value)){
                                $(obj).val('');
                                if (typeof added == 'function') {
                                    added($new_tag[0]);
                                }  
                            }
                        }
                    }
                }
        }, 0);
    }

    // delete/backspace key event won't fire
    // for keypress, we'll handle delete/backspace
    // key events here but should leave others in
    // 'keypress' event - since it's the only way
    // that we can disable a enter key
    $(obj).on('keyup', function(evt) {
        var value = $(obj).val();
        if (evt.keyCode === 8 && value.length <= 16) {
            $(obj).nextAll('.msg').text('').hide();
            $(obj).next('span').show();
        }
    });
}

//移除tag
function rmTag(obj){
    $(obj).parent('li').remove();
    $('.input-tags').removeAttr('disabled');
}


function parseTag(obj){
    var tags = [];
    $(obj).find('li').each(function(){
        tags.push($(this).data('value'));
    });
    return tags;
}

/* 愿望清单中单个项目的js交互 */
$(function(){
    $(document).on({
        mouseenter: function(){
            $(this).addClass('hover');
        },
        mouseleave: function(){
            $(this).removeClass('hover');
        }
    }, '.swi-wrap');

    $(document).on('click', '.swi-del', function(){
        var that = $(this);
        if ( confirm('确定移除吗？') ) {
            var TYPE = that.data('type'),
                ID = that.data('id'),
                wishlistID = that.data('wishlistid');
            delFromWishList(TYPE, ID, wishlistID,
                function(){
                    that.parents('li').fadeOut(function(){
                        $(that).remove();
                    });
                }
            );
        }
    });
});

//根据标签生成视频播放器

$(function() {

})


//图标式愿望清单块的鼠标悬停效果
$(document).on({
    mouseenter: function(){
        $(this).addClass('hover');
    },
    mouseleave: function(){
        $(this).removeClass('hover');
    },
    click: function(){
        location = $(this).find('.wishlist-name').attr('href');
    }
}, '.grid-type .wishlist-wrap');


/* 作品列表 */
$(function(){
    $('.works-list').on({
        mouseenter: function(){
            $(this).children('.mask').show();
        },
        mouseleave: function(){
            $(this).children('.mask').hide();
        }
    }, 'li');
});

/* 单个教程悬停 */
$(function(){
    $('.tutorial-recommend-list').on({
        mouseenter: function(){
            $(this).addClass('hover');
        },
        mouseleave: function(){
            $(this).removeClass('hover');
        }
    }, 'li');
});

// 处理各页面视频加载封面和播放按钮
$(function() {
    $('.sogoke-video-wrap').each(function(i,x) {
        var cover = $(x).find('video.sogoke-video').attr('video_cover')

        var hasCover = $(x).find('span.sogoke-video-cover').length > 0

        if (!hasCover) {
            var html = '<span class="sogoke-video-cover">\
                 <i class="play-video-btn"></i>\
                 <img src="' + cover + '" />\
               </span>'
            $(x).find('video.sogoke-video').before($(html))
        }
    })
})

$(function() {
    $('.sogokeVideo')
})

$(function(){
    /**
     * 喜欢按钮，只需要加上class=".like"，并提供data-id属性传递id
     **/
    $(document).on('click', '.like', function(){
        $this = $(this);
        $id = $this.attr('data-id'); //被喜欢的数据的id值

        if ( $this.hasClass('liked') ) {
            if( $this.hasClass('needel') ){ //我的喜欢页面，还需要从界面中移除
                if( confirm('取消喜欢会使该内容从列表中移除，确定取消？') ){
                    $('.swi-opt .like[data-id='+$id+'], .mlt-meta .like[data-id='+$id+']').parents('li').slideUp('normal', function(){
                        $(this).remove();
                    });
                }
            } else {
                var url = $this.data('url');

                if (url) {
                    $.ajax({
                        type:"POST",
                        url:url,
                        dataType:"json",
                        error: function(data) {
                            sogoke.showFntext2_error('取消喜欢失败');
                        },
                        success:function( data ) {
                            sogoke.showFntext2_bingo('取消喜欢成功!');

                            $this.removeClass('liked');
                            $this.data('url', url.replace('actions/unfavour/','actions/favour/'));

                            if ( $this.find('span').length > 0 ) { //注意，这里插入新的数字，最好是ajax获取最新的之后直接插入，现在为了演示，直接取自网页的数字。
                                $this.find('span').text(parseInt($this.find('span').text()) - 1);
                            }
                            if ( $this.find('b').length > 0 ) {
                                $this.find('b').text('喜欢');
                            }
                            if ( typeof $this.attr('title') != 'undefined' ) {
                                $this.attr('title', '喜欢');
                            }
                        }
                    });
                }

            }
        } else {

            var flag = check_login();
            if(flag){
                var url = $this.data('url');

                if (url) {
                    $.ajax({
                        type:"POST",
                        url:url,
                        dataType:"json",
                        error:function(data) {
                            sogoke.showFntext2_error('喜欢失败');
                        },
                        success:function( data ) {
                            sogoke.showFntext2_bingo('喜欢成功!');

                            $this.addClass('liked');
                            $this.data('url', url.replace('actions/favour/','actions/unfavour/'));

                            if ( $this.find('span').length > 0 ) { //注意，这里插入新的数字，最好是ajax获取最新的之后直接插入，现在为了演示，直接取自网页的数字。
                                if ( (parseInt($this.find('span').text()) + 1) > 99 ) {
                                    $this.find('span').text('99+');
                                } else {
                                    $this.find('span').text(parseInt($this.find('span').text()) + 1);
                                }
                            }
                            if ( $this.find('b').length > 0 ) {
                                $this.find('b').text('取消喜欢');
                            }
                            if ( typeof $this.attr('title') != 'undefined' ) {
                                $this.attr('title', '取消喜欢');
                            }
                        }
                    });
                }
            }

        }
    });

    /**
     * 转载按钮，只需要加上class=".reprint"，并提供data-id属性传递id
     **/
    $(document).on('click', '.reprint', function(){
        $this = $(this);

        if ( $this.hasClass('reprinted') ) {
            if( $this.hasClass('needel') ){ //我的转载页面，还需要从界面中移除
                if( confirm('取消转载会使该内容从列表中移除，确定取消？')){
                    $this.parents('li').slideUp('normal', function(){
                        $(this).remove();
                    });
                }
            } else {
                var url= $this.data('url');

                $.ajax({
                    type:"POST",
                    url:url,
                    dataType:"json",
                    error: function(data) {
                        sogoke.showFntext2_error('取消转载失败！');
                    },
                    success: function(data) {
                        console.log(data);
                        sogoke.showFntext2_bingo('取消转载成功！');

                        $this.removeClass('reprinted');
                        $this.data('url', url.replace('actions/unshare/','actions/share/'));

                        if ( $this.find('span').length > 0 ) { //注意，这里插入新的数字，最好是ajax获取最新的之后直接插入，现在为了演示，直接取自网页的数字。
                           $this.find('span').text('转载');
                           //sogoke.showFntext2_notice('转载成功！')
                        }
                        if ( $this.find('b').length > 0 ) {
                            $this.find('b').text('转载');
                        }
                        if ( $this.attr('title') != '' ){
                            $this.attr('title', '转载');
                        }
                    }
                });
            }
        } else {
                var flag = check_login();
                if(flag){
                    var url = $this.data('url');

                    if (url) {
                    $.ajax({
                        type:"POST",
                        url:url,
                        dataType:"json",
                        error: function(data) {
                            sogoke.showFntext2_error('转载失败！');
                        },
                        success: function(data) {
                            sogoke.showFntext2_bingo('转载成功！');

                            $this.addClass('reprinted');
                            $this.data('url', url.replace('actions/share/','actions/unshare/'));

                            if ( $this.find('span').length > 0 ) { //注意，这里插入新的数字，最好是ajax获取最新的之后直接插入，现在为了演示，直接取自网页的数字。
                                $this.find('span').text('已转载');
                                // if ( (parseInt($this.find('span').text()) + 1) > 99 ) {
                                //     $this.find('span').text('99+');
                                // } else {
                                //     $this.find('span').text(parseInt($this.find('span').text()) + 1);
                                // }
                            }
                            if ( $this.find('b').length > 0 ) {
                                $this.find('b').text('取消转载');
                            }
                            if ( $this.attr('title') != '' ) {
                                $this.attr('title', '取消转载');
                            }
                        }
                    });
                    }
                }
        }
    });

    /**
     * 关注、取消关注，只需要加上class="follow"，并提供data-id属性传递id
     **/
    $(document).on('click', '.follow', function(){
        $this = $(this);

        if( $this.hasClass('followed') ){
            var url= $this.data('url');

            $.ajax({
                type:"POST",
                url:url,
                dataType:"json",
                error: function(data) {
                    sogoke.showFntext2_error('取消关注失败！');
                },
                success: function(data) {
                    sogoke.showFntext2_bingo('取消关注成功！');

                    $this.removeClass('followed');
                    $this.data('url', url.replace('actions/unfollow/','actions/follow/'));

                    if( $this.find('span').length > 0 ){ //注意，这里插入新的数字，最好是ajax获取最新的之后直接插入，现在为了演示，直接取自网页的数字。
                        $this.find('span').text(parseInt($this.find('span').text()) - 1);
                    }
                    if( $this.find('b').length > 0 ){
                        $this.find('b').text('关注');
                    }
                    if ( typeof $this.attr('title') != 'undefined' ) {
                        $this.attr('title', '加关注');
                    }
                }
            });

        } else {
            var flag = check_login();
            if(flag){
                var url = $this.data('url');

                if (url) {
                    $.ajax({
                        type:"POST",
                        url:url,
                        dataType:"json",
                        error: function(data) {
                            sogoke.showFntext2_error('关注失败！');
                        },
                        success: function(data) {
                            sogoke.showFntext2_bingo('关注成功！');

                            $this.addClass('followed');
                            $this.data('url', url.replace('actions/follow/','actions/unfollow/'));

                            if ( $this.find('span').length > 0 ) { //注意，这里插入新的数字，最好是ajax获取最新的之后直接插入，现在为了演示，直接取自网页的数字。
                                if ( (parseInt($this.find('span').text()) + 1) > 99 ) {
                                    $this.find('span').text('99+');
                                } else {
                                    $this.find('span').text(parseInt($this.find('span').text()) + 1);
                                }
                            }
                            if ( $this.find('b').length > 0 ) {
                                $this.find('b').text('已关注');
                            }
                            if ( typeof $this.attr('title') != 'undefined' ) {
                                $this.attr('title', '点击取消关注');
                            }
                        }
                    });
                }
            }
        }
    });

    /**
     * 删除按钮，只需要加上class=".delete"，并提供data-id属性传递id
     **/
    $(document).on('click', '.delete', function(){
        var $this = $(this),
            url= $this.data('url'),
            container = $this.closest('li.clearfix');
            var raw_id = url.split('/')[4];

        if (url && confirm('您确定要删除？')) {
            $.ajax({
                type:"POST",
                url:url,
                dataType:"json",
                error: function(data) {
                    sogoke.showFntext2_error('删除失败！');
                },
                success: function(data) {
                    sogoke.showFntext2_bingo('删除成功！');
                    container.remove();            
                    $('.mine-list-type').each(function(i,x){
                        $(x).find('li.clearfix').each(function(i,x){
                            if ($(x).find('a.delete').length>0) {
                                if ($(x).find('a.delete').data('url').split('/')[4] === raw_id ) {
                                    console.log(x)
                                    $(x).closest('li.clearfix').remove();
                                };
                            };
                        })
                    });
                }
            });
        };
    });

    // Delete this item
    $(document).on('click', 'a.del', function() {
        var trigger = $(this),
            url     = $(this).data('url');
            var wBoxWishlist = $(this).hasClass('wBoxWishlist')?1:0;

        if (url && confirm('你确定要删除？')) {
            $.ajax({
                type:"POST",
                url:url,
                dataType:"json",
                error: function(data) {
                    sogoke.showFntext2_error('data.msg');
                },
                success:function(data) {
                    if (wBoxWishlist) {
                        console.log(data);
                        trigger.parents('li').remove();
                        sogoke.showFntext2_bingo('已经删除');
                    }else{
                        sogoke.showFntext2_bingo('已经删除，请等待回到主页', 1000, function() {
                            window.location.href = '/home/';
                        });
                    }
                }
            });
        }
    });


    


    $(document).on({
        'click':function() {
            var $_this = $(this);
            var type = $(this).data('type');
            var loaded_pages = 2;
                $.ajax({
                    'url':'/api/chaffers/blog/1591/',
                    'type': 'GET',
                    'data': {
                        page:loaded_pages+1
                    },
                    'success':function(res) {
                        var data = res.data;
                        if (data.comments.length > 0) {
                            if (data.comments.length == 10) {
                                loaded_pages ++ ;
                            }
                            var commentTpl = Handlebars.templates.dynamic_comments;
                            var $html = $(commentTpl(data)).html();
                            $_this.parent('div').before($html);
                        }
                    }
                })
        }
    },'a.load-more-comments')
});

function checkAgent() {
   var userAgentInfo=navigator.userAgent; 
   var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
   var flag=true; 
   for(var v=0;v<Agents.length;v++) { 
      if(userAgentInfo.indexOf(Agents[v])>0) { 
        flag=false; 
        break; 
      } 
    } 

    return flag; 
}

function showSwitchMobile() {

    var mobileHtml = "<div class='clearfix default-padding change-mobile-wrap' style='display: none;'>\
        <h2>我们发现您在使用手机浏览</h2>\
        <div class='download-block clearfix'>\
            <div class='warp-to-wap change-mobile-btn'>前往移动版</div>\
            <span>或</span>\
            <div class='download-app change-mobile-btn'><a href='http://a.app.qq.com/o/simple.jsp?pkgname=com.meizuo.kiinii'>下载 APP</a></div>\
        </div>\
        <a href='javascript:;' class='closeBtn'></a>\
    </div>";

    $('body').append($(mobileHtml))
    setTimeout(function() {
        $('.change-mobile-wrap').fadeIn()
    })
}

$(function() {
    var isNotMobile = checkAgent()
    console.log(isNotMobile,'isNotMobile')

    if (!isNotMobile) {
        showSwitchMobile()
    }

    $(document).on({
        'click': function() {
            console.log($.cookie('agent_mode'))
            var agentMode = $.cookie('agent_mode')
            if (agentMode && agentMode == 'pc') {
                $.cookie('agent_mode','mobile')
                var pathname = window.location.href.split('?')[0]
                console.log(pathname,window.location,'check location')
                window.location.href = pathname+'?agent_mode=mobile'
            }else{
                var pathname = window.location.href.split('?')[0]
                console.log(pathname,window.location,'check location')
                window.location.href = pathname+'?agent_mode=mobile'
            }
            //window.location.href = pathname+'agent_mode=mobile'
        }
    },'.warp-to-wap')
})

;(function($) {
    var $textareas = $('textarea.needs-reset-button');
    var RESET_BUTTON_MARKUP = '<a href="javascript:;" class="reset-textarea" title="清空内容"></a>';
    $textareas.each(function() {
        var $textarea = $(this);
        var $container = $textarea.parent();
        var $reset_button = $(RESET_BUTTON_MARKUP);
        $container.append($reset_button);
        $textarea.on('keydown keyup keypress', function() {
            var text = $(this).val();
            $reset_button[text === '' ? 'fadeOut' : 'fadeIn']('fast');
        });
        $reset_button.on('click', function() {
            $(this).fadeOut('fast');
            // $textarea.val('').trigger('autosize.resize')
            // should works... but the plugin somehow failed
            // so we workaround the problem with:
            $textarea.val('').attr('style','');
        });
    });
})(jQuery);


// 点击隐藏书签栏快速分享工具
;(function(jQuery) {
    var KEY = 'hide_share_bookmarklet';
    var should_hide_bookmarklet = !!$.cookie(KEY);
    var $bookmarklet_widget = $('.widget-bookmarklet');
    var $dismiss_btn = $bookmarklet_widget.find('.dismiss');
    if (!should_hide_bookmarklet) {
        //$bookmarklet_widget.show();
    }
    $dismiss_btn.on('click', function() {
        $.cookie(KEY, 'true', { path: '/', expires: 365});
        $bookmarklet_widget.fadeOut(200);
    });
})();

(function($){
    $.fn.newSlideDown = function(width){
        var slideDown = function($elements){
            $elements.each(function(i,x){
                console.log(width,'width')
                var oWidth = width || $(x).find('.subcategory-group').length * 100;

                if (width) {
                    // $(x).find('.m-subcategoryList').css({
                    //     'width':oWidth,
                    //     'right': 0
                    // });
                }else{
                    $(x).find('.m-subcategoryList').css({
                        'width':oWidth,
                        'left':'-' + oWidth/2 + 'px',
                        'margin-left':'50%'
                    });
                }
            })

            var MarketSelectT;
            $(document).on({
                mouseenter: function(e){
                    e.stopPropagation();
                    var $this = $(this);
                    var lines = $(this).find('.line-wrap').length
                    var oHeight = width ? lines*64+(lines-1)*20+50 : 178
                    MarketSelectT = setTimeout(function(){
                        $this.children('.m-subcategoryList').css('visibility','visible');
                        $this.children('.m-subcategoryList').stop().animate({
                            'height':oHeight,
                            'opacity':1
                        },400);
                    }, 50);
                    return false;
                },
                mouseleave: function(e){
                    e.stopPropagation();
                    var _this = $(this);
                    clearTimeout(MarketSelectT);
                    $(this).children('.m-subcategoryList').stop().animate({
                            'height':0,
                            'opacity':0
                        },function(){
                            _this.children('.m-subcategoryList').css('visibility','hidden');
                        });
                    return false;
                }
            },'.m-category');

        };
        return slideDown.call(null,$(this));
    }
})(jQuery);

function check() { 
 var userAgentInfo=navigator.userAgent; 
 var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
 var flag=true; 
 for(var v=0;v<Agents.length;v++) { 
    if(userAgentInfo.indexOf(Agents[v])>0) { 
      flag=false; 
      break; 
    } 
  } 
  return flag; 
 }
 
$(function() {
    $('.default-tutorial').each(function(i,x) {
        var $thisTutorial = $(x).find('.swi-wrap');
        var difficulty = $thisTutorial.data('difficulty');
        var loopCounter = $thisTutorial.data('counter')
        var $difficulty = $thisTutorial.find('.difficulty-wrap');

        var STATIC_URL = 'static/'

        $difficulty.raty({
            readOnly: true,
            start: difficulty,
            path:'/',
            starOff: STATIC_URL+'img/star-off4.png',
            starOn : STATIC_URL+'img/star-on4.png',
            hints : ['很简单', '简单', '正常', '较难', '难'],
            scoreName: 'tutorial-difficulty-score'+loopCounter,
            size: 10,
            target: '#tutorial-difficulty-hint'+loopCounter,
            width: 80,
            targetKeep: true
        });

        var None = -1;
        
        var spentTime = $thisTutorial.data('time');
        var spentTimeText = '未注明';

        spentTime = typeof(Number(spentTime) == Number)? Number(spentTime) : -1;

        switch (spentTime){
            case -1:
                spentTimeText = "未注明"
                break;
            case 0:
                spentTimeText = "1小时内"
                break;
            case 5:
                spentTimeText = "6小时内"
                break;
            case 23:
                spentTimeText = "1天内"
                break;
            case 167:
                spentTimeText = "1周内"
                break;
            case 169:
                spentTimeText = "超过1周"
                break;
            default:
                spentTimeText = "未注明"
                return
                break;
        }

        $thisTutorial.find('.mask-tutorial-spend').html($thisTutorial.find('.mask-tutorial-spend').html()+spentTimeText);
    })
})

