var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log('数组是：'+numberArray);
//数组迭代 --- array
var everyResult = numberArray.every(function(item, index, array){
    return (item > 0);
});
console.log("every迭代的结果是："+everyResult);

//数组迭代 --- filter
var filterResult = numberArray.filter(function(item, index, array){
	return (item > 3);
});
console.log("filter迭代的结果是："+filterResult);

//数组迭代 --- forEach
var forEachResult = numberArray.filter(function(item, index, array){
    return (item > 3);
});
console.log("forEach迭代的结果是："+forEachResult);

//数组迭代 --- map
var mapResult = numberArray.map(function(item, index, array){
    return (item > 3);
});
console.log("map迭代的结果是："+mapResult);

//数组迭代 --- some
var someResult = numberArray.map(function(item, index, array){
    return (item > 3);
});
console.log("some迭代的结果是："+someResult);