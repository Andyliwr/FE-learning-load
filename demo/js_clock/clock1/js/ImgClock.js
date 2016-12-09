var canvas=document.getElementById("clock");
//console.dir(canvas);
var ctx=canvas.getContext("2d");//相当于一根画笔
//console.dir(ctx);
//ctx.fillRect(150,150,100,180);//填充矩形W

//ctx.fillStyle="red";
//ctx.fillRect(180,180,100,180);//填充矩形W

//ctx.strokeRect(9,9,100,300);// 小数变浅 没有颜色填充
//ctx.clearRect(200,200,50,50)//使中间挖空
//ctx.clearRect(0,0,400,400)//清空

//关于线条
//ctx.beginPath();
//ctx.moveTo(200,200);
//ctx.lineTo(400,200);
//ctx.lineTo(300,400);
//ctx.stroke();//线条
//ctx.fill();//实体
//ctx.clearRect(0,0,400,400);

// //笑脸
// ctx.beginPath();//画线
// ctx.arc(200,200,100,0,Math.PI*2);//圆心 半径 0度到360度
// ctx.moveTo(270,200);
// ctx.arc(200,200,70,0,Math.PI);
// ctx.moveTo(180,170);
// ctx.arc(170,170,10,0,Math.PI*2);
// ctx.moveTo(250,170);
// ctx.arc(240,170,10,0,Math.PI*2);
// ctx.stroke();

//心形
//bezierCurveTo
//俩百个位置随机的圆圈
/*ctx.shadowOffsetX=2;//在x轴
 ctx.shadowOffsetY=2;//在y轴
 ctx.shadowBlur=2;//扩展
 ctx.shadowColor="rgba(0,0,0,0.6)";//阴影色
 for(var i=0;i<200;i++){
 ctx.beginPath();//画线
 var x=Math.floor(Math.random()*400);
 var y=Math.floor(Math.random()*400);
 var r=Math.floor(Math.random()*52+5);
 ctx.arc(x,y,r,0,Math.PI*2);
 ctx.fillStyle="rgb("+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+")";
 ctx.fill();
 }*/


//画布叠加
//var x=0,y=5,sheed=1;
//  ctx.clearRect(0,0,400,400);//不清楚会是一根线
/*ctx.beginPath();
 x+=sheed;
 if(x>=400){
 sheed=-1;
 }
 if(x<=0){
 sheed=1;
 }
 ctx.arc(x,y,10,0,Math.PI*2)
 ctx.fill();
 }*/
//setInterval(drage,20);
//新的画布 新的画笔
/*huabu=document.querySelector("#canva")
 var ctx1=canvas.getContext("2d");
 for(var i=0;i<10;i++){
 ctx1.fillRect(i*150,0,100,100)
 }*/
// stroke以线条的方式
// fill以色块的方式

//fillRect  strokeRect  clearRect
//beginPath  moveTo  lineTo   arc

/*var img=new Image();
 img.src="16.png";
 img.onload=function  () {
 //console.log(1);
 ctx.drawImage(img,10,10);//图片 坐标
 }
 var x=0;
 var draw=function(){
 ctx.clearRect(0,0,400,400);
 x+=1;
 ctx.drawImage(img,x,10);
 }
 setInterval(draw,20)*/

//2016.2.20
/*ctx.save()   
 ctx.restore()
 ctx.translate(x,y)改变画布的原点
 ctx.rotate()*/

//例子
x=Math.PI/60;
ctx.save();
ctx.beginPath();
ctx.translate(200,200);
ctx.arc(0,0,30,0,Math.PI*2);
for(var i=0;i<12;i++){
	ctx.rotate(Math.PI/6);//顺时针
	ctx.moveTo(70,0);
	ctx.arc(60,0,10,0,Math.PI*2);
}
ctx.stroke();
ctx.restore();//原点恢复

ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(100,500);
ctx.moveTo(100,100);
ctx.lineTo(500,100);
ctx.stroke();

ctx.save();//保存原有的样式和画布状态
ctx.beginPath();
ctx.translate(100,100);
ctx.rotate(Math.PI/3);
ctx.fillRect(0,0,30,30);
ctx.restore();//原点恢复




//时钟
/*var x,i=0;
 setInterval(function(){
 x=Math.PI/30*i;
 i++;
 drawClock();
 },1000) 用另外一种方法 最下*/

var drawClock=function(){
	var a=new Date();
	var h=a.getHours();
	var m=a.getMinutes();
//console.log(m);
	var s=a.getSeconds();
	ctx.clearRect(0,0,600,600);
//一张干净的画布
	ctx.save();
	ctx.translate(200,200);
//原点定位
//外圆
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle="#2af";
	ctx.lineWidth=6;
	ctx.arc(0,0,150,0,Math.PI*2);
	ctx.stroke();
	ctx.restore();

//小线
	ctx.save()
	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.lineCap='round';
	for(var i=1;i<61;i++){
		ctx.rotate(Math.PI/30);
		if(i%5==0){
			ctx.moveTo(0,124);
		}
		else{
			ctx.moveTo(0,134);
		}

		ctx.lineTo(0,144);
	}
	ctx.stroke();
	ctx.restore();


//时针
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth=10;
	ctx.lineCap='round';
	ctx.rotate((360*((h*3600+m*60+s)/(12*3600)))/180*Math.PI);
	console.log((360*((h*3600+m*60+s)/(12*3600)))/180*Math.PI);
//ctx.rotate(Math.PI/30*);
// ctx.rotate(-Math.PI/3);
	ctx.moveTo(0,15);
	ctx.lineTo(0,-100);
	ctx.stroke();
	ctx.restore();

//分针
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth=6;
	ctx.lineCap='round';
	ctx.rotate(360*((m*60+s)/3600)/180*Math.PI);//分针每秒中转的度数；
	console.log((360*((m*60+s)/3600)/180*Math.PI));
//ctx.rotate(Math.PI/30);
//ctx.rotate(-Math.PI/2.1);
	ctx.moveTo(0,20);
	ctx.lineTo(0,-120);
	ctx.stroke();
	ctx.restore();

//秒针
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.lineCap='round';

	ctx.rotate(Math.PI/30*s);
//console.log(sec);
	/*ctx.rotate(x);*/
	ctx.moveTo(0,25);
	ctx.lineTo(0,-120);
	ctx.strokeStyle="red";
	ctx.stroke();
	ctx.restore();

	/*//秒针头顶上的圆圈
	 ctx.save();
	 ctx.beginPath();
	 ctx.strokeStyle="red";
	 ctx.lineWidth=3;
	 ctx.translate(200,200);
	 ctx.arc(0,-125,5,0,Math.PI*2);
	 ctx.stroke();
	 ctx.restore();*/
//秒针尾巴上的圆圈
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle="red";
	ctx.arc(0,0,5,0,Math.PI*2);
	ctx.fill();
	ctx.restore();
//复原一开始保存的干净的画布状态
	ctx.restore();
	requestAnimationFrame(drawClock);
}

//drawClock();
/*var aa=function(){
 console.log(1);
 requestAnimationFrame(aa);
 }*/
//这种动画方式当当前窗口处于未激活状态时，
//动画帧数会明显降低
//requestAnimationFrame(aa);

requestAnimationFrame(drawClock);