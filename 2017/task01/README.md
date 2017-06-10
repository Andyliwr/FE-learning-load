## Therejs入门

### 储备知识
需要对 JavaScript 比较了解；无需了解图形学相关知识。
### 任务目的

在这一题中，你需要了解在网页中实现三维渲染的相关知识（涉及到 WebGL 和 Three.js 等），并且使用 Three.js 完成你的第一个作品。

### 任务描述

+ 学习《Three.js 入门指南》第 1 至 3 章；
+ 了解 WebGL 与 Three.js 的概念；
+ 掌握 Three.js 的基本知识；
+ 理解照相机概念及设置方式；
+ 学会创建基本形状，并将其添加到场景中；
+ 配置好 Three.js 环境，运行书中的代码；
+ 实现一个简单的小车模型，下图效果仅作为参考，可以根据自己掌握程度和创意实现类似的效果；

在学习光影前，如果你创建的模型看起来是纯色，这完全是可以接受的；考虑如何用简单几何形状的组合，创造看起来更逼真的车；
想一下，如果不用 Three.js，只使用 WebGL API 的话，实现这样的场景大概需要写哪些代码。

### 《ThreeJS入门》读书笔记
#### 第一章 什么是WebGL
  WebGL可以看成将OpenGL ES（OpenGL嵌入式版本）移植到了网页平台，它是一种的网络协议，定义了一些较为底层的图形接口。
  ThreeJs是一个3D JavaScript库，它封装了底层的图形接口，使程序员能够在无需掌握冗繁的图形学知识的情况下，也能用简单的代码实现三维场景的渲染。
  一个典型的ThreeJs程序至少包含渲染器(Render)、场景(Scene)、照相机(Camera)、以及你在场景中创建的物体。

#### 渲染器 render
  渲染器将会和canvas，如果事先已经创建了canvas对象，可以在初始化渲染器的时候指定canvas属性。

  ```
  var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
  });
  ```
  
  如果想要动态创建canvas对象，可以这样写：

  ```
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 300); // 设置大小
  renderer.setClearColor(0x000000); // 设置背景色
  document.getElementsByTagName('body')[0].appendChild(renderer.domElement);

  ```
#### 场景 scene
  在Three.js中添加的物体都是添加到场景中的，因此它相当于一个大容器。一般说，场景来没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。

  ```
  var scene = new THREE.Scene(); 
  ```

#### 相机 camera
  先讲讲坐标系，WebGL和Three.js都是使用的右手坐标系。

  ![右手坐标系](https://olpkwt43d.qnssl.com/fe_learning_load/%E5%8F%B3%E6%89%8B%E5%9D%90%E6%A0%87%E7%B3%BB.png?imageView2/1/h/300/q/75|imageslim)

  图形学中，相机定义了三维空间到二维屏幕的投影方式，讲三维的场景显示到二维的显示屏上。针对投影方式的不同，相机可以分为正交投影相照相机和透视投影照相机。使用透视投影相机获得的结果是类似人眼在真实世界看到的有“近大远小”的效果，而使用正交投影照相机获得就像我们在数学几何学上老师叫我们画的效果。如图：

  ![正交和摄影照相机](https://olpkwt43d.qnssl.com/fe_learning_load/%E6%AD%A3%E4%BA%A4%E5%92%8C%E9%80%8F%E8%A7%86%E7%9B%B8%E6%9C%BA.png?imageView2/1/w/600/q/75|imageslim)

  正交投影摄像机比较直观，它的构造函数是：

  ```
  THREE.OrthographicCamera(left, right, top, bottom, near, far) 
  ```
  6个参数分别代表了正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，我们称其为视景体（Frustum）。只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。
  为了保持照相机的横竖比例，需要保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致
  near与far都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为正值。为了保证场景中的物体不会因为太近或太远而被照相机忽略，一般near的值设置得较小，far的值设置得较大，具体值视场景中物体的位置等决定。

  ![正交摄影照相机的构造参数](https://olpkwt43d.qnssl.com/fe_learning_load/%E6%AD%A3%E4%BA%A4%E6%8A%95%E5%BD%B1%E7%9A%84%E6%9E%84%E9%80%A0%E5%8F%82%E6%95%B0.png?imageView2/1/h/300/q/75|imageslim)

  透视投影照相机的构造函数是：

  ```
  THREE.PerspectiveCamera(fov, aspect, near, far) 
  ```
  ![透视投影照相机的构造参数](https://olpkwt43d.qnssl.com/fe_learning_load/%E9%80%8F%E8%A7%86%E6%8A%95%E5%BD%B1%E7%9A%84%E6%9E%84%E9%80%A0%E5%8F%82%E6%95%B0.png)

  透视图中，灰色的部分是视景体，是可能被渲染的物体所在的区域。fov是视景体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。
  aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。
  near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。


  首先定义一个透视投影的相机：

  ```
  var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
  camera.position.set(0, 0, 5);
  scene.add(camera); // 相机需要被添加到场景
  ```

#### 物体 thing
  定义一个长方体加入到场景中：

  ```
  var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshBasicMaterial({color: 0xff0000}));
  scene.add(cube);
  ```

### 文档
  [Three.js 中文文档](http://techbrood.com/threejs/docs/)
