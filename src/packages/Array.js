/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 09:29:09 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-18 19:48:44
 */

const { isArray, reduce, each, contains, filter } = require('./Util');
const { throwTypeErr, slice } = require('../utils');
const { add, div, sub } = require('../packages/Number');

/**
 * 求数组中的最大值
 * @param {Array} arr 要求值的数组
 */
function max(arr) {
  if (!isArray(arr)) throwTypeErr('max 参数不合法！');
  return Math.max(...arr);
}

/**
 * 求数组中的最小值
 * @param {Array} arr 要求值的数组
 */
function min(arr) {
  if (!isArray(arr)) throwTypeErr('min 参数不合法！');
  return Math.min(...arr);
}

/**
 * 对数组元素求和
 * @param {Array} arr 要求和的数组
 */
function sum(arr) {
  if (!isArray(arr)) throwTypeErr('sum 参数不合法！')
  return reduce(arr, (acc, v) => add(acc, v));
}

/**
 * 求数组元素的均值
 * @param {Array} arr 求均值的数组
 */
function avg(arr) {
  return div(sum(arr), arr.length);
}

/**
 * 求数组中所有元素的方差
 * @param {Array} arr 要求方差的数组
 */
function variance(arr) {
  let average = avg(arr),
      sumOfSquares = reduce(arr, (acc, v) => add(acc, Math.pow(sub(v, average), 2)), 0);
  return div(sumOfSquares, arr.length);
}

/**
 * 求多个数组的交集
 * @param {Array} arr 接受的第一个数组
 */
function intersection(arr) {
  if (!isArray(arr)) throwTypeErr('intersection 参数不合法！');
  let res = [];
  each(arr, v => {
    let i = 1;
    for (; i < arguments.length; i++) {
      if (!contains(arguments[i], v)) break;
    }
    if (i === arguments.length) res.push(v);
  });
  return res;
}

/**
 * 求多个数组的并集
 * @param  {...any} args 所有数组参数
 */
function union(...args) {
  each(args, arg => {
    if (!isArray(arg)) throwTypeErr('union 参数不合法！');
  });
  return removeDup(flatten(args));
}

/**
 * 求多个数组的差集
 * @param  {...any} args 所有数组参数
 */
function difference(...args) {
  each(args, arg => {
    if (!isArray(arg)) throwTypeErr('difference 参数不合法！');
  });
  let arr1 = args[0],
      arr2 = flatten(slice.call(args, 1));
  return filter(arr1, v => !contains(arr2, v));
}

/**
 * 数组去重
 * @param {Array} arr 要去重的数组
 */
function removeDup(arr) {
  if (!isArray(arr)) throwTypeErr('removeDup 参数不合法！');
  return reduce(arr, (acc, v) => {
    if (!contains(acc, v)) acc.push(v);
    return acc;
  }, []);
}

/**
 * 展开高维数组
 * @param {Array} arr 要展开的数组
 * @param {Boolean} shallow true 代表只展开一层，false 代表展开所有层，默认为 false
 */
function flatten(arr, shallow = false) {
  if (!isArray(arr)) throwTypeErr('flatten 参数不合法！');
  let res = [];
  each(arr, v => {
    if (isArray(v)) shallow ? res.push(...v) : res.push(...flatten(v));
    else res.push(v);
  });
  return res;
}

module.exports = {
  max,
  min,
  sum,
  avg,
  intersection,
  union,
  difference,
  removeDup,
  flatten,
  variance
};