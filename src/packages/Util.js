/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 17:13:16 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-11 19:58:22
 */

const { toString } = require('../utils');


/**
 * 混淆函数，实现浅拷贝
 * @param {Object} des 拷贝的目标对象
 * @param {Object} source 拷贝的源对象
 */
function mixin (des, source) {
  if (arguments.length === 0) throw new TypeError('mixin 函数的参数个数不得小于 1！');
  if (des && source) _mixin(des, source);
}

function _mixin (dest, source) {
  for (let key in source) {
    dest[key] = source[key];
  }
  return dest;
}

function isFunction (param) {
  return toString.call(param) === '[object Function]';
}

function isNumber (param) {
  return toString.call(param) === '[object Number]';
}

function isPlainObject (param) {
  if (!isObject(param)) return false;
  let proto = param;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(param) === proto;
}

function isObject (param) {
  if (param == void 0) return false;
  return toString.call(param) === '[object Object]';
}

function isString(param) {
  return toString.call(param) === '[object String]'
}

function isArray(param) {
  return toString.call(param) === '[object Array]' && Array.isArray(param);
}

function isArrayLike(param) {
  let hasLengthProp = isNumber(param.length);
  return !isArray(param) && hasLengthProp;
}

function isNaN(param) {
  return param !== param;
}

function isSymbol(param) {
  return toString.call(param) === '[object Symbol]' && typeof param === 'symbol';
}

module.exports = {
  mixin,
  isFunction,
  isNumber,
  isPlainObject,
  isObject,
  isString,
  isArray,
  isArrayLike,
  isNaN,
  isSymbol
};