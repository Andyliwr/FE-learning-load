var currentIndex = 0;
var classArray = ['lunbo-div blue', 'lunbo-div red', 'lunbo-div gray'];
window.onload = function(){
  var spanArray = document.querySelectorAll('.control > span');
	var divArray = document.querySelectorAll('.lunbo-div');
	for(var i=0; i<spanArray.length; i++){
	  spanArray[i].addEventListener('click', function(e){
			var evt = e || window.event;
			var target = evt.target;
			var dataIndex = target.dataset.index;
			var spanArray = document.querySelectorAll('.control > span');
			currentIndex = dataIndex -1;
			for(var j=0; j<divArray.length; j++){
			  //divArray[j].style.display = "none";
				if(j != (dataIndex-1)){
					divArray[j].setAttribute('class', classArray[j]);
					spanArray[j].style.backgroundColor = "#666";
					spanArray[j].style.border = "none";
			  }
			}
			divArray[dataIndex-1].setAttribute('class', classArray[dataIndex-1] +' active');
			spanArray[dataIndex-1].style.backgroundColor = "#60ea6b";
			spanArray[dataIndex-1].style.border = "1px solid #333";
		});
	}
	//计时器
	var timer = setInterval(function(){
	  currentIndex = ++currentIndex%3;
		var spanArray = document.querySelectorAll('.control > span');
		var divArray = document.querySelectorAll('.lunbo-div');
		for(var j=0; j<divArray.length; j++){
			  //divArray[j].style.display = "none";
				if(j != (currentIndex)){
					divArray[j].setAttribute('class', classArray[j]);
					spanArray[j].style.backgroundColor = "#666";
					spanArray[j].style.border = "none";
			  }
		}
		divArray[currentIndex].setAttribute('class', classArray[currentIndex] +' active');
		spanArray[currentIndex].style.backgroundColor = "#60ea6b";
		spanArray[currentIndex].style.border = "1px solid #333";
	}, 3000);
};