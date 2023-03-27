// 节流, 规定时间内只能执行一次，否则则重新计时
const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

// test
function testThrottle(e, content) {
    console.log(e, content);
}
var testThrottleFn = debounce(testThrottle, 1000); // 节流函数
testThrottleFn('test', 'debounce'); // 给节流函数传参