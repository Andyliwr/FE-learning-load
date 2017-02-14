window.onload = function(){
	$ ('#login-btn').click(function(){
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();
		$('.error-tip').css({'display':'none'});
		if (username.length >=6 && password.length >= 6){
			var loginUrl = 'http://121.42.55.103:3000/api/Users/login';
			var postData={"username":username , "password":password};
			$.ajax({
				type:'POST',
				url:loginUrl,
				data:postData,
				timeout:10000,
				success:function(data){
					window.location.href = "my.html?userid="+postData.username;
				},
				error:function(err){
					$('.error-tip').css({'display':'block'});
				}
			});
		}else{
			$('.error-tip').css({'display':'block'});
		}
	});
};