const {
  add,
  sub,
  mul,
  div,
  factorial,
  toCurrency,
  toChineseAmount,
  toPhoneNumber,
  toDate
} = require('../src/packages/Number');
const expect = require('expect.js');

describe('*************************************测试 Number *************************************', function() {
  describe('测试 add 函数', function() {
    it('1 === 1', function() {
      expect(add(1)).to.equal(1);
      expect(add(0, 1, 2, 3)).to.equal(6);
      expect(add(-1, -2)).to.equal(-3);
      expect(add(-1, 1)).to.equal(0);
      expect(add(-0.1, -0.2)).to.equal(-0.3);
      expect(add(0.1, 0.2)).to.equal(0.3);
      expect(add(0.19, 0.1)).to.equal(0.29);
      expect(add(0.29, 0.15)).to.equal(0.44);
      expect(add(0.33, 0.1)).to.equal(0.43);
    });
    it('传入非数字或 0 参数时报错', function() {
      expect(() => {add(1, {})}).to.throwError();
      expect(() => {add(1, null)}).to.throwError();
      expect(() => {add(1, undefined)}).to.throwError();
      expect(() => {add(1, true)}).to.throwError();
      expect(() => {add(1, '')}).to.throwError();
      expect(() => {add(1, [])}).to.throwError();
      expect(() => {add(1, function(){})}).to.throwError();
      expect(() => {add()}).to.throwError();
    });
  });
  describe('测试 div 函数', function() {
    it('传入非数字时报错', function() {
      expect(() => {div(1, {})}).to.throwError();
      expect(() => {div(1, null)}).to.throwError();
      expect(() => {div(1, undefined)}).to.throwError();
      expect(() => {div(1, true)}).to.throwError();
      expect(() => {div(1, '')}).to.throwError();
      expect(() => {div(1, [])}).to.throwError();
      expect(() => {div(1, function(){})}).to.throwError();
      expect(() => {div()}).to.throwError();
    });
    it('被除数为 0 时返回无穷大', function() {
      expect(div(1, 0)).to.equal(Infinity);
      expect(div(-1, 0)).to.equal(-Infinity);
      expect(div(1.2, 0)).to.equal(Infinity);
      expect(div(100, 0, 1, 2)).to.equal(Infinity);
    });
    it('传入一个参数时返回自身', function() {
      expect(div(1)).to.equal(1);
      expect(div(-1)).to.equal(-1);
    });
    it('计算一系列除法运算不丢失精度', function() {
      expect(div(0.3, -0.2)).to.equal(-1.5);
      expect(div(-0.3, 0.2)).to.equal(-1.5);
      expect(div(0.3, 0.2)).to.equal(1.5);
      expect(div(0.6, 0.2)).to.equal(3);
      expect(div(1.2, 0.2)).to.equal(6);
      expect(div(1.2, 0.4)).to.equal(3);
    });
  });
  describe('测试 sub 函数', function() {
    it('传入非数字时报错', function() {
      expect(() => {sub(1, {})}).to.throwError();
      expect(() => {sub(1, null)}).to.throwError();
      expect(() => {sub(1, undefined)}).to.throwError();
      expect(() => {sub(1, true)}).to.throwError();
      expect(() => {sub(1, '')}).to.throwError();
      expect(() => {sub(1, [])}).to.throwError();
      expect(() => {sub(1, function(){})}).to.throwError();
      expect(() => {sub()}).to.throwError();
    });
    it('传入一个参数时返回自身', function() {
      expect(sub(1)).to.equal(1);
      expect(sub(-1)).to.equal(-1);
      expect(sub(1.2)).to.equal(1.2);
      expect(sub(100)).to.equal(100);
      expect(sub(-100)).to.equal(-100);
    });
    it('多参数计算', function() {
      expect(sub(1, 2, 3, 4)).to.equal(-8);
      expect(sub(100, 20, 20, 20, 20)).to.equal(20);
      expect(sub(1.2, 0.2, 0.2, 0.2)).to.equal(0.6);
      expect(sub(100, 1, 1, 1)).to.equal(97);
      expect(sub(-100, 1, 1, 1)).to.equal(-103);
    });
    it('计算不丢失精度', function() {
      expect(sub(-0.3, 0.1)).to.equal(-0.4);
      expect(sub(0.3, -0.1)).to.equal(0.4);
      expect(sub(0.3, 0.1)).to.equal(0.2);
      expect(sub(0.4, 0.3)).to.equal(0.1);
      expect(sub(0.55, 0.19)).to.equal(0.36);
      expect(sub(0.18, 0.1)).to.equal(0.08);
    });
  });
  describe('测试 mul 函数', function() {
    it('计算不丢失精度', function() {
      expect(mul(0.55, 0.2)).to.equal(0.11);
      expect(mul(0.3, 3)).to.equal(0.9);
      expect(mul(0.3, 6)).to.equal(1.8);
      expect(mul(0.55, 100)).to.equal(55);
      expect(mul(0.36, 10)).to.equal(3.6);
    });
    it('任意参数为 0 时返回为 0', function() {
      expect(mul(0)).to.equal(0);
      expect(mul(1, 0)).to.equal(0);
      expect(mul(0, 1)).to.equal(0);
      expect(mul(100, 2, 0)).to.equal(0);
    });
    it('多参数计算', function() {
      expect(mul(2, 3)).to.equal(6);
      expect(mul(0.19, -12)).to.equal(-2.28);
      expect(mul(1, 2, 3, 4)).to.equal(24);
      expect(mul(0.55, 100, 2)).to.equal(110);
    });
  });
  describe('测试 factorial', function() {
    it('0 返回 0', function() {
      expect(factorial(0)).to.equal(0);
    });
    it('负数或小数报错', function() {
      expect(() => {factorial(-1)}).to.throwError();
      expect(() => {factorial(-1.1)}).to.throwError();
      expect(() => {factorial(-0.1)}).to.throwError();
      expect(() => {factorial(1.1)}).to.throwError();
      expect(() => {factorial(0.1)}).to.throwError();
    });
    it('计算值确保正确', function() {
      expect(factorial(1)).to.equal(1);
      expect(factorial(2)).to.equal(2);
      expect(factorial(3)).to.equal(6);
      expect(factorial(4)).to.equal(24);
      expect(factorial(5)).to.equal(120);
    });
  });
  describe('测试 toCurrency', function() {
    it('传入非法参数报错', function() {
      expect(() => {toCurrency()}).to.throwError();
      expect(() => {toCurrency(20, '', '')}).to.throwError();
      expect(() => {toCurrency('20', '', '')}).to.throwError();
      expect(() => {toCurrency('20', 1, '')}).to.throwError();
    });
    it('确保正确转化', function() {
      expect(toCurrency(2, '$', 2)).to.equal('$2.00');
      expect(toCurrency(22, '$', 2)).to.equal('$22.00');
      expect(toCurrency(222, '$', 2)).to.equal('$222.00');
      expect(toCurrency(2222, '$', 2)).to.equal('$2,222.00');
      expect(toCurrency(2222, '$', 3)).to.equal('$2,222.000');
      expect(toCurrency(2222.1, '$', 2)).to.equal('$2,222.10');
      expect(toCurrency(2222.1, '￥', 2)).to.equal('￥2,222.10');
      expect(toCurrency(22.1, '￥', 2)).to.equal('￥22.10');
      expect(toCurrency(2222.1)).to.equal('￥2,222.10');
      expect(toCurrency(1018899800)).to.equal('￥1,018,899,800.00');
      expect(toCurrency(101889980, '￡', 3)).to.equal('￡101,889,980.000');
    });
  });
  describe('测试 toChineseAmount', function() {
    it('过滤非法参数', function() {
      expect(() => {toChineseAmount()});
      expect(() => {toChineseAmount(2123123122121.35)}).to.throwError();
    });
    it('确保正确转化为大写金额', function() {
      expect(toChineseAmount(0.23)).to.equal('贰角叁分');
      expect(toChineseAmount(0.03)).to.equal('叁分');
      expect(toChineseAmount(1.03)).to.equal('壹圆零叁分');
      expect(toChineseAmount(1.23)).to.equal('壹圆贰角叁分');
      expect(toChineseAmount(123)).to.equal('壹佰贰拾叁圆');
      expect(toChineseAmount(123.333)).to.equal('壹佰贰拾叁圆叁角叁分');
      expect(toChineseAmount(123.35)).to.equal('壹佰贰拾叁圆叁角伍分');
      expect(toChineseAmount(123.05)).to.equal('壹佰贰拾叁圆零伍分');
      expect(toChineseAmount(123.0)).to.equal('壹佰贰拾叁圆');
      expect(toChineseAmount(1234567.5)).to.equal('壹佰贰拾叁万肆仟伍佰陆拾柒圆伍角');
      expect(toChineseAmount(123123122121.35)).to.equal('壹仟贰佰叁拾壹亿贰仟叁佰壹拾贰万贰仟壹佰贰拾壹圆叁角伍分');
      expect(toChineseAmount(123456789123.35)).to.equal('壹仟贰佰叁拾肆亿伍仟陆佰柒拾捌万玖仟壹佰贰拾叁圆叁角伍分');
    });
  });
  describe('测试 toPhoneNumber', function() {
    it('非法参数报错', function() {
      expect(() => {toPhoneNumber()}).to.throwError();
      expect(() => {toPhoneNumber('123')}).to.throwError();
      expect(() => {toPhoneNumber(123)}).to.throwError();
      expect(() => {toPhoneNumber(false)}).to.throwError();
      expect(() => {toPhoneNumber({})}).to.throwError();
      expect(() => {toPhoneNumber(null)}).to.throwError();
      expect(() => {toPhoneNumber(123123413245)}).to.throwError();
      expect(() => {toPhoneNumber('12312341234')}).to.throwError();
    });
    it('确保正确转化', function() {
      expect(toPhoneNumber(13873789595)).to.equal('138-7378-9595');
      expect(toPhoneNumber(15915654595)).to.equal('159-1565-4595');
    });
  });
  describe('测试 toDate', function() {
    it('非法参数报错', function() {
      expect(() => {toDate()}).to.throwError();
      expect(() => {toDate('123')}).to.throwError();
      expect(() => {toDate(123, '-')}).to.throwError();
      expect(() => {toDate(false, '-')}).to.throwError();
      expect(() => {toDate({}, '-')}).to.throwError();
      expect(() => {toDate(null, '-')}).to.throwError();
      expect(() => {toDate(123123413245, '/')}).to.throwError();
      expect(() => {toDate('12312341234', '-')}).to.throwError();
    });
    it('确保正确转化', function() {
      expect(toDate(20181212, '-')).to.equal('2018-12-12');
      expect(toDate(15915654, '/')).to.equal('1591/56/54');
    });
  });
});