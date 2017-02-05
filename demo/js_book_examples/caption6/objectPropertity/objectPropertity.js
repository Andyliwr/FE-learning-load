console.log('对象属性类型---writable');
var person = {};
Object.defineProperty(person, 'name', {writable: false, value: 'Lidikang'});
console.log(person.name);
person.name = 'Lidijia'; //未生效
console.log(person.name);

console.log('对象属性类型---configurable');
var person = {};
Object.defineProperty(person, 'name', {configurable: false, value: 'lidikang'});
console.log(person.name);
delete person.name; //未生效
console.log(person.name);

console.log('对象访问器属性');
var book = {
 _year: 2004,
 edition: 1
};

Object.defineProperty(book, 'year', {
	get: function(){
		return this._year;
	},
	set: function(newValue){
		if(newValue > 2004){
			this._year = newValue;
			this.edition += newValue -2004;
		}
	}
});
book.year = 2005;
console.log(book.edition); //2

console.log('定义多个属性');
var book2 = {};
Object.defineProperties(book2,{
	_year: {
		value: 2004
	},
	edition: {
		value: 1
	},
	year: {
		get: function(){
			return this._year
		},
		set: function(newValue){
			if(newValue > 2004){
				this._year = newValue;
				this.edition += newValue -2004;
			}
		}
	}
});
//_year是数据属性
console.log(Object.getOwnPropertyDescriptor(book2, '_year'));
console.log(Object.getOwnPropertyDescriptor(book2, '_year').set);
//year是访问器属性
console.log(Object.getOwnPropertyDescriptor(book2, 'year'));
console.log(Object.getOwnPropertyDescriptor(book2, 'year').set);
