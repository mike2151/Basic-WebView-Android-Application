(function ($) {
	/*Superfish Menu Handling*/
	$.fn.spotless_superfish_menu = function( args ) {
		var defaults = {
			delay:100, // one second delay on mouseout
			animation:{opacity:'show',height:'show'},  // fade-in and slide-down animation
			speed:'fast', // faster animation speed
			autoArrows:false,// disable generation of arrow mark-up
			addSubMenuClass:false, // custom arg to add "hasSubmenu" class
			subMenuClass:'hasSubmenu'
		}; // end of defaults
		
		options = $.extend({}, defaults, args);
		
		return this.each(function(){
			var ele =  $(this),
				parentElement = ele.parents("#main-menu");
			$(this).superfish({
				delay : options.dealy,
				animation: options.animation,
				speed: options.speed,
				autoArrows:options.autoArrows
			});
			
			if( options.addSubMenuClass ) {
				var uls = parentElement.find("ul li:has(ul)");
				uls.each(function(){
					$(this).addClass(options.subMenuClass);
					$(this).children("ul").addClass("sub-menu");
				});
			}
		});// end of each()
	};// end of SPOTLESS SUPERFISH MENU
	
	/*Mobile Menu*/
	$.fn.spotless_mobile_menu = function( args ) {
		var defaults = {
			container: "nav#main-menu div.container",
			defaultText: 'Navigate to...',
			subMenuClass: 'sub-menu',
			subMenuDash: '&ndash;'
		};
		
		options = $.extend({}, defaults, args);
		
		$('<select  />',{ 'class':"mobile-menu", 'name':"mobile-menu"}).appendTo( $(options.container) );
		// Create default option
		$('<option />', {"value":'#', "text": options.defaultText}).appendTo("select[name='mobile-menu']");
		
		$("select[name='mobile-menu']").change(function(){
			var locations = $(this).val();
			if( locations !== '#' ) {
				window.location.href = locations;
			};
		});
		
		return this.each(function(){
			var current = $(this),
				optionText = '&nbsp;' +current.text(),
				optionSub	= current.parents('.sub-menu'),
				len			= optionSub.length,
				dash;

			if( current.parents("ul").hasClass("sub-menu")){
				dash = Array( len+1 ).join('&nbsp;'+ options.subMenuDash+' &nbsp;');
				optionText = dash+optionText;
			}
			
			$('<option />', {"value":this.href, "html":optionText,"selected":(this.href == window.location.href)}).appendTo("select[name='mobile-menu']");
		});
	};// end of Mobile men
	
	
	/* Flickr Widget Handling*/
	$.fn.spotless_flickr = function( args ){
		return this.each(function(){
			var flickr_user_id = $(this).data("id"),
			    imagesize = $(this).data("image-size"),
				imagesize = ( typeof imagesize === "undefined") ? "image_s" : "image_"+imagesize,
				feedtype = "photos_public.gne",
				limit = Number($(this).data("count"));
				limit = ( limit > 20 ) ? 20 : limit;

				$(this).jflickrfeed({
					feedapi:feedtype,
					limit:limit,
					qstrings: {id:flickr_user_id},
					itemTemplate:'<li>'
								 +'<a data-gal="prettyPhoto[flickr]" href="{{image}}" title="{{title}}">'
								 +'<img src="{{'+imagesize+'}}" alt="{{title}}" />'
								 +'</a>'
								 +'</li>'
				}, function(data){
					$("a[data-gal^=prettyPhoto]").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});
				});
			
		});
	};// end of Flickr Widet
	
	/*Twitter Widget Handling*/
	$.fn.spotless_twitter = function( args ) {
		return this.each(function(){
			$(this).tweet({
				join_text: "auto",
				username: $(this).data("twitter-username"),
				count: $(this).data("twitter-count"),
				loading_text: "loading tweets..."				
			});
		});
	};// end of Twitter Widgets
	
	//Portfolio isotope
	$.fn.spotless_isotope = function( args ) {
		return this.each(function(){
			var container = $(this),
				sortingContainer = container.prev("div.sorting-container"),
				anchors = sortingContainer.find("a");
				
				container.isotope({
					filter: '*',
					animationOptions: { duration: 750, easing: 'linear', queue: false  }
				});
				
				if( sortingContainer.length ) {
					anchors.bind('click',function( e ){
						var selector = $(this).attr('data-filter');
						anchors.removeClass("active-sort");
						$(this).addClass("active-sort");
						container.isotope({ filter: selector, animationOptions: { duration: 750, easing: 'linear',  queue: false }});
						e.preventDefault();
					});
				}
		});
	};// end of Portfolio isotope
	
	//Google Map
	$.fn.spotless_gmap = function( args ) {
		return this.each(function(){
			$(this).gMap({
				address: $(this).data("address"),
				zoom:Number($(this).data("zoom")),
				markers: [{ 'address' : $(this).data("address") }]
			}); 
		});
	};//end of Google Map
	
	//Toggle
	$.fn.spotless_toggle = function( args ){
		return this.each(function(){
			$(this).toggle(function(){
					$(this).addClass('active');
				},function(){
					$(this).removeClass('active');
			});
			
			$(this).click(function(){
				$(this).next('.toggle-content').slideToggle();
			});
		});
	};//end of Toggle
	
	//Toggle Frameset
	$.fn.spotless_toggle_frame_set = function( args ) {
		return this.each(function(){
			var container = $(this),
				toogle    = container.find('.toggle-accordion');
				
				toogle.click(function(e){
					if( $(this).next().is(':hidden') ) {
						container.find('.toggle-accordion').removeClass('active').next().slideUp();
						$(this).toggleClass('active').next().slideDown();
					}
					e.preventDefault();
				});
		});
	};//end of Toggle Frameset
	
	//Tab
	$.fn.spotless_tab = function( args ){
		return this.each(function(){
			$(this).tabs('> .tabs-frame-content');
		});
	};//end of Tab
	
	//Vertical Tab
	$.fn.spotless_vertical_tab = function( args ) {
		return this.each(function(){
			$(this).tabs('> .tabs-vertical-frame-content');
			$(this).find("li:first").addClass('first').addClass('current');
			$(this).find("li:last").addClass('last');
			$(this).find("li").click(function(e){
				$(this).parent().children().removeClass('current');
				$(this).addClass('current');
				e.preventDefault();
			});

		});
	};//end of vertical Tab
	
	//Animated Bar
	$.fn.spotless_animated_bar = function( args ) {
		return this.each(function(){
		  var progressBar = $(this),
		  	  progressValue = progressBar.find('.bar').data('value');
			  
			  if (!progressBar.hasClass('animated')) {
				  progressBar.addClass('animated');
				  progressBar.find('.bar').animate({width: progressValue + "%"},600,function(){ progressBar.find('.bar-text').fadeIn(400); });
			  }

		});
	};//End of animated bar
	
	//Contact Form
	$.fn.spotless_contact_form = function( args ) {
		return this.each(function(){
			var form = $(this);
				
			form.submit(function(e){
				var form_values = form.append('<input type="hidden" name="action" value="contactus" />').serialize(),
					action = form.attr('action'),
					msg    = form.prev('div.message');
					
					$.post(action,form_values,function(data){
						msg.hide().html(data).show('fast');
					});
				e.preventDefault();
			});
		});
	};//End of Contact Form
	
	//Send us Message Form
	$.fn.spotless_sendus_form = function( args ) {
		return this.each(function(){
			$(this).submit(function(e) {
				var msg = $(this).prev('div.message'),
					action = $(this).attr('action'),
					values = $(this).append('<input type="hidden" name="action" value="sendus-msg" />').serialize();
					$.post(action,values,function(data){
						msg.hide().html(data).show('fast');
					});
				e.preventDefault();
			});
		});
	};//End of Sendus Message Form
	
	//Style Picker
	$.fn.spotless_style_picker = function( args ) {
		
		var defaults = { enablePicker : false };
			
		options = $.extend({}, defaults, args);
		
		if( options.enablePicker){
			return this.each(function(){
				var bodyContainer = $(this);
				
				$.getScript("js/jquery.cookie.js",function(data, textStatus, jqxhr){
					if( textStatus === "success" ) {
						
						$.getScript("js/colorpicker.js",function(data, textStatus, jqxhr){
							$('#colorSelector').ColorPicker({
								color: '#0000ff',
								onShow: function (colpkr) {	
									$(colpkr).fadeIn(500);
									return false;
								},
								onHide: function (colpkr) {
									$(colpkr).fadeOut(500);
									return false;
								},
								onSubmit: function (hsb, hex, rgb) {
									$('#colorSelector').css('backgroundColor', '#' + hex);
									$.cookie('currentColor',hex);
									$("#css-color").remove();
									$('head').append('<link id="css-color" rel="stylesheet" href="css/skins.php?color=' + hex + '" type="text/css" />');
									$('.colorpicker').fadeOut(500);
									
								}
							});
							

						});//End of //colorpicker.js loading
						
						var picker  = '<div class="style-switcher-wrapper">';
							picker += '	<a href="" title="" class="style-switcher-ico"> <span class="icon-cog"> </span> </a>';
							picker += '	<div class="style-switcher">';
							picker += '		<h2> Style Switcher </h2>';
							picker += '		<h3> Choose Skin </h3>';
							picker += '		<ul class="skin-switcher">';
							picker += '			<li> <a href="" title="" data-skin="light"> <img src="images/switcher/light.jpg" alt="" title=""> </a> </li>';
							picker += '			<li> <a href="" title="" data-skin="dark"> <img src="images/switcher/dark.jpg" alt="" title=""> </a> </li>';
							picker += '		</ul>';
							picker += '		<h3> Layout Style </h3>';
							picker += '		<ul class="layout-switcher">';
							picker += '			<li> <a href="" title="" data-layout="fullwidth"> <img src="images/switcher/fullwidth.jpg" alt="" title=""> </a> </li>';
							picker += '			<li> <a href="" title="" data-layout="boxed"> <img src="images/switcher/boxed.jpg" alt="" title=""> </a> </li>';
							picker += '		</ul>';
							picker += '		<h3> Predefined Colors </h3>';
							picker += '		<ul class="color-switcher">';
							picker += '			<li> <a href="" title="" data-color="25ade4" style="background:#25ade4;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="ff26a0" style="background:#ff26a0;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="e024e3" style="background:#e024e3;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="e32424" style="background:#e32424;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="ff8a00" style="background:#ff8a00;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="21d9d0" style="background:#21d9d0;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="9cca1f" style="background:#9cca1f;"> </a> </li>';
							picker += '			<li> <a href="" title="" data-color="606060" style="background:#606060;"> </a> </li>';
							picker += '		</ul>';
							picker += '		<p class="color-picker-holder"> <span> Choose your own color </span> <a id="colorSelector"> </a>  </p>';
							picker += '     <h3 class="pattern-title"> Patterns </h3>';
							picker += '		<ul class="pattern-switcher">';
											for( var i= 1; i<=25; i++) {
												picker +='<li><a href="" title="Pattern-'+i+'" data-pattern="images/patterns/pattern'+i+'.png"><img src="images/switcher/pattern'+i+'.png" /></a></li>';
											}
							picker += '		</ul>';
							picker += '	</div>';
							picker += '</div>';
							picker += '<div class="switch-overlay"> <div class="switch-overlay-img"> </div> </div>';
							
							bodyContainer.prepend(picker);
							var styleSwitcherWrapper = bodyContainer.find("div.style-switcher-wrapper");
							
								$("a[data-skin]:first").addClass("selected");
								$("a[data-layout]:first").addClass("selected");
								$("a[data-color]:first").addClass("selected");
								$("a[data-pattern]:first").addClass("selected");
								
								
								//$("div.switch-overlay").show();
								//setTimeout(function(){
									//Checking Cookies	-------------------------------------------------------------------------------
									if ( $.cookie('styleSwitcherClosed') === "yes" ){
										styleSwitcherWrapper.animate({left: -240},function(){ 
											styleSwitcherWrapper.find("a.style-switcher-ico").addClass('closed');
											styleSwitcherWrapper.find("span.icon-cog").addClass('spin');
										});
									}
									
									if($.cookie('currentColor') !== null) {
										$("a[data-color]").removeClass("selected");
										$("a[data-color='"+$.cookie('currentColor')+"']").addClass("selected");
										$("#css-color").remove();
										$('head').append('<link id="css-color" rel="stylesheet" href="css/skins.php?color=' + $.cookie('currentColor') + '" type="text/css" />');
									}
								
									if($.cookie('currentSkin') !== null) {
										$("a[data-skin]").removeClass("selected");
										$("a[data-skin='"+$.cookie('currentSkin')+"']").addClass("selected");
										$("link[id='css-skin']").attr("href","skins/"+$.cookie('currentSkin')+"/style.css");
									} 

									if($.cookie('currentLayout') === "boxed" ) {
										$("a[data-layout]").removeClass("selected");
										$("a[data-layout='"+$.cookie('currentLayout')+"']").addClass("selected");
									
										$("body").addClass("boxed");
										styleSwitcherWrapper.find("ul.pattern-switcher").prev("h3").slideDown();
										styleSwitcherWrapper.find("ul.pattern-switcher").slideDown();
										if($.cookie('currentPattern') !== null) {
											$("a[data-pattern]").removeClass("selected");
											$('body').css('background-image', 'url('+$.cookie('currentPattern')+')');
											$("a[data-pattern='"+$.cookie('currentPattern')+"']").addClass("selected");
										}
									} else {
										$("a[data-layout]").removeClass("selected");
										$("a[data-layout]:first").addClass("selected");
										$("body").removeClass("boxed");
										styleSwitcherWrapper.find("ul.pattern-switcher").prev("h3").slideUp();
										styleSwitcherWrapper.find("ul.pattern-switcher").slideUp();
									}
									//End of Checking Cookies	-----------------------------------------------------------------------
									//$("div.switch-overlay").hide();
								//},1500);
								
							
							
								//picker on / off	-------------------------------------------------------------------------------
								styleSwitcherWrapper.find("a.style-switcher-ico").click(function(e){
									var switcherIcon = $(this);
									if( $(this).hasClass('closed')) {
										styleSwitcherWrapper.animate({left: 0},function(){	
											switcherIcon.removeClass('closed');
											styleSwitcherWrapper.find("span.icon-cog").removeClass('spin');
											$.cookie('styleSwitcherClosed','no');
										});
									}else{
										styleSwitcherWrapper.animate({left: -240},function(){
											switcherIcon.addClass('closed');
											styleSwitcherWrapper.find("span.icon-cog").addClass('spin');
											$.cookie('styleSwitcherClosed','yes');
										});
									}
									e.preventDefault();
								});//End of picker on / off	------------------------------------------------------------------------
								
								//Skin Chooser -------------------------------------------------------------------------------------
								styleSwitcherWrapper.find("a[data-skin]").click(function(e){
									$("div.switch-overlay").show();
									$("a[data-skin]").removeClass("selected");
									$(this).addClass('selected');
									$.cookie('currentSkin',$(this).data("skin"));
									var dataskin = $(this).data("skin");
									setTimeout(function(){
										$("link[id='css-skin']").attr("href","skins/"+dataskin+"/style.css");
										$("div.switch-overlay").hide();
									},1000);
									e.preventDefault();
								});//End of Skin Chooser ----------------------------------------------------------------------------
								
								//Layout Chooser ------------------------------------------------------------------------------------
								styleSwitcherWrapper.find("a[data-layout]").click(function(e){
									$("div.switch-overlay").show();
									$("a[data-layout]").removeClass("selected");
									$(this).addClass('selected');
									var datalayout = $(this).data("layout");
									$.cookie('currentLayout',datalayout);
									
									setTimeout(function(){
										if( datalayout === "boxed" ){
											$("body").addClass("boxed");
											if($.cookie('currentPattern') !== null) {
												$("a[data-pattern]").removeClass("selected");
												$('body').css('background-image', 'url('+$.cookie('currentPattern')+')');
												$("a[data-pattern='"+$.cookie('currentPattern')+"']").addClass("selected");
											}
											styleSwitcherWrapper.find("ul.pattern-switcher").prev("h3").slideDown();
											styleSwitcherWrapper.find("ul.pattern-switcher").slideDown();
										}else{
											$("body").removeClass("boxed");
											$("body").removeAttr("style");
											styleSwitcherWrapper.find("ul.pattern-switcher").prev("h3").slideUp();
											styleSwitcherWrapper.find("ul.pattern-switcher").slideUp();
										}
										$("div.switch-overlay").hide();
									},1000);
									
									e.preventDefault();
								});//End of Layout Chooser --------------------------------------------------------------------------
								
								//Color Chooser -----------------------------------------------------------------------------------
								styleSwitcherWrapper.find("a[data-color]").click(function(e){
									$("div.switch-overlay").show();
									$("a[data-color]").removeClass("selected");
									$(this).addClass("selected");
									var datacolor = $(this).data("color");
									$.cookie('currentColor',datacolor);
									setTimeout(function(){
										$("#css-color").remove();
										$('head').append('<link id="css-color" rel="stylesheet" href="css/skins.php?color=' + datacolor + '" type="text/css" />');
										$("div.switch-overlay").hide();
									},1000);
									e.preventDefault();
								});//End of Color Chooser -------------------------------------------------------------------------
								
								//Pattern Chooser -----------------------------------------------------------------------------------
								styleSwitcherWrapper.find("a[data-pattern]").click(function(e){
									$("div.switch-overlay").show();
									$("a[data-pattern]").removeClass("selected");
									$(this).addClass('selected');
									var datapattern = $(this).data('pattern');
									$.cookie('currentPattern',datapattern);
									setTimeout(function(){
										$("div.switch-overlay").hide();
										$('body').css('background-image', 'url('+datapattern+')');
									},1500);
									e.preventDefault();
								});//End of Pattern Chooser -------------------------------------------------------------------------
								
								

					}
				}); //getScript End

			}); // end of each()
		}
		
	}; // End of Style Picker
	
	/*Portfolio Carousel*/
	$('.portfolio-carousel').each(function(){
		var container = $(this),
			prev_arrow =  container.prev("div.slider-arrows").find("a.portfolio-prev-arrow"),
			next_arrow =  container.prev("div.slider-arrows").find("a.portfolio-next-arrow");
		$(this).carouFredSel({
			responsive: true,
			auto: false,
			width: '100%',
			prev: prev_arrow,
			next:next_arrow,
			mousewheel: true,
			scroll: 1,
			items: {
				visible: { min: 1, max:4 }
			}
		});
	});/*Portfolio Carousel End*/
	
	/*Testimonial Carousel*/
	$('.testimonial-carousel').each(function(){
		var container = $(this),
			prev_arrow =  container.prev("div.slider-arrows").find("a.testimonial-prev-arrow"),
			next_arrow =  container.prev("div.slider-arrows").find("a.testimonial-next-arrow");
		$(this).carouFredSel({
			responsive: true,
			auto: false,
			width: '100%',
			prev: prev_arrow,
			next:next_arrow,
			mousewheel: true,
			scroll: 1,
			items: {
				visible: { min: 1, max:1 }
			}
		});
	});/*Testimonial Carousel End*/
	
	/*Clients Slider Carousel*/
	$('.clients-slider').each(function(){
		var container = $(this),
			prev_arrow =  container.prev("div.slider-arrows").find("a#clients-prev-arrow"),
			next_arrow =  container.prev("div.slider-arrows").find("a#clients-next-arrow");
		$(this).carouFredSel({
			responsive: true,
			auto: false,
			width: '100%',
			prev: prev_arrow,
			next:next_arrow,
			mousewheel: true,
			scroll: 1,
			items: {
				visible: { min: 1, max:5 }
			}
		});
		
	});/*Clients Slider Carousel*/
	
	//hoverdir
	if( $('.da-thumbs').length ) {
		$('.da-thumbs > .column').hoverdir();
	}
	
	//prettyPhoto
	if( $(".gallery a[data-gal^='prettyPhoto']").length ) {
		$(".gallery a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});
	}
	


	
 })(jQuery);

