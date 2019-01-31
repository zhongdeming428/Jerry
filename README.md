<center><img src="./docs/Jerry.png" alt="Jerry"/></center>

![](https://img.shields.io/github/license/zhongdeming428/Jerry.svg)
[![Build Status](https://travis-ci.org/zhongdeming428/Jerry.svg?branch=master)](https://travis-ci.org/zhongdeming428/Jerry)
![](https://img.shields.io/npm/v/jerrytools.svg)
[![codecov](https://codecov.io/gh/zhongdeming428/Jerry/branch/master/graph/badge.svg)](https://codecov.io/gh/zhongdeming428/Jerry)

这个项目是基于个人兴趣所写的一个个人认为比较实用的代码库，收录了一些日常开发中比较常用的功能代码，通过使用这个工具库可以节省一些写工具函数的时间。

如果你想为这个项目做贡献，请参考一下说明：

* [项目声明](https://github.com/zhongdeming428/Jerry/blob/master/CODE_OF_CONDUCT.md)

* [提交代码注意事项](https://github.com/zhongdeming428/Jerry/blob/master/CONTRIBUTING.md)

尤其是在你写代码之前，请注意仔细阅读提交代码所要注意的事项。

此外，如果你有任何好的想法，欢迎在 issues 发布新的 issues。如果你想提供好的意见，增加实用的新功能，可以在已有的 [New Features](https://github.com/zhongdeming428/Jerry/issues/2) 下面留言。

## 如何在本地构建

首先，拷贝代码到本地：

```bash
$ git clone https://github.com/zhongdeming428/Jerry.git
```

然后切换文件夹、安装依赖：

```bash
$ cd Jerry && npm i
```

然后就可以通过运行 npm 脚本开始构建：

```bash
$ npm run build
```

另外，通过 `npm run test` 可以运行所有测试案例，通过 `npm run eslint` 可以检测代码风格是否符合规范。

## Get Started

使用 Jerry 的方式有两种，一是通过 `script` 标签引入，二是通过 `npm` 安装。

引入标签可以通过 [unpkg](https://unpkg.com/#/) 提供的 CDN 服务。

通过 unpkg 引入的话，只能通过 Jerry 这个变量来使用：

```js
Jerry.isNumber(12); //true
```
当然，你可以把 Jerry 赋值给简短的符号：

```js
const $ = window.Jerry;
```

npm 安装：

```bash
$ npm i jerrytools -S
```

使用的时候，通过 `import` 或者 `require` 引入就好了：

```js
const $ = require('jerrytools');
// 或者 import $ from 'jerrytools';

// 然后就可以开始使用啦！
$.isNumber(123);
```

当然也可以通过如下方式使用，这样就可以把第一个参数构造为一个 Jerry 对象，在某些时候可以进行链式调用。

```js
$(123).isNumber(); // true
```

## 使用文档

以下代码的前提是已经引入了

### String 类

**repeat**

将指定字符串重复 n 次

> @param {String} str 要重复的字符串
>
> @param {Number} num 要重复的次数
>
> 返回新字符串

使用示例：

```js
$.repeat('abc', 2); // 'abcabc'

$('123').repeat(3); // '123123123'
```

**insertStr**

对指定字符串从尾部开始按一定间隔插入指定字符

>@param {String} str 被处理的字符串
>
>@param {String} notation 要插入的符号
>
>@param {Number} distance 每隔几个字符插入
>
>返回新的字符串

使用示例：

```js
$.insertStr('13873788888', '-', '4'); // 138-7378-8888
$('13873788888').insertStr('-', 4); // 138-7378-8888
```

**trimLeft**

 去除字符串左侧的空白 

> @param {String} str 要处理的字符串
>
> 返回新的字符串

使用示例：

```js
$.trimLeft('   123'); // '123'
$.trimLeft('\r\n\t123'); // '123'
```

**trimRight**

 去除字符串右侧的空白 

> @param {String} str 要处理的字符串
>
> 返回新的字符串

使用示例请参考 `trimLeft`。

**trim**

 去除字符串两侧的空白 

> @param {String} str 要处理的字符串
>
> 返回新的字符串

使用示例请参考 `trimLeft`。

**toPsw**

 将字符串密码化，可以充当某些输入框的过滤器
 

> @param {String} str 要转化的字符串
>
> 返回密码化后的字符串

使用实例：

```js
$.toPsw('abc123'); // '******'
```

**getUrlParam**

解析出 URL 中的对应参数

> @param {String} url URL 字符串
>
> @param {String} key 参数名

使用示例：

```js
$.getUrlParam('http://www.baidu.com/?name=test', 'name') // 'test'
```

**setUrlParam**

根据传入的对象的键值对构造一个 URL 参数字符串

> @param {Object} obj 包含参数键值对的对象

使用示例：

```js
$.setUrlParam({name: 'test', age: 12}); // 'name=test&age=12'
```

**curStr**

将字符串按指定间隔切割，返回字符串数组

> @param {String} str 要切割的字符串
> 
> @param {Number} distance 切割间距，表示每隔几个字符切割
> 
> @param {Number} direction 切割方向 1 为正序切割，-1 为逆序切割，默认为 1，即正向切割

使用示例：

```js
$.cutStr('abc', 1, 1); // ['a', 'b', 'c']
$.cutStr('abc', 2, 1); // ['ab', 'c']
$.cutStr('abc', 2, -1); // ['a', 'bc']
```

**truncate**

按指定长度截断字符串，多余部分用省略号代替

> @param {String} str 要截断的字符串
> 
> @param {Number} len 留下的长度

使用示例：

```js
$.truncate('123', 2); // '12……'
$.truncate('SJFDSKHGNVNJFKLkjsfdlkjdskgsdoiewjgkds', 12); // 'SJFDSKHGNVNJ……'
```

**mask**

按指定格式遮掩字符串的部分字符

> @param {String} str 要遮掩的字符串
> 
> @param {String} format 指定遮掩格式的字符串，与 str 等长，'*' 为遮掩符，不传值时遮盖 str 的所有字符

使用示例：

```js
$.mask('123', '2*2'); // '1*3'
$.mask('19828288282', '111****1111'); // '198****8282'
```

**randomColor**

返回随机颜色字符串

> @param {Boolean} isRGB 是否返回 rgb 字符串，默认为否

使用示例：

```js
$.randomColor(true)； // 'rag(12, 23, 238)'
$.randomColor(); // '#d23f18'
```

**reverseStr**

反转字符串

使用示例：

```js
$.reverseStr('abc'); // 'cba'
$.reverseStr('123'); // '321'
```

**capitalize**

字符串首字母大写

> @param {String} param0 要转换的字符串
> 
> @param {Boolean} lowerRest 是否将首字母外的字母全部转化为小写

使用示例：

```js
$.capitalize('abC')； // 'AbC'
```

**capitalizeEveryWord**

所有单词首字母大写

使用示例：

```js
$.capitalizeEveryWord('abc def'); // 'Abc Def'
$.capitalizeEveryWord('hello world'); // 'Hello World'
```

**escapeHTML**

对 HTML 字符转义

使用案例：

```js
$.escapeHTML("<h1>'Hello'</h2>"); // '&lt;h1&gt;&#39;Hello&#39;&lt;/h2&gt;'
$.escapeHTML("<h1>'Hello' & " + 'world"</h2>'); // '&lt;h1&gt;&#39;Hello&#39; &amp; world&quot;&lt;/h2&gt;'
```

**unescapeHTML**

对 HTML 转义字符进行还原

使用案例：

```js
$.unescapeHTML("&lt;h1&gt;&#39;Hello&#39;&lt;/h2&gt;"); // "<h1>'Hello'</h2>"
$.unescapeHTML("&lt;h1&gt;&#39;Hello&#39; &amp; world&quot;&lt;/h2&gt;"); // "<h1>'Hello' & " + 'world"</h2>'
```

**fromCamelCase**

将驼峰字符串转化为用指定间隔符隔开的字符串

> @param {String} str 驼峰风格的字符串
> 
> @param {String} delimeter 间隔符，默认为"_"

使用示例：

```js
$.fromCamelCase('fromCamelCase'); // 'from_camel_case'
$.fromCamelCase('getFullYear', '-'); // 'get-full-year'
```

**isAnagram**

判断两字符串是否是同字母异序字符串，忽略大小写

使用示例：

```js
$.isAnagram('fromCamelCase', 'camelfromcase'); // true
$.isAnagram('isModuleNamed', 'moduleISnamed'); // true
```

**camelize**

将字符串转化为驼峰风格

使用示例：

```js
$.camelize('grid-container'); // 'gridContainer'
$.camelize('css_style_name'); // 'cssStyleName'
$.camelize('hello world test'); // 'helloWorldTest'
$.camelize('underscore_name-style_mix'); // 'underscoreNameStyleMix'
```

**dasherize**

将字符串转化为连字符风格

使用示例：

```js
$.dasherize('gridContainer'); // 'grid-container'
$.dasherize('cssStyleName'); // 'css-style-name'
$.dasherize('hello_world_test'); // 'hello-world-test'
$.dasherize('underscore_nameStyle_mix'); // 'underscore-name-style-mix'
```

**underscored**

将字符串转化为下划线风格

使用示例：

```js
$.underscored('gridContainer'); // 'grid_container'
$.underscored('cssStyleName'); // 'css_style_name'
$.underscored('hello-world-test'); // 'hello_world_test'
$.underscored('underscore nameStyle-mix'); // 'underscore_name_style_mix'
```

### Number 类

**add**

不损失精度的加法函数，支持多个参数相加

使用示例：

```js
$.add(0.1, 0.2); // 0.3
$.add(1, 2, 3, 4); // 10
```

**sub**

不损失精度的减法函数，支持多参数相减

使用示例：

```js
$.sub(0.54, 0.19); // 0.35
$.sub(0.5, 0.1, 0.1); // 0.3
```

**mul**

不损失精度的乘法，支持多参数相乘

使用示例：

```js
$.mul(1, 2, 3); // 6
$.mul(0.55, 100); // 55
```

**div**

不损失精度的除法，支持多参数相除

使用示例：

```js
$.div(100, 2, 5); // 10
```

**factorial**

阶乘函数，支持计算非负整数的阶乘

> @param {Number} num 一个非负整数

使用示例：

```js
$.factorial(5); // 120
```

**toCurrency**

将数字进行千分位格式化，可以指定金币符号

>@param {Number} num 要转化的数字
>
>@param {String} notation 货币的符号，默认是‘￥’
>
>@param {Number} precision 转化精度，默认为 2
>
>返回格式化后的金额字符串

使用示例：

```js
$.toCurrency(9818.9); // '￥9,818.90'
$.toCurrency(9818.9, '$', 3); // '$9,818.900'
```

**toChineseAmount**

将金额数字转化为大写汉字金额字符串

> @param {Number} num 要转化的金额数字

使用示例：

```js
$.toChineseAmount(0.12); // '壹角贰分'
$.toChineseAmount(316.09); // '叁佰壹拾陆圆零玖分'
```

**toPhoneNumber**

将 7 位或者 11 位的数字转化为电话格式的字符串

> @param {Number} num 要转化的数字

使用示例：

```js
$.toPhoneNumber(12345678998); // '123-4567-8998'
$.toPhoneNumber(8861792); // '8861-792'
```

**toDate**

将 8 位数字转化为日期格式的字符串

>@param {Number} num 要转化的数字
>
>@param {String} delimeter 指定分隔符

使用示例：

```js
$.toDate(20181212, '-'); // '2018-12-12'
$.toDate(20181212, '/'); // '2018/12/12'
```

**randomInt**

返回指定区间的随机整数，左闭右闭，即返回结果位于 [start, end]

> @param {Number} start 最小值
> 
> @param {Number} end 最大值

使用示例：

```js
$.randomInt(5, 7); // 5 or 6 or 7
```

### Date 类

**dateAdd**

计算给定日期在给定天数之后的日期

> @param {Date} date 基准日期
> 
> @param {Number} days 后延天数

使用示例：

```js
$.dateAdd(new Date(), 20); // Fri Jan 11 2019 12:37:21 GMT+0800 (中国标准时间)
```

**dateSub**

计算给定日期在给定天数之前的日期

> @param {Date} date 基准日期
> 
> @param {Number} days 提前天数

使用示例：

```js
$.dateSub(new Date(), 20); // Sun Dec 02 2018 12:38:51 GMT+0800 (中国标准时间)
```

**getDatePeriod**

获取当前日期所在月的第一天的日期

使用示例：

```js
$.getDatePeriod(new Date('2018-12-10'), new Date('2018-12-20')); // 10
```

**getFirstDateInMonth**

获取当前日期所在月的第一天的日期

使用示例：

```js
$.getFirstDateInMonth(new Date('2018-12-12')); // Sat Dec 01 2018 00:00:00 GMT+0800 (中国标准时间)
```

**getLastDateInMonth**

计算当前日期所在月的最后一天

使用示例：

```js
$.getLastDateInMonth(new Date(2018, 11, 12)); // Mon Dec 31 2018 00:00:00 GMT+0800 (中国标准时间)
```

**getDaysInMonth**

计算当前日期所在月的天数

使用示例：

```js
$.getDaysInMonth(new Date('2018-12-12')); // 31
```

**isLeapYear**

判断当前日期所在年是否是闰年

使用示例：

```js
$.isLeapYear(new Date('2018-12-12')); // false
$.isLeapYear(new Date('2016-12-12')); // true
```

**getFirstDateInQuarter**

获取当前日期所在季度的第一天

使用示例：

```js
$.getFirstDateInQuarter(new Date(2018, 1, 12)); // Mon Jan 01 2018 00:00:00 GMT+0800 (中国标准时间)
```

**getLastDateInQuarter**

获取当前日期所在季度的最后一天

使用示例：

```js
$.getLastDateInQuarter(new Date(2018, 5, 12)); // Sat Jun 30 2018 00:00:00 GMT+0800 (中国标准时间)
```

### Array 类

**max**

求数组中的最大值

使用示例：

```js
$.max([1, 2, 3]); // 3
```

**min**

求数组中的最小值

使用示例：

```js
$.min([1, 2, 3]); // 1
```

**sum**

求数组中所有元素的和

使用示例：

```js
$.sum([1, 2, 3]); // 6
```

**avg**

求数组中所有元素的平均值

使用示例：

```js
$.avg([1, 2, 3]); // 2
```


**variance**

求数组中所有元素的方差

使用示例：

```js
$.variance([1, 2, 3]); // 0.6666...
```

**intersection**

求多个数组的交集

使用示例：

```js
$.intersection([1, 2, 3], [1], [1, 2]); // [1]
```

**union**

求多个数组的并集

使用示例：

```js
$.union([1, 2], [3, 4], [false]); // [1, 2, 3, 4, false]
```

**difference**

求多个数组的差集

使用示例：

```js
$.difference([1, 2, 3], [1], [2]); // [3]
```

**flatten**

展开多维数组为一维数组
 
> @param {Array} arr 要展开的数组
> 
> @param {Boolean} shallow true 代表只展开一层，false 代表展开所有层，默认为 false

使用示例：

```js
$.flatten([1, 2, [4, [5, 6]], 3]); // [1, 2, 4, 5, 6, 3]
$.flatten([1, 2, [4, [5, 6]], 3], true); // [1, 2, 4, [5, 6], 3]
```

**removeDup**

对数组进行去重

使用示例：

```js
$.removeDup([1, 2, 3, 2, 4]); // [1, 2, 3, 4]
```

**groupBy**

根据回调函数的结果对数组元素进行归类，返回一个对象，每个属性都是一个类别，值为该分类元素组成的数组。

> @param {Array} arr 要归类的数组
> 
> @param {Function} callback 返回类别的回调函数，接受三个标准参数(v, k, o)

使用示例：

```js
$.groupBy([1, 2, 3], v => String(1)); // { '1' : [1, 2, 3] }
$.groupBy([1, 2, 3], v => String(v)); // { '1': [1], '2': [2], '3': [3] }
```

**shuffle**

数组随机洗牌，返回一个新数组，采用 Fisher–Yates shuffle 的改进算法

使用示例：

```js
$.shuffle([1, 2, 3]); // [1, 3, 2]...
```


**compact**

去除数组中的 falsy 值（`NaN/false/''/undefined/null`），返回新数组


使用示例：

```js
$.compact([1, undefined, 2, null, 3, '', 4, false, 5, NaN]); // [1, 2, 3, 4, 5]
```

**pluck**

对数组里的对象取同一属性的值

> @param {Array} arr 数组参数
> 
> @param {String} key 对象属性

使用示例：

```js
$.pluck([
  {
    name: 'Jerry',
    age: 12
  },
  {
    name: 'Tom',
    age: 13
  }
], 'name'); // ['Jerry', 'Tom']
```

**pick**

返回数组中的随机一项

使用示例：

```js
$.pick([1, 2, 3]); // 1 or 2 or 3
```

### Function 类

**throttle**

函数节流，被节流过的函数在指定时间间隔内只能触发一次

> @param {Function} fn 需要包装的函数
> 
> @param {Number} interval 时间间隔

使用示例：

```js
let throttled = $.throttle(() => {
  console.log('function executed!');
}, 1000);
while (true) {
  throttled(); // 每秒将会输出一次 'function executed!'
} 
```

**debounce**

函数去抖，被处理过的函数，只有在执行之后的指定时间间隔后才会触发。如果第二次执行函数没有超过指定的时间间隔，那么计时器刷新。

> @param {Function} fn 需要包装的函数
> 
> @param {Number} delay 延迟执行时间

使用示例：

```js
let debounced = $.debounce(() => {
  console.log('function executed!');
}, 1000);
debounced(); // 1　秒后输出...
while (true) {
  debounced(); // 永远不会有输出
}
```

**curry**

函数柯里化

> @param {Function} fn 要柯里化的函数
> 
> @param {Number} length 要柯里化的函数的参数个数

使用示例：

```js
let add = $.curry(function(a, b, c) {
  return a + b + c;
});
add(1, 2, 3); // 6
add(1, 2)(3); // 6
add(1)(2, 3); // 6
add(1)(2)(3); // 6
```

### Event 类

**addEvent**

兼容模式的事件绑定函数，支持 IE

> @param {Element} el 要绑定事件的 DOM 元素
> 
> @param {String} eventType 事件类型
> 
> @param {Function} callback 事件处理函数

使用示例：

```js
$.addEvent(document, 'click', () => {
  console.log('clicked!');
});
```

**removeEvent**

兼容模式的事件解绑函数，支持 IE

> @param {Element} el 要解绑事件的 DOM 元素
>
> @param {String} eventType 事件类型
>
> @param {Function} callback 事件处理函数

使用示例：

```js
$.removeEvent(document, 'click', handler); // 注意 handler 必须是之前绑定的同一个函数变量
```

**CustomEvents**

自定义事件类，它允许用户实例化一个事件中心，然后自定义事件，类似于 Node 中的 EventEmitter。

CustomEvents 的实例包含三个方法：

* `subscribe(eventType, callback)` 订阅函数，接受事件类型和事件处理回调
* `unsubscribe(eventType, callback)` 取消订阅事件函数，接受事件类型和事件处理回调
* `dispatch(event, data)` 事件派发函数，接受事件类型和数据

使用示例：

```js
const ee = new $.CustomEvents();
let handler = (e) => {
  console.log(e.eventType, e.data);
}
ee.subscribe('test', handler);
ee.dispatch('test'); // handler 会执行
ee.unsubscribe('test', handler);
ee.dispatch('test'); // handler 不再执行
```

建议在使用 `CustomEvents` 类时，创建一个专门的模块用于实例化 `CustomEvents`，这样做可以使全局方法都使用同一个事件中心。

```js
// event.js
const { CustomEvents } = require('jerrytools');
module.exports = new CustomEvents();
```

**ready**

document.ready 事件，接受回调函数，在 DOM 渲染完成时执行接收的所有回调函数，类似于 jQuery.ready 函数。

使用示例：

```js
$.ready(() => {
  console.log('Dom Content Loaded!'); // 会在 DOM 渲染完成时输出
});
```

### Utils 类

**isFunction**

判断传入变量是否是函数

使用示例：

```js
$.isFunction(''); // false
$.isFunction(function() {}); // true
```

**isNumber**

判断传入变量是否是数字

使用示例：

```js
$.isNumber(12); // true
$.isNumber('12'); // false
$.isNumber(NaN); // false
```

**isPlainObject**

判断是否是纯对象（构造函数是 Object）

使用示例：

```js
$.isPlainObject({}); // true
// 假设 Person 是一个自定义的类：
$.isPlainObject(new Person()); // false
```

**isObject**

判断是否是对象（可以使自定义类的示例）

使用示例：

```js
$.isObject({}); // true
$.isObject(new Function()); // false
// 假设 Person 是一个自定义类：
$.isObject(new Person()); // true
```

**isString**

判断是否是字符串

使用示例：

```js
$.isString(''); // true
$.isString(1); // false
```

**isArray**

判断是否是数组

使用示例：

```js
$.isArray([]); // true
```

**isArrayLike**

判断是否是类数组对象（length 属性是一个数字的对象，数组不是类数组对象）

使用示例：

```js
$.isArrayLike('123'); // true
$.isArrayLike({'0': 12, length: 1}); // true
$.isArrayLike([1, 2, 3]); // false
```

**isNaN**

判断是否是 NaN

使用示例：

```js
$.isNaN(NaN); // true
$.isNaN('a123'); // false
```

**isSymbol**

判断是否是 Symbol 类型

使用示例：

```js
$.isSymbol(Symbol(12)); // true
```

**isRegExp**

判断是否是正则表达式类型

使用示例：

```js
$.isRegExp(/\.test$/); // true
```

**isDate**

判断是否是日期类型

使用示例：

```js
$.isDate(new Date()); // true
```

**isUndefined**

判断是否是 undefined

使用示例：

```js
$.isUndefined(); // true
$.isUndefined(null); // false
```

**isNull**

判断是否是 null

使用示例：

```js
$.isNull(undefined); // false
$.isNull(null); //true
```

**isInt**

判断是否是整数类型

使用示例：

```js
$.isInt(12); // true
$.isInt(12.00); // true
$.isInt(12.1); // false
```

**isFalsy**

判断是否是 null/undefined/''/0/false/NaN

使用示例：

```js
$.isFalsy(null); // true
$.isFalsy(undefined); // true
$.isFalsy(''); // true
$.isFalsy(0); // true
$.isFalsy(NaN); // true
$.isFalsy(false); // true
```

**isElement**

判断是否是 DOM 元素节点

使用示例：

```js
$.isElement(document.querySelector('#test')); // true
$.isElement({}); // false
```

**mixin**

混淆函数，可以进行浅拷贝

>@param {Object} des 拷贝的目标对象
>
>@param {Object} source 拷贝的源对象

使用示例：

```js
let dest = {name: 'test'};
$.mixin(dest, { age: 1 }); // dest 变成 { name: 'test', age: 1 };
```

**each**

遍历数组、类数组对象或纯对象

>@param {Object|Array} param 要遍历的对象或数组
>
>@param {Function} callback 回调函数，接受三个参数：v 当前遍历项；k 当前索引或属性名； o 当前遍历的对象

使用示例：

```js
$.each({name: 'test', age: 1}, function(v, k, o) {
  console.log(v, k, o)
});
```

**map**

遍历数组、类数组对象或纯对象，返回一个结果数组

>@param {Object|Array} param 要遍历的对象、数组或类数组对象
>
>@param {Function} callback 要使用的回调函数，接受三个参数：v 当前遍历项；k 当前索引或属性名； o 当前遍历的对象

使用示例：

```js
$.map({name: 'Jerry'}, function(v, k, o) {
  return v;
});  // ['Jerry']
```

**reduce**

遍历数组、类数组对象或纯对象，返回一个累计值结果

>@param {Object|Array} param 要迭代的数组、类数组对象或对象
>
>@param {Function} callback 对每一项进行操作的回调函数，接收四个参数：acc 累加值、v 当前项、k 当前索引、o 当前迭代对象
>
>@param {Any} initVal 传入的初始值

使用示例：

```js
$.reduce({name: 'Jerry', friend: 'Tom'}, function(acc, v, k, o) {
  return acc + v;
}); // 'JerryTom'

// 传递一个初始值
$.reduce({name: 'and', friend: 'Tom'}, function(acc, v, k, o) {
  return acc + v;
}, "Jerry"); // 'JerryandTom'
```

**contains**

检测字符串或数组或类数组对象是否包含某个项

>@param {String|Array} param 要检测的数组或类数组对象
>
>@param {Any} subItem 要检测的项

使用示例：

```js
$.contains([1, 2, 3], 3); // true
$.contains('123345', '33'); //true
```

**keys**

返回对象所有属性名组成的数组

> @param {Any} obj 要查询的对象

使用示例：

```js
$.keys({name: 'Jerry'}); // ['name']
```

**has**

判断某个对象自身（不是位于原型链）是否包含某个属性

>@param {Any} obj 任意值
>
>@param {String|Array} key 属性名

使用示例：

```js
$.has({name: 'Jerry'}, 'name'); // true
$.has({name: 'Jerry'}, 'age'); // false
```

**equals**

判断两个变量是否相等

使用示例：

```js
$.equals({}, {}); // true
$.equals({name: 'Jerry'}, {name: 'Jerry'}); // true
$.equals(NaN, NaN); // true
$.equals(0, -0); // false
$.equals(/\.Jerry$/gi, /\.Jerry$/ig); // true
$.equals([1, 2, 3], [1, 2, 3]); // true
```

**getType**

获取变量的类型字符串

使用示例：

```js
$.getType({}); // 'Object'
$.getType(''); // 'String'
$.getType(false); // 'Boolean'
$.getType(12); // 'Number'
// ...
```

**deepClone**

深拷贝函数

使用示例：

```js
let Jerry = {
  name: 'Jerry',
  fs: [1, 2, 3]
};
let _Jerry = $.deepClone(Jerry);
_Jerry.fs.push(4);
console.log(_Jerry.fs); // [1, 2, 3, 4]
console.log(Jerry.fs); // [1, 2, 3]
```

**getCookie**

获取 cookie 的值

> @param {String} key cookie 名称

使用示例：

```js
$.getCookie('token'); // 'ksaldjfklhj1234klhjkasfh'
```

**setCookie**

设置 cookie

> @param {String} key cookie 名称
> 
> @param {String} value cookie 的值
> 
> @param {Number} day 有效时长（单位是天）

使用示例：

```js
$.setCookie('name', 'Jerry', 365);
```

**delCookie**

删除 cookie

> @param {String} key cookie 名称

使用示例：

```js
$.delCookie('name');
```

### 持续更新

更多功能，持续更新中……
