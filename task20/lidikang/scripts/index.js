//created by andyliwr on 2017/02/13
window.onload = function(){
	var inputStr = document.getElementById('inputStr');
	var searchStr = document.getElementById('searchStr');
	var inputBtn = document.getElementById('inputBtn');
	var searchBtn = document.getElementById('searchBtn');
	var displayDiv = document.querySelector('.display p');

	inputBtn.addEventListener('click', function(){
		// console.log(inputStr.value);
		if(inputStr.value){
            var insertHtml = inputStr.value;
            displayDiv.innerHTML += '<br />'+insertHtml;
		}

	});

	//todo 未解决的问题，1.搜索‘你’会出现错误，2.搜索清零
	searchBtn.addEventListener('click', function(){
        //点击搜索前将文字的状态还原到最初的状态
        var removeCodeReg = new RegExp('(<code>|</code>)', 'igm');
        displayDiv.innerHTML = displayDiv.innerHTML.replace(removeCodeReg, '');

		var searchString = searchStr.value;
        if(searchString){
            var regExp = new RegExp(searchString, 'igm');
            var leftStr = ''; //记录关键词左边的字符串
            var rightStr = ''; //记录关键词右边的字符串
            var count = 0; //计数器
            var tempStr = displayDiv.innerHTML; //用于正则匹配的字符串
            var notChageStr = displayDiv.innerHTML; //用于截取字符串，和上面一样的值是因为不能把一个值既用于正则运算又用于记录加入<code></code>的新的字符串,这样会使得循环变成无限循环
            var lastIndex = 0; //记录关键词的位置
            while (regExp.exec(tempStr) != null) {
            	console.log(++count);
                lastIndex = regExp.lastIndex+13*(count-1); //每次循环notChageStr并非不变，而是多了<code></code>共计13个字符，所以为了保证后续循环中lastindex的正确性应该将lastindex自增13
                leftStr = notChageStr.substring(0, lastIndex-searchString.length);
                rightStr = notChageStr.substring(lastIndex);
                notChageStr = leftStr+'<code>'+searchString+'</code>'+rightStr;
            }
            displayDiv.innerHTML = notChageStr;
        }
	});
}