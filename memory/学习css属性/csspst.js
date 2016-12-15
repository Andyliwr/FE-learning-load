/**
 * Created by andyliwr on 16-3-12.
 */
var td1, td2, td3;
var inputArea1, inputArea2, inputArea3, inputArea;
var position = ["absolute", "relative", "static", "fixed"];
var div1pos, div2pos;//存储div1和div2的position属性值

window.onload = function(){
    var display = document.getElementById("display");
    td1 = document.getElementById("td1");
    td2 = document.getElementById("td2");
    td3 = document.getElementById("td3");
    display.writeln(td1.id);
    //获取三个区域的input元素的数组
    inputArea1 = td1.getElementsByTagName("input");
    inputArea2 = td2.getElementsByTagName("input");
    inputArea3 = td3.getElementsByTagName("input");

    inputArea = document.getElementsByTagName("input");

    /**
     * 测试下inputArea
     */

    for (var i = 0; i < inputArea.length; i++) {
        alert(inputArea[i].id +"它处在第"+ WhichArea(inputArea[i])+"inputArea。")
    }

}
//写一个函数，判断该input属于area1，area2还是area3
function WhichArea(Obj){
    for (var i = 0; i < inputArea.length; i++) {
        if(Obj == inputArea[i]){
            if(0<=i<=3){
                return 0;
            }else if(4<=i<=5){
                return 1;
            }else{
                return 2;
            }
        }
        if(i>9){
            alert("WhichArea函数找不到这样一个input！！");
        }
    }
}