$('ul.sf-menu').spotless_superfish_menu({addSubMenuClass:true});

$("ul.sf-menu a").spotless_mobile_menu();

$('div.tweets').spotless_twitter();

$('ul.flickr-widget').spotless_flickr();

$('.portfolio-container').spotless_isotope();

$('.map').spotless_gmap();

$('.toggle').spotless_toggle();

$('.toggle-frame-set').spotless_toggle_frame_set();

$('ul.tabs-frame').spotless_tab();

$('.tabs-vertical-frame').spotless_vertical_tab();

$('.contactus-form').spotless_contact_form();

$('.sendus-form').spotless_sendus_form();

$('body').spotless_style_picker({enablePicker: true});

if($('.portfolio-container').length) {
   $(window).smartresize(function(){
	   $('.portfolio-container').css({overflow:'hidden'}).isotope({itemSelector : '.isotope-item'});
   });
}

var progressbar =  $.browser.msie && (parseInt($.browser.version, 10) <= 8) ? $('.progress') : $('.progress:in-viewport');
	$(progressbar).spotless_animated_bar();
$(window).scroll(function(){ 
	var progressbar =  $.browser.msie && (parseInt($.browser.version, 10) <= 8) ? $('.progress') : $('.progress:in-viewport');
	$(progressbar).spotless_animated_bar(); 
});