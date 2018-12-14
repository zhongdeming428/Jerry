/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 14:32:28 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-14 11:01:42
 */

const expect = require('expect.js');
const {
  repeat,
  insertStr,
  trimLeft,
  trimRight,
  trim
} = require('../src/packages/String');

describe('*************************************测试 String *************************************', function() {
  describe('测试 repeat', function() {
    it('测试字符串重复', function() {
      expect(repeat('1', 3)).to.equal('111');
      expect(repeat('1', 2)).to.equal('11');
      expect(repeat('hello', 3)).to.equal('hellohellohello');
      expect(repeat('', 1)).to.equal('');
      expect(repeat('a', 0)).to.equal('');
    });
    it('非法参数报错', function() {
      expect(() => {repeat({}, 1)}).to.throwError();
      expect(() => {repeat([], 1)}).to.throwError();
      expect(() => {repeat(12, 1)}).to.throwError();
      expect(() => {repeat(true, 1)}).to.throwError();
      expect(() => {repeat(function() {}, 1)}).to.throwError();
      expect(() => {repeat(new Error(), 1)}).to.throwError();
      expect(() => {repeat('', '')}).to.throwError();
      expect(() => {repeat('', true)}).to.throwError();
      expect(() => {repeat('', {})}).to.throwError();
      expect(() => {repeat('', function() {})}).to.throwError();
    });
  });
  describe('测试 insertStr', function() {
    it('不传值或传空字符串时返回空字符串', function() {
      expect(insertStr()).to.equal('');
      expect(insertStr('')).to.equal('');
      expect(insertStr('123', ',', 0)).to.equal('123');
    });
    it('参数非法时报错', function() {
      expect(() => {insertStr(1, '2', 3)}).to.throwError();
      expect(() => {insertStr('1', 2, 3)}).to.throwError();
      expect(() => {insertStr('1', '2', '3')}).to.throwError();
    });
    it('正确插入标记', function() {
      expect(insertStr('123123')).to.equal('123,123');
      expect(insertStr('12312', ',', 2)).to.equal('1,23,12');
      expect(insertStr('1231', ',', 1)).to.equal('1,2,3,1');
      expect(insertStr('123123', '-')).to.equal('123-123');
      expect(insertStr('123123', '-', 3)).to.equal('123-123');
      expect(insertStr('123123', '_', 2)).to.equal('12_31_23');
      expect(insertStr('12312341234', '-', 4)).to.equal('123-1234-1234');
      expect(insertStr('ihafkdahfj', ',', 2)).to.equal('ih,af,kd,ah,fj');
    });
  });
  describe('测试 trimLeft', function() {
    it('非法参数报错', function() {
      expect(() => {trimLeft(12)}).to.throwError;
      expect(() => {trimLeft(false)}).to.throwError;
      expect(() => {trimLeft({})}).to.throwError;
      expect(() => {trimLeft([])}).to.throwError;
      expect(() => {trimLeft(function() {})}).to.throwError;
    });
    it('确保正确去除左侧空格', function() {
      expect(trimLeft(' 1')).to.equal('1');
      expect(trimLeft('     1')).to.equal('1');
      expect(trimLeft('  123')).to.equal('123');
      expect(trimLeft('   1')).to.equal('1');
      expect(trimLeft('\r\n1')).to.equal('1');
      expect(trimLeft('\r\n\t1')).to.equal('1');
    });
  });
  describe('测试 trimRight', function() {
    it('非法参数报错', function() {
      expect(() => {trimRight(12)}).to.throwError;
      expect(() => {trimRight(false)}).to.throwError;
      expect(() => {trimRight({})}).to.throwError;
      expect(() => {trimRight([])}).to.throwError;
      expect(() => {trimRight(function() {})}).to.throwError;
    });
    it('确保正确去除左侧空格', function() {
      expect(trimRight('1 ')).to.equal('1');
      expect(trimRight('1     ')).to.equal('1');
      expect(trimRight('123  ')).to.equal('123');
      expect(trimRight('1   ')).to.equal('1');
      expect(trimRight('1\r\n')).to.equal('1');
      expect(trimRight('1\r\n\t')).to.equal('1');
    });
  });
  describe('测试 trim', function() {
    it('非法参数报错', function() {
      expect(() => {trim(12)}).to.throwError;
      expect(() => {trim(false)}).to.throwError;
      expect(() => {trim({})}).to.throwError;
      expect(() => {trim([])}).to.throwError;
      expect(() => {trim(function() {})}).to.throwError;
    });
    it('确保正确去除左侧空格', function() {
      expect(trim(' 1 ')).to.equal('1');
      expect(trim(' 1     ')).to.equal('1');
      expect(trim('    123  ')).to.equal('123');
      expect(trim('       1   ')).to.equal('1');
      expect(trim('\t\r\n1\r\n')).to.equal('1');
      expect(trim('\t1\r\n\t')).to.equal('1');
    });
  });
});