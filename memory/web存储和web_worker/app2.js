/**
 * Created by Andyliwr on 2016/2/28.
 */
var work = null;//worker对象
var timer;//时间显示对象

window.onload = function () {
    timer = document.getElementById("time");
    //初始化time
    //timer.innerHTML = "00:00:00";
    //Get the object of 'start' and 'stop', add listener to them
    document.getElementById("start").onclick = function () {
        //if work is existed then do nothing
        if (work) {
            return;
        }
        //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
        work = new Worker("count.js");
        //向worker发送数据
        work.postMessage("This is a TimeRecorder");
        //接收worker传过来的数据函数
        work.onmessage = function (e) {
            //输出worker发送来的数据
            console.log(e.data);
            //alert(e.data.second);
            timer.innerHTML = e.data.second;
        }
    }
    document.getElementById("stop").onclick = function () {
        //if work is existed then terminate it
        if (work) {
            work.terminate();
            work = null;
        }
    }
}