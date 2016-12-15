window.onload = function(){
	$('#signup_btn').click(function(){
		//每次执行点击事件之前去掉提示
		$('.username-err').css({'display': 'none'});
		$('.name-err').css({'display': 'none'});
		$('.email-err').css({'display': 'none'});
		$('.password-err').css({'display': 'none'});
		//错误处理
		var username = $("input[name='username']").val();
		var name = $("input[name='name']").val();
		var email = $("input[name='email']").val();
		var password = $("input[name='password']").val();
		var pwconfirm = $("input[name='pwconfirm']").val();
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(username.length < 8){
			$('.username-err').css({'display': 'block'});
		}
		if(name.length == 0){
			$('.name-err').css({'display': 'block'});
		}
		if(!filter.test(email)){
			$('.email-err').css({'display': 'block'});
		}
		if(password != pwconfirm){
			$('.password-err').css({'display': 'block'});
		}
		if(username.length >= 8 && name.length != 0 && filter.test(email) && password == pwconfirm){
			//ajax
			var signupUrl = 'http://121.42.55.103:3000/api/Users';
			var postData = {
			  "realm": name,
			  "username": username,
			  "password": password,
			  "email": email,
			  "emailVerified": true
			}
			$.ajax({
				type: 'POST',
				url: signupUrl,
				data: postData,
				timeout: 10000,
				success: function(data){
					//跳转
					console.log(data);
					window.location.href = "my.html?userid=" + data.id;
				},
				error: function(err){
					//错误处理
					console.log(err);
				}
			});
		}
	});
}