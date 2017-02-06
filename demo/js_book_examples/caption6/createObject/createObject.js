//工厂模式，使用函数来封装创建对象的细节
console.log('工厂模式>>>>>>>>>>>>');
function createPerson(name, age, job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		console.log(this.name);
	}
	return o;
}
var person1 = createPerson('lidikang', 22, '前端工程师');
console.log(person1.sayName());


//构造函数模式
console.log('\n\n构造函数模式>>>>>>>>>>>>');
function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		console.log(this.name);
	}
}
//当构造函数用
var person2 = new Person('lidiknag', 22, '前端工程师');
console.log(person2.sayName()); //lidikang
console.log(person2.constructor == Person); //true
console.log(person2 instanceof Person); //true
console.log(person2 instanceof Object); //true
//当普通函数用
Person('lidijia', 24, '销售');
window.sayName(); //lidijia
//在另一个对象的作用域中调用
var o = new Object();
Person.call(o, 'lipanxing', 19, '学徒');
o.sayName(); //lipanxing


//原型模式
console.log('\n\n原型模式>>>>>>>>>>>>');
function Person2(){}
// Person2.prototype.name = "lidikang";
// Person2.prototype.age = 22;
// Person2.prototype.job = "前端工程师";
// Person2.prototype.sayName = function(){
// 	console.log(this.name);
// }

Person2.prototype = {
	name: 'lidiknag',
	age: 22,
	job: '前端工程师',
	sayName: function(){
		console.log(this.name);
	}
}


var person3 = new Person2();
var person4 = new Person2();
person4.name = 'lidikang2';
console.log(person3.constructor);
console.log(person3.sayName());
console.log(Person2.prototype.isPrototypeOf(person3));
console.log(Object.getPrototypeOf(person3) == Person2.prototype);

//改变实例的属性只会屏蔽搜索原型的同名属性
console.log("person3.name = "+person3.name+', person4.name = '+person4.name);
delete person4.name;
console.log(person4.name);

//hasOwnProperty
console.log('\n\nhasOwnProperty>>>>>>>>>>>>');
console.log(person3.hasOwnProperty('name')+' ,in的结果: '+('name' in person3)+' ,isPrototypeProperty的结果: '+isPrototypeProperty(person3, 'name'));
person3.name = "lidikang2";
console.log(person3.hasOwnProperty('name')+' ,in的结果: '+('name' in person3)+' ,isPrototypeProperty的结果: '+isPrototypeProperty(person3, 'name'));
delete person3.name;
console.log(person3.hasOwnProperty('name')+' ,in的结果: '+('name' in person3)+' ,isPrototypeProperty的结果: '+isPrototypeProperty(person3, 'name'));

//确定某个是不是属于原型
function isPrototypeProperty(object, name){
	return !object.hasOwnProperty(name) && (name in object);
}

//for in循环
console.log('\n\nfor in循环>>>>>>>>>>>>');
var str ='';
for(var i in person3){
	str += ' '+ i +','
}
console.log('person3所有属性:'+str +'\nperson3(屏蔽枚举): '+Object.keys(Person2.prototype)+'\nperson3(不屏蔽枚举): '+Object.getOwnPropertyNames(Person2.prototype));

console.log(person3.constructor == Person); //true
console.log(person3 instanceof Person); //true
console.log(person3 instanceof Object); //true

//终极方案
function Person3(){}
Person3.prototype = {
	name: 'lidikang',
	age: 29,
	job: '前端工程师',
	sayName: function(){
		console.log(this.name);
	}
}
Object.defineProperty(Person3.prototype, 'constructor', {
	enumerable: false,
	value: Person
});

//原型的动态性
console.log('\n\n原型的动态性>>>>>>>>>>>>');
var friend = new Person3();
Person3.prototype.sayHi = function(){
	console.log('Hello!');
}
friend.sayHi();

//重写整个原型
console.log('\n\n重写整个原型>>>>>>>>>>>>');
function Person4(){}
var friend2 = new Person4();
Person4.prototype = {
	constructor: Person4,
	name: 'lidikang',
	age: 29,
	sayName: function(){
		console.log(this.name);
	}
};
try{friend2.sayName();}catch(err){console.log(err)} //errorX


//原型模式的缺点
console.log('\n\n原型模式的缺点>>>>>>>>>>>>');
function Person5(){}
Person5.prototype = {
	constructor: Person5,
	name: 'lidikang',
	age: 22,
	job: '前端工程师',
	friends: ["xukang", "dengxushan"],
	alertFriends: function(){
		console.log(this.friends.join('----'));
	}
};

var friend3 = new Person5();
var friend4 = new Person5();
friend3.friends.push('wuyanqian');
friend3.alertFriends();
friend4.alertFriends();


//组合使用构造函数和原型模式
console.log('\n\n组合使用构造函数和原型模式>>>>>>>>>>>>');
function Person6(name, age, job){
	this.name = name;
	this.job = job;
	this.age = age;
	this.friends = ['xukang', 'dengxushan'];
}
Person6.prototype = {
	constructor: Person6,
	alertFriends: function(){
		console.log(this.friends.join('----'));
	}
}
var person5 = new Person6('lidijia', 24, '前端工程师');
var person6 = new Person6('xukang', 22, '军人');
person5.friends.push('chenkang');
person5.alertFriends();


