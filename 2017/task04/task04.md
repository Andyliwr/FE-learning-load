### 任务目的
- 了解 getter 和 setter
- 了解 new
### 任务描述
这是“动态数据绑定”系列的第一题。

我之前经常使用 Vue，后来不满足于仅仅使用它，我想了解其内部实现原理，所以就尝试学习其源码，获益匪浅。所以，如果你跟我一样，希望挑战这高难度的事情，那就开启这一系列吧！

我们从最简单的开始。

其中，动态数据绑定就是 Vue 最为基础，最为有用的一个功能。这个系列将分成5部分，一步一步来理解和实现这一功能。

ok，我们从最简单的开始。给定任意一个对象，如何监听其属性的读取与变化？也就是说，如何知道程序访问了对象的哪个属性，又改变了哪个属性？ 举个例子。
```
let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science
```
请实现这样的一个 `Observer`，要求如下：

- 传入参数只考虑对象，不考虑数组。
- new Observer返回一个对象，其 data 属性要能够访问到传递进去的对象。
- 通过 data 访问属性和设置属性的时候，均能打印出右侧对应的信息。

### 任务注意事项
- 不能使用任何第三方的库
- 程序执行环境为浏览器
- 在线学习参考资料
传送门：[vue早期源码学习系列之一：如何监听一个对象的变化](https://github.com/youngwind/blog/issues/84)

### 踩的坑
+ The [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) method defines a new property directly on an object, or modifies an existing property on an object, and returns the object.

+ 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
