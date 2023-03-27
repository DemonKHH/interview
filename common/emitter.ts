class EventEmitter {
    private events
    constructor() {
        this.events = {}
    }

    on(type, listener) {
        if(!this.events[type]){
            this.events[type] = []
        }
        this.events.push(listener)
    }

    off(type, listener) {
        if(this.events[type]) {
            let index = this.events[type].indexOf(listener)
            this.events[type].splice(index, 1)
        }
    }

    emit(type, ...args) {
        const fns = this.events[type] || []
        fns.forEach(fn => {
            fn.call(this, ...args)
        });
    }

    // 监听一次事件
    once(type, listener) {
        // 需要监听事件是否执行，因此需要手动创建监听函数，在监听函数中执行传入的监听事件
        function oneTime(...args) {
            listener.call(this, ...args)
            this.off(type, oneTime)
        }
        this.on(type, oneTime)
    }
}

let testEvent = new EventEmitter();
testEvent.on('say',function(str) {
  console.log(str);
});
testEvent.once('say', function(str) {
  console.log('这是once:' + str)
})
testEvent.emit('say','demon');
testEvent.emit('say','king');
testEvent.emit('say','haha');