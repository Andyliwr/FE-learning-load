/**
 * Created by Andyliwr on 2016/11/29 0029.
 */
var calendar_Host = 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php';
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

    //事件表动态
    var currentIndex = 1000;//用来记录当前处于active状态的idnex的值, 默认1000吧，不想currentIndex为负值，麻烦
    $('#timeTunbo-left').click(function(){
        /**
         *  将当前元素显示，第currentIndex+6个元素将隐藏
         *  举个例子，当currentIndex = 6，这表市当前其实是显示12个时间表的第7的
         *  那么首先将第7个隐藏，然后 |0| 1 2 3 4 5 |6| 7 8 9 10 11，(currentIndex+6)%12 == 0，这表示第一个元素将会呈现
         *  如果是向左，那么就是currentIndex-6，但是因为要%12，所以得使用Math.abs来取绝对值
         *  如果是先向左，在向右，那么当向右的时候currentInex为负值，所以也要用Math.abs
         */
        $(".padding .col-sm-2[data-index='" + Math.abs(currentIndex)%12 + "']").removeClass('display-none');
        //去掉已有active去掉，把将要呈现的元素的子元素设置为active
        $('.padding .col-sm-2 .assginNum-active').removeClass('assginNum-active');
        //因为最后一个元素有一个last的类，定义了右边距，所以这里也要做处理
        $('.padding .col-sm-2 .last').removeClass('last');
        $(".padding .col-sm-2[data-index='" + Math.abs(currentIndex)%12 + "'] > div").addClass('assginNum-active');
        $(".padding .col-sm-2[data-index='" + (Math.abs(currentIndex + 6)%12) + "']").addClass('display-none');
        $(".padding .col-sm-2[data-index='" + (Math.abs(currentIndex - 6)%12) + "']").addClass('last');
        currentIndex--;
    });
    $('#timeTunbo-right').click(function(){
        $(".padding .col-sm-2[data-index='" + Math.abs(currentIndex)%12 + "']").removeClass('display-none');
        //去掉已有active去掉，把将要呈现的元素的子元素设置为active
        $('.padding .col-sm-2 .assginNum-active').removeClass('assginNum-active');
        $('.padding .col-sm-2 .last').removeClass('last');
        $(".padding .col-sm-2[data-index='" + Math.abs(currentIndex)%12 + "'] > div").addClass('assginNum-active');
        $(".padding .col-sm-2[data-index='" + (Math.abs(currentIndex - 6)%12) + "']").addClass('display-none');
        $(".padding .col-sm-2[data-index='" + (Math.abs(currentIndex + 6)%12) + "']").addClass('last');
        currentIndex++;
    });

    //detai-table的动画
    $('.tab-ul').delegate('li', 'click', function(){
        $('.tab-content.active').removeClass('active');
        $(".tab-content[data-index="+ this.dataset.index +"]").addClass('active');
    });

    //加载日历动画
    $("#id_almanac").almanac({
        /**
         * 画日历之后调用函数
         */
        afterDrawCld: function(year, month){
            // console.log('加载-调用回调函数 完成');
        },
        /**
         * 双击某一天的事件
         */
        dbClickDay: function(elem){
            var _this = $(elem);
            // console.log('阳历：' + _this.attr('data-year') + '年' + _this.attr('data-month') + '月' + _this.attr('data-solor'));
        },
        /**
         * 单击某一天的事件
         */
        clickDay: function(elem){
            var _this = $(elem);
            console.log('阳历：' + _this.attr('data-year') + '年' + _this.attr('data-month') + '月' + _this.attr('data-solor'));
        }
    });

    //js动态生成排名
    var rankJson = [
        {'rank': 1, 'pinpai': '大众', 'searchBit': '48912001', 'color': '#e07257', 'present': 83.23},
        {'rank': 2, 'pinpai': '丰田', 'searchBit': '29307333', 'color': '#ef8150', 'present': 71.85},
        {'rank': 3, 'pinpai': '奥迪', 'searchBit': '23139070', 'color': '#f39e4e', 'present': 61.67},
        {'rank': 4, 'pinpai': '本田', 'searchBit': '22885564', 'color': '#7fcaf1', 'present': 56.88},
        {'rank': 5, 'pinpai': '福特', 'searchBit': '22324792', 'color': '#82c8ec', 'present': 50.89},
        {'rank': 6, 'pinpai': '宝马', 'searchBit': '21444077', 'color': '#84c8ed', 'present': 47.70},
        {'rank': 7, 'pinpai': '现代', 'searchBit': '20114969', 'color': '#82c8ec', 'present': 44.91},
        {'rank': 8, 'pinpai': '起亚', 'searchBit': '19251680', 'color': '#7fcaf1', 'present': 37.12},
        {'rank': 9, 'pinpai': '奔驰', 'searchBit': '19272837', 'color': '#8ac7e3', 'present': 35.32},
        {'rank': 10, 'pinpai': '别克', 'searchBit': '18544027', 'color': '#81cbee', 'present': 31.73}
    ];

    var tableHtml = '';
    for(var i=0; i<rankJson.length; i++){
        tableHtml += "<tr><td>"+ rankJson[i].rank +"</td><td>"+ rankJson[i].pinpai +"</td><td>"+ rankJson[i].searchBit + "<div class='progress'><div class='loaded' style='width: "+ rankJson[i].present +"%;background-color: "+ rankJson[i].color +"'></div></div>" +"</td></tr>";
    }
    $('#rankTable > tbody').append(tableHtml);
};