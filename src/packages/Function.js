/*
 * @Author: 格子熊
 * @Date: 2018-12-18 20:29:09
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-20 08:52:04
 */

const {
  isFunction,
  isInt
} = require('../packages/Util');
const { throwTypeErr } = require('../utils');
 
/**
 * 函数节流
 * @param {Function} fn 需要包装的函数
 * @param {Number} interval 时间间隔
 */
function throttle(fn, interval) {
  if (!isFunction(fn) || !isInt(interval)) throwTypeErr('throttle 参数不合法！');
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
  if (!isFunction(fn) || !isInt(delay)) throwTypeErr('debounce 参数不合法！');
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

/**
 * 函数柯里化
 * @param {Function} fn 要柯里化的函数
 * @param {Number} length 要柯里化的函数的参数个数
 */
function curry(fn, length) {
  if (!isFunction(fn)) throwTypeErr('curry 参数不合法！');
  let len = length || fn.length;

  function curried() {
    if (arguments.length < len) return _curry(curried, ...arguments);
    else return fn.call(this, ...arguments);
  }

  return curried;
}

// 柯里化函数的辅助函数
function _curry(fn, ...args) {
  return function() {
    return fn.apply(this, [...args, ...arguments]);
  };
}

module.exports = {
  throttle,
  debounce,
  curry
};
