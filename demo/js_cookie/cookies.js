var cookies = {
  cookies: document.cookie,
  getCookies: function(cookies_name){
  	if(typeof cookies_name == "string"){
  		var all_cookie = this.cookies.split(';');
  		for(var i=0; i<all_cookie.lenght; i++){

  			if(all_cookie[i] == cookies_name){
  				return 
  			}
  		}
  	}else{
  		console.log("传入getCookies的参数不合法");
  	}
  }
};