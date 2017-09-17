function PubSub(){
    this.handlers = {}
}

PubSub.prototype = {
    // 订阅事件
    on: function(eventType,handler){
        var self = this
        if(!(eventType in self.handlers)) {
             self.handlers[eventType] = []
        }
        self.handlers[eventType].push(handler)
        return this
       },
    // 触发事件(发布事件)
    emit: function(eventType){
        var  self = this
        var handlersArgs = Array.prototype.slice.call(arguments)
        for(var i=0; i<handlersArgs.length; i++){
            self.handlers[eventType][i].apply(self, handlersArgs)
        }
        return self
    }
}

// 调用方式如下
// var pubsub = new PubSub()
// pubsub.on('A', function(data){
//     console.log(1+data)
// })


// console.log('即将在1s钟之后触发事件A')
// setTimeout(function(){
//     pubsub.emit('A')
//     console.log('即将在2s钟之后再次触发事件A')
//     setTimeout(function(){
//         pubsub.emit('A')
//     }, 2000)
// }, 1000)

// vue source analysis

function Observer(data) {
    this.data = data
    this.walk(data)
}

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
Observer.prototype.walk = function (obj) {
    let val
    for (let key in obj) {
        // 这里为什么要用hasOwnProperty进行过滤呢？
        // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
        // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === 'object') {
                new Observer(val)
            }
            this.convert(key, val)
        }
    }
}

Observer.prototype.convert = function (key, val) {
    // 修改data的原来属性，加上getter和setting
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key)
            return val
        },
        set: function (newVal) {
            console.log('您设置了' + key + ', 新的' + key + '=' + newVal)
            if (newVal === val) return
            val = newVal
        }
    })
}

let data = {
    user: {
        name: "lidikang",
        age: "22"
    },
    address: {
        city: "Hangzhou"
    }
}

let app = new Observer(data)
