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
