/**
 * Created by Andyliwr on 2016/2/25.
 */
var textarea1;//textarea的对象名
var btn1;//button1对象名
var btn2;//button2 Object
var span;//span Object
var num = 0;//the content of span


window.onload = function () {
    textarea1 = document.getElementById("textarea1");
    if (localStorage.text) {
        textarea1.value = localStorage.text;//如果localStorage中存储的文本不为空就把存储的值赋值给textarea1
    }

    btn1 = document.getElementById("btn1");
    btn1.onclick = function () {
        localStorage.text = textarea1.value;//update localStorage when btn1 was clicked
    }

    span = document.getElementById("span");
    if (sessionStorage.num) {
        num = sessionStorage.num;//每次载入窗体（刷新或者重新打卡browser）检查session是否为空，不为空就把他的值赋值给num
    } else {
        num = 0;
    }

    btn2 = document.getElementById("btn2");
    btn2.onclick = function () {
        num++;
        sessionStorage.num = num;//update sessionStorage when btn2 was clicked
        showNum();
    }
}
//function showNum using to set the content of span
function showNum() {
    span.innerHTML = num;
}