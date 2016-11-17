Sass使用说明:
+ 使用原因
为啥不直接用css写，要借助sass([十分钟入门sass教程](http://www.w3cplus.com/sassguide))？sass作为css预处理器，可以使得css像编程一样，支持算数运算，定义常量。用来写自己的栅格系统，然后使用sass打包成css，这样会比直接写css来得简单。

+ 如何使用
为了使用sass我们需要借助现在很流行的node包管理工具-npm，以下是它使用的步骤
1. 下载安装node --- http://nodejs.cn/
2. 打开cmd，输入`node -v`查看node的版本，输入`npm -v`查看npm包管理器的版本，如果都木有问题那就进入下一步吧
3. 将cmd的目录切换到task08的项目目录初始化npm项目，我说详细点好了，执行：
```
cd D:\myProject\FE_learning_load\task08\lidikang\styles
d:
npm init //name就task08；version默认，直接按enter；description的画随便写点；enter point默认；test comand默认；get repository就写项目的git地址；keyword就天bootstrap，gird；author就写lidikang(andyliwr@qq.com)；license就写MIT；最后enter确认初始化
npm install sass --save-dev //安装node-sass，sass是基于ruby的，我们现在要用的是node版的sass
```
4. 现在你可以开始编写sass文件了，在styles目录下新建一个bootstrap_wyq.sass的文件
5. 看下你的sublime是否支持sass的语法高亮，不行的话ctrl+shift+p搜索install，安装一个教sass扩展包吧
6. 当你编写好之后