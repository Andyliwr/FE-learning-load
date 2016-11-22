/**
 * Created by andyliwr(andyliwr@qq.com) on 2016/11/22.
 * 引用的别人的github项目，地址：https://github.com/heavenswen/jqz-searcher.git
 */
(function ($) {
    $.jqz_searcher = function (arr) {
        var init = {
            obj: '', //搜索栏
            cell: '', //数据目标
            dataType: '', //其他数据
            valueObj: '',
            fun: '',
        };
        if (arr) init = $.extend(init, arr);
        var me = this,
            $obj = $(init.obj),
            $cell = $(init.cell),
            $parent = $cell.parent(), //获得父级
            nickname = (init.dataType) ? init.dataType : ''; //别名
        datas = []; //预存搜索结果
        //1,备份数据
        $('body').append("<div style='display:none;' id='searcherdb'></div>");
        for (var i = 0; i < $(init.cell).size(); i++) {
            var htm = $(init.cell)[i].cloneNode(true);
            $('#searcherdb')[0].appendChild(htm);
            datas.push({
                index: i,
                order: i,
            })
        }
        $cell = $('#searcherdb').children();
        var datas_init = datas;//保存原结构
        //2,获得搜索的内容
        $('body').on('input propertychange', init.obj, function () {
            str = $.trim($(this).val());
            if (str) {
                me.cell_query(str);
            } else {
                me.data_init();
            }
        })
        //3获得匹配项
        me.cell_query = function (str) {
            var reg = str.toLowerCase(); //转换成小写；
            datas = [];
            for (var i = 0; i < $cell.size(); i++) {
                var $o = (init.valueObj) ? $cell.eq(i).find(init.valueObj) : $cell.eq(i),
                    text = $o.text().toLowerCase(),
                    nick = (nickname) ? $o.attr(nickname).toLowerCase() : '';
                var t_order = (text.match(reg)) ? text.indexOf(reg) + 1 : '',
                    n_order = (nick.match(reg)) ? nick.indexOf(reg) + 1 : '';
                if (t_order || n_order) {
                    var order = t_order ? t_order : n_order;
                    if (t_order && n_order) {
                        order = Math.min(t_order, n_order);
                    }
                    //导入数组
                    datas.push({
                        index: i,
                        order: order
                    })
                }
            }
            me.datas_order();
        }

        //4,数据排序
        me.datas_order = function () {
            datas.sort(function (a, b) {
                return a.order - b.order;
            })
            me.app_html();
        }
        //5,获得dom
        me.app_html = function () {
            var listobj = [];
            for (key in datas) {
                var htm = $cell[datas[key].index].cloneNode(true);
                listobj.push(htm);
            }
            $(init.cell).remove();//del 原dom
            if (init.fun) init.fun(listobj.length);
            return data_show(listobj);
        }
        //6, 重新堆叠
        var data_show = function (data_html) {

            for (var i = 0; i < data_html.length; i++) {

                $parent[0].appendChild(data_html[i]);
            }
        }
        //反序
        me.data_reverse = function () {
            datas.reverse();
            me.app_html();
        }
        //还原排序
        me.data_init = function () {
            $(init.cell).remove();
            datas = datas_init;
            me.app_html();
        }
    }
})(window.jQuery || window.Zepto);