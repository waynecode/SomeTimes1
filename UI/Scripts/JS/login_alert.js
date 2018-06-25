$(function(){
    var ALERT_HAS_SHOWN_KEY = 'alert_has_shown';
    var alert_has_shown = $.cookie(ALERT_HAS_SHOWN_KEY);

    var auth_key = $("#auth_key").attr('name');
    var $errorContainer = $("#error-msg");
    var $errorContainerServer = $("#error-msg-server");
    function show_box(){
    	$(".covering").fadeIn();
        $("#alertLogin").show().animate({opacity:1}, 800);

        // whenever the alertbox is shown, store this
        // info in cookie so that when user refresh
        // the page the alertbox will show immediately
        // the next time index page is viewed
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

    $("#alertClose").click(function(){
    });

    $(document).on({
        'click':function() {
            console.log(123);
            close_box();
        }
    },'#alertClose')


    function clean_error_msg($element){
        $errorContainer.html('');
        var $next = $element.next();
        if ($next.is("img")){
            $next.remove();
        }
    }

    function error_msg_handler(msg){
        var feed = init_error_msg(msg);
        $errorContainer.html(feed);
    }

    function init_error_msg(msg){
        var prefix = "<li>";
        var suffix = "</li>";
        var message = prefix + msg + suffix;
        return message;
    }

    $("#vcode").focus(function(){
        clean_error_msg($(this));
    }).blur(function(){
        var vcode = $(this).val();
        if (vcode){
            var param = {'vcode': vcode, 'token': 'vcode'};
            $.ajax({
                type:'GET',
                url: '/accounts/exists/',
                data: param,
                cache: false,
                dataType: 'json',
                success: function(response){
                    if (response.enable){
                        error_msg_handler(response.msg);
                        src = "/accounts/get-check-code/?nocache=" + Math.random();
                        $("#vcode_img").attr('src', src);
                    }
                }
            });
        }
    });
    $("#login_form").submit(function(){
        var username = $('#login_form').find('[name=username_or_email]').val().toString();
        var password = $('#login_form').find('[name=password]').val();
        if (/^\s*$/.test(username)) {
            $errorContainerServer.hide();
            $errorContainer.html('请输入昵称或邮箱').show();
            return false;
        }
        if (/^\s*$/.test(password)) {
            $errorContainerServer.hide();
            $errorContainer.html('请输入密码').show();
            return false;
        }
        $.post('/accounts/signin-from-ajax/', $(this).serialize(), function(response){
            var result = response.enable;
            if (result){
                close_box();
                if (response.redirect_url){
                    window.location.href= response.redirect_url;
                }else{
                    window.location.reload();
                }
            }else{
                $errorContainer.hide();
                $errorContainerServer.html(response.msg).show();
                $('#login_form input[type=password]').val('');
            }
        }, 'json');
        return false;
    });
    $(".formtips").click(function(){
        close_box();
    })

    if (! auth_key) {
        var reg = /(course|discover|bazaar|blogs|buzz|creation|blog|tutorial|topic|artist|search)/i;
        if (window.location.href.match(reg)) {
            console.log($.cookie(ALERT_HAS_SHOWN_KEY),'cookie')
            if ($.cookie(ALERT_HAS_SHOWN_KEY)) {
                show_box();
            }else{
                setTimeout(function(){show_box();},30000); 
            }
        }
    };

    $("span.index_blog_love, a.index_blog_reply, span.index_blog_reprint").click(function(){
        var auth_key = $("#auth_key").val();
        if(! auth_key){
            show_box();
        }
    });
})
