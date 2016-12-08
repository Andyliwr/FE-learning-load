var currentIndex = 0;
window.onload = function(){
	document.querySelector(".navright").addEventListener("click",function(e){
		var evt = e || window.event;
		var target = evt.target;
		if (target && target.nodeName == "A") {
			var aActive = document.querySelector('.navright>.linkactive');
			aActive.className = "";
			target.className = "linkactive";
		}
	},false);
	var currentIndex=0;
	var divArray = document.querySelectorAll(".lunbo-div");
	var spanArray = document.querySelectorAll('.lunbo-control > span');
	for(i=0;i<spanArray.length;i++){//i是用来给span添加监听事件的
		spanArray[i].addEventListener("click",function(e){

			var evt = e || window.event;
			var target = evt.target;
			var dataIndex = target.dataset.index;
			//因为页面加载完之后就会执行onload，那么i的for循环在监听到点击事件之前就会被循环三次
			//那么当我们点击span的时候i的值已经被固定为3，只有点击第三个span的时候才有效，所以需要添加dataIndex
			currentIndex = dataIndex-1;//重置curreindex，这样点击span以后轮播图才会从当前被点击的span开始重新播放
			for(var j=0; j<spanArray.length;j++){
				if(j != (dataIndex-1)){
				divArray[j].style.display = "none";
				spanArray[j].style.background="#fff";
				spanArray[j].style.border ="1px solid #999";
			}
			}
			divArray[dataIndex-1].style.display="block";
			spanArray[dataIndex-1].style.background="#e74f4d";
			spanArray[dataIndex-1].style.border="1px solid #e74f4d";

		});
	} 
	var timer = setInterval(function(){
		currentIndex = ++currentIndex%3;
		var divArray = document.querySelectorAll(".lunbo-div");
		var spanArray = document.querySelectorAll(".lunbo-control > span");
		for(var j=0; j<spanArray.length; j++){
			
			if(j != currentIndex){
				spanArray[j].style.border="1px solid #999";
				spanArray[j].style.background="#fff";
				divArray[j].style.display="none";
			}
			spanArray[currentIndex].style.border="1px solid #e74f4d";
			spanArray[currentIndex].style.background="#e74f4d";
			divArray[currentIndex].style.display="block";
		}
	},2000);
};