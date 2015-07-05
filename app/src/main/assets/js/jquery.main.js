$(document).ready(function() {

	//functions
	function ucwords(str,force){
		str=force ? str.toLowerCase() : str;  
		return str.replace(/(\b)([a-zA-Z])/g,
			function(firstLetter){
				return   firstLetter.toUpperCase();
			});
	}

	/*function lockScroll(){
	    $('html, body').css({
		    'overflow': 'hidden',
		    'height': '100%'
		});
	} 

	function unlockScroll(){
	    $('html, body').css({
		    'overflow': 'auto',
		    'height': 'auto'
		});
	}*/

	//Back to top
	$("body").prepend("<a id='back_top'></a>");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back_top').fadeIn();
		} else {
			$('#back_top').fadeOut();
		}
	});

	//Dropdown
	$("#main_nav").click(function() {
		if($(this).hasClass("open")) {
			//close drop
			$(this).removeClass("open");
			unlockScroll();
		} else {
			//open drop
			$(this).addClass("open");
			lockScroll();
		}
	});

	$("#back_top").click(function() {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	//PhOW!!!
	$(".phow").click(function() {
		var hiw = "<div class='phowd'><p>" +
					"A score of 85% or above results in a <span class='bblue'>blue</span> badge<br />" +
					"A score of 100% results in a <span class='bgold'>gold</span> badge!<br />" +
					"</p></div>"
		$(this).fadeOut('500');
		$(this).parent().after(hiw);
		$(".phowd").slideDown(500);
	});

	//Tool tip!
	$(".tt").hover(function() {
		$(".ttt").css("display", "none");
		$(this).children(".ttt").fadeIn(250);
	}, function() {
		$(this).children(".ttt").fadeOut(250);
	});

	var dh = $(document).height();
	var bh = $("body").height();
	
	if(dh > bh) {
		$("#main_footer").css("margin-top", (dh - bh) + 25);
	}

	$(".code").click(function() {
		if(!$(this).hasClass("jsopen") && $(this).attr("data-id")) {
			$(this).addClass("jsopen");
			$(this).after("<iframe class='jsfiddle' src='http://jsfiddle.net/WebBot/" + $(this).attr("data-id") + "/embedded/result,html,css/'></iframe>");
			$(".jsfiddle").slideDown(250);
		}
	});

	//Login
	var open = 0;
	var form_html = "<form class='login_box' method='post'>" +
	"<input type='text' name='l_user' placeholder='Username or Email' autocomplete='off' />" +
	"<input type='password' name='l_pass' placeholder='Password' />" +
	"<input type='submit' value='Login' class='full_width nice_button1' />" +
					//"<a href='#'>Forgot password</a>" +
					"</form>";

					$("#login_b").on("click", function() {
						if($(window).width() < 786) {
							location.href="login.html";
						}
						if(open == 0) {
							open = 1;
							$(this).addClass("nice_button1_down");
							$("body").prepend("<div class='clear_overlay'></div>");
							$(this).append(form_html);
							$(".login_box").slideDown(200);
						}
					});

					var account_html = "<ul class='account_box'> " +
					"<li><a href='profile.php'>My Progress</a></li>" +
					"<li><a href='logout.php'>Logout</a></li>" +
					"</ul>";
					$("#account_b").on("click", function() {
						if($(window).width() < 786) {
							location.href="profile5445.html";
						}
						if(open == 0) {
							open = 1;
							$(this).addClass("nice_button1_down");
							$("body").prepend("<div class='clear_overlay'></div>");
							$(this).append(account_html);
							$(".account_box").slideDown(200);
						}
					});

					$(document).on("click", ".clear_overlay", function() {
						if(open == 1) {
							open = 0;
							$("#login_b, #account_b").removeClass("nice_button1_down");
							$(".clear_overlay").remove();
							$(".login_box, .account_box").slideUp(200, function() {
								$(this).remove();
							});
						} else if(open == 3) {
							open = 0;
							$(".popup").fadeOut(250, function() {
								$(this).remove();
								$(".clear_overlay").remove();
							});
						}
					});

					var vocab = {};
					$.getJSON("data/vocab", function(data) {
						$.each(data, function(key, value) {
							vocab[value.id] = value.def;
						});
						$("a[data-word]").addClass("vocab");
						$("a[data-word]").click(function() {
			/*$(this).prepend("<span class='bttt'>" +
				vocab[$(this).attr("data-word")] + 
				"</span>");*/
			//$(this).children(".bttt").fadeIn(250);
			$("body").prepend("<div class='clear_overlay od'></div>");
			$("body").prepend("<div class='popup'>" +
				"<div class='popup_h'>" +
				ucwords($(this).text(), 0) + "</div>" +
				"<div class='popup_c'>" +
				vocab[$(this).attr("data-word")] + 
				"</div>" +
				"</div>");
			open = 3;
			$(".popup").fadeIn(250);
		});
					});
				});

///Add a div to li;