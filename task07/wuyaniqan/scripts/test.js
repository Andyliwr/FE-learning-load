window.onload = function(){
	document.querySelector(".navright").addEventListener("click",function(e){
		var	evt = e || window.event;
		var target = evt.target;
		if (target && target.nodeName == "A") {
			var aActive = document.querySelector('.navright > a.linkactive');
			aActive.className = "";
			target.className="linkactive";
		}
	},false);
	var spanArray = document.querySelectorAll('.lunbo-control > span');
	var divArray = document.querySelectorAll('.lunbo-div');
	for(var i=0; i<spanArray.length; i++){
	  spanArray[i].addEventListener('click', function(e){
			var evt = e || window.event;
			var target = evt.target;
			var dataIndex = target.dataset.index;
			for(var j=0; j<divArray.length; j++){
			  var spanArray = document.querySelectorAll('.lunbo-control > span');
				if(j != (dataIndex-1)){
					divArray[j].style.display = "none";
					spanArray[j].style.background = "#fff";
					spanArray[j].style.border = "1px solid #999";
			  }
			}
			divArray[dataIndex-1].style.display = "block";
			spanArray[dataIndex-1].style.background="#e74f4d";
			spanArray[dataIndex-1].style.border="1px solid #e74f4d";
		});
	}
};