//动态原型模式
console.log('\n\n动态原型模式>>>>>>>>>>')
function Person7(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	if(typeof this.sayName != "function"){
		Person.prototype.sayName = function(){
			console.log(this.name);
		}
	}
}
var friend = new Person('lidikang', 22, "前端工程师");
friend.sayName();

//寄生构造模式
console.log('\n\n寄生构造模式>>>>>>>>>>>>')
function Person7(name, age, job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		console.log(this.name);
	}
	return o;
}
var person7 = new Person7('lidikang', 22, '前端工程师');
person7.sayName(); //Nicholas

function SpecialArray(){
	//创建数组
	var values = new Array();
	//添加值
	values.push.apply(values, arguments);
	values.toPipedString = function(){
		return this.join('|');
	}
	return values;
}
var colors = new SpecialArray('yellow', 'red', 'blue');
console.log(colors.toPipedString());


//稳妥构造函数模式
console.log('\n\n稳妥构造函数模式>>>>>>>>>>>');
function Person8(name, age, job){
	//创建要返回的对象
	var o = new Object();
	//这里可以定义私有类型
	o.sayName = function(){
		console.log(name);
	}
	return o;
}
var person8 = Person8('lidikang', 22, '前端工程师');
person8.sayName();


//原型链继承
console.log('\n\n原型链继承>>>>>>>>>>>>');
function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
}
function SubType(){
	this.subProperty = false;
}
//SubType继承SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubProperty = function(){
	return this.subProperty;
}
var instance = new SubType();
console.log(instance.getSuperValue()+' '+instance.getSubProperty()+' ,instance.constructor == SuperType: '+(instance.constructor == SuperType));
console.log('instanceof Object: '+(instance instanceof Object)+' ,instanceof SuperType: '+(instance instanceof SuperType)+' ,instanceof SubType: '+(instance instanceof SubType));
console.log('isPrototypeOf Object: '+(Object.prototype.isPrototypeOf(instance))+' ,isPrototypeOf SuperType: '+(SuperType.prototype.isPrototypeOf(instance))+' ,isPrototypeOf SubType: '+(SubType.prototype.isPrototypeOf(instance)));


//原型链继承的问题
console.log('\n\n原型链的问题>>>>>>>>>>>>');
function Father(){
	this.colors = ['red', 'blue', 'green'];
}
function Child(){}
//继承father
Child.prototype = new Father();
var childInstance = new Child();
childInstance.colors.push('gray');
var childInstance2 = new Child();
console.log(childInstance2.colors.join('--'));


//经典继承
console.log('\n\n经典继承>>>>>>>>>>>');
function Father2(name){
	this.name = name;
	this.colors = ['red', 'blue', 'green'];
}
function Child2(){
	Father2.call(this, 'lidikang');
}
var child2Instance = new Child2();
child2Instance.colors.push('gray');
var child2Instance2 = new Child2();
console.log('child2Instance colors: '+child2Instance.colors.join('--')+' ,child2Instance name: '+child2Instance.name+' ,child2Instance2 colors: '+child2Instance2.colors.join('--'));

//组合继承
console.log('\n组合继承>>>>>>>>>>');
function SuperType3(name){
	this.name = name;
	this.colors = ['red', 'blue', 'green'];
}
SuperType3.prototype.sayName = function(){
	console.log(this.name);
};
function SubType3(name, age){
	SuperType3.call(this, name);
	this.age = age;
}
//继承方法
SubType3.prototype = new SuperType3();
SubType3.prototype.constructor = SuperTypeoo03;
SubType3.prototype.sayAge = function(){
	console.log(this.age);
}

var subType3Instance = new SubType3('lidikang', 22);
subType3Instance.colors.push('gray');
var subType3Instance2 = new SubType3('lidijia', 24);
console.log('subType3Instance colors: '+subType3Instance.colors.join('--')+' ,subType3Instance sayName: '+subType3Instance.sayName()+' ,subType3Instance sayAge: '+subType3Instance.sayAge());
console.log('subType3Instance2 colors: '+subType3Instance2.colors.join('--')+' ,subType3Instance2.sayName: '+subType3Instance2.sayName()+' ,subType3Instance2.sayAge: '+ subType3Instance2.sayAge());

//EASCRIPT拓展的原型
console.log('\n\nEASCRIPT拓展的原型>>>>>>>>>>>')
var person9 = {
	name: 'lidikang',
	friends: ['xukang', 'chenkang', 'yangyang']
};
var anotherPerson = Object.create(person9);
anotherPerson.name = 'Andyliwr';
anotherPerson.friends.push('zhanngyuxiao');
var yetAnotherPerson = Object.create(person9);
yetAnotherPerson.name = 'Lidikang';
yetAnotherPerson.friends.push('huangdian');
console.log('anotherPerson: '+anotherPerson.friends.join('--')+' ,yetAnotherPerson: '+yetAnotherPerson.friends.join('--'));

//集成