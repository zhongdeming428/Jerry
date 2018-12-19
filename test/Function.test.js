/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-19 15:11:33 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-19 15:23:25
 */

const {
  curry
} = require('../src/packages/Function');
const expect = require('expect.js');

describe('*************************************测试 Function *************************************', function() {
  describe('测试 curry', function() {
    it('测试非法参数报错', function() {
      expect(() => {curry({})}).to.throwError();
      expect(() => {curry(true)}).to.throwError();
      expect(() => {curry('')}).to.throwError();
      expect(() => {curry([])}).to.throwError();
    });
    it('确保正确柯里化', function() {
      let test1 = curry((a, b, c) => a + b + c);
      expect(test1(1, 2, 3)).to.be(6);
      expect(test1(1, 2)(3)).to.be(6);
      expect(test1(1)(2, 3)).to.be(6);
      expect(test1(1)(2)(3)).to.be(6);
      expect(test1(1, 2, 3, 4)).to.be(6);
      expect(test1(1, 2)).to.be.a(Function);
      let test2 = curry((a, b, c, d) => a + b + c + d);
      expect(test2(1, 2, 3, 4)).to.be(10);
      expect(test2(1)(2, 3, 4)).to.be(10);
      expect(test2(1, 2, 3)(4)).to.be(10);
      expect(test2(1, 2)(3, 4)).to.be(10);
      expect(test2(1, 3)(2, 4)).to.be(10);
      expect(test2(1)(2)(3, 4)).to.be(10);
      expect(test2(1, 2)(3)(4)).to.be(10);
      expect(test2(1)(2, 3)(4)).to.be(10);
      expect(test2(1)(2)(3)(4)).to.be(10);
    });
  });
});