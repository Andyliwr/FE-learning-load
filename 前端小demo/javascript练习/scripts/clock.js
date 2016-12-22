function toDouble(a){
		if (a<10){
			return '0'+a;
		}else{
			return ''+a;
		}
	};
function tick(){
	var date=new Date();
	document.querySelector('#hour').innerHTML=toDouble(date.getHours());
	document.querySelector('#minute').innerHTML=toDouble(date.getMinutes());
	document.querySelector('#second').innerHTML=toDouble(date.getSeconds());
};
tick();
setInterval(tick,1000);

