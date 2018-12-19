/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 09:29:04 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-19 10:35:27
 */

const expect = require('expect.js');
const {
  max,
  min,
  sum,
  avg,
  intersection,
  union,
  difference,
  removeDup,
  flatten,
  variance,
  shuffle,
  groupBy,
  compact,
  pluck
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
      expect(sum([123, 456])).to.equal(579);
      expect(sum([1, 3, 5])).to.equal(9);
      expect(sum([0.1, 0.2])).to.equal(0.3);
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
  describe('测试 avg', function() {
    it('非法参数报错', function() {
      expect(() => {avg('123')}).to.throwError();
      expect(() => {avg(false, true)}).to.throwError();
    });
    it('返回正确结果', function() {
      expect(avg([1, 2, 3])).to.be(2);
      expect(avg([12, 23, 34])).to.be(23);
      expect(avg([11, 22, 33])).to.be(22);
      expect(avg([12, 13, -1])).to.be(8);
      expect(avg([110, 2, 5])).to.be(39);
    });
  });
  describe('测试 variance', function() {
    it('非法参数报错', function() {
      expect(() => {variance({})}).to.throwError();
      expect(() => {variance(false)}).to.throwError();
      expect(() => {variance('')}).to.throwError();
      expect(() => {variance(123)}).to.throwError();
    });
    it('求出正确的方差', function() {
      expect(variance([1, 2, 3])).to.be(2/3);
      expect(variance([1, 2, 3, 4])).to.be(1.25);
      expect(variance([1, 2, 3, 4, 5])).to.be(2);
      expect(variance([-1, 2, 3])).to.be(78/27);
    });
  });
  describe('测试 shuffle', function() {
    it('非法参数报错', function() {
      expect(() => {shuffle()}).to.throwError();
    });
    it('随机洗牌', function() {
      // expect(shuffle([1, 2, 3])).to.eql([3, 2, 1]);
      // expect(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])).to.eql([3, 2, 1]);
      // expect(shuffle(['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'])).to.eql([3, 2, 1]);
    });
  });
  describe('测试 groupBy', function() {
    it('非法参数报错', function() {
      expect(() => {groupBy()}).to.throwError();
      expect(() => {groupBy('')}).to.throwError();
      expect(() => {groupBy(false)}).to.throwError();
      expect(() => {groupBy({})}).to.throwError();
      expect(() => {groupBy({}, {})}).to.throwError();
    });
    it('正确归类', function() {
      expect(groupBy([1, 2, 3], v => String(v))).to.eql({'1': [1], '2': [2], '3': [3]});
      expect(groupBy([1, 2, 3], v => String(1))).to.eql({'1': [1, 2, 3]});
      expect(groupBy([{
        name: 'Jerry',
        age: 12
      }, {
        name: 'Tom', 
        age: 13
      }, {
        name: 'Jerry', 
        age: 12
      }], v => String(v.age))).to.eql({'12': [{
        name: 'Jerry',
        age: 12
      }, {
        name: 'Jerry', 
        age: 12
      }], 
    '13': [{
      name: 'Tom', 
      age: 13
    }]
    });
    });
  });
  describe('测试 compact', function() {
    it('错误参数报错', function() {
      expect(() => {
        compact('');
      }).to.throwError();
      expect(() => {
        compact(true);
      }).to.throwError();
      expect(() => {
        compact(123);
      }).to.throwError();
      expect(() => {
        compact({});
      }).to.throwError();
      expect(() => {
        compact();
      }).to.throwError();
    });
    it('正确 compact 数组', function() {
      expect(compact([1, 2, 3, false])).to.eql([1, 2, 3]);
      expect(compact([1, undefined, 2, 3, false])).to.eql([1, 2, 3]);
      expect(compact([1, 2, NaN, 3, false])).to.eql([1, 2, 3]);
      expect(compact([1, 2, 3, '', 4, false])).to.eql([1, 2, 3, 4]);
      expect(compact([1, 2, null, 3, false])).to.eql([1, 2, 3]);
    });
  });
  describe('测试 pluck', function() {
    it('非法参数报错', function() {
      expect(() => {
        pluck()
      }).to.throwError();
      expect(() => {
        pluck({})
      }).to.throwError();
      expect(() => {
        pluck({}, '')
      }).to.throwError();
      expect(() => {
        pluck(', ', '')
      }).to.throwError();
      expect(() => {
        pluck(true, '')
      }).to.throwError();
      expect(() => {
        pluck({}, [])
      }).to.throwError();
    });
    it('正确获取对象属性值', function() {
      expect(pluck([{
        name: 'Jerry'
      },{
        name: 'Tom'
      }], 'name')).to.eql(['Jerry', 'Tom']);
      expect(pluck([{
        age: 12
      },{
        age: 13
      },{
        age: 14
      }], 'age')).to.eql([12, 13, 14]);
      expect(pluck(['a', 'abc', 'abcde'], 'length')).to.eql([1, 3, 5]);
    });
  });
});