// 改变 this 指向, 返回一个函数
function _bind(fn, ...args) {
    const bindFn = (...params) => {
        const context = fn ? Object.create(fn) : window
        return fn.call(context, ...args, ...params)
    }
    return bindFn
}
