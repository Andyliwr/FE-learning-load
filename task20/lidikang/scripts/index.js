//created by andyliwr on 2017/02/13
window.onload = function(){
	var inputStr = document.getElementById('inputStr');
	var searchStr = document.getElementById('searchStr');
	var inputBtn = document.getElementById('inputBtn');
	var searchBtn = document.getElementById('searchBtn');
	var displayDiv = document.querySelector('.display ul');

	inputBtn.addEventListener('click', function(){
		// console.log(inputStr.value);
		if(inputStr.value){
            var insertHtml = '<li>'+inputStr.value+'</li>';
            displayDiv.innerHTML += insertHtml;
		}

	});

	//todo 未解决的问题，1.搜索‘你’会出现错误，2.搜索清零
	searchBtn.addEventListener('click', function(){
		// console.log(searchStr.value);
		var searchString = searchStr.value;
        if(searchString){
            var regExp = new RegExp(searchString, 'igm');
            var leftStr = '';
            var rightStr = '';
            var count = 0;
            var tempStr = displayDiv.innerHTML;
            var notChageStr = displayDiv.innerHTML;
            while (regExp.exec(tempStr) != null) {
            	console.log(++count);
                leftStr = notChageStr.substring(0, regExp.lastIndex-searchString.length);
                rightStr = notChageStr.substring(regExp.lastIndex);
                notChageStr = leftStr+'<code>'+searchString+'</code>'+rightStr;
            }
            displayDiv.innerHTML = notChageStr;
        }
	});
}