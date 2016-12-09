/**
 * Created by Andyliwr on 2016/3/3.
 */
var down;
var checkbox;
function showDownList() {
    down = document.getElementById("down");
    //判断down的display属性是否可见，如果可见在用户点击之后把它设置为不可见，如果不可见在用户点击它之后把它设置成可见
    if (down.style.display == 'none') {
        down.style.display = 'inline';
    } else {
        down.style.display = 'none';
    }
    //alert("你点击了科研。");
}

function showTip() {
    checkbox = document.getElementById("checkbox");

}