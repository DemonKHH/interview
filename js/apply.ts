// 改变 this 指向
function _apply(fn, args) {
    const context = fn ? Object.create(fn) : window
    let symbol = Symbol('_apply')
    context[symbol] = fn
    let res = context[symbol](...args)
    delete context[symbol]
    return res
}
