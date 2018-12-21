/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-13 14:32:28 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-21 17:37:47
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
  cutStr,
  truncate,
  mask,
  randomColor,
  reverseStr,
  capitalize,
  capitalizeEveryWord,
  escapeHTML,
  unescapeHTML,
  fromCamelCase,
  isAnagram,
  camelize,
  dasherize,
  underscored
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
      expect(() => {setUrlParam(function() {})}).to.not.throwError();
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
  describe('测试 truncate', function() {
    it('校验参数', function() {
      expect(() => {truncate(1)}).to.throwError();
      expect(() => {truncate(false)}).to.throwError();
      expect(() => {truncate({})}).to.throwError();
      expect(() => {truncate(1, '12')}).to.throwError();
      expect(() => {truncate('1', '12')}).to.throwError();
      expect(() => {truncate('1', {})}).to.throwError();
    });
    it('正确截断字符串', function() {
      expect(truncate('123', 2)).to.equal('12……');
      expect(truncate('SJFDSKHGNVNJFKLkjsfdlkjdskgsdoiewjgkds', 12)).to.equal('SJFDSKHGNVNJ……');
      expect(truncate('爱妃空间的说法奥斯卡级我让爱妃奥斯卡级VM 我', 11)).to.equal('爱妃空间的说法奥斯卡级……');
    });
  });
  describe('测试 mask', function() {
    it('参数错误校验', function() {
      expect(() => {mask({})}).to.throwError();
      expect(() => {mask({}, false)}).to.throwError();
      expect(() => {mask('1', '12')}).to.throwError();
      expect(() => {mask(1, '12')}).to.throwError();
      expect(() => {mask(false, 1)}).to.throwError();
    });
    it('返回正确结果', function() {
      expect(mask('123', '2*2')).to.be('1*3');
      expect(mask('19828288282', '111****1111')).to.be('198****8282');
      expect(mask('123', '22*')).to.be('12*');
      expect(mask('123', '*22')).to.be('*23');
      expect(mask('123')).to.be('***');
      expect(mask('')).to.be('');
    });
  });
  describe('测试 randomColor', function() {
    it('测试 rgb 格式', function() {
      // expect(randomColor(true)).to.equal();
    });
    it('测试非 rgb 格式', function() {
      // expect(randomColor()).to.equal();
    })
  });
  describe('测试 reverseStr', function() {
    it('确保字符串反转', function() {
      expect(reverseStr('123')).to.equal('321');
      expect(reverseStr('abc')).to.equal('cba');
      expect(reverseStr(' 12 3')).to.equal('3 21 ');
    });
  });
  describe('测试 capitalize', function() {
    it('确保字符串首字母大写', function() {
      expect(capitalize('123')).to.equal('123');
      expect(capitalize('abc')).to.equal('Abc');
      expect(capitalize('abC')).to.equal('AbC');
      expect(capitalize('abC', true)).to.equal('Abc');
      expect(capitalize(' 12 3')).to.equal(' 12 3');
    });
  });
  describe('测试 capitalizeEveryWord', function() {
    it('确保字符串中所有单词首字母大写', function() {
      expect(capitalizeEveryWord('123')).to.equal('123');
      expect(capitalizeEveryWord('abc def')).to.equal('Abc Def');
      expect(capitalizeEveryWord('hello world')).to.equal('Hello World');
    });
  });
  describe('测试 escapeHTML', function() {
    it('确保字符串 HTML 转码', function() {
      expect(escapeHTML('<123>')).to.equal('&lt;123&gt;');
      expect(escapeHTML('<abc def/>')).to.equal('&lt;abc def/&gt;');
      expect(escapeHTML("<h1>'Hello'</h2>")).to.equal('&lt;h1&gt;&#39;Hello&#39;&lt;/h2&gt;');
      expect(escapeHTML("<h1>'Hello' & " + 'world"</h2>')).to.equal('&lt;h1&gt;&#39;Hello&#39; &amp; world&quot;&lt;/h2&gt;');
    });
  });
  describe('测试 unescapeHTML', function() {
    it('确保字符串 HTML 编码', function() {
      expect(unescapeHTML('&lt;123&gt;')).to.equal('<123>');
      expect(unescapeHTML('&lt;abc def/&gt;')).to.equal('<abc def/>');
      expect(unescapeHTML("&lt;h1&gt;&#39;Hello&#39;&lt;/h2&gt;")).to.equal("<h1>'Hello'</h2>");
      expect(unescapeHTML("&lt;h1&gt;&#39;Hello&#39; &amp; world&quot;&lt;/h2&gt;")).to.equal("<h1>'Hello' & " + 'world"</h2>');
    });
  });
  describe('测试 fromCamelCase', function() {
    it('确保字符串从驼峰式风格转化为间隔符打断风格', function() {
      expect(fromCamelCase('fromCamelCase')).to.equal('from_camel_case');
      expect(fromCamelCase('isModuleNamed')).to.equal('is_module_named');
      expect(fromCamelCase('getFullYear', '-')).to.equal('get-full-year');
    });
  });
  describe('测试 isAnagram', function() {
    it('判断两字符串是否是同字母异序字符串', function() {
      expect(isAnagram('fromCamelCase', 'camelfromcase')).to.equal(true);
      expect(isAnagram('isModuleNamed', 'moduleISnamed')).to.equal(true);
      expect(isAnagram('getFullYear', 'yeargetfull')).to.equal(true);
      expect(isAnagram('getFullYear', 'yeargetfull!')).to.equal(false);
    });
  });
  describe('测试 camelize', function() {
    it('将字符串转化为驼峰风格', function() {
      expect(camelize('grid-container')).to.equal('gridContainer');
      expect(camelize('css_style_name')).to.equal('cssStyleName');
      expect(camelize('hello world test')).to.equal('helloWorldTest');
      expect(camelize('underscore_name-style_mix')).to.equal('underscoreNameStyleMix');
    });
  });
  describe('测试 dasherize', function() {
    it('将字符串转化为连字符风格', function() {
      expect(dasherize('gridContainer')).to.equal('grid-container');
      expect(dasherize('cssStyleName')).to.equal('css-style-name');
      expect(dasherize('hello_world_test')).to.equal('hello-world-test');
      expect(dasherize('underscore_nameStyle_mix')).to.equal('underscore-name-style-mix');
    });
  });
  describe('测试 underscored', function() {
    it('将字符串转化为连字符风格', function() {
      expect(underscored('gridContainer')).to.equal('grid_container');
      expect(underscored('cssStyleName')).to.equal('css_style_name');
      expect(underscored('hello-world-test')).to.equal('hello_world_test');
      expect(underscored('underscore nameStyle-mix')).to.equal('underscore_name_style_mix');
    });
  });
});