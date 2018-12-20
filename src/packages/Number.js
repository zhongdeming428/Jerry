/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 09:47:57 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-20 10:07:49
 */

const { each, reduce, isNumber, isInt, isString, isUndefined } = require('../packages/Util');
const { throwTypeErr } = require('../utils');
const { repeat, insertStr, cutStr } = require('./String');

const paramLenErr = '参数长度不够！';

/**
 * 获取传入数字的小数位数
 * @param {Number} num 传入的数字
 */
function _getFloatLen(num) {
  if (isInt(num)) return 0;
  return (num + '.').split('.')[1].length;
}

/**
 * 四种运算的辅助计算函数
 * @param {Number} num1 运算参数 1
 * @param {Number} num2 运算参数 2
 * @param {String} type 运算类型：‘add’、‘sub’、‘mul’和‘div’
 */
function _calcHelper(num1, num2, type) {
  let errMsg = _getErrMsg(type);
  if (!isNumber(num1) || !isNumber(num2)) throwTypeErr(errMsg);
  let floatLen1 = _getFloatLen(num1),
      floatLen2 = _getFloatLen(num2);
  let len = Math.max(floatLen1, floatLen2);
  num1 = +(String(num1).replace('.', '') + repeat('0', len - floatLen1));
  num2 = +(String(num2).replace('.', '') + repeat('0', len - floatLen2));
  let res;
  switch (type) {
    case 'add': res = _calcHelper(num1 + num2, Math.pow(10, len), 'div'); break;
    case 'sub': res = _calcHelper(num1 - num2, Math.pow(10, len), 'div'); break;
    case 'mul': res = _calcHelper(num1 * num2, Math.pow(10, 2 * len), 'div'); break;
    case 'div': res = num1 / num2; break;
    default: res = 0;
  }
  return res;
}

/**
 * 对 _calcHelper 进行柯里化
 * @param {String} type 
 */
function _calcReducer(type) {
  return function() {
    if (arguments.length < 1) throwTypeErr(paramLenErr);
    if (arguments.length === 1) return arguments[0];
    return reduce(arguments, (acc, v) => _calcHelper(acc, v, type));
  };
}

function _getErrMsg(type) {
  return type + ' 的参数必须是数字类型！';
}

/**
 * 计算非负整数的阶乘
 * @param {Number} num 一个非负整数
 */
function factorial(num) {
  if (!isInt(num) || num < 0) throwTypeErr('factorial 参数不合法！');
  let res = 1;
  do {
    res = res * num--;
  } while (num > 0);
  return res;
}

/**
 * 将数字转化为货币格式
 * @param {Number} num 要转化的数字
 * @param {String} notation 货币的符号，默认是‘￥’
 * @param {Number} precision 转化精度，默认为 2
 */
function toCurrency(num, notation = '￥', precision = 2) {
  if (!isNumber(num) || !isString(notation) || !isInt(precision)) throwTypeErr('toCurrency 参数不合法！');
  let numStr = isInt(num) ? num.toFixed(precision) : String(num.toFixed(precision)),
      intPart = numStr.split('.')[0],
      floatPart = numStr.split('.')[1];
  let intStr = insertStr(intPart);
  return `${notation}${intStr}.${floatPart}`;
}

/**
 * 将金额数字转化为中文大写金额
 * @param {Number} num 要转化的金额数字
 */
function toChineseAmount(num) {
  if (!isNumber(num) || num < 0) throwTypeErr('toChineseAmount 参数非法！');
  const nums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        intUnits = ['', '拾', '佰', '仟'],
        floatUnits = ['角', '分'];
  let numStr = isInt(num) ? num + '.' : String(num.toFixed(2)),
      intPart = cutStr(numStr.split('.')[0], 4, -1),
      floatPart = numStr.split('.')[1];
  if (intPart.length > 3) throwTypeErr('toChineseAmout 参数过长！');
  let res = '';
  if (intPart.length === 1 && intPart[0] === '0') intPart = [];
  each(intPart, (str, idx) => {
    str = str.replace(/^(0+)([1-9]+)/g, (match, p1, p2) => `${repeat('a', p1.length) + p2}`).replace(/^([1-9]+)(0+)([1-9]+)$/g, (match, p1, p2, p3) => `${p1 + repeat('a', p2.length)}${p3}`);
    str = str.replace(/([1-9]+)(0+)$/g, (match, p1, p2) => `${p1 + repeat('b', p2.length)}`);
    if (str !== '0000') {
      each(str, (v, k, o) => {
        if (v === 'a') res += 'a';
        else if (v === 'b') res += 'b';
        else {
          let tmp = nums[+v] === '零' ? `${nums[+v]}` : `${nums[+v]}${intUnits[o.length - k - 1]}`;
          res += tmp;
        }
      });
    }
    res = res.replace(/a+/g, '零').replace(/b+/g, '');
    if (str === '0000' && idx === 1 && intPart.length === 3) return;  // 一亿元整的时候省略万字。
    res += ['圆', '万', '亿'][intPart.length - 1 - idx];
  });
  if (floatPart.length !== 0) {
    each(floatPart, (v, k) => {
      if (v === '' && k === 0) return;
      res += `${nums[+v]}${floatUnits[k]}`;
    });
    if (intPart.length === 0 && floatPart[0] === '0') res = res.replace('零角', '');
  }
  return res.replace('零角', '零').replace('零分', '');
}

/**
 * 将 7 位或者 11 位的数字转化为电话格式的字符串
 * @param {Number} num 要转化的数字
 */
function toPhoneNumber(num) {
  if (!isInt(num)) throwTypeErr('toPhoneNumber 参数不合法！');
  if (String(num).length === 11) return insertStr(String(num), '-', 4);
  else if (String(num).length === 7) return insertStr(String(num), '-', 3).replace('-', '');
  else throwTypeErr('toPhoneNumber 参数不合法！');
}

/**
 * 将 8 位数字转化为日期格式的字符串
 * @param {Number} num 要转化的数字
 * @param {String} delimeter 指定分隔符
 */
function toDate(num, delimeter) {
  if (!isInt(num) || String(num).length !== 8) throwTypeErr('toDate 参数不合法！');
  return insertStr(String(num), delimeter, 2).replace(delimeter, '');
}

/**
 * 返回指定区间的随机整数，左闭右闭，即返回结果位于 [start, end]
 * @param {Number} start 最小值
 * @param {Number} end 最大值
 */
function randomInt(start, end) {
  if (isUndefined(start) || isUndefined(end) || end < start) throwTypeErr('randomInt 参数不合法！');
  return Math.floor(Math.random() * (end + 1 - start) + start);
}

module.exports = {
  add: _calcReducer('add'),
  sub: _calcReducer('sub'),
  mul: _calcReducer('mul'),
  div: _calcReducer('div'),
  factorial,
  toCurrency,
  toChineseAmount,
  toPhoneNumber,
  toDate,
  randomInt
};