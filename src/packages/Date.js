/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-20 13:55:03 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-20 16:08:52
 */

const { isInt } = require('./Util');
const { throwTypeErr } = require('../utils');

/**
 * 计算给定日期在给定天数之后的日期
 * @param {Date} date 基准日期
 * @param {Number} days 后延天数
 */
function dateAdd(date, days) {
  return _dateCalc(date, days, 1);
}

/**
 * 计算给定日期在给定天数之前的日期
 * @param {Date} date 基准日期
 * @param {Number} days 提前天数
 */
function dateSub(date, days) {
  return _dateCalc(date, days, -1);
}

/**
 * 计算基准日期朝前或朝后偏移一定天数之后的日期，是 dateAdd 和 dateSub 的辅助函数
 * @param {Date} date 基准日期
 * @param {Number} days 偏移天数
 * @param {Number} dir 偏移方向
 */
function _dateCalc(date, days, dir) {
  if (!isInt(days)) throwTypeErr('dateAdd 参数不合法！');
  date = new Date(date);
  let res = dir < 0 ? (+date - days * 24 * 3600 * 1000) : (+date + days * 24 * 3600 * 1000);
  return new Date(res);
}

/**
 * 获取两个日期之间的间隔天数
 * @param {Date} date1 
 * @param {Date} date2 
 */
function getDatePeriod(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return Math.abs(+date1 - +date2) / 1000 / 3600 / 24;
}

/**
 * 获取当前日期所在月的第一天的日期
 * @param {Date} date 
 */
function getFirstDateInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 计算当前日期所在月的最后一天
 * @param {Date} date 
 */
function getLastDateInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date));
}

/**
 * 计算当前日期所在月的天数
 * @param {Date} date 
 */
function getDaysInMonth(date) {
  let month = date.getMonth(),
      months = [31, isLeapYear(date) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return months[month];
}

/**
 * 判断当前日期所在年是否是闰年
 * @param {Date} date 
 */
function isLeapYear(date) {
  let year = date.getFullYear();
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

/**
 * 获取当前日期所在季度的第一天
 * @param {Date} date 
 */
function getFirstDateInQuarter(date) {
  let _month = Math.floor(date.getMonth() / 3),
      months = [0, 3, 6, 9];
  return new Date(date.getFullYear(), months[_month], 1);
}

/**
 * 获取当前日期所在季度的最后一天
 * @param {Date} date 
 */
function getLastDateInQuarter(date) {
  let _month = Math.floor(date.getMonth() / 3),
      months = [2, 5, 8, 11];
  return new Date(date.getFullYear(), months[_month], getDaysInMonth(new Date(date.getFullYear(), months[_month], 1)));
}

module.exports = {
  dateAdd,
  dateSub,
  getDatePeriod,
  getFirstDateInMonth,
  isLeapYear,
  getDaysInMonth,
  getLastDateInMonth,
  getFirstDateInQuarter,
  getLastDateInQuarter
};