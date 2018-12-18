/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 14:29:01 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-18 16:12:38
 */

const { join, throwTypeErr,slice } = require('../utils');
const { 
  isString, 
  isNumber, 
  isInt, 
  contains, 
  each,
  map,
  isObject ,
  isUndefined
} = require('./Util');

/**
 * 将指定字符串重复指定次数
 * @param {String} str 要重复的字符串
 * @param {Number} num 要重复的次数
 */
function repeat(str, num) {
  if (!isString(str) || !isNumber(num)) throwTypeErr('repeat 参数不合法！')
  let arrLike = { length: num + 1 };
  return join.call(arrLike, str);
}

/**
 * 根据指定间距把字符插入到字符串
 * @param {String} str 被处理的字符串
 * @param {String} notation 要插入的符号
 * @param {Number} distance 每隔几个字符插入
 */
function insertStr(str = '', notation = ',', distance = 3) {
  if (!isString(str) || !isString(notation) || !isInt(distance)) throwTypeErr('insertStr 参数不合法！');
  if (str === '' || distance === 0 || notation === '') return str;
  let cuttedStr = cutStr(str, distance, -1);
  return cuttedStr.join(notation);
}

/**
 * 去除字符串左边的空格
 * @param {String} str 要处理的字符串
 */
function trimLeft(str) {
  if (!isString(str)) throwTypeErr('trimLeft 参数非法！');
  return str.replace(/^\s+/, '');
}

/**
 * 去除字符串右边的空格
 * @param {String} str 要处理的字符串
 */
function trimRight(str) {
  if (!isString(str)) throwTypeErr('trimRight 参数非法！');
  return str.replace(/\s+$/, '');
}

/**
 * 去除字符串首尾的空格
 * @param {String} str 要处理的字符串
 */
function trim(str) {
  if (!isString(str)) throwTypeErr('trim 参数非法！');
  return trimRight(trimLeft(str));
}

/**
 * 将字符串转化为密码
 * @param {String} str 要转化的字符串
 */
function toPsw(str) {
  if (!isString(str)) throwTypeErr('toPsw 参数不合法！');
  return hideWithFormat(str);
}

/**
 * 从 URL 字符串中提取参数
 * @param {String} url URL 字符串
 * @param {String} key 参数名
 */
function getUrlParam(url, key) {
  let urlReg = /(\S+=\S&?)+/;
  if (!isString(url) || !isString(key) || !urlReg.test(url)) throwTypeErr('getUrlParam 参数不合法！');
  if (!contains(url, key)) return '';
  url = contains(url, '?') ? url.split('?')[1] : url;
  let key_vals = url.split('&'),
      res = '';
  each(key_vals, (v, k) => {
    if (v.split('=')[0] === key) res = v.split('=')[1];
  });
  return res;
}

/**
 * 将 JavaScript 对象转化为 URL 参数字符串
 * @param {Object} obj 包含参数键值对的对象
 */
function setUrlParam(obj) {
  if (!isObject(obj)) throwTypeErr('setUrlParam 参数不合法！');
  let res = [];
  each(obj, (v, k) => {
    res.push(`${k}=${v}`);
  });
  return res.join('&');
}

/**
 * 将字符串按指定间隔切割，返回字符串数组
 * @param {String} str 要切割的字符串
 * @param {Number} distance 切割间距
 * @param {Number} direction 1 为正序切割，-1 为逆序切割
 */
function cutStr(str, distance, direction) {
  if (!isString(str) || !isInt(distance) || !isInt(direction)) throwTypeErr('cutStr 参数不合法！');
  let res = [], s = '';
  direction === -1 ? str = slice.call(str).reverse().join('') : null;
  each(str, (v, k, o) => {
    s += v;
    if ((k + 1) % distance === 0) {
      res.push(s);
      s = '';
    }
  });
  if (s !== '') res.push(s);
  return direction === -1 ? map(res.reverse(), arr => slice.call(arr).reverse().join('')) : res;
}

/**
 * 截断字符串，超出部分用省略号代替
 * @param {String} str 要截断的字符串
 * @param {Number} len 留下的长度
 */
function truncate(str, len) {
  if (!isString(str) || !isInt(len)) throwTypeErr('truncate 参数不合法！');
  return str.substring(0, len) + (len >= str.length ? '' : '……');
}

/**
 * 按指定格式遮掩字符串的部分字符
 * @param {String} str 要遮掩的字符串
 * @param {String} format 指定遮掩格式的字符串，与 str 等长，'*' 为遮掩符，不传值时遮盖 str 的所有字符
 */
function hideWithFormat(str, format) {
  if (isUndefined(format)) return repeat('*', str.length);
  if (!isString(str) || !isString(format) || str.length !== format.length) throwTypeErr('hideWithFormat 参数不合法！');
  let res = '';
  each(str, (v, k, o) => {
    res += format[k] === '*' ? '*' : v;
  });
  return res;
}

module.exports = {
  repeat,
  insertStr,
  trimLeft,
  trimRight,
  trim,
  toPsw,
  getUrlParam,
  setUrlParam,
  cutStr,
  truncate,
  hideWithFormat
};