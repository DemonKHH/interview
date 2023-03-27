// 数据代理并通知所有订阅者
function ProxyWatcher(data, queue) {
    return new Proxy(data, {
        get: (target, key, receiver) => {
            return Reflect.get(target, key, receiver);
        },
        set: (target, key, value, receiver) =>{
            // 此处需要注意小细节：先更新值，再触发更新方法
            const res = Reflect.set(target, key, value, receiver);
            queue[key].notify(value)
            return res;
        },
    })
}

function Compile(el, vm) {
    if(el.attributes) {
        [].forEach.call(el.attributes, attribute => {
            if (attribute.name.includes('v-')) {
                Update[attribute.name](el, vm.data, attribute.value, vm);
            }
        });
    }
    if (el.childNodes.length > 0) {
        [].forEach.call(el.childNodes, child => Compile(child, vm));
    }
    // 递归解析所有DOM
    return el
}

const Update = {
    "v-text": (el, data, key, vm) => {
        el.innerText = data[key]
        vm.observer.add(key, value => {
            el.innerText = value
        })
    },
    "v-model": (el, data, key, vm) => {
        // 初始化Input默认值
        el.value = data[key];

        // 创建一个订阅
        vm.observer.add(key, value => {
            el.value = value;
        });

        // 监听控件的输入事件，并更新数据
        el.addEventListener("keyup", e => {
            data[key] = e.target.value;
        });
    }
}


// 订阅
class Observer {
    constructor() {
        this.queue = {}
    }
    // 新增订阅
    add(key, callback) {
        this.queue[key].attach(callback)
    }
}

// 发布
class Subject {
    constructor() {
        this.observers = [];
    }
    // 添加发布回调函数
    attach(callback) {
        this.observers.push(callback)
    }
    // 通知
    notify(value) {
        this.observers.forEach(cb => {
            cb(value)
        })
    }
}

// vue 类
class Vue {
    constructor(params) {
        this.observer = new Observer()
        for(let key in params.data) {
            this.observer.queue[key] = new Subject()
        }
        this.data = ProxyWatcher(params.data, this.observer.queue)
        this.el = Compile(params.el, this)
    }
}

// 数据
const myData = {
    value: "hello world.",
    demo: {
        name: "demoName",
        age: 123
    }
};

// 实例
const vm = new Vue({
    el: document.querySelector("#app"),
    data: myData
});
