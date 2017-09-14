## 自定义checkbox， radio样式
### 任务目的
1. 深入了解html label标签
2. 了解CSS边框、背景、伪元素、伪类（注意和伪元素区分）等属性的设置
3. 了解CSS中常见的雪碧图，并能自己制作使用雪碧图
### 任务描述
参考 样例（点击查看），实现页面开发，要求实现效果基本一致
### 任务注意事项
尝试背景图和伪元素两种不同方式实现，对比两种方式各自的优缺点。
注意测试不同情况，尤其是极端情况下的效果。
### 参考资料
MDN label: 了解html中label的基本知识
MDN background-position: 了解背景图片定位相关知识
MDN :checked: 了解input的:checked伪类的基本知识以及应用场景
MDN :before:了解input的:before伪元素的基本知识
MDN :after:了解input的:after伪元素的基本知识

### 踩的坑
- input元素不支持after和before这些伪元素
- label和input应该是包含关系，label包含input元素
- 好气呀，lable的for是和 input的id对应的，我一直以为是name，结果定义input的时候忘了写id，input在点击的时候就一直获取不到checked样式。后来给input加上id之后，点击lable就能使得input获得 checked样式。
- 同时有 :bofore和:hover样式的时候应该将 hover写在before前面，:before:hover的hover效果是不生效的
- 多个radio的 name属性一定要一样，否则不会形成互斥 ，即两个都可以选中，而不会是只有一个可以选中
