var initData = [{
    city: '福州',
    rank: '第1名',
    zhishu: '32'
}, {
    city: '深圳',
    rank: '第2名',
    zhishu: '40'
}, {
    city: '广州',
    rank: '第3名',
    zhishu: '50'
}, {
    city: '上海',
    rank: '第4名',
    zhishu: '70'
}, {
    city: '天津',
    rank: '第5名',
    zhishu: '80'
}, {
    city: '北京',
    rank: '第6名',
    zhishu: '90'
}, {
    city: '成都',
    rank: '第7名',
    zhishu: '90'
}];
//输入空气指数，返回排名
function returnRank(newitem, array){
	if(typeof newitem == 'object' && array instanceof Array){
        array.sort(function(a, b){return a.zhishu-b.zhishu});
		for(var i=0; i<array.length; i++){
			if(array[i].zhishu <= newitem.zhishu){
				continue;
			}else{
				return i+1;
			}
		}
	}else{
		return 0;
	}
}
// 决定要用那种颜色的函数
function whichColor(zhishu) {
    if (zhishu < 0) {
        return '#FFFFFF';
    } else if (0 <= zhishu && zhishu < 20) {
        return '#5CB85C';
    } else if (20 <= zhishu && zhishu < 40) {
        return '#3071A9';
    } else if (40 <= zhishu && zhishu < 60) {
        return '#5BC0DE';
    } else if (60 <= zhishu && zhishu < 80) {
        return '#F0AD4E';
    } else if (80 <= zhishu && zhishu < 100) {
        return '#D9534F';
    } else {
        return '#FFFFFF';
    }
}
/* 封装弹框组件
 * @param title 弹窗的标题
 * @param content 弹窗提示的内容
 */
function showAlert(title, content) {
    $('<div class="alert"><div class="fadeDiv"></div><div class="alertDiv"><div class="title">' + title + '</div><div class="content">' + content + '</div><div class="control"><button>确认</button></div></div></div>').appendTo('body');
    $('.control button').click(function() {
        $('.alert').remove();
    });
}
$(document).ready(function() {
    var tableStr = '';
    for (var i = 0; i < initData.length; i++) {
        var tmp = '<tr><td>' + initData[i].city + '</td><td>' + initData[i].rank + ': ' + initData[i].zhishu + '</td><td><div class="progress"><div class="bg"></div><div class="other" style="width:' + initData[i].zhishu * 2 + 'px; background-color: ' + whichColor(parseInt(initData[i].zhishu)) + '"></div></div></td><td><span class="up-icon"></span><span class="down-icon"></span><span class="delete-icon"></span></td></tr>';
        tableStr += tmp;
    }
    $('.rank tbody').append(tableStr);

    //写icon的点击事件，采用事件委托
    $('.rank tbody').delegate('tr > td:last-child > span', 'click', function(event) {
        var className = $(this).attr('class');
        var parentNode = $(this).parents('tr'); //tbody
        switch (className) {
            case 'up-icon':
                if (parentNode.index() != 0) {
                    // parentNode.fadeOut().fadeIn(); 
                    parentNode.prev().before(parentNode);
                } else {
                    showAlert('错误操作', '您当前点击的元素已经是顶级元素了');
                }
                break;
            case 'down-icon':
                //判断是不是最后一个tr
                var trLenght = $('.rank tbody tr').length;
                if (parentNode.index() != (trLenght - 1)) {
                    // parentNode.fadeOut().fadeIn(); 
                    parentNode.next().after(parentNode);
                } else {
                    showAlert('错误操作', '您当前点击的元素已经是最后一个元素了');
                }
                break;
            case 'delete-icon':
                parentNode.fadeOut().remove();
        }
    });

    // 提交按钮点击事件
    $('#submit').click(function() {
        // 输入值合法性检测
        var chineseExp = /^[\u4e00-\u9fa5]{2,5}$/g,
        	numExp = /^\d{1,2}$/,
        	city_name = $('input[name="city_name"]').val(),
        	city_zhishu = $('input[name="city_zhishu"]').val();
        if (!chineseExp.test(city_name)) {
            showAlert('错误提示', '您输入的城市名不正确，请输入2-5个汉字的城市名');
            return false;
        }
        if (!numExp.test(city_zhishu)) {
            showAlert('错误提示', '您输入的城市空气质量指数不正确，请输入1-100以内的整数');
            return false;
        }
        // 以上都执行完，代表输入合法，接下来执行dom插入
        var insertObj = {city: city_name, rank: 'unknow', zhishu: city_zhishu};
        var rank = returnRank(insertObj, initData);
        insertObj.rank = '第'+rank+'名';
        initData.push(insertObj);
        var insertNodeSelector = "table tbody tr:nth-child("+ (rank-1) +")"
        $('<tr><tr><td>' + city_name + '</td><td>第' + rank + '名: ' + '</td><td><div class="progress"><div class="bg"></div><div class="other" style="width:' + city_zhishu * 2 + 'px; background-color: ' + whichColor(parseInt(city_zhishu)) + '"></div></div></td><td><span class="up-icon"></span><span class="down-icon"></span><span class="delete-icon"></span></td></tr></tr>').insertAfter($(insertNodeSelector));
    });
});