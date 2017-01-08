// 冒泡排序
// 快速排序
function quickSort(arr){
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
	}
}
console.log(quickSort([23, 34, 123, 67, 12, 89]));