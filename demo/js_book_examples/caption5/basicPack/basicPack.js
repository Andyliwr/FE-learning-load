/**
 * Created by Andyliwr on 2017/1/23 0023.
 */
//使用new创建的引用类型实例，在执行流离开当前作用域之前一直存在，而自动创建的基本包装类型只存在于一行代码执行的瞬间，然后立即被销毁
console.log("基本包装类型与引用类型 >>>>>>>>>>>>>>>>");
var str1 = "lidikang";
str1.fontColor = "red";
console.log('基本包装类型的属性：'+str1.fontColor);
var str2 = new String("lidikang");
str2.fontcolor = "red";
console.log('使用new创建的对象的属性：'+str2.fontColor);

//typeof instanceof
console.log("typeof instanceof >>>>>>>>>>>>>>>>>>")
var value1 = 10;
console.log(typeof value1 == 'number');
console.log(value1 instanceof Number);
var value2 = new Number("10");
console.log(typeof value2 == 'number');
console.log(value2 instanceof Number);

//boolean
console.log("boolean >>>>>>>>>>>>>>>>");
var falseObj = new Boolean(false);
console.log(falseObj && true);
var falseObj2 = false;
console.log(falseObj2 && true);

//number
console.log("number >>>>>>>>>>>>>>>");
var num1 = 123;
console.log(num1.toString(2));
console.log(num1.toFixed(3));
console.log(num1.toExponential(6));
console.log(num1.toPrecision(2));
var num2 = "123";
// console.log(num2.toFixed(3)); //err undefined

//string
console.log("string >>>>>>>>>>>>>>>");
var str3 = "Hello World";
console.log(str3.charAt(1));
console.log(str3.charCodeAt(1)); //AsciII编码
//要访问字符串某个位置的字符不用再写split了
console.log(str3[1]);
var str4 = "hello ";
var resultStr = str4.concat("world", "!");
console.log("str4: "+str4+", resultStr: "+resultStr);
//slice和substring的第二个参数是指字符串最后一个字符的位置，而substr第二个参数是指需要返回字符的个数，相同点是如果没有传第二个参数，默认是字符串结尾字母的位置
var str5 = "Hello world!";
console.log("slice："+str5.slice(2)+" ,substring: "+str5.substring(2)+" ,substr: "+str5.substr(2));
console.log("slice："+str5.slice(1,2)+" ,substring: "+str5.substring(1,2)+" ,substr: "+str5.substr(1,2));
//当这三个参数传入负值的时候, slice会将传入的负值和字符串的长度相加，而substr会将传入的第一个为负值的参数和字符串的长度相加，而将传入的第二个为负值的参数变成0，最后substring会将所有传入的负值转化成0
console.log("slice："+str5.slice(-2)+" ,substring: "+str5.substring(-2)+" ,substr: "+str5.substr(-2));
//苏北string会将传入的参数排序，截取最小数到最大数位置之间的字符串，因此substring(3, 0)相当于substring(0, 3)
console.log("slice："+str5.slice(3, -2)+" ,substring: "+str5.substring(3, -2)+" ,substr: "+str5.substr(3, -2));
//indexOf
console.log('indexOf: '+str5.indexOf('o')+' ,lastIndexOf: '+str5.lastIndexOf('o'));
//找到所有匹配项的函数
function allIndexOf(str, char){
    if(typeof str == 'string'){
        var pos = str.indexOf(char);
        var positions = [];
        while(pos > -1){
            positions.push(pos);
            pos = str.indexOf(char, pos+1);
        }
        return positions;  
    }
    return null;
}

//正则
console.log();
var reg = new RegExp('.at', 'g');
var reg2 = /.at/g;
var str6 = 'cat, bat, sat, fat';
console.log('match------正则对象：'+str6.match(reg)+' ,正则表达式：'+str6.match(reg2));