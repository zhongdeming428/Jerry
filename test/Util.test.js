/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-11 11:06:50 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-17 14:14:03
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
  isInt,
  isFalsy,
  isElement,
  each,
  map,
  reduce,
  filter,
  contains,
  keys,
  has,
  equals
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
    it('NaN 返回 false', function() {
      expect(isNumber(NaN)).to.equal(false)
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
    it('函数返回 false', function() {
      expect(isArray(function() {})).to.not.be.ok();
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
  describe('测试 isInt 函数', function() {
    it('字面量整数返回 true', function() {
      expect(isInt(12)).to.equal(true);
    });
    it('构造的整数返回 true', function() {
      expect(isInt(new Number(12))).to.equal(true);
    });
    it('包装的整数返回 true', function() {
      expect(isInt(Number(12))).to.equal(true);
    });
    it('小数部分为 0 的小数返回 true', function() {
      expect(isInt(120.00)).to.equal(true);
    });
    it('小数部分不为 0 的小数返回 false', function() {
      expect(isInt(120.001)).to.equal(false);
    });
    it('负整数返回 true', function() {
      expect(isInt(-120)).to.equal(true);
    });
    it('负小数（小数部分不为 0）返回 false', function() {
      expect(isInt(-120.001)).to.equal(false);
    });
    it('无穷大返回 false', function() {
      expect(isInt(Infinity)).to.equal(false);
      expect(isInt(-Infinity)).to.equal(false);
    });
    it('负小数（小数部分为 0）返回 true', function() {
      expect(isInt(-120.00)).to.equal(true);
    });
    it('0 返回 true', function() {
      expect(isInt(0)).to.equal(true);
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
  describe('测试 isElement', function() {
    it('测试 isElement', function() {
      expect(() => {isElement()}).to.throwError();
      expect(isElement({nodeType: 1})).to.equal(true);
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
  describe('测试 reduce', function() {
    it('[1, 3, 5] 累加返回 9（不传初始值）', function() {
      expect(reduce([1, 3, 5], function(acc, v, k, o) {
        return acc + v;
      })).to.equal(9);
    });
    it('["a", "b", "c"] 累加返回 abc（不传初始值）', function() {
      expect(reduce(["a", "b", "c"], function(acc, v, k, o) {
        return acc + v;
      })).to.equal("abc");
    });
    it('[1, 3, 5] 累加返回 10（传递初始值为 1）', function() {
      expect(reduce([1, 3, 5], function(acc, v, k, o) {
        return acc + v;
      }, 1)).to.equal(10);
    });
    it('["a", "b", "c"] 累加返回 dabc（传递初始值为 "d"）', function() {
      expect(reduce(["a", "b", "c"], function(acc, v, k, o) {
        return acc + v;
      }, "d")).to.equal("dabc");
    });
    it('二维数组转化为一维', function() {
      expect(reduce([[1, 2], [2, 3]], function(acc, v, k, o) {
        return [...acc, ...v];
      })).to.eql([1, 2, 2, 3]);
    });
  });
  describe('测试 filter', function() {
    it('非法参数报错', function() {
      expect(() => {filter()}).to.throwError();
      expect(() => {filter(false)}).to.throwError();
      expect(() => {filter({})}).to.throwError();
      expect(() => {filter(Symbol(1))}).to.throwError();
    });
    it('确保正确过滤', function() {
      expect(filter([1, 2], () => false)).to.eql([]);
      expect(filter([1, 2], () => true)).to.eql([1, 2]);
      expect(filter([1, 2], item => item > 1)).to.eql([2]);
      expect(filter([1, 2, 3], item => item > 1)).to.eql([2, 3]);
    });
  });
  describe('测试 contains', function() {
    it('非法参数报错', function() {
      expect(() => {contains(Symbol(1))}).to.throwError();
      expect(() => {contains(false)}).to.throwError();
      expect(() => {contains(12)}).to.throwError();
      expect(() => {contains({})}).to.throwError();
    });
    it('确保功能正常', function() {
      expect(contains([1, 2], 2)).to.equal(true);
      expect(contains([1, '2'], '2')).to.equal(true);
      expect(contains([1, 2, true], true)).to.equal(true);
      expect(contains([1, 2, NaN], NaN)).to.equal(true);
      expect(contains([1, 2, undefined], undefined)).to.equal(true);
    });
  });
  describe('测试 keys', function() {
    it('正确返回属性数组', function() {
      expect(keys({})).to.eql([]);
      expect(keys({name: ''})).to.eql(['name']);
      expect(keys()).to.eql([]);
      expect(keys('')).to.eql([]);
      expect(keys({age: 12})).to.eql(['age']);
    });
  });
  describe('测试 has', function() {
    it('正确检测属性', function() {
      expect(has({}, 'name')).to.equal(false);
      expect(has({name: ''}, 'name')).to.equal(true);
      expect(has({age: 12}, 'age')).to.equal(true);
      expect(has({person: {name: ''}}, ['person', 'name'])).to.equal(true);
    });
    it('非法参数报错', function() {
      expect(() => {has()}).to.throwError();
      expect(() => {has({})}).to.throwError();
      expect(() => {has({}, 12)}).to.throwError();
      expect(() => {has(12)}).to.throwError();
    });
  });
  describe('测试 equals', function() {
    it('确保正确判断', function() {
      expect(equals(NaN, NaN)).to.equal(true);
      expect(equals(function() {}, function() {})).to.equal(false);
      expect(equals({}, {})).to.equal(true);
      expect(equals(0, -0)).to.equal(false);
      expect(equals([], [])).to.equal(true);
      expect(equals(undefined, undefined)).to.equal(true);
      expect(equals(null, null)).to.equal(true);
      expect(equals({name: 'test', age: 12}, {age: 12, name: 'test'})).to.equal(true);
      expect(equals([12, 23, 3], [12, 23, 3])).to.equal(true);
      expect(equals([1, 4, 2, 3], [1, 2, 4, 3])).to.equal(false);
      expect(equals({person: {name: 'test', age: 12, friends: [1, 2, 3]}}, {person: {name: 'test', age: 12, friends: [1, 2, 3]}})).to.equal(true);
      expect(equals(/\.js$/gi, /\.js$/ig)).to.equal(true);
      expect(equals(new Date('2018-12-12'), new Date('2018-12-12'))).to.equal(true);
      expect(equals()).to.equal(true);
      expect(equals({})).to.equal(false);
      expect(equals(1)).to.equal(false);
      expect(equals(1, 1)).to.equal(true);
      expect(equals(-1, -1)).to.equal(true);
      expect(equals(1, 1.0)).to.equal(true);
      expect(equals('', '')).to.equal(true);
      expect(equals('12', '12')).to.equal(true);
    });
  });
  describe('检测 contains', function() {
    it('非法参数报错', function() {
      expect(() => {contains()}).to.throwError();
      expect(() => {contains(12)}).to.throwError();
      expect(() => {contains(1, 2)}).to.throwError();
      expect(() => {contains(false, true)}).to.throwError();
    });
    it('确保正确检测数组', function() {
      expect(contains([1, 2, 3], 1)).to.equal(true);
      expect(contains([1, '2', 3], '2')).to.equal(true);
      expect(contains([1, 2, '3'], 3)).to.equal(false);
      expect(contains([1, NaN, 3], NaN)).to.equal(true);
      expect(contains([1, undefined, 3], undefined)).to.equal(true);
      expect(contains([1, {}, 3], {})).to.equal(true);
      expect(contains([1, [], 3], [])).to.equal(true);
      expect(contains([1, true, 3], true)).to.equal(true);
      expect(contains([1, {name: 'test', age: 1}, 3], {name: 'test', age: 1})).to.equal(true);
    });
    it('确保正确检测类数字对象', function() {
      expect(contains('123', 2)).to.equal(true);
      expect(contains('1234', '2')).to.equal(true);
      expect(contains('abcd', 'abc')).to.equal(true);
      expect(contains('xyz', 'xz')).to.equal(false);
      expect(contains({'0': 12, length: 1}, 12)).to.equal(true);
      expect(contains({'0': 12, '1': 'name', length: 2}, 'name')).to.equal(true);
    });
  });
});