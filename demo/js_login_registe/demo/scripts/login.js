window.onload = function(){
	$('#login_btn').click(function(){
		//每次执行点击事件之前去掉提示
		$('.error-tips').css({'visibility': 'hidden'});
		//错误处理
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();
		if(username.length >= 8 && password.length >= 6){
			//ajax
			var loginUrl = 'http://121.42.55.103:3000/api/Users/login';
			var postData = {
			    "username": username,
 				"password": password
			}
			$.ajax({
				type: 'POST',
				url: loginUrl,
				data: postData,
				timeout: 10000,
				success: function(data){
					//跳转
					window.location.href = "my.html?userid=" + data.userId;
				},
				error: function(err){
					//错误处理
					$('.error-tips').css({'visibility': 'visible'});
				}
			});
		}else{
			$('.error-tips').css({'visibility': 'visible'});
			return;
		}
	});
}