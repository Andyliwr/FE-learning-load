### 任务要求:
+ 实现图示效果,[效果图](https://ww3.sinaimg.cn/large/006tNbRwly1fcr5jmrmujg30cj06xqv5.gif)
+ 实现文字的流光渐变动画
+ 背景图需要进行模糊处理
+ 实现按钮边框的从中间到两边扩展开


学习笔记：
1. 100vh是css新的单位，其含义是将当前视窗高度小分为100vh, 每1%就是1vh，vh的单位可以用于适应性布局
2. 弹性布局兼容性写法
```
    /* 弹性布局的兼容性写法 */
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-content: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
```
3. 主要是用下面几个CSS属性实现的：
```
background-image
-webkit-background-clip
-webkit-text-fill-color
background-size
animation
```

### 具体实现
1. 绘制渐变背景图
```
background-image: -webkit-linear-gradient(left, blue, red 25%, blue 50%, red 75%, blue 100%);
```
使用CSS3的渐变绘制图像，从左到右。
需要注意的是颜色是 0到49%的颜色组 = 50%到99%的颜色组，且最后100%的颜色要和开头0的颜色相等
这是为了能无缝衔接流光效果, 之后有说到

2. 裁剪背景图
```
-webkit-background-clip: text;
```
使用文字作为裁剪区域向外裁剪，此时文字颜色仍覆盖背景图

3. 设置字体颜色
```
-webkit-text-fill-color: transparent; or color: transparent;
```
将字体颜色设置成透明，这样就能将背景图显示出来了

4. 设置背景图长度
```
background-size: 200% 100%;
```
将背景图宽度拉长至两倍，之前设置background-image的两份相同的颜色组，就是为了能在此拉长后只显示一份颜色组，另外超出的半截颜色组用来实现流光效果

5. 开始动画
```
animation: streamer 5s infinite linear;
@keyframes streamer {
    0%  {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}
```