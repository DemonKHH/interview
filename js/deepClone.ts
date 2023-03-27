function _deepClone(obj) {
    if(typeof obj !== 'object' || obj === null) return obj
    if (obj.constructor === Date) return new Date(obj)
    // 如果是null直接返回null
    if (obj === null) return null;
    // obj.constructor：找到的是所属类原型上的constructor，而原型上的constructor指向的是当前类本身
    // =>保证传递进来什么类型的值，我们最后创建的newObj也是对应类型的
    const newObj = new obj.constructor
    for (let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = _deepClone(obj[key])
        }
    }
    return newObj
}