// 节流, 规定时间内执行一次
const throttle = (fn, delay) => {
    let timer;
    return (...args) => {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, delay)
    }
}

// test
function testThrottle(e, content) {
    console.log(e, content);
}
var testThrottleFn = throttle(testThrottle, 1000); // 节流函数
testThrottleFn('test', 'throttle'); // 给节流函数传参