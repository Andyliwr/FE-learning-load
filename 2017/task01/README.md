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

## 《ThreeJS入门》读书笔记
### 第一章 什么是WebGL
  WebGL可以看成将OpenGL ES（OpenGL嵌入式版本）移植到了网页平台，它是一种的网络协议，定义了一些较为底层的图形接口。
  ThreeJs是一个3D JavaScript库，它封装了底层的图形接口，使程序员能够在无需掌握冗繁的图形学知识的情况下，也能用简单的代码实现三维场景的渲染。
  一个典型的ThreeJs程序至少包含渲染器(Render)、场景(Scene)、照相机(Camera)、以及你在场景中创建的物体。

### 渲染器 render
  渲染器将会和canvas，如果事先已经创建了canvas对象，可以在初始化渲染器的时候指定canvas属性。

  ```javascript
  var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
  });
  ```
  
  如果想要动态创建canvas对象，可以这样写：

  ```javascript
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 300); // 设置大小
  renderer.setClearColor(0x000000); // 设置背景色
  document.getElementsByTagName('body')[0].appendChild(renderer.domElement);

  ```
### 场景 scene
  在Three.js中添加的物体都是添加到场景中的，因此它相当于一个大容器。一般说，场景来没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。

  ```javascript
  var scene = new THREE.Scene(); 
  ```

