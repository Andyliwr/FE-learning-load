function DefineEvent(element) {
    this.init(element);
}
DefineEvent.prototype = {
    constructor: DefineEvent,
    init: function (element) {
        this.element = (element && element.nodeType == 1) ? element : document;
        return this;
    },
    /*
     * 添加监听事件     * @param {string} type 监听的事件类型
     * @param {Function} callback 回调函数
     */
    addEvent: function (type, callback) {
        var self = this;
        if (self.element.addEventListener) { // 标准浏览器下
            self.element.addEventListener(type, callback, false);
        } else if (self.element.attachEvent) { // IE
            if (isNaN(self.element[type])) {
                self.element[type] = 0;
            }
            var fun = function (evt) {
                evt = evt ? evt : window.event;
                if (evt.propertyName == type) {
                    callback.call(self.element);
                }
            }
            self.element.attachEvent('onpropertychange', fun);
            // 在元素上存储绑定回调，方便移除事件绑定
            if (!self.element['callback' + callback]) {
                self.element['callback' + callback] = fun;

            }
        } else {
            self.element.attachEvent('on' + type, callback);
        }
        return self;
    },

    /*
     * 移除事件
     * @param {string} type 监听的事件类型
     * @param {Function} callback 回调函数
     */
    removeEvent: function (type, callback) {
        var self = this;
        if (self.element.removeEventListener) {
            self.element.removeEventListener(type, callback, false);
        } else if (self.element.detachEvent) {
            // 移除对应的自定义属性监听
            self.element.detachEvent('onpropertychange', self.element['callback' + callback]);
            // 删除储存在 DOM 上的自定义事件的回调
            self.element['callback' + callback] = null;

        } else {
            self.element.detachEvent('on' + type, callback);
        }
        return self;
    },

    /*

     * 触发事件

     * @param {String} type 触发事件的类型

     * @return {object} 返回的对象

     */

    triggerEvent: function (type) {

        var self = this;

        if (self.element.dispatchEvent) {  // 标准浏览器下

            // 创建事件

            var evt = document.createEvent('Event');

            // 定义事件的类型

            evt.initEvent(type, true, true);

            // 触发事件

            self.element.dispatchEvent(evt);

        } else if (self.element.fireEvent) {  // IE

            self.element[type]++;

        }

        return self;

    }

};

var testBox = document.getElementById('longen');

var defineEvent = new DefineEvent(testBox);

// 回调函数1

function triggerEvent() {
    console.log('触发了一次自定义事件 customConsole');
}
triggerEvent()
// 回调函数2

function triggerAgain() {

    console.log('再一次触发了自定义事件 customConsole');
    // 同时绑定两个回调函数，支持链式调用
    defineEvent.addEvent('aa', triggerEvent).addEvent('aa', triggerAgain);
    defineEvent.triggerEvent('customConsole');
    defineEvent.removeEvent('aa', triggerAgain);
    defineEvent.triggerEvent('aa')
}
triggerAgain()
