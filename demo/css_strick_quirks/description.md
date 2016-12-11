###例子的描述
本案例在于验证浏览器在Strict和Quirk模式下的差异。

----------


要想写出跨浏览器的CSS，必须知道浏览器解析CSS的两种模式：标准模式(strict mode)和怪异模式(quirks mode)。

所谓的标准模式是指，浏览器按W3C标准解析执行代码；怪异模式则是使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以我们称之为怪异模式。浏览器解析时到底使用标准模式还是怪异模式，与你网页中的DTD声明直接相关，DTD声明定义了标准文档的类型（标准模式解析）文档类型，会使浏览器使用相应的方式加载网页并显示，忽略DTD声明,将使网页进入怪异模式(quirks mode)。

```
<html>
    <head>
        <title>重庆PHP</title>
    </head>
    <body>
        <h3>重庆PHP，最专业的PHP社区</h3>
    </body>
</html>
```
如果你的网页代码不含有任何声明，那么浏览器就会采用怪异模式解析，便是如果你的网页代码含有DTD声明，浏览器就会按你所声明的标准解析。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title>重庆PHP</title>
    </head>
    <body>
        <h3>重庆PHP，最专业的PHP社区</h3>
    </body>
</html>
```
上面的代码，浏览器会按HTML 4.01的标准进行解析。

  到底标准模式和怪异模式有什么不同呢？在我之前的文章《IE到底认不认识!important声明》中已经说过，标准模式中

IE6不认识!important声明，IE7、IE8、Firefox、Chrome等浏览器认识；而在怪异模式中，IE6/7/8都不认识!important声明，这只是区别的一种，还有很多其它区别。所以，要想写出跨浏览器的CSS，你必须采用标准模式。好像太绝对了，呵呵。好吧，要想写出跨浏览器CSS，你最好采用标准模式。

到底都有哪些声明呢？哪种声明更好呢？我们建议你使用XHTML 1.0最严格模式，从一开始我们就应该严格的要求自己。

具体声明如下：

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<!-- 如果你接手的是一个遗留网页，最初并没有DTD声明，并且使用了很多在XHTML中已经废除的标签，那么，我们建议你使用XHTML兼容模式，声明如下： -->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

```
**Quirk和Strict模式的区别：**

**盒子模型** 、**渲染模式的不同**

在strict mode中：
width是内容宽度，也就是说,元素真正的宽度 = 

```
margin-left  +  border-left-width  +  padding-left  + width  +  padding-right  +  border-right-width  +  margin-right;
```

在quirks mode中：
width则是元素的实际宽度，内容宽度 =

```
 width  -  (margin-left  +  margin-right  +  padding-left  +  padding-right  +  border-left-width  +  border-right-width)
```

使用document.compatMode 可显示为什么模式

在quirks mode 和 strict mode中还有一个区别，但没经过验证，我只是发现有这个现象。

在strict mode中，
table的css属性font-size会继承父级元素的，也就是说，table中的字体大小会继承父级元素字体的大小。
在quirks mode中，
table的css属性font-size不会继承父级元素的，需要专门设置一下。也就是说，table中的字体大小不会继承父级元素字体的大小。
