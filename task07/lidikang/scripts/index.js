/* created by lidikang(andyliwr@qq.com) on 2016/11/13 */
// when page is loaded
window.onload = function () {
    //add click events to (nav > ul > li)
    document.getElementById("nav-list").addEventListener("click", function (e) {
        var evt = e || window.event;
        var target = evt.target;
        if (target && target.nodeName == "LI") {
            //remove li.active
            var liActive = document.querySelector('#nav-list > li.active');
            liActive.className = "";
            target.className = "active";
        }
    }, false);

    lazyload.loadImg(document.querySelectorAll('.display-activity img'), true); //页面加载后，可视区域的图片显示为实际图片

    //给三小圆点增加个技能，这个不好写注释，你不懂我讲给你听吧>_<
    document.querySelectorAll('.banner .col-md-4 .align1 .spanBtnP .spanBtn').forEach(function(item, index){
        item.onclick = function(){
            var tabArray = document.querySelectorAll('.banner .col-md-4 .align1 .tab');
            for(var i=0; i<tabArray.length; i++){
                if(this.dataset.index == (i+1)){
                    document.querySelector(".banner .col-md-4 .align1 .tab[data-index='"+ (i+1) +"']").style.display = "block";
                    document.querySelector(".banner .col-md-4 .align1 .spanBtnP .spanBtn[data-index='"+ (i+1) +"']").style.backgroundColor = "#666";
                }else{
                    document.querySelector(".banner .col-md-4 .align1 .tab[data-index='"+ (i+1) +"']").style.display = "none";
                    document.querySelector(".banner .col-md-4 .align1 .spanBtnP .spanBtn[data-index='"+ (i+1) +"']").style.backgroundColor = "#fff";
                }
            }
        }
    });
};
window.onscroll = function () {
    lazyload.loadImg(document.querySelectorAll('.display-activity img'), true); //滚动时根据需要加载图片，加载图片的动画效果为淡入，设置第二个参数为true
};
// img lazy load
//封装成对象
var lazyload = {
    getOffsetTop: function (element) {
        var offTop = 0;
        while (element != null) {
            offTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offTop;
    },
    isLoad: function (element) {
        //可视窗口的高度
        var cHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,
            //浏览器可视窗口距离页面顶部的距离
            sX = window.pageXOffset || document.body.scrollTop || document.documentElement.scrollTop,
            //表示图片在什么时候进行加载，默认为 0 表示当图片进入可视区域立即加载；设为正数表示图片距离 threshold像素进入可视区域进行加载；设为负数表示图片进入可视区域threshold像素时进行加载。
            threshold = 10,
            //元素到页面顶部的距离
            oTop = this.getOffsetTop(element),
            //元素到浏览器窗口顶部的距离
            viewHeight = oTop - sX - threshold;
        return cHeight >= viewHeight;

    },
    //加载图片，isFadein为true时，使用图片淡入动画效果加载
    loadImg: function (elements, isFadein) {
        for (var i = 0, len = elements.length; i < len; i++) {
            if (this.isLoad(elements[i])) {
                //已经加载过的图片，下次判断那些图片该加载时，直接跳过
                if (elements[i].className !== "loaded") {
                    //针对使用data-自定义的属性，要使用getAttribute()获取值
                    elements[i].src = elements[i].getAttribute('data-url');
                    //实际的url替换原来的url
                    elements[i].className = "loaded";
                    if (isFadein) {
                        //淡入效果显示图片，有点闪烁
                        this.fadeIn(elements[i]);
                    }
                }
            } else {
                //下一个图片没有进入加载区域，就不在循环
                return;
            }
        }
    },
    //淡入效果
    fadeIn: function (element) {
        var n = 0,
            isnotIE = window.XMLHttpRequest ? true : false;
        if (isnotIE) {
            element.style.opacity = 0;
        } else {
            element.style.filter = "alpha(opacity=0)";
        }
        var t = setInterval(function () {
            if (n < 100) {
                n += 5;
                if (isnotIE) {
                    element.style.opacity = n / 100;
                } else {
                    element.style.filter = "alpha(opacity=" + n + ")";
                }
            } else {
                clearInterval(t);
            }
        }, 50)
    }
};