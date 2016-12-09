/**
 * Created by andyliwr on 16-3-15.
 */
/**
 * @param obj 对象名称
 * @param name 对象属性
 * 获取某个非行间样式的值，兼容IE和firefox
 * */
function getStyle(obj, name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj, null)[name];
    }
}