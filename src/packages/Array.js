/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 09:29:09 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-19 10:28:04
 */

const { 
  isArray, 
  isFunction, 
  isFalsy, 
  isString,
  reduce, 
  each, 
  map,
  contains, 
  filter 
} = require('./Util');
const { throwTypeErr, slice } = require('../utils');
const { add, div, sub, randomInt } = require('../packages/Number');

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

/**
 * 数组随机洗牌，返回一个新数组，采用 Fisher–Yates shuffle 的改进算法
 * @param {Array} arr 要洗牌的数组
 */
function shuffle(arr) {
  let len = arr.length,
      newArr = slice.call(arr);
  while(--len) {
    let idx = randomInt(0, len),
        tmp = newArr[len];
    newArr[len] = newArr[idx];
    newArr[idx] = tmp;
  }
  return newArr;
}

/**
 * 根据回调函数的结果对数组元素进行归类，返回一个对象，每个属性都是一个类别，值为该分类元素组成的数组。
 * @param {Array} arr 要归类的数组
 * @param {Function} callback 返回类别的回调函数，接受三个标准参数
 */
function groupBy(arr, callback) {
  if (!isArray(arr) || !isFunction(callback)) throwTypeErr('groupBy 参数不合法！');
  let res = {};
  each(arr, (v, k, o) => {
    let categoryName = callback(v, k , o);
    if (res[categoryName]) {
      res[categoryName].push(v);
    } else {
      res[categoryName] = [v];
    }
  });
  return res;
}

/**
 * 去除数组中的 falsy 值，返回新数组
 * @param {Array} arr 要移除 falsy 值的数组
 */
function compact(arr) {
  if (!isArray(arr)) throwTypeErr('compact 参数不合法！');
  return filter(arr, v => !isFalsy(v));
}

/**
 * 获取数组中所有对象的指定属性，返回一个数组
 * @param {Array} arr 数组参数
 * @param {String} key 对象属性
 */
function pluck(arr, key) {
  if (!isArray(arr) || !isString(key)) throwTypeErr('pluck 参数不合法！');
  return map(arr, v => v[key]);
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
  variance,
  shuffle,
  groupBy,
  compact,
  pluck
};