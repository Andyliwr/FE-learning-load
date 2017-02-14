/* 冒泡排序，核心思想就是分为两层循环，内循环负责比较临近两者之间的值，
*  如果前者比后者大就互换位置，外循环用来控制比对次数，已经冒泡到最上方的数据就不用再参与对比了
*/
function maopaoSort(arr){
	var retArr = [];
	if(arr instanceof Array){
		var tmp = 0;
		for(var i=(arr.length-1); i>=0; i--){
			for(var j=0; j<=i; j++){
				if(arr[j] > arr[j+1]){
					tmp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = tmp;
				}
			}
		}
		return arr;
	}else{
		console.log('not a array');
		return retArr;
	}
}
// console.log('冒泡排序:'+maopaoSort([23, 34, 123, 67, 12, 89]));

/*快速排序，就是每次在队列中选择一个中间值，其他的值和这个值比较，大的放
* 在这个值的右边形成一个新的小队列，小的放在这个值的左边形成另一个新的小队
* 列，然后再用递归的方法去排序两个小队列，两个小队列各自又被分成两个小队列
，然后又分，直到最后只有一个值为止
*/
function quickSort(arr){
	var retArr = [];
	if(arr instanceof Array){
		if(arr.length <= 1){
			return arr;
		}
		var num = Math.floor(arr.length/2);
		var numValue = arr.splice(num, 1);
		var left = [];
		var right = [];
		for(var i=0; i<arr.length; i++){
			if(arr[i]<numValue){
				left.push(arr[i]);
			}else{
				right.push(arr[i]);
			}
		}
		return quickSort(left).concat(numValue, quickSort(right));
	}else{
		console.log('not an array');
		return retArr;
	}
}
// console.log('快速排序:'+quickSort([23, 34, 123, 67, 12, 89]));

//打乱函数
function mix(len){
	var retArr = [];
	for(var i=0; i<len; i++){
		//每次随机产生10-90的数字存放到retArr中
		retArr.push(Math.floor(Math.random()*90)+10);
	}
	return retArr;
}

//复用task18的代码
var stack = {
	stackData: [10, 26, 18, 59, 46, 98],
	inputNode: null,
	buttonNode: {leftInbtn: null, leftOutBtn: null, rightInBtn: null, rightOutBtn:  null, mixBtn: null, quickSortBtn: null, maopaoSortbtn: null},
	displayArea: null,
	init: function(obj){
		this.inputNode = document.querySelector(obj.inputNode);
		this.buttonNode.leftInbtn = document.querySelector(obj.buttonNode.leftInbtn);
		this.buttonNode.leftOutBtn = document.querySelector(obj.buttonNode.leftOutBtn);
		this.buttonNode.rightInBtn = document.querySelector(obj.buttonNode.rightInBtn);
		this.buttonNode.rightOutBtn = document.querySelector(obj.buttonNode.rightOutBtn);
		this.buttonNode.mixBtn = document.querySelector(obj.buttonNode.mixBtn);
		this.buttonNode.quickSortBtn = document.querySelector(obj.buttonNode.quickSortBtn);
		this.buttonNode.maopaoSortbtn = document.querySelector(obj.buttonNode.maopaoSortbtn);
		this.displayArea = document.querySelector(obj.displayArea);
		//绑定事件
		this.buttonNode.leftInbtn.addEventListener('click', function(){
			stack.leftIn(parseInt(stack.inputNode.value));
		});
		this.buttonNode.leftOutBtn.addEventListener('click', function(){
			stack.leftOut(parseInt(stack.inputNode.value));
		});
		this.buttonNode.rightInBtn.addEventListener('click', function(){
			stack.rightIn(parseInt(stack.inputNode.value));
		});
		this.buttonNode.rightOutBtn.addEventListener('click', function(){
			stack.rightOut(parseInt(stack.inputNode.value));
		});
		this.buttonNode.mixBtn.addEventListener('click', function(){
			stack.mix();
		});
		this.buttonNode.quickSortBtn.addEventListener('click', function(){
			stack.quickSort();
		});
		this.buttonNode.maopaoSortbtn.addEventListener('click', function(){
			stack.maopaoSort();
		});
		//根据队列里已有的值生成页面
		this.createDOM(this.stackData);
	},
	createDOM: function(data){
		var html = "";
		for(var i=0; i<data.length; i++){
			html += '<span style="height:'+ data[i]*2 +'px"><span class="pos">'+ data[i] +'</span></span>';
		}
		this.displayArea.innerHTML = html;
	},
	leftIn: function(item){
		if(this.stackData.length >= 60){
			alert('The queue is full.');
			return;
		}
		this.stackData.unshift(item);
		this.createDOM(this.stackData);
	},
	leftOut: function(){
		if(this.stackData.length = 0){
			alert('The queue is empty.');
			return;
		}
		this.stackData.shift();
		this.createDOM(this.stackData);
	},
	rightIn: function(item){
		if(this.stackData.length >= 60){
			alert('The queue is full.');
			return;
		}
		this.stackData.push(item);
		this.createDOM(this.stackData);
	},
	rightOut: function(){
		if(this.stackData.length = 0){
			alert('The queue is empty.');
			return;
		}
		this.stackData.pop();
		this.createDOM(this.stackData);
	},
	mix: function(){
		this.stackData = mix(this.stackData.length);
		this.createDOM(this.stackData);
	},
	quickSort: function(){
		this.stackData = quickSort(this.stackData);
		this.createDOM(this.stackData);
	},
	maopaoSort: function(){
		this.stackData = maopaoSort(this.stackData);
		this.createDOM(this.stackData);
	}
};
stack.init({inputNode: '.control > input', buttonNode: {leftInbtn: '#leftInBtn', leftOutBtn: '#leftOutBtn', rightInBtn: '#rightInBtn', rightOutBtn:  '#rightOutBtn', mixBtn: '#mixBtn', quickSortBtn: '#quickSortBtn', maopaoSortbtn: '#maopaoSortBtn'}, displayArea: '.display'});