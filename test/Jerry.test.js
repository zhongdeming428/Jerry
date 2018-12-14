/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-11 09:19:34 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-14 17:32:15
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
  it('Jerry 函数有 reduce 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry.reduce(arr, function(acc, v, k, a) {
      return acc + v;
    });
    expect(res).to.eql(9);
  });
  it('Jerry 函数有 contains 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry.contains(arr, 1);
    expect(res).to.equal(true);
  });
  it('Jerry 函数有 keys 函数', function() {
    let arr = { name: '', age: 12 };
    let res = Jerry.keys(arr);
    expect(res).to.eql(['name', 'age']);
  });
  it('Jerry 函数有 has 函数', function() {
    let arr = { name: '', age: 12 };
    let res = Jerry.has(arr, 'name');
    expect(res).to.equal(true);
  });
  it('Jerry 函数有 equals 函数', function() {
    let arr = { name: '', age: 12 };
    let res = Jerry.equals(arr, { age: 12, name: '' });
    expect(res).to.equal(true);
  });
  it('Jerry 函数有 add 函数', function() {
    let res = Jerry.add(0.2, 0.1);
    expect(res).to.equal(0.3);
  });
  it('Jerry 函数有 sub 函数', function() {
    let res = Jerry.sub(0.54, 0.19);
    expect(res).to.equal(0.35);
  });
  it('Jerry 函数有 mul 函数', function() {
    let res = Jerry.mul(0.55, 100);
    expect(res).to.equal(55);
  });
  it('Jerry 函数有 div 函数', function() {
    let res = Jerry.div(0.12, 0.3);
    expect(res).to.equal(0.4);
  });
  it('Jerry 函数有 factorial 函数', function() {
    let res = Jerry.factorial(5);
    expect(res).to.equal(120);
  });
  it('Jerry 函数有 toCurrency 函数', function() {
    let res = Jerry.toCurrency(1234.5);
    expect(res).to.equal('￥1,234.50');
  });
  it('Jerry 函数有 toChineseAmount 函数', function() {
    let res = Jerry.toChineseAmount(0.12);
    expect(res).to.equal('壹角贰分');
  });
  it('Jerry 函数有 toPhoneNumber 函数', function() {
    let res = Jerry.toPhoneNumber(13513131313);
    expect(res).to.equal('135-1313-1313');
  });
  it('Jerry 函数有 toDate 函数', function() {
    let res = Jerry.toDate(30212121, '-');
    expect(res).to.equal('3021-21-21');
  });
  it('Jerry 函数有 repeat 函数', function() {
    let res = Jerry.repeat('1', 2);
    expect(res).to.equal('11');
  });
  it('Jerry 函数有 insertStr 函数', function() {
    let res = Jerry.insertStr('1234');
    expect(res).to.equal('1,234');
  });
  it('Jerry 函数有 trimLeft 函数', function() {
    let res = Jerry.trimLeft(' 1234');
    expect(res).to.equal('1234');
  });
  it('Jerry 函数有 trimRight 函数', function() {
    let res = Jerry.trimRight('1234  ');
    expect(res).to.equal('1234');
  });
  it('Jerry 函数有 trim 函数', function() {
    let res = Jerry.trim('  1234  ');
    expect(res).to.equal('1234');
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
  it('Jerry 原型有 isRegExp 函数', function() {
    expect(Jerry(/\.test$/).isRegExp()).to.equal(true);
  });
  it('Jerry 原型有 isDate 函数', function() {
    expect(Jerry(new Date()).isDate()).to.equal(true);
  });
  it('Jerry 原型有 isUndefined 函数', function() {
    expect(Jerry().isUndefined()).to.equal(true);
  });
  it('Jerry 原型有 isNull 函数', function() {
    expect(Jerry(null).isNull()).to.equal(true);
  });
  it('Jerry 原型有 isFalsy 函数', function() {
    expect(Jerry('').isFalsy()).to.equal(true);
  });
  it('Jerry 原型有 each 函数', function() {
    let arr = [1, 3, 5];
    Jerry(arr).each(function(v, k, a) {
      a[k] = 1;
    });
    expect(arr).to.eql([1, 1, 1]);
  });
  it('Jerry 原型有 map 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry(arr).map(function(v, k, a) {
      return 1;
    });
    expect(res).to.eql([1, 1, 1]);
  });
  it('Jerry 原型有 reduce 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry(arr).reduce(function(acc, v, k, a) {
      return acc + v;
    });
    expect(res).to.eql(9);
  });
  it('Jerry 原型有 contains 函数', function() {
    let arr = [1, 3, 5];
    let res = Jerry(arr).contains(1);
    expect(res).to.equal(true);
  });
  it('Jerry 原型有 keys 函数', function() {
    let arr = { name: '', age: 12 };
    let res = Jerry(arr).keys();
    expect(res).to.eql(['name', 'age']);
  });
  it('Jerry 原型有 has 函数', function() {
    let arr = { name: '', age: 12 };
    let res = Jerry(arr).has('name');
    expect(res).to.equal(true);
  });
  it('Jerry 原型有 equals 函数', function() {
    let arr = { name: '', age: 12 };
    let res = Jerry(arr).equals({ age: 12, name: '' });
    expect(res).to.equal(true);
  });
  it('Jerry 原型有 add 函数', function() {
    let res = Jerry(0.2).add(0.1);
    expect(res).to.equal(0.3);
  });
  it('Jerry 原型有 sub 函数', function() {
    let res = Jerry(0.54).sub(0.19);
    expect(res).to.equal(0.35);
  });
  it('Jerry 原型有 mul 函数', function() {
    let res = Jerry(0.55).mul(100);
    expect(res).to.equal(55);
  });
  it('Jerry 原型有 div 函数', function() {
    let res = Jerry(0.12).div(0.3);
    expect(res).to.equal(0.4);
  });
  it('Jerry 原型有 factorial 函数', function() {
    let res = Jerry(5).factorial();
    expect(res).to.equal(120);
  });
  it('Jerry 原型有 toCurrency 函数', function() {
    let res = Jerry(1234.5).toCurrency();
    expect(res).to.equal('￥1,234.50');
  });
  it('Jerry 原型有 toChineseAmount 函数', function() {
    let res = Jerry(0.12).toChineseAmount();
    expect(res).to.equal('壹角贰分');
  });
  it('Jerry 原型有 toPhoneNumber 函数', function() {
    let res = Jerry(13513131313).toPhoneNumber();
    expect(res).to.equal('135-1313-1313');
  });
  it('Jerry 原型有 toDate 函数', function() {
    let res = Jerry(30212121).toDate('-');
    expect(res).to.equal('3021-21-21');
  });
  it('Jerry 原型有 repeat 函数', function() {
    let res = Jerry('1').repeat(2);
    expect(res).to.equal('11');
  });
  it('Jerry 原型有 insertStr 函数', function() {
    let res = Jerry('1234').insertStr();
    expect(res).to.equal('1,234');
  });
  it('Jerry 原型有 trimLeft 函数', function() {
    let res = Jerry(' 1234').trimLeft();
    expect(res).to.equal('1234');
  });
  it('Jerry 原型有 trimRight 函数', function() {
    let res = Jerry('1234  ').trimRight();
    expect(res).to.equal('1234');
  });
  it('Jerry 原型有 trim 函数', function() {
    let res = Jerry('  1234  ').trim();
    expect(res).to.equal('1234');
  });
});