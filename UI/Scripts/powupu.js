$(function(){
	
	//首页轮播
	if(jq(".example").length>0){
		
		jq(".example").hover(function(){
			jq(".carousel-btn").show();
		},function(){
			jq(".carousel-btn").hide();
		})
		
		jq(".carousel-btn").hover(function(){
			jq(this).css("background-position-y","-50px");
		},function(){
			jq(this).css("background-position-y","0px");
		})
	}
	//删除第一个回复内容的分割线
	jq("#hf .hftx:first").remove();	
	//把举报按钮添加经过时候更改样式
	jq(".jubao a").hover(function(){
				jq(this).css("color","#999")},
				function(){
					jq(this).css("color","#cccccc")
					});
					
	//内容图片延迟加载
	jq(".lazy").lazyload({
    effect : "fadeIn",
	threshold : 0
    });
	//专辑
	if(jq(".collect").length>0){
		var  collect = jq(".collect").html();
			 jq("#collect").html(collect);
			 jq(".collect").remove();
			 jq("#collect .lazy").load(function(){
				var s = jq(this).attr("data-original");
				jq(this).attr("src",s);
			 })
	}
	//分享
	if(jq("#tm-share").length>0){
		jq("#tm-share").click(function(){			
		jq("#share-cont").show();	
		})
		jq("#share-cl").click(function(){
		jq("#share-cont").hide();	
		})
		
	}
	
	//经过变背景色	
	jq(".change_color").hover(function(){
								jq(this).css("color","#333")				 								 
								 },function(){
									 jq(this).css("color","#999")
									 })	   
									  
	//发布menu展现与消失
	jq("#fenxiang").hover(function(){
					jq(this).css("background-position-y","70px");
					jq(this).find("#fxmenu").show();			   
								   },function(){
							jq(this).css("background-position-y","0px");
							jq(this).find("#fxmenu").hide();		   
									   })
									   

	//头部个人信息动画
	jq("#usert").hover(function(){
								jq(this).css("background","#f36");
								jq("#usersz").show();					
								},function(){
									jq(this).css("background","#fff");
									jq("#usersz").hide();							
									})
	
	jq(".usermenu , .changebg").hover(function(){
								   jq(this).css("background","#EBEBEB")
								   },function(){
										jq(this).css("background","#fff")			
												})

																	
	 //个人主题分页加载
	 var $container1 = jq('#waterfall1');
			jq(".pubuliu img").load(function(){
							$container1.masonry({
            itemSelector: '.pubuliu',
            isAnimated: true,
			isFitWidth:true,
			})				 
											 })	
			
			
	 $container1.imagesLoaded(function(){
				
			$container1.masonry({
            itemSelector: '.pubuliu',
            isAnimated: true,
			isFitWidth:true,
			})
	});
	 
	 
	 //帖子后相关内容瀑布流
	 var $container2 = jq('#waterfall2');
	 
	 $container2.imagesLoaded(function(){
				
			$container2.masonry({
            itemSelector: '.pubuliu2',
            isAnimated: true,
			isFitWidth:true,
			})
	});
	 

	//分类列表页分页加载
	var $container = jq('#waterfall'); 
		
		$container.masonry({
            itemSelector: '.pubuliu',
            isAnimated: true,
			isFitWidth:true,
			})	
		
	jq(".pubuliu img").load(function(){
			$container.masonry({
            itemSelector: '.pubuliu',
            isAnimated: true,
			isFitWidth:true,
			})		
	});	
	
	
	
		

	
	//底页文字变换
		jq("#ft a").hover(function(){
		jq(this).css(
						"color","#eaeaea"
						)},
			function(){
				jq(this).css(
						"color","#888"
						)
		});		
	
	
	
	//瀑布流li 经过阴影
	jq(".pubuliu, .pubuliu1 ,.pubuliu2").hover(function(){
		jq(this).css("box-shadow","rgb(101, 101, 101) 0px 0px 20px");
		jq(this).find("img").css("opacity","0.9");
		},function(){
		jq(this).css("box-shadow","0 1px 3px rgba(0,0,0,.3)");
		jq(this).find("img").css("opacity","1");		
	});
	

	//复制宽度给.clct_list 让专辑居中
	if(jq(".clct_list").length>0){
		var kd=jq(window).width();
		var zkd=Math.floor(kd/276);
		var zzkd=zkd*276+25;
		jq(".clct_list").width(zzkd);
		}
	
	 //一般情况只保留的5条回复
	if(jq(".lookmore").length>0){
		jq(".lookmore .pti1").css({"display":"none"})
	}
	if(jq(".lookmore").length>5){
			jq("#hf .lookmore:gt(4)").hide();
			jq("#lookmore").click(function(){
							jq(".lookmore").slideDown("slow");
							jq("#lookmore").slideUp("slow");
										   });
	}else{
		jq("#lookmore").css({display:"none"});
		}

	//回复框自动适应高度
	jq("#fastposteditor").find("#fastpostmessage").keydown(function(){
		var fastpost_top = jq("#fastpostmessage").scrollTop();
		var fastpost_height = jq("#fastpostmessage").height();
		var fastpost_auto = fastpost_top + fastpost_height;
		jq("#fastpostmessage").height(fastpost_auto);
	})
	//编辑框自动适应高度
	var ibody=jq("#e_iframe").contents().find("body");
	if(ibody.length>0){	
					jq("#e_iframe").contents().find("br").replaceWith('<p></p>');
					jq(".area").css({height:"400px"})					
					ibody.keydown(function(){
					var ibody=jq("#e_iframe").contents().find("body")
					var dd=ibody.height();
					var ss=dd+"px";
					jq(".area").css({height:ss})	
					})	
					jq(document).scroll(function(){
								ibody.keydown();				 
												 })
	}	
						
	//帖子页br 换P
	jq(".t_fsz br").replaceWith('<p style="height:5px;"></p>');
	
	//获得调用的URL
	var usera=jq("#userjs .avatar a").attr("usera");
	
	//调用楼主所有帖子；
	var louzhua=jq("#fxshu1").attr("href");
		louzhub=louzhua+" #waterfall1";
		jq("#louzhu").load(louzhub,function(response,status,xhr){								
			if(status=="success")
			jq(this).find(".grnr").remove();
			var $container1 = jq('#waterfall1');
			$container1.imagesLoaded(function(){
				
				$container1.masonry({
				itemSelector: '.pubuliu',
				isAnimated: true,
				isFitWidth:true,
				})
			});
																	
						//帖子内楼主所有贴鼠标移动上效果
						jq("#louzhu .pubuliu").hover(function(){
									  jq(this).css("opacity","1")
									  },function(){
										  jq(this).css("opacity","0.5")
						})
	});
	//图片封面经过显示
	jq(".simg").hover(function(){
							jq(this).find(".swfm").css({
														   "display":"block"
														   })		
									
									},function(){
										jq(this).find(".swfm").css({
														   "display":"none"
														   })
										})	
	//列表页数模拟回车效果
	jq(".go").click(function(){
			e=jq("label .px").val();
			d=jq(".pg a:first").attr("href");
			f=d.split('/');
			g=f[0]+"/"+e;
			location.href=g; 
							 })
		
	
		
	if(jq("#e_controls").length>0){	
	//编辑栏随高度浮动
	jq(document).scroll(function(){
			var a=jq(document).scrollTop();
			var b=jq("#e_controls").offset().top;
				if(a>b){
					jq("#e_button").css({
						 "position":"fixed",
						 "z-index":99,
						 "top":"0px",
						 "padding-top":"10px",
						  })
			}else{
					jq("#e_button").css({
						 position:"relative",
						 "z-index":1,
						 "padding-top":"0px",
						  })
				}			
								 
			})
		//上传图片动画效果
		var boxf=jq("#editorbox").offset().left;
		var winw=jq(document).width()-1420;
		if(winw>=0){
		var imgf=790-(jq(document).width()-600)/2;
		jq("#e_image").click(function(){
					jq("#editorbox").animate({"margin-left":"0"});	
					jq("#e_image_menu").animate({"margin-left":imgf});
									  })
		jq(".closeimg").click(function(){
					jq("#editorbox").animate({"margin-left":boxf});
					jq("#e_image_menu").animate({"margin-left":"0"});
									   })
		}else{
		var imgf=(jq(document).width()-600)/2-20;
		jq("#e_image").click(function(){
					jq("#editorbox").animate({"margin-left":"0"});	
					jq("#e_image_menu").animate({"margin-left":imgf});
									  })
		jq(".closeimg").click(function(){
					jq("#editorbox").animate({"margin-left":boxf});
					jq("#e_image_menu").animate({"margin-left":"0"});
									   })
			}
		jq(".scimgt").hover(function(){
					jq(".scimg").css({"background-position":"0px -40px"});			
									},function(){
							jq(".scimg").css({"background-position":"0px 0px"});					
										})
	
	}
	
	//原来URL跳转
	var urlstr=window.location.href;
	var urlss1=urlstr.match("/thread-");
	if(urlss1){
		var urlss2=urlstr.split("-")
		var urlss3='share/'+urlss2[1]+'.html';
		location.href=urlss3;
		}
	
});		

