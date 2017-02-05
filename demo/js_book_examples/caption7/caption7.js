//使用arguments.callee实现递归
function factorial(num){
	if(num <= 1){
		return 1;
	}else{
		return num*arguments.callee(num -1);
	}
}
console.log('递归阶乘数列：'+factorial(1)+' '+factorial(2)+' '+factorial(3)+' '+factorial(4)+' '+factorial(5)+' '+factorial(6)+' '+factorial(7));
var factorial2 = (function f(num){
	if(num <= 1){
		return 1;
	}else{
		return num*f(num -1);
	}
});
f = null; //即是f设置成了null，仍然不会报错
console.log('递归阶乘数列：'+factorial2(1)+' '+factorial2(2)+' '+factorial2(3)+' '+factorial2(4)+' '+factorial2(5)+' '+factorial2(6)+' '+factorial2(7));