### 相机 camera
  先讲讲坐标系，WebGL和Three.js都是使用的右手坐标系。

  ![右手坐标系](https://olpkwt43d.qnssl.com/fe_learning_load/%E5%8F%B3%E6%89%8B%E5%9D%90%E6%A0%87%E7%B3%BB.png?imageView2/1/h/300/q/75|imageslim)

  图形学中，相机定义了三维空间到二维屏幕的投影方式，讲三维的场景显示到二维的显示屏上。针对投影方式的不同，相机可以分为正交投影相照相机和透视投影照相机。使用透视投影相机获得的结果是类似人眼在真实世界看到的有“近大远小”的效果，而使用正交投影照相机获得就像我们在数学几何学上老师叫我们画的效果。如图：

  ![正交和摄影照相机](https://olpkwt43d.qnssl.com/fe_learning_load/%E6%AD%A3%E4%BA%A4%E5%92%8C%E9%80%8F%E8%A7%86%E7%9B%B8%E6%9C%BA.png?imageView2/1/w/600/q/75|imageslim)

  正交投影摄像机比较直观，它的构造函数是：

  ```javascript
  THREE.OrthographicCamera(left, right, top, bottom, near, far) 
  ```
  6个参数分别代表了正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，我们称其为视景体（Frustum）。只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。
  为了保持照相机的横竖比例，需要保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致
  near与far都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为正值。为了保证场景中的物体不会因为太近或太远而被照相机忽略，一般near的值设置得较小，far的值设置得较大，具体值视场景中物体的位置等决定。

  ![正交摄影照相机的构造参数](https://olpkwt43d.qnssl.com/fe_learning_load/%E6%AD%A3%E4%BA%A4%E6%8A%95%E5%BD%B1%E7%9A%84%E6%9E%84%E9%80%A0%E5%8F%82%E6%95%B0.png?imageView2/1/h/300/q/75|imageslim)

  透视投影照相机的构造函数是：

  ```javascript
  THREE.PerspectiveCamera(fov, aspect, near, far) 
  ```
  ![透视投影照相机的构造参数](https://olpkwt43d.qnssl.com/fe_learning_load/%E9%80%8F%E8%A7%86%E6%8A%95%E5%BD%B1%E7%9A%84%E6%9E%84%E9%80%A0%E5%8F%82%E6%95%B0.png)

  透视图中，灰色的部分是视景体，是可能被渲染的物体所在的区域。fov是视景体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。
  aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。
  near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。


  首先定义一个透视投影的相机：

  ```javascript
  var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
  camera.position.set(0, 0, 5);
  scene.add(camera); // 相机需要被添加到场景
  ```

### 物体 thing
  定义一个长方体加入到场景中：

  ```javascript
  var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshBasicMaterial({color: 0xff0000}));
  scene.add(cube);
  ```

  在创建物体的时候需要传入两个参数，一个是几何形状，另一个是材质。几何形状（Geometry）最主要的功能是储存了一个物体的顶点信息。WebGL需要程序员指定每个顶点的位置，而在Three.js中，可以通过指定一些特征来创建几何形状，例如使用半径创建一个球体，从而省去程序员一个个指定顶点的工作量。

### 基本的几何形状
#### 1. 立方体

其实是长方体，构造函数是：

  ```javascript
  THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) 
  ```
  这里，width是x方向上的长度；height是y方向上的长度；depth是z方向上的长度；后三个参数分别是在三个方向上的分段数，如widthSegments为3的话，代表x方向上水平分为三份。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的缺省值为1。

  ![长方体分段](https://olpkwt43d.qnssl.com/fe_learning_load/%E9%95%BF%E6%96%B9%E4%BD%93%E5%88%86%E6%AE%B5.png?imageView2/1/h/300/q/75|imageslim)

  注意这个分段是对六个面进行分段，而不是对立方体的体素分段，因此在立方体的中间是不分段的，只有六个侧面被分段。

#### 2. 平面
这里的平面（PlaneGeometry）其实是一个长方形，而不是数学意义上无限大小的平面。其构造函数为：

```javascript
THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
```

其中，width是x方向上的长度；height是y方向上的长度；后两个参数同样表示分段。

#### 3. 球体
球体（SphereGeometry）的构造函数是：

```javascript
THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength) 
```
其中，radius是半径；segmentsWidth表示经度上的切片数；segmentsHeight表示纬度上的切片数；phiStart表示经度开始的弧度；phiLength表示经度跨过的弧度；thetaStart表示纬度开始的弧度；thetaLength表示纬度跨过的弧度。

![球体分段](https://olpkwt43d.qnssl.com/fe_learning_load/%E7%90%83%E4%BD%93%E5%88%86%E6%AE%B5.png)

#### 4. 圆柱体

圆柱体（CylinderGeometry）的构造函数是：

```javascript
THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
```
其中，radiusTop与radiusBottom分别是顶面和底面的半径，由此可知，当这两个参数设置为不同的值时，实际上创建的是一个圆台；height是圆柱体的高度；radiusSegments与heightSegments可类比球体中的分段；openEnded是一个布尔值，表示是否没有顶面和底面，缺省值为false，表示有顶面和底面。

#### 5. 正四面体（TetrahedronGeometry）、正八面体（OctahedronGeometry）、正十二面体（IcosahedronGeometry）
他们的构造函数较为类似，分别是：

```javascript
THREE.TetrahedronGeometry(radius, detail)
THREE.OctahedronGeometry(radius, detail)
THREE.IcosahedronGeometry(radius, detail) 
```

其中，radius是半径；detail是细节层次（Level of Detail）的层数，对于大面片数模型，可以控制在视角靠近物体时，显示面片数多的精细模型，而在离物体较远时，显示面片数较少的粗略模型。

#### 6. 圆环面
圆环面（TorusGeometry）就是甜甜圈的形状，其构造函数是：

```javascript
THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc) 
```

![圆柱体](https://olpkwt43d.qnssl.com/fe_learning_load/%E5%9C%86%E6%9F%B1%E4%BD%93.png)

#### 7.圆环结
如果说圆环面是甜甜圈，那么圆环结（TorusKnotGeometry）就是打了结的甜甜圈，其构造参数为：

```
THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
```

![圆环结](https://olpkwt43d.qnssl.com/fe_learning_load/%E5%9C%86%E7%8E%AF%E7%BB%93.png)

#### 文字形状
文字形状（TextGeometry）可以用来创建三维的文字形状。使用文字形状需要下载和引用额外的字体库，可以在[`http://typeface.neocracy.org/`](http://typeface.neocracy.org/)下载。这里，我们以 helvetiker字体为例。首先在[`http://typeface.neocracy.org/fonts.html`](http://typeface.neocracy.org/fonts.html)下载对应的压缩包，解压后将`helvetiker_regular.typeface.js`文件放在你的目录下，然后在HTML文件中引用该文件。

它的构造函数：

```javascript
THREE.TextGeometry(text, parameters)
```

使用参数说明：
其中，text是文字字符串，parameters是以下参数组成的对象：
`size`：字号大小，一般为大写字母的高度<br>
`height`：文字的厚度<br>
`curveSegments`：弧线分段数，使得文字的曲线更加光滑<br>
`font`：字体，默认是'helvetiker'，需对应引用的字体文件<br>
`weight`：值为'normal'或'bold'，表示是否加粗<br>
`style`：值为'normal'或'italics'，表示是否斜体<br>
`bevelEnabled`：布尔值，是否使用倒角，意为在边缘处斜切<br>
`bevelThickness`：倒角厚度<br>
`bevelSize`：倒角宽度<br>

![3D字体](https://olpkwt43d.qnssl.com/fe_learning_load/3D%E6%96%87%E5%AD%97.png)

#### 8.自定义形状
对于Three.js没有提供的形状，可以提供自定义形状来创建。由于自定义形状需要手动指定每个顶点位置，以及顶点连接情况，如果该形状非常复杂，程序员的计算量就会比较大。在这种情况下，建议在3ds Max之类的建模软件中创建模型，然后使用Three.js导入到场景中，这样会更高效方便。

自定义形状使用的是Geometry类，它是其他如CubeGeometry、SphereGeometry等几何形状的父类，其构造函数是：

```javascript
THREE.Geometry() 
```

我们以创建一个梯台为例，首先，初始化一个几何形状，然后设置顶点位置以及顶点连接情况。

```javascript
// 初始化几何形状
var geometry = new THREE.Geometry();

// 设置顶点位置
// 顶部4顶点
geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, 1));
geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
// 底部4顶点
geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, 2));
geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

// 设置顶点连接情况
// 顶面
geometry.faces.push(new THREE.Face4(0, 1, 2, 3));
// 底面
geometry.faces.push(new THREE.Face4(4, 5, 6, 7));
// 四个侧面
geometry.faces.push(new THREE.Face4(0, 1, 5, 4));
geometry.faces.push(new THREE.Face4(1, 2, 6, 5));
geometry.faces.push(new THREE.Face4(2, 3, 7, 6));
geometry.faces.push(new THREE.Face4(3, 0, 4, 7)); 
```
效果如下：

![自定义形状](https://olpkwt43d.qnssl.com/fe_learning_load/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BD%A2%E7%8A%B6.png)

### 材质
材质（Material）是独立于物体顶点信息之外的与渲染效果相关的属性。通过设置材质可以改变物体的颜色、纹理贴图、光照模式等。如果没有指定材质的颜色，则颜色是随机的。

#### 基本材质
其构造函数是：

```javascript
THREE.MeshBasicMaterial(opt) 
```

几个较为常用的属性：<br>
`visible`：是否可见，默认为true<br>
`side`：渲染面片正面或是反面，默认为正面<br>`THREE.FrontSide`，可设置为反面<br>`THREE.BackSide`，或双面`THREE.DoubleSide`
`wireframe`：是否渲染线而非面，默认为false<br>
`color`：十六进制RGB颜色，如红色表示为0xff0000<br>
`map`：使用纹理贴图<br>

对于基本材质，即使改变场景中的光源，使用该材质的物体也始终为颜色处处相同的效果。当然，这不是很具有真实感

#### Lambert材质
Lambert材质（MeshLambertMaterial）是符合Lambert光照模型的材质。Lambert光照模型的主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属、镜子等需要镜面反射效果的物体就不适应，对于其他大部分物体的漫反射效果都是适用的。

其光照模型公式为：

```
Idiffuse = Kd * Id * cos(theta) 
```
其中，Idiffuse是漫反射光强，Kd是物体表面的漫反射属性，Id是光强，theta是光的入射角弧度。
当然，对于使用Three.js的Lambert材质，不需要了解以上公式就可以直接使用。其构造函数是：

```
new THREE.MeshLambertMaterial({
    color: 0xffff00
}) 
```
`color`是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性。除此之外，还可以用ambient和emissive控制材质的颜色。<br>
`ambient`表示对环境光的反射能力，只有当设置了AmbientLight后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。<br>
`emissive`是材质的自发光颜色，可以用来表现光源的颜色。

在使用了光照之后，得到这样的效果：

```javascript
//添加光照
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 15, 5);
scene.add(light);
```

![lambert材质](https://olpkwt43d.qnssl.com/fe_learning_load/lambert%E6%9D%90%E8%B4%A8.png)

#### Phong材质
Phong材质（MeshPhongMaterial）是符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合。
漫反射部分和Lambert光照模型是相同的，镜面反射部分的模型为：

```
 Ispecular = Ks * Is * (cos(alpha)) ^ n 
```
其中，Ispecular是镜面反射的光强，Ks是材质表面镜面反射系数，Is是光源强度，alpha是反射光与视线的夹角，n是高光指数，越大则高光光斑越小。<br>
由于漫反射部分与Lambert模型是一致的（同样可以设置color、ambient、emissive），因此，如果不指定镜面反射系数，而只设定漫反射，其效果与Lambert是相同的。Phong材质可以通过设置specular值指定镜面反射系数（设定高光的颜色），通过shininess属性控制光照模型中的n值，当shininess值越大时，高光的光斑越小，默认值为30。

我们将球体的高光设置为红色，高光的光斑大小设置为1000，并使用黄色的镜面光，红色的散发光：
```javascript
new THREE.MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    specular: 0xff0000,
    shininess: 1000
}); 
```
![Phong材质](https://olpkwt43d.qnssl.com/fe_learning_load/phong%E6%9D%90%E8%B4%A8.png)

#### 法向材质
法向材质可以将材质的颜色设置为其法向量的方向，有时候对于调试很有帮助。法向材质的设定很简单，甚至不用设置任何参数：

```
new THREE.MeshNormalMaterial() 
```
材质的颜色与照相机与该物体的角度相关，需要改变照相机位置，观察两个角度的颜色变化：

![法向材质观察视角01](https://olpkwt43d.qnssl.com/fe_learning_load/%E6%B3%95%E5%90%91%E6%9D%90%E8%B4%A8.png)
![法向材质观察视角02](https://olpkwt43d.qnssl.com/fe_learning_load/%E6%B3%95%E5%90%91%E6%9D%90%E8%B4%A802.png)

我们观察的是同样的三个面，但是由于观察的角度不同，物体的颜色就不同了。因此，在调试时，要知道物体的法向量，使用法向材质就很有效。

#### 材质的纹理贴图
在此之前，我们使用的材质都是单一颜色的，有时候，我们却希望使用图像作为材质。这时候，就需要导入图像作为纹理贴图，并添加到相应的材质中。下面，我们介绍具体的做法。
首先，我们选择一张长宽均为128像素的图像，将其导入纹理中：

```javascript
var texture = THREE.ImageUtils.loadTexture('../img/0.png'); 
```

然后，将材质的map属性设置为texture：

```javascript
var material = new THREE.MeshLambertMaterial({
    map: texture
}); 
```
这样就完成了将图片应用于材质的基本步骤。但是由于现在我们还没使用动画，画面只被渲染了一次，而在导入纹理之前，已经完成了这次渲染，因此看到的只是一片黑。所以，如果没有重绘函数（将在下一章介绍），就需要在完成导入纹理的步骤后，重新绘制画面，这是在回调函数中实现的：

```javascript
var texture = THREE.ImageUtils.loadTexture('../img/0.png', {}, function() {
    renderer.render(scene, camera);
});
var material = new THREE.MeshLambertMaterial({
    map: texture
}); 
```

效果图：

![文理贴图](https://olpkwt43d.qnssl.com/fe_learning_load/%E7%BA%B9%E7%90%86%E8%B4%B4%E5%9B%BE.png)

如果希望正方体6个面都不一样，先准备了六张颜色各异的图像，分别写了数字0到5。然后，分别导入图像到六个纹理，并设置到六个材质中：

```javascript
var materials = [];
for (var i = 0; i < 6; ++i) {
  materials.push(new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../img/' + i + '.png',
      {}, function() {
          renderer.render(scene, camera);
      }),
    overdraw: true
  }));
}

var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5),
  new THREE.MeshFaceMaterial(materials));
scene.add(cube); 
```

效果图：
![骰子](https://olpkwt43d.qnssl.com/fe_learning_load/%E9%AA%B0%E5%AD%90.png)


### 文档
  [Three.js 中文文档](http://techbrood.com/threejs/docs/)
