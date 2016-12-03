/**
 * Created by Andyliwr on 2016/11/29 0029.
 */
window.onload = function(){
    //左边导航的li的点击动画
    $('.can_click > p').on('click', function(e){
        //如果当前点击元素有show这个类
        if($(this).parent().hasClass('not_show')){
            //掉show的calss，重新加上not_show
            $(this).parent().removeClass('not_show');
            //改变下最左边的箭头
            $(this).children('span:first-child').attr('class', 'gray-right-icon')
        }else{
            $(this).parent().addClass('not_show');
            $(this).children('span:first-child').attr('class', 'white-down-icon')
        }
        //阻止冒泡事件，因为点击文件的时候我们并不希望它收起来
        e.stopPropagation();
    });
    //导航搜索按钮的动态效果
    $('nav > .pull-right .search-icon').on('click', function(){
        $('.search-input').css({'display': 'block'});
        $('.search-input').addClass('width0To500');
    });
    $('.search-input .x-icon').on('click', function(){
        $('.search-input').css({'display': 'none'});
    });
}
