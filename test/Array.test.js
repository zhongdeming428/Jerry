/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 09:29:04 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-17 14:33:05
 */

const expect = require('expect.js');
const {
  max,
  min,
  sum,
  intersection,
  union,
  difference,
  removeDup,
  flatten
} = require('../src/packages/Array');

describe('*************************************测试 Array*************************************', function() {
  describe('测试 max', function(){
    it('非法参数报错', function() {
      expect(() => {max(true)}).to.throwError();
      expect(() => {max({})}).to.throwError();
    });
    it('返回正确结果', function() {
      expect(max([1, 2, 3])).to.equal(3);
      expect(max([1, '2', 3])).to.equal(3);
      expect(max([1, 2, 'a']) !== max([1, 2, 'a'])).to.equal(true);
      expect(max([10, 23, 13])).to.equal(23);
      expect(max('1234')).to.equal(4);
      expect(max({'0': 1, '1': 2, length: 2})).to.equal(2);
    });
  });
  describe('测试 min', function() {
    it('非法参数报错', function() {
      expect(() => {min(true)}).to.throwError();
      expect(() => {min({})}).to.throwError();
    });
    it('返回正确结果', function() {
      expect(min([1, 2, 3])).to.equal(1);
      expect(min([1, '2', 3])).to.equal(1);
      expect(min([5, '2', 3])).to.equal(2);
      expect(min([1, 2, 'a']) !== min([1, 2, 'a'])).to.equal(true);
      expect(min([10, 23, 13])).to.equal(10);
      expect(min('1234')).to.equal(1);
      expect(min({'0': 1, '1': 2, length: 2})).to.equal(1);
    });
  });
  describe('测试 sum', function() {
    it('非法参数报错', function() {
      expect(() => {sum()}).to.throwError();
      expect(() => {sum(12)}).to.throwError();
      expect(() => {sum(false)}).to.throwError();
      expect(() => {sum({})}).to.throwError();
    });
    it('正确求和', function() {
      expect(sum([])).to.equal(undefined);
      expect(sum('123')).to.equal('123');
      expect(sum(['123', '456'])).to.equal('123456');
      expect(sum([1, 3, 5])).to.equal(9);
      expect(sum(['Tom ', 'and ', 'Jerry'])).to.equal('Tom and Jerry');
      expect(sum({'0': 100, '1': 1, 'length': 2})).to.equal(101);
    });
  });
  describe('测试 intersection', function() {
    it('非法参数报错', function() {
      expect(() => {intersection()}).to.throwError();
      expect(() => {intersection(false)}).to.throwError();
      expect(() => {intersection({}, {})}).to.throwError();
      expect(() => {intersection(function() {}. false)}).to.throwError();
    });
    it('正确求出交集', function() {
      expect(intersection([], [])).to.eql([]);
      expect(intersection(['a', 'b', 'c'], ['c', 'x'])).to.eql(['c']);
      expect(intersection([], [1])).to.eql([]);
      expect(intersection('123', '234')).to.eql(['2', '3']);
      expect(intersection('数组的并集', '数组的所有元素的数组')).to.eql(['数', '组', '的']);
      expect(intersection([1, 2, 3, 4], [3, 4, 5, 6])).to.eql([3, 4]);
      expect(intersection([undefined, 1, 4], [4, 5, 6])).to.eql([4]);
      expect(intersection([undefined, 1], [2, undefined])).to.eql([undefined]);
    });
  });
  describe('测试 removeDup', function() {
    it('非法参数报错', function() {
      expect(() => {removeDup({})}).to.throwError();
      expect(() => {removeDup(false)}).to.throwError();
      expect(() => {removeDup()}).to.throwError();
      expect(() => {removeDup(null)}).to.throwError();
    });
    it('确保正确去重', function() {
      expect(removeDup([])).to.eql([]);
      expect(removeDup([1, 2])).to.eql([1, 2]);
      expect(removeDup([1, 2, 2, 1])).to.eql([1, 2]);
      expect(removeDup(['a', undefined, false, undefined])).to.eql(['a', undefined, false]);
    });
  });
  describe('测试 flatten', function() {
    it('非法参数报错', function() {
      expect(() => {flatten()}).to.throwError();
      expect(() => {flatten(false)}).to.throwError();
      expect(() => {flatten('')}).to.throwError();
      expect(() => {flatten({})}).to.throwError();
      expect(() => {flatten(Symbol())}).to.throwError();
    });
    it('正确展开高维数组', function() {
      expect(flatten([1, 2, 3])).to.eql([1, 2, 3]);
      expect(flatten([1, [2], 3])).to.eql([1, 2, 3]);
      expect(flatten([1, [2, 3]])).to.eql([1, 2, 3]);
      expect(flatten([1, [2, [3]]])).to.eql([1, 2, 3]);
      expect(flatten([1, [2, [3]]], true)).to.eql([1, 2, [3]]);
      expect(flatten([1, [2, [3, 4, 5]]], true)).to.eql([1, 2, [3, 4, 5]]);
    });
  });
  describe('测试 union', function() {
    it('非法参数报错', function() {
      expect(() => {union(false)}).to.throwError();
      expect(() => {union({})}).to.throwError();
      expect(() => {union(function() {})}).to.throwError();
      expect(() => {union(Symbol(1))}).to.throwError();
      expect(() => {union(12)}).to.throwError();
      expect(() => {union('false')}).to.throwError();
      expect(() => {union({'0': 1, length: 1})}).to.throwError();
    });
    it('正确求数组并集', function() {
      expect(union([])).to.eql([]);
      expect(union([2], [2])).to.eql([2]);
      expect(union([1, 3], [2])).to.eql([1, 3, 2]);
      expect(union(['a', 'b'], ['b', 'c'])).to.eql(['a', 'b', 'c']);
      expect(union([1, [2]], [3])).to.eql([1, 2, 3]);
      expect(union([1, [false, [undefined]]], [3, null])).to.eql([1, false, undefined, 3, null]);
      expect(union([1, [false, [undefined]]], [3, null, undefined, false, 1])).to.eql([1, false, undefined, 3, null]);
    });
  });
  describe('测试 difference', function() {
    it('非法参数报错', function() {
      expect(() => {difference()}).to.throwError();
      expect(() => {difference({})}).to.throwError();
      expect(() => {difference(false)}).to.throwError();
      expect(() => {difference(Symbol(1))}).to.throwError();
      expect(() => {difference(1)}).to.throwError();
    });
    it('确保正确求差集', function() {
      expect(difference([], [])).to.eql([]);
      expect(difference([1], [])).to.eql([1]);
      expect(difference([1, 2, 3], [2])).to.eql([1, 3]);
      expect(difference([1, '2', 3], [2])).to.eql([1, '2', 3]);
    });
  });
});