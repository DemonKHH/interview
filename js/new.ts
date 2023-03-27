// new 运算符实现
const myNew = (fn: any, ...args: any[]) =>{
	// //连接原型，新对象可以访问原型中的属性
	// obj._proto_ = constructor.prototype;
    let obj = Object.create(fn.prototype)
	// 执行构造函数，即绑定 this，并且为这个新对象添加属性
	let result = fn.apply(obj, args);
	return typeof result === "object" ? result :obj;
}