//method02
//封装成模块
var mouse_direction = (function () {
    function Direction(selector) {
        //判断是不是object，如果是就是使用的jq
        if (typeof selector == 'string') {
            this.selector = selector;
        }else{
            console.log('Direction构造失败，selector不是字符串.....');
        }
    }

    Direction.prototype.init = function (enterObj, leaveObj) {
        //鼠标滑入元素
        var self = this;
        //操作对象
        var operationObj = document.querySelector(self.selector);
        var subObj = document.querySelector(self.selector+' .inner');
        operationObj.addEventListener('mouseenter', function (e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方进入， 返回1:右方进入，返回2：下方进入，返回3：左方进入
            switch(directionNumber){
                case 0:
                    subObj.className = "inner topToBottom";
                    break;
                case 1:
                    subObj.className = "inner rightToLeft";
                    break;
                case 2:
                    subObj.className = "inner bottomToTop";
                    break;
                case 3:
                    subObj.className = "inner lefToRight";
                    break;
            }
        }, false);
        operationObj.addEventListener('mouseleave', function (e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方离开， 返回1:右方离开，返回2：下方离开，返回3：左方离开
            switch(directionNumber){
                case 0:
                    subObj.className = "inner bottomToTop";
                    break;
                case 1:
                    subObj.className = "inner lefToRight";
                    break;
                case 2:
                    subObj.className = "inner topToBottom";
                    break;
                case 3:
                    subObj.className = "inner rightToLeft";
                    break;
            }
            setTimeout(function(){subObj.className = "inner"}, 1000);
        }, false);
    };

    //主函数，返回字数来判断从那个方向进入
    Direction.prototype.main = function (e) {
        var operationObj = document.querySelector(this.selector);
        var w = operationObj.scrollWidth; //the true width of element content, ignore border and padding
        var h = operationObj.scrollHeight;
        /*计算x和y得到一个角到elem的中心，得到相对于x和y值到div的中心*/
        var x = (e.offsetX - (w / 2)) * (w > h ? (h / w) : 1);//offsetX: distance from left-top(0, 0) to  the place of mouse click
        var y = (e.offsetY - (h / 2)) * (h > w ? (w / h) : 1);
        /** 鼠标从哪里来 / 角度 和 方向出去顺时针（得出的结果是TRBL 0 1 2 3
         * 首先计算点的角度，
         * 再加上180度摆脱负值
         * 除于90得到的象限（象限，又称象限角，意思就是一个圆之四分之一等份）
         * 加上3，做一个模（求模 求余数）4的象限转移到一个适当的顺时针 得出 TRBL 0 1 2 3（上/右/下/左）
         **/
        //Math.round return a value(remove 4 leave 5), Math.atan2 return the angle from x-axis to point(y,x)
        return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    };

    return {
        run: function (id, enterObj, leaveObj) {
            var directionChild = new Direction(id);
            directionChild.init(enterObj, leaveObj);
        }
    }
}());

window.onload = function () {
    var enterObj = {
        top: function () {
            console.log('top');
        },
        right: function () {
            console.log('right');
        },
        bottom: function () {
            console.log('bottom');
        },
        left: function () {
            console.log('left');
        }
    };

    var leaveObj = {
        top: function () {
            console.log('top');
        },
        right: function () {
            console.log('right');
        },
        bottom: function () {
            console.log('bottom');
        },
        left: function () {
            console.log('left');
        }
    };

    //遍历所有的li
    document.querySelectorAll('li').forEach(function(item, index){
        mouse_direction.run('.content ul li[data-index="'+ item.dataset.index +'"]', enterObj, leaveObj);
    });
};