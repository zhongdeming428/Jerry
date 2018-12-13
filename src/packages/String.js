/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 14:29:01 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-13 19:25:47
 */

const { join, throwTypeErr } = require('../utils');
const { isString, isNumber, isInt } = require('./Util');

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
  let arr = str.split(''),
      len = arr.length,
      emptyCharCount = distance - (len % distance === 0 ? distance : len % distance),
      res = '';
  while(emptyCharCount-- > 0) {
    arr.unshift('');
  }
  for (let i = 0; i < arr.length; i++) {
    if (i % distance === 0 && i !== 0) res += notation;
    res += arr[i];
  }
  return res;
}

module.exports = {
  repeat,
  insertStr
};