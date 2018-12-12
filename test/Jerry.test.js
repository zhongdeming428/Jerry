/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-11 09:19:34 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-12 15:53:12
 */
const Jerry = require('../src/index');
const expect = require('expect.js');

describe('*************************************Jerry 对象测试*************************************', () => {
  it('Jerry 函数式构造对象', function() {
    expect(Jerry() instanceof Jerry).to.be.ok();
  });
  it('Jerry 类式构造对象', function() {
    expect(new Jerry() instanceof Jerry).to.be.ok();
  });
  it('Jerry 构造对象校验', function() {
    expect(Jerry('name')).to.be.eql({_wrapped: 'name'});
  });
  it('Jerry 重复构造对象校验', function() {
    expect(Jerry(Jerry('name'))).to.be.eql({_wrapped: 'name'});
  });
  it('Jerry 版本号校验', function() {
    expect(Jerry.__VERSION__).to.be.a('string');
  });
  /*****************************************检查 Jerry 对象自身属性********************************************/
  it('Jerry 函数有 mixin 函数', function() {
    let obj = {
      name: 'test'
    };
    Jerry.mixin(obj, { age: 12 });
    expect(obj).to.eql({ name: 'test', age: 12 });
  });
  it('Jerry 函数有 isFunction 函数', function() {
    expect(Jerry.isFunction(new Function())).to.equal(true);
  });
  it('Jerry 函数有 isNumber 函数', function() {
    expect(Jerry.isNumber(12)).to.equal(true);
  });
  it('Jerry 函数有 isPlainObject 函数', function() {
    expect(Jerry.isPlainObject({})).to.equal(true);
  });
  it('Jerry 函数有 isObject 函数', function() {
    expect(Jerry.isObject({})).to.equal(true);
  });
  it('Jerry 函数有 isString 函数', function() {
    expect(Jerry.isString('')).to.equal(true);
  });
  it('Jerry 函数有 isArray 函数', function() {
    expect(Jerry.isArray([])).to.equal(true);
  });
  it('Jerry 函数有 isArrayLike 函数', function() {
    expect(Jerry.isArrayLike(arguments)).to.equal(true);
  });
  it('Jerry 函数有 isNaN 函数', function() {
    expect(Jerry.isNaN(NaN)).to.equal(true);
  });
  it('Jerry 函数有 isSymbol 函数', function() {
    expect(Jerry.isSymbol(Symbol())).to.equal(true);
  });
  it('Jerry 函数有 isRegExp 函数', function() {
    expect(Jerry.isRegExp(/\.test$/)).to.equal(true);
  });
  it('Jerry 函数有 isDate 函数', function() {
    expect(Jerry.isDate(new Date())).to.equal(true);
  });
  it('Jerry 函数有 isUndefined 函数', function() {
    expect(Jerry.isUndefined()).to.equal(true);
  });
  it('Jerry 函数有 isNull 函数', function() {
    expect(Jerry.isNull(null)).to.equal(true);
  });
  it('Jerry 函数有 isFalsy 函数', function() {
    expect(Jerry.isFalsy('')).to.equal(true);
  });
  it('Jerry 函数有 each 函数', function() {
    let arr = [1, 3, 5];
    Jerry.each(arr, function(v, k, a) {
      a[k] = 1;
    });
    expect(arr).to.eql([1, 1, 1]);
  });
  it('Jerry 函数有 map 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry.map(arr, function(v, k, a) {
      return 1;
    });
    expect(res).to.eql([1, 1, 1]);
  });
  /*****************************************检查 Jerry 原型对象属性********************************************/
  it('Jerry 原型有 mixin 属性', function() {
    expect(Jerry.prototype.mixin).to.be.a(Function);
  });
  it('Jerry 原型的 mixin 函数可以省略第一个参数1',function() {
    expect(Jerry({ name: 'test' }).mixin({})).to.be.eql({ _wrapped: { name: 'test' } });
  });
  it('Jerry 原型的 mixin 函数可以省略第一个参数2',function() {
    expect(Jerry({ name: 'test' }).mixin({ age: 12 })).to.be.eql({ _wrapped: { name: 'test', age: 12 } });
  });
  it('Jerry 原型有 isFunction 函数', function() {
    expect(Jerry.prototype.isFunction).to.be.a(Function);
  });
  it('Jerry 原型的 isFunction 函数可以使用', function() {
    expect(Jerry(new Function).isFunction()).to.be.ok();
  });
  it('Jerry 原型的 isFunction 函数可以使用', function() {
    expect(Jerry(new Function).isFunction()).to.equal(true);
  });
  it('Jerry 原型的 isNumber 函数可以使用', function() {
    expect(Jerry(12).isNumber()).to.equal(true);
  });
  it('Jerry 原型的 isPlainObject 函数可以使用', function() {
    expect(Jerry({}).isPlainObject()).to.equal(true);
  });
  it('Jerry 原型的 isObject 函数可以使用', function() {
    function CustomObj () {
      this.name = 'test';
    }
    expect(Jerry(new CustomObj()).isObject()).to.equal(true);
  });
  it('Jerry 原型的 isString 函数可以使用', function() {
    expect(Jerry('').isString()).to.equal(true);
  });
  it('Jerry 原型的 isArray 函数可以使用', function() {
    expect(Jerry([]).isArray()).to.equal(true);
  });
  it('Jerry 原型的 isArrayLike 函数可以使用', function() {
    expect(Jerry(arguments).isArrayLike()).to.equal(true);
  });
  it('Jerry 原型的 isNaN 函数可以使用', function() {
    expect(Jerry(NaN).isNaN()).to.equal(true);
  });
  it('Jerry 原型的 isSymbol 函数可以使用', function() {
    expect(Jerry(Symbol(12)).isSymbol()).to.equal(true);
  });
  it('Jerry 函数有 isRegExp 函数', function() {
    expect(Jerry(/\.test$/).isRegExp()).to.equal(true);
  });
  it('Jerry 函数有 isDate 函数', function() {
    expect(Jerry(new Date()).isDate()).to.equal(true);
  });
  it('Jerry 函数有 isUndefined 函数', function() {
    expect(Jerry().isUndefined()).to.equal(true);
  });
  it('Jerry 函数有 isNull 函数', function() {
    expect(Jerry(null).isNull()).to.equal(true);
  });
  it('Jerry 函数有 isFalsy 函数', function() {
    expect(Jerry('').isFalsy()).to.equal(true);
  });
  it('Jerry 函数有 each 函数', function() {
    let arr = [1, 3, 5];
    Jerry(arr).each(function(v, k, a) {
      a[k] = 1;
    });
    expect(arr).to.eql([1, 1, 1]);
  });
  it('Jerry 函数有 map 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry(arr).map(function(v, k, a) {
      return 1;
    });
    expect(res).to.eql([1, 1, 1]);
  });
});