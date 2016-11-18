Sass使用说明:
+ 使用原因
为啥不直接用css写，要借助sass([十分钟入门sass教程](http://www.w3cplus.com/sassguide))，sass作为css预处理器，可以使得css像编程一样，支持算数运算，定义常量。用来写自己的栅格系统，然后使用sass打包成css，这样会比直接写css来得简单。当然你如果sass觉得太难，就直接看我的bootstrap_ldk2.css，那是我用纯css写的。

+ 如何使用
为了使用sass我们需要借助现在很流行的node包管理工具-npm，以下是它使用的步骤
1. 下载安装node --- http://nodejs.cn/
2. 打开cmd，输入`node -v`查看node的版本，输入`npm -v`查看npm包管理器的版本，如果都木有问题那就进入下一步吧
3. 将cmd的目录切换到task08的项目目录初始化npm项目，我说详细点好了，执行：
```
	cd D:\myProject\FE_learning_load\task08\lidikang\styles
	d:

	npm init //name就task08；version默认，直接按enter；description的画随便写点；enter point默认；test comand默认；get repository就写项目的git地址；keyword就天bootstrap，gird；author就写lidikang(andyliwr@qq.com)；license就写MIT；最后enter确认初始化

	npm install gulp --save-dev //安装gulp，一款前端自动化构建工具

	npm install gulp-sass --save-dev //安装gulp-sass，将.scss的处理成.css
```
4. 编写检测.scss文件变化的gulp运行文件gulpfile.js
```
	var gulp = require('gulp');//引入gulp和gulp-sass
	var sass = require('gulp-sass')

	//建立名sass的gulp任务，将scss文件编译成css
	gulp.task("sass", function() {
	    return gulp.src("*.scss")
	        .pipe(sass().on("error", sass.logError))
	        .pipe(gulp.dest(""));
	});

	//建立名watch的gulp任务，检测当前目录下的所有的.scss文件，一旦发生改动立即处理调用sass任务将它处理成css文件
	gulp.task('watch', function () {
	    gulp.watch("*.scss", ["sass"]);
	});
```
5. 在当前目录建一个名为bootstrap_ldk.scss的文件，名字随便取
6. 现在你可以开始编写scss文件了，语法请参照http://www.w3cplus.com/sassguide
7. 看下你的sublime是否支持sass的语法高亮，不行的话ctrl+shift+p搜索install，安装一个教sass扩展包吧
8. 当你编写好之后，gulp会自动帮你生成一个叫bootstrap_ldk.css的文件，在html引入就好