/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-20 13:55:14 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-20 16:07:32
 */

const {
  dateAdd,
  dateSub,
  getDatePeriod,
  getFirstDateInMonth,
  isLeapYear,
  getDaysInMonth,
  getLastDateInMonth,
  getFirstDateInQuarter,
  getLastDateInQuarter
} = require('../src/packages/Date');
const expect = require('expect.js');

describe('*************************************测试 Date *************************************', function() {
  describe('测试 dateAdd 函数', function() {
    it('准确计算返回日期', function() {
      // expect(dateAdd(new Date(), 20)).to.eql();
    });
  });
  describe('测试 dateSub 函数', function() {
    it('准确计算返回日期', function() {
      // expect(dateSub(new Date(), 20)).to.eql();
    });
  });
  describe('测试 getDatePeriod', function() {
    it('计算日期间隔', function() {
      expect(getDatePeriod(new Date('2018-12-10'), new Date('2018-12-20'))).to.equal(10);
      expect(getDatePeriod(new Date('2018-12-01'), new Date('2018-12-20'))).to.equal(19);
      expect(getDatePeriod(new Date('2018-12-10'), new Date('2018-11-10'))).to.equal(30);
    });
  });
  describe('测试 getFirstDateInMonth', function() {
    it('计算每月第一日', function() {
      expect(getFirstDateInMonth(new Date('2018-12-12'))).to.eql(new Date('2018-12-1'));
      expect(getFirstDateInMonth(new Date('2018-11-1'))).to.eql(new Date('2018-11-1'));
      expect(getFirstDateInMonth(new Date('2018-10-20'))).to.eql(new Date('2018-10-1'));
      expect(getFirstDateInMonth(new Date('2018-9-30'))).to.eql(new Date('2018-9-1'));
      expect(getFirstDateInMonth(new Date('2018-8-31'))).to.eql(new Date('2018-8-1'));
    });
  });
  describe('测试 isLeapYear', function() {
    it('判断是否是闰年', function() {
      expect(isLeapYear(new Date('2018-12-12'))).to.be(false);
      expect(isLeapYear(new Date('2016-12-12'))).to.be(true);
      expect(isLeapYear(new Date('2000-12-12'))).to.be(true);
      expect(isLeapYear(new Date('2200-12-12'))).to.be(false);
      expect(isLeapYear(new Date('2004-12-12'))).to.be(true);
      expect(isLeapYear(new Date('1980-12-12'))).to.be(true);
    });
  });
  describe('测试 getDaysInMonth', function() {
    it('判断当前月的天数', function() {
      expect(getDaysInMonth(new Date('2018-12-12'))).to.be(31);
      expect(getDaysInMonth(new Date('2016-2-12'))).to.be(29);
      expect(getDaysInMonth(new Date('2000-2-12'))).to.be(29);
      expect(getDaysInMonth(new Date('2200-2-12'))).to.be(28);
      expect(getDaysInMonth(new Date('2004-11-12'))).to.be(30);
      expect(getDaysInMonth(new Date('1981-2-12'))).to.be(28);
      expect(getDaysInMonth(new Date('1981-4-12'))).to.be(30);
    });
  });
  describe('测试 getLastDateInMonth', function() {
    it('判断当前月的最后一天', function() {
      expect(getLastDateInMonth(new Date(2018, 11, 12))).to.eql(new Date(2018, 11, 31));
      expect(getLastDateInMonth(new Date('2016-2-12'))).to.eql(new Date('2016-2-29'));
      expect(getLastDateInMonth(new Date('2000-2-12'))).to.eql(new Date('2000-2-29'));
      expect(getLastDateInMonth(new Date('2200-2-12'))).to.eql(new Date('2200-2-28'));
      expect(getLastDateInMonth(new Date(2004, 10, 1))).to.eql(new Date(2004, 10, 30));
      expect(getLastDateInMonth(new Date('1981-2-12'))).to.eql(new Date('1981-2-28'));
      expect(getLastDateInMonth(new Date('1981-4-12'))).to.eql(new Date('1981-4-30'));
    });
  });
  describe('测试 getFirstDateInQuarter', function() {
    it('判断当前季度的第一天', function() {
      expect(getFirstDateInQuarter(new Date(2018, 1, 12))).to.eql(new Date(2018, 0, 1));
      expect(getFirstDateInQuarter(new Date(2018, 2, 12))).to.eql(new Date(2018, 0, 1));
      expect(getFirstDateInQuarter(new Date(2018, 0, 12))).to.eql(new Date(2018, 0, 1));
      expect(getFirstDateInQuarter(new Date(2018, 11, 12))).to.eql(new Date(2018, 9, 1));
      expect(getFirstDateInQuarter(new Date(2018, 10, 12))).to.eql(new Date(2018, 9, 1));
      expect(getFirstDateInQuarter(new Date(2018, 9, 12))).to.eql(new Date(2018, 9, 1));
      expect(getFirstDateInQuarter(new Date(2018, 3, 12))).to.eql(new Date(2018, 3, 1));
      expect(getFirstDateInQuarter(new Date(2018, 4, 12))).to.eql(new Date(2018, 3, 1));
      expect(getFirstDateInQuarter(new Date(2018, 5, 12))).to.eql(new Date(2018, 3, 1));
      expect(getFirstDateInQuarter(new Date(2018, 6, 12))).to.eql(new Date(2018, 6, 1));
      expect(getFirstDateInQuarter(new Date(2018, 7, 12))).to.eql(new Date(2018, 6, 1));
      expect(getFirstDateInQuarter(new Date(2018, 8, 12))).to.eql(new Date(2018, 6, 1));
    });
  });
  describe('测试 getLastDateInQuarter', function() {
    it('判断当前季度的最后一天', function() {
      expect(getLastDateInQuarter(new Date(2018, 11, 12))).to.eql(new Date(2018, 11, 31));
      expect(getLastDateInQuarter(new Date(2018, 10, 12))).to.eql(new Date(2018, 11, 31));
      expect(getLastDateInQuarter(new Date(2018, 9, 12))).to.eql(new Date(2018, 11, 31));
      expect(getLastDateInQuarter(new Date(2018, 0, 12))).to.eql(new Date(2018, 2, 31));
      expect(getLastDateInQuarter(new Date(2018, 1, 12))).to.eql(new Date(2018, 2, 31));
      expect(getLastDateInQuarter(new Date(2018, 2, 12))).to.eql(new Date(2018, 2, 31));
      expect(getLastDateInQuarter(new Date(2018, 4, 12))).to.eql(new Date(2018, 5, 30));
      expect(getLastDateInQuarter(new Date(2018, 3, 12))).to.eql(new Date(2018, 5, 30));
      expect(getLastDateInQuarter(new Date(2018, 5, 12))).to.eql(new Date(2018, 5, 30));
      expect(getLastDateInQuarter(new Date(2018, 6, 12))).to.eql(new Date(2018, 8, 30));
      expect(getLastDateInQuarter(new Date(2018, 7, 12))).to.eql(new Date(2018, 8, 30));
      expect(getLastDateInQuarter(new Date(2018, 8, 12))).to.eql(new Date(2018, 8, 30));
    });
  });
});