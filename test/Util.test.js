/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-11 11:06:50 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-12 15:51:15
 */

const expect = require('expect.js');
const {
  mixin,
  isFunction,
  isNumber,
  isPlainObject,
  isObject,
  isString,
  isArray,
  isArrayLike,
  isNaN,
  isSymbol,
  isRegExp,
  isDate,
  isUndefined,
  isNull,
  isFalsy,
  each,
  map
} = require('../src/packages/Util');

describe('*************************************测试工具函数*************************************', function() {
  describe('测试 mixin', function() {
    it('mixin 是函数类型', function() {
      expect(mixin).to.be.a(Function);
    });
    it('mixin 没参数时抛出错误', function() {
      expect(()=>mixin()).to.throwError();
    });
    it('mixin 一个参数时返回该参数', function() {
      expect(()=>mixin({})).to.eql({});
    });
    it('mixin 浅拷贝', function() {
      let obj = { name: '12' };
      mixin(obj, { age: 12 });
      expect(obj).to.eql({ name: '12', age: 12 });
    });
    it('mixin 浅拷贝属性覆盖', function() {
      let obj = { name: '12' };
      mixin({ name: '12' }, { name: 12 });
      expect(obj).to.eql({ name: 12 });
    });
  });
  describe('测试 isFunction', function() {
    it('new Function 返回 true', function() {
      expect(isFunction(new Function())).to.be.ok();
    });
    it('字面量函数返回 true', function() {
      expect(isFunction(function() {})).to.be.ok();
    });
    it('setTimeout 返回 true', function() {
      expect(isFunction(setTimeout)).to.be.ok();
    });
    it('纯对象返回 false', function() {
      expect(isFunction({})).to.not.be.ok();
    });
  });
  describe('测试 isPlainObject', function() {
    it('{} 是纯对象', function() {
      expect(isPlainObject({})).to.be.ok();
    });
    it('new Object 是纯对象', function() {
      expect(isPlainObject(new Object())).to.be.ok();
    });
    it('Function 不是纯对象', function() {
      expect(isPlainObject(new Function())).to.not.be.ok();
    });
    it('Number 不是纯对象', function() {
      expect(isPlainObject(Number(12))).to.not.be.ok();
    });
    it('Boolean 不是纯对象', function() {
      expect(isPlainObject(Boolean(true))).to.not.be.ok();
    });
    it('自定义对象不是纯对象', function() {
      function CustomObject() {
        this.name = 'test';
      }
      expect(isPlainObject(new CustomObject())).to.not.be.ok();
    });
    it('null 返回 false', function() {
      expect(isPlainObject(null)).to.not.be.ok();
    });
    it('undefined 返回 false', function() {
      expect(isPlainObject()).to.not.be.ok();
    });
  });
  describe('测试 isNumber', function() {
    it('字面量数字返回 true', function() {
      expect(isNumber(12)).to.be.ok();
    });
    it('构造的数字对象返回 true', function() {
      expect(isNumber(new Number(12))).to.be.ok();
    });
    it('包装的数字对象返回 true', function() {
      expect(isNumber(Number(12))).to.be.ok();
    });
    it('数字内容的字符串返回 false', function() {
      expect(isNumber('12')).to.not.be.ok();
    });
  });
  describe('测试 isObject', function() {
    it('字面量对象返回 true', function() {
      expect(isObject({})).to.be.ok();
    });
    it('构造的对象返回 true', function() {
      expect(isObject(new Object())).to.be.ok();
    });
    it('自定义对象返回 true', function() {
      function CustomObject() {
        this.name = 'test';
      }
      expect(isObject(new CustomObject())).to.be.ok();
    });
    it('包装的对象返回 false', function() {
      expect(isObject(String(12))).to.not.be.ok();
    });
    it('函数返回 false', function() {
      expect(isObject(function() {})).to.not.be.ok();
    });
    it('数组返回 false', function() {
      expect(isObject([])).to.not.be.ok();
    });
    it('字面量数字返回 false', function() {
      expect(isObject(12)).to.not.be.ok();
    });
    it('字面量字符串返回 false', function() {
      expect(isObject('12')).to.not.be.ok();
    });
    it('null 返回 false', function() {
      expect(isObject(null)).to.not.be.ok();
    });
    it('undefined 返回 false', function() {
      expect(isObject()).to.not.be.ok();
    });
  });
  describe('测试 isString', function() {
    it('字面量字符串返回 true', function() {
      expect(isString('12')).to.be.ok();
    });
    it('构造的字符串返回 true', function() {
      expect(isString(new String(12))).to.be.ok();
    });
    it('包装的字符串返回 true', function() {
      expect(isString(String(12))).to.be.ok();
    });
    it('运算出来的字符串返回 true', function() {
      expect(isString(12 + '')).to.be.ok();
    });
    it('对象返回 false', function() {
      expect(isString({})).to.not.be.ok();
    });
    it('数字返回 false', function() {
      expect(isString(12)).to.not.be.ok();
    });
    it('布尔值返回 false', function() {
      expect(isString(true)).to.not.be.ok();
    });
  });
  describe('测试 isArray', function() {
    it('字面量数组返回 true', function() {
      expect(isArray([])).to.be.ok();
    });
    it('构造的数组返回 true', function() {
      expect(isArray(new Array())).to.be.ok();
    });
    it('字符串数组返回 false', function() {
      expect(isArray('123')).to.not.be.ok();
    });
    it('参数类数组对象返回 false', function() {
      expect(isArray(arguments)).to.not.be.ok();
    });
    it('自定义类数组对象返回 false', function() {
      let arrayLikeObj = {
        '0': 12,
        'length': 1
      };
      expect(isArray(arrayLikeObj)).to.not.be.ok();
    });
  });
  describe('测试 isArrayLike', function() {
    it('arguments 是类数组对象', function() {
      expect(isArrayLike(arguments)).to.be.equal(true);
    });
    it('自定义的类数组对象返回 true', function() {
      expect(isArrayLike({ length: 0 })).to.be.equal(true);
    });
    it('字符串返回 true', function() {
      expect(isArrayLike('test')).to.be.equal(true);
    });
    it('length 属性不为数字的自定义类数组对象返回 false', function() {
      expect(isArrayLike({ length: '0' })).to.be.equal(false);
    });
    it('数组对象返回 false', function() {
      expect(isArrayLike([])).to.be.equal(false);
    });
  });
  describe('测试 isNaN', function() {
    it('NaN 返回 true', function() {
      expect(isNaN(NaN)).to.equal(true);
    });
    it('abc123 返回 false', function() {
      expect(isNaN('abc123')).to.equal(false);
    });
    it('Infinity 返回 false', function() {
      expect(isNaN(Infinity)).to.equal(false);
    });
  });
  describe('测试 isSymbol', function() {
    it('Symbol 类型返回 true', function() {
      expect(isSymbol(Symbol(12))).to.equal(true);
    });
    it('Function 类型返回 false', function() {
      expect(isSymbol(new Function())).to.equal(false);
    });
    it('Object 类型返回 false', function() {
      expect(isSymbol({})).to.equal(false);
    });
  });
  describe('测试 isRegExp', function() {
    it('字面量正则返回 true', function() {
      expect(isRegExp(/\.test$/)).to.equal(true);
    });
    it('构造的正则返回 true', function() {
      expect(isRegExp(new RegExp('^12$', 'gi'))).to.equal(true);
    });
    it('字符串返回 false', function() {
      expect(isRegExp('/\.test$/')).to.equal(false);
    });
    it('undefined 返回 false', function() {
      expect(isRegExp()).to.equal(false);
    });
    it('null 返回 false', function() {
      expect(isRegExp(null)).to.equal(false);
    });
    it('纯对象返回 false', function() {
      expect(isRegExp({})).to.equal(false);
    });
    it('构造的空正则返回 true', function() {
      expect(isRegExp(new RegExp())).to.equal(true);
    });
  });
  describe('测试 isDate', function() {
    it('构造的 Date 返回 true', function() {
      expect(isDate(new Date())).to.equal(true);
    });
    it('Date.now() 返回 false', function() {
      expect(isDate(Date.now())).to.equal(false);
    });
    it('字符串日期返回 false', function() {
      expect(isDate('2018-08-08')).to.equal(false);
    });
    it('日期毫秒数返回 false', function() {
      expect(isDate(+Date.now())).to.equal(false);
    });
  });
  describe('测试 isUndefined', function() {
    it('不传参返回 true', function() {
      expect(isUndefined()).to.equal(true);
    });
    it('undefined 返回 true', function() {
      expect(isUndefined(undefined)).to.equal(true);
    });
    it('null 返回 false', function() {
      expect(isUndefined(null)).to.equal(false);
    });
    it('空对象返回 false', function() {
      expect(isUndefined({})).to.equal(false);
    });
    it('0 返回 false', function() {
      expect(isUndefined(0)).to.equal(false);
    });
    it('false 返回 false', function() {
      expect(isUndefined(false)).to.equal(false);
    });
  });
  describe('测试 isNull', function() {
    it('null 返回 true', function() {
      expect(isNull(null)).to.equal(true);
    });
    it('undefined 返回 false', function() {
      expect(isNull(undefined)).to.equal(false);
    });
    it('空对象返回 false', function() {
      expect(isNull({})).to.equal(false);
    });
    it('0 返回 false', function() {
      expect(isNull(0)).to.equal(false);
    });
    it('false 返回 false', function() {
      expect(isNull(false)).to.equal(false);
    });
  });
  describe('测试 isFalsy', function() {
    it('0 返回 true', function() {
      expect(isFalsy(0)).to.equal(true);
    });
    it('false 返回 true', function() {
      expect(isFalsy(false)).to.equal(true);
    });
    it('undefined 返回 true', function() {
      expect(isFalsy()).to.equal(true);
    });
    it('空字符串返回 true', function() {
      expect(isFalsy('')).to.equal(true);
    });
    it('NaN 返回 true', function() {
      expect(isFalsy(NaN)).to.equal(true);
    });
    it('Null 返回 true', function() {
      expect(isFalsy(null)).to.equal(true);
    });
    it('空对象返回 false', function() {
      expect(isFalsy({})).to.equal(false);
    });
    it('负数返回 false', function() {
      expect(isFalsy(-1)).to.equal(false);
    });
    it('空数组返回 false', function() {
      expect(isFalsy([])).to.equal(false);
    });
  });
  describe('测试 each', function() {
    it('遍历对象', function() {
      let obj = {
        name: 'test',
        age: 12,
        gender: 'male'
      };
      each(obj, function(v, k, o) {
        o[k] = k;
      });
      expect(obj).to.eql({ name: 'name', age: 'age', gender: 'gender' });
    });
    it('遍历数组', function() {
      let arr = [1, 2, 3];
      each(arr, function(v, k, o) {
        o[k] = o[k] + 1;
      });
      expect(arr).to.eql([2, 3, 4]);
    });
    it('遍历类数组对象', function() {
      let arrLike = {
        '0': 1,
        '1': 2,
        '2': 3,
        'length': 3
      };
      each(arrLike, function(v, k, o) {
        o[k] = o[k] + 1;
      });
      expect(arrLike).to.eql({
        '0': 2,
        '1': 3,
        '2': 4,
        'length': 3
      });
    });
    it('遍历字符串', function() {
      let arr = [];
      let cb = function(v, k) {
        arr.push(v);
      };
      each('abc', cb);
      expect(arr).to.eql(['a', 'b', 'c']);
    });
    it('遍历函数参数对象', function() {
      let arr = [];
      (function(a, b, c) {
        each(arguments, function(v, k) {
          arr.push(v);
        });
      })('x', 'y', 'z');
      expect(arr).to.eql(['x', 'y', 'z']);
    });
    it('false 抛出错误', function() {
      expect(() => {each(false, function(v, k) {console.log(k);})}).to.throwError();
    });
    it('0 抛出错误', function() {
      expect(() => {each(0, function(v, k) {console.log(k);})}).to.throwError();
    });
    it('undefined 抛出错误', function() {
      expect(() => {each(undefined, function(v, k) {console.log(k);})}).to.throwError();
    });
    it('null 抛出错误', function() {
      expect(() => {each(null, function(v, k) {console.log(k);})}).to.throwError();
    });
    it('空字符串抛出错误', function() {
      expect(() => {each('', function(v, k) {console.log(k);})}).to.throwError();
    });
    it('遍历函数', function() {
      expect(() => {
        each(new Function(), function(v, k) {
          console.log(k);
        });
      }).to.not.throwError();
    });
  });
  describe('测试 map', function() {
    it('遍历对象', function() {
      let obj = {
        name: 'test',
        age: 1
      };
      expect(map(obj, function(v, k) {
        return k;
      })).to.eql(['name', 'age']);
    });
    it('遍历数组', function() {
      let arr = [1, 2, 3];
      expect(map(arr, function(v, k) {
        return v * v;
      })).to.eql([1, 4, 9]);
    });
    it('遍历类数组对象', function() {
      let arrLike = {
        '0': 1,
        '1': 2,
        '2': 3,
        'length': 3
      };
      expect(map(arrLike, function(v, k) {
        return v * v;
      })).to.eql([1, 4, 9]);
    });
    it('遍历字符串', function() {
      expect(map('abc', function(v, k) {
        return v;
      })).to.eql(['a', 'b', 'c']);
    });
    it('遍历函数参数对象', function() {
      let res;
      (function() {
        res = map(arguments, function(v, k) {
          return v * v;
        })
      })(1, 2, 3);
      expect(res).to.eql([1, 4, 9]);
    })
  });
});