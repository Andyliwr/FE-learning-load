//第一次尝试写组件，不知道模仿得像不像
var stack = {
	stackData: [10, 3, 7, 12, 11, 30],
	inputNode: null,
	buttonNode: {leftInbtn: null, leftOutBtn: null, rightInBtn: null, rightOutBtn:  null},
	displayArea: null,
	init: function(obj){
		this.inputNode = document.querySelector(obj.inputNode);
		this.buttonNode.leftInbtn = document.querySelector(obj.buttonNode.leftInbtn);
		this.buttonNode.leftOutBtn = document.querySelector(obj.buttonNode.leftOutBtn);
		this.buttonNode.rightInBtn = document.querySelector(obj.buttonNode.rightInBtn);
		this.buttonNode.rightOutBtn = document.querySelector(obj.buttonNode.rightOutBtn);
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
		//根据队列里已有的值生成页面
		this.createDOM(this.stackData);
	},
	createDOM: function(data){
		var html = "";
		for(var i=0; i<data.length; i++){
			html += '<span>'+ data[i] +'</span>';
		}
		this.displayArea.innerHTML = html;
	},
	leftIn: function(item){
		this.stackData.unshift(item);
		this.createDOM(this.stackData);
	},
	leftOut: function(){
		this.stackData.shift();
		this.createDOM(this.stackData);
	},
	rightIn: function(item){
		this.stackData.push(item);
		this.createDOM(this.stackData);
	},
	rightOut: function(){
		this.stackData.pop();
		this.createDOM(this.stackData);
	}
};
stack.init({inputNode: '.control > input', buttonNode: {leftInbtn: '#leftInBtn', leftOutBtn: '#leftOutBtn', rightInBtn: '#rightInBtn', rightOutBtn:  '#rightOutBtn'}, displayArea: '.display'});