// 改变 this 指向
function _call(fn, ...args) {
    const context = fn ? Object.create(fn) : window
    let symbol = Symbol('_call')
    context[symbol] = fn
    let res = context[symbol](...args)
    delete context[symbol]
    return res
}
