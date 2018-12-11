/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-11 11:06:50 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-11 19:57:14
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
  isSymbol
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
})