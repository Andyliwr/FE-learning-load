/**
 * Created by Andyliwr on 2017/2/20.
 */
//method01
//封装成模块
var mouse_direction = (function() {
    var jqDirection;
    function Direction(id){
        this.id = document.getElementById(id) || id;
    }
    Direction.prototype.init = function(enterObj, leaveObj){
        //鼠标滑入元素
        var self = this;
        this.id.addEventListener('mouseenter', function (e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方进入， 返回1:右方进入，返回2：下方进入，返回3：左方进入
            var funArray = [enterObj.top, enterObj.right, enterObj.bottom, enterObj.left];
            funArray[directionNumber](self.id);
        },false);
        this.id.addEventListener('mouseleave', function (e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方离开， 返回1:右方离开，返回2：下方离开，返回3：左方离开
            var funArray = [leaveObj.top, leaveObj.right, leaveObj.bottom, leaveObj.left];
            funArray[directionNumber](self.id);
        },false);
    };
    //主函数，返回字数来判断从那个方向进入
    Direction.prototype.main = function(e){
        /*以浏览器可视区域的左上角建立坐标系*/
        //表示左上角和右下角及中心点坐标
        var x1, y1, x4, y4, x0, y0;
        //表示左上角和右下角的对角线斜率
        var k;

        var w = this.id.scrollWidth; //the true width of element content, ignore border and padding
        var h = this.id.scrollHeight;
        var x = (e.offsetX-(w/2))*(w>h? (h/w): 1);//offsetX: distance from left-top(0, 0) to  the place of mouse click
        var y = (e.offsetY-(h/2))*(h>w? (w/h): 1);
        //Math.round return a value(remove 4 leave 5), Math.atan2 return the angle from x-axis to point(y,x)
        return Math.round((((Math.atan2(y, x)*(180/Math.PI))+180)/90)+3)%4;
    };
    /*基于jquery的事件对象*/
    Direction.prototype.jqRun = function(e){
        var directionNumber = this.jqMain(e);
        var obj = {};
        switch(directionNumber){
            case 0://from top
                obj.left = 0;
                obj.top = "-100%";
                break;
            case 1://from right
                obj.left = "100%";
                obj.top = 0;
                break;
            case 2://from bottom
                obj.left = 0;
                obj.top = "100%";
                break;
            case 3://from left
                obj.left = "-100%";
                obj.top = 0;
                break;
        }
        return obj;
    };
    /*基于jquery的事件对象*/
    Direction.prototype.jqMain = function (e) {
        var w = this.id.width();
        var h = this.id.height();
        /*计算x和y得到一个角到elem的中心，得到相对于x和y值到div的中心*/
        var x = (e.pageX - this.id.offsetX().left - (w/2))*(w>h? (h/w): 1);
        var y = (e.pageY - this.id.offset().top - (h/2))*(h>w? (w/h): 1);
        /** 鼠标从哪里来 / 角度 和 方向出去顺时针（得出的结果是TRBL 0 1 2 3
         * 首先计算点的角度，
         * 再加上180度摆脱负值
         * 除于90得到的象限（象限，又称象限角，意思就是一个圆之四分之一等份）
         * 加上3，做一个模（求模 求余数）4的象限转移到一个适当的顺时针 得出 TRBL 0 1 2 3（上/右/下/左）
         **/
        return Math.round((((Math.atan2(y, x)*(180/Math.PI))+180)/90)+3)%4;
    };
    return {
        run: function(id, enterObj, leaveObj){
            var directionChild = new Direction(id);
            directionChild.init(enterObj, leaveObj);
        },
        jqRun: function(id, e){//暴露的这个接口是基于jquery的
            if(!jqDirection){
                jqDirection = new Direction(id);
            }
            return jqDirection.jqRun(e);//返回一个样式对象{left：string，top：string}
        }
    }
});