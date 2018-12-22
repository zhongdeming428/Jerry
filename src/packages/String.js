/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 14:29:01 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-22 10:44:49
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
  isUndefined,
  randomInt,
  equals
} = require('./Util');

/**
 * 将指定字符串重复指定次数
 * @param {String} str 要重复的字符串
 * @param {Number} num 要重复的次数
 */
function repeat(str, num) {
  if (!isString(str) || !isNumber(num)) throwTypeErr('repeat 参数不合法！');
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
  return mask(str);
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
  let keyVals = url.split('&'),
      res = '';
  each(keyVals, v => {
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
function cutStr(str, distance, direction = 1) {
  if (!isString(str) || !isInt(distance) || !isInt(direction)) throwTypeErr('cutStr 参数不合法！');
  let res = [], s = '';
  direction === -1 ? str = slice.call(str).reverse().join('') : null;
  each(str, (v, k) => {
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
function mask(str, format) {
  if (isUndefined(format)) return repeat('*', str.length);
  if (!isString(str) || !isString(format) || str.length !== format.length) throwTypeErr('mask 参数不合法！');
  let res = '';
  each(str, (v, k) => {
    res += format[k] === '*' ? '*' : v;
  });
  return res;
}

/**
 * 返回随机颜色字符串
 * @param {Boolean} isRGB 是否返回 rgb 字符串，默认为否
 */
function randomColor(isRGB = false) {
  let randoms = [randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)];
  if (!isRGB) return `rgb(${randoms[0]}, ${randoms[1]}, ${randoms[2]})`;
  else {
    let hexs = map(randoms, v => (v).toString(16));
    return `#${hexs.join('')}`;
  }
}

/********************************* codes below comes from 30 seconds of code ***********************************/

/**
 * 反转字符串
 * @param {String} str 
 */
function reverseStr(str) {
  return str.split('').reverse().join('');
}

/**
 * 字符串首字母大写
 * @param {String} param0 要转换的字符串
 * @param {Boolean} lowerRest 是否将首字母外的字母全部转化为小写
 */
function capitalize([first, ...rest], lowerRest = false) {
  return (first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join('')));
}

/**
 * 所有单词首字母大写
 * @param {String} str 
 */
function capitalizeEveryWord(str) {
  return str.replace(/\b[a-z]/g, matches => matches.toUpperCase());
}

const char2Escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;', // eslint-disable-line quotes
  '"': '&quot;'
};

/**
 * 字符串编码
 * @param {String} str 
 */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => (char2Escape[tag] || tag));
}

/**
 * 解码字符串
 * @param {String} str 
 */
function unescapeHTML(str) {
  let _char2Escape = {};
  each(char2Escape, (v, k) => {
    _char2Escape[v] = k;
  });
  return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, char => (_char2Escape[char] || char));
}

/**
 * 将驼峰字符串转化为用指定间隔符隔开的字符串
 * @param {String} str 驼峰风格的字符串
 * @param {String} delimeter 间隔符
 */
function fromCamelCase(str, delimeter = '_') {
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + delimeter + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + delimeter + '$2')
            .toLowerCase();
}

/**
 * 判断两字符串是否是同字母异序字符串
 * @param {String} str1 
 * @param {String} str2 
 */
function isAnagram(str1, str2) {
  let arr1 = str1.toLowerCase().split('').sort(),
      arr2 = str2.toLowerCase().split('').sort();
  return equals(arr1, arr2);
}

/**
 * 将字符串转化为驼峰风格
 * @param {String} str 
 */
function camelize(str) {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
}

/**
 * 将字符串转为连字符风格
 * @param {String} str 
 */
function dasherize(str) {
  return str &&
    str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}

/**
 * 将字符串转化为下划线风格
 * @param {String} str 
 */
function underscored(str) {
  return str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('_');
}
/*****************************************************************************************************************/

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
  mask,
  randomColor,
  reverseStr,
  capitalize,
  capitalizeEveryWord,
  escapeHTML,
  unescapeHTML,
  fromCamelCase,
  isAnagram,
  camelize,
  dasherize,
  underscored
};