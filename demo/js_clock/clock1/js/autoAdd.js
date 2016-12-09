/**
 * Created by Andyliwr on 2016/2/23.
 */
var canvas;
var stage;
var txt;//在stage上绘制文本变量
var shape;
var count = 0;//计数变量用来表示不断增加的数

window.onload = function () {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    txt = new createjs.Text("number->", "36px Arial", "#FFF");
    txt.x = 100;
    txt.y = 80;
    txt.rotation = 20;//The rotation in degrees for this display object.
    stage.addChild(txt);

    //画一个text的背景,初始位置和text一样。
    shape = new createjs.Shape();
    shape.x = txt.x;
    shape.y = txt.y;
    shape.rotation = txt.rotation;
    stage.addChildAt(shape, 0);

    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addEventListener("tick", stage);
    createjs.Ticker.setFPS(20);//设置动作的fps值
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    count++;

    // update the text:
    txt.text = "number->" + count + "!";

    //在text变化之后调整shape的宽度
    shape.graphics.clear().beginFill("#F00").drawRect(-10, -10, txt.getMeasuredWidth() + 20, 30 + 20);

    stage.update(event);//记得随时更新舞台
}