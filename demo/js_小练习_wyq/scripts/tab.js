window.onload=function(){
	var spanArray = document.querySelectorAll(".tab-control>span");
	var divArray = document.querySelectorAll(".tab-content>div");
	for(i=0 ; i < spanArray.length ; i++){
		spanArray[i].index=i;
		spanArray[i].addEventListener('click' , function(){
			$(".tab-control-active").removeClass("tab-control-active");
			$(".tab-content-active").removeClass("tab-content-active");
			$(this).addClass("tab-control-active");
			divArray[this.index].className="tab-content-active";
		});
	}
}