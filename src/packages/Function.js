/*
 * @Author: 格子熊
 * @Date: 2018-12-18 20:29:09
 * @Last Modified by: 格子熊
 * @Last Modified time: 2018-12-18 20:29:09
 */

/**
 * 函数节流
 * @param {Function} fn 需要包装的函数
 * @param {Number} interval 时间间隔
 */
function throttle(fn, interval) {
  let last = 0;

  return function() {
    let now = +new Date();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, arguments);
    }
  };
}

/**
 * 函数去抖
 * @param {Function} fn 需要包装的函数
 * @param {Number} delay 延迟执行时间
 */
function debounce(fn, delay) {
  let timer = null;

  return function() {
    let args = arguments;
    if (timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

module.exports = {
  throttle,
  debounce
};
