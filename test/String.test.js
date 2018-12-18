/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 14:32:28 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-18 10:13:31
 */

const expect = require('expect.js');
const {
  repeat,
  insertStr,
  trimLeft,
  trimRight,
  trim,
  toPsw,
  getUrlParam,
  setUrlParam,
  cutStr
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
  describe('测试 toPsw', function() {
    it('非法参数报错', function() {
      expect(() => {toPsw()}).to.throwError();
      expect(() => {toPsw(12)}).to.throwError();
      expect(() => {toPsw(false)}).to.throwError();
      expect(() => {toPsw({})}).to.throwError();
      expect(() => {toPsw(function() {})}).to.throwError();
      expect(() => {toPsw(Symbol(12))}).to.throwError();
    });
    it('确保正确转化', function() {
      expect(toPsw('123')).to.equal('***');
      expect(toPsw('123abc')).to.equal('******');
      expect(toPsw('12 3')).to.equal('****');
      expect(toPsw('_ 123asd')).to.equal('********');
    });
  });
  describe('测试 getUrlParam', function() {
    it('非法参数报错', function() {
      expect(() => {getUrlParam()}).to.throwError();
      expect(() => {getUrlParam('')}).to.throwError();
      expect(() => {getUrlParam('asd', 'asd')}).to.throwError();
      expect(() => {getUrlParam('asd', 123)}).to.throwError();
      expect(() => {getUrlParam('a=', 'a')}).to.throwError();
      expect(() => {getUrlParam('=b', 'b')}).to.throwError();
      expect(() => {getUrlParam({})}).to.throwError();
      expect(() => {getUrlParam(true)}).to.throwError();
      expect(() => {getUrlParam([])}).to.throwError();
      expect(() => {getUrlParam(function() {})}).to.throwError();
    });
    it('确保正确获取参数', function() {
      expect(getUrlParam('a=b&c=d', 'a')).to.equal('b');
      expect(getUrlParam('a=b&c=d', 'c')).to.equal('d');
      expect(getUrlParam('?name=russ&age=12', 'age')).to.equal('12');
      expect(getUrlParam('?name=russ&age=12', 'name')).to.equal('russ');
      expect(getUrlParam('?a=b', 'a')).to.equal('b');
    });
  });
  describe('测试 setUrlParam', function() {
    it('非法参数报错', function() {
      expect(() => {setUrlParam()}).to.throwError();
      expect(() => {setUrlParam('')}).to.throwError();
      expect(() => {setUrlParam(12)}).to.throwError();
      expect(() => {setUrlParam(false)}).to.throwError();
      expect(() => {setUrlParam(function() {})}).to.throwError();
      expect(() => {setUrlParam(Symbol(12))}).to.throwError();
    });
    it('确保正确转化', function() {
      let CustomObj = function() {
        this.name = 'test';
        this.age = 1;
      };
      expect(setUrlParam({name: 'test', age: 12})).to.equal('name=test&age=12');
      expect(setUrlParam({})).to.equal('');
      expect(setUrlParam(new CustomObj())).to.equal('name=test&age=1');
      expect(setUrlParam({name: 'test', age: 12, gender: 'male'})).to.equal('name=test&age=12&gender=male');
    });
  });
  describe('测试 cutStr', function() {
    it('非法参数报错', function() {
      expect(() => {cutStr()}).to.throwError();
      expect(() => {cutStr({}, 2, 1)}).to.throwError();
      expect(() => {cutStr([], 2, 1)}).to.throwError();
      expect(() => {cutStr('', '2', '2')}).to.throwError();
    });
    it('确保正确切割', function() {
      expect(cutStr('abc', 1, 1)).to.eql(['a', 'b', 'c']);
      expect(cutStr('0', 4, -1)).to.eql(['0']);
      expect(cutStr('abc', 2, 1)).to.eql(['ab', 'c']);
      expect(cutStr('abc', 2, -1)).to.eql(['a', 'bc']);
      expect(cutStr('abcdefg', 3, 1)).to.eql(['abc', 'def', 'g']);
      expect(cutStr('abcdefg', 3, -1)).to.eql(['a', 'bcd', 'efg']);
      expect(cutStr('abcdefghijklmn', 3, 1)).to.eql(['abc', 'def', 'ghi', 'jkl', 'mn']);
      expect(cutStr('abcdefghijklmn', 3, -1)).to.eql(['ab', 'cde', 'fgh', 'ijk', 'lmn']);
    });
  });
});