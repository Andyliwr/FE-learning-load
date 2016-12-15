window.onload = function (){
	var printCompatModeBtn = document.getElementById('printCompatMode');
	var modeSpan = document.getElementById('modeSpan');
	printCompatModeBtn.onclick = function(){
		var mode = document.compatMode;
		modeSpan.innerText = mode;
	}
	//处理盒模型的交互
	var strickBoxBtn = document.getElementById('strickBox');
	var quirkBoxBtn = document.getElementById('quirkBox');
	strickBox.onclick = function(){
		var windowReference1 = window.open("");
	}
	quirkBox.onclick = function(){

	}
}