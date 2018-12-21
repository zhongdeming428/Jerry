<center><img src="./Jerry.png" alt="Jerry"/></center>

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Build Status](https://travis-ci.org/zhongdeming428/Jerry.svg?branch=master)](https://travis-ci.org/zhongdeming428/Jerry)
![](https://img.shields.io/npm/v/jerrytools.svg)


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

***将指定字符串重复 n 次***

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

***对指定字符串从尾部开始按一定间隔插入指定字符***

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

***去除字符串左侧的空白***

> @param {String} str 要处理的字符串
>
> 返回新的字符串

使用示例：

```js
$.trimLeft('   123'); // '123'
$.trimLeft('\r\n\t123'); // '123'
```

**trimRight**

***去除字符串右侧的空白***

> @param {String} str 要处理的字符串
>
> 返回新的字符串

使用示例请参考 `trimLeft`。

**trim**

***去除字符串两侧的空白***

> @param {String} str 要处理的字符串
>
> 返回新的字符串

使用示例请参考 `trimLeft`。

**toPsw**

***将字符串密码化，可以充当某些输入框的过滤器***

> @param {String} str 要转化的字符串
>
> 返回密码化后的字符串

使用实例：

```js
$.toPsw('abc123'); // '******'
```

**getUrlParam**

***解析出 URL 中的对应参数***

> @param {String} url URL 字符串
>
> @param {String} key 参数名

使用示例：

```js
$.getUrlParam('http://www.baidu.com/?name=test', 'name') // 'test'
```

**setUrlParam**

***根据传入的对象的键值对构造一个 URL 参数字符串***

> @param {Object} obj 包含参数键值对的对象

使用示例：

```js
$.setUrlParam({name: 'test', age: 12}); // 'name=test&age=12'
```

### Number 类

**add**

***不损失精度的加法函数，支持多个参数相加***

使用示例：

```js
$.add(0.1, 0.2); // 0.3
$.add(1, 2, 3, 4); // 10
```

**sub**

***不损失精度的减法函数，支持多参数相减***

使用示例：

```js
$.sub(0.54, 0.19); // 0.35
$.sub(0.5, 0.1, 0.1); // 0.3
```

**mul**

***不损失精度的乘法，支持多参数相乘***

使用示例：

```js
$.mul(1, 2, 3); // 6
$.mul(0.55, 100); // 55
```

**div**

***不损失精度的除法，支持多参数相除***

使用示例：

```js
$.div(100, 2, 5); // 10
```

**factorial**

***阶乘函数，支持计算非负整数的阶乘***

> @param {Number} num 一个非负整数

使用示例：

```js
$.factorial(5); // 120
```

**toCurrency**

***将数字进行千分位格式化，可以指定金币符号***

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

***将金额数字转化为大写汉字金额字符串***

> @param {Number} num 要转化的金额数字

使用示例：

```js
$.toChineseAmount(0.12); // '壹角贰分'
$.toChineseAmount(316.09); // '叁佰壹拾陆圆零玖分'
```

**toPhoneNumber**

***将 7 位或者 11 位的数字转化为电话格式的字符串***

> @param {Number} num 要转化的数字

使用示例：

```js
$.toPhoneNumber(12345678998); // '123-4567-8998'
$.toPhoneNumber(8861792); // '8861-792'
```

**toDate**

***将 8 位数字转化为日期格式的字符串***

>@param {Number} num 要转化的数字
>
>@param {String} delimeter 指定分隔符

使用示例：

```js
$.toDate(20181212, '-'); // '2018-12-12'
$.toDate(20181212, '/'); // '2018/12/12'
```

### Utils 类

**isFunction**

***判断传入变量是否是函数***

使用示例：

```js
$.isFunction(''); // false
$.isFunction(function() {}); // true
```

**isNumber**

***判断传入变量是否是数字***

使用示例：

```js
$.isNumber(12); // true
$.isNumber('12'); // false
$.isNumber(NaN); // false
```

**isPlainObject**

***判断是否是纯对象（构造函数是 Object）***

使用示例：

```js
$.isPlainObject({}); // true
// 假设 Person 是一个自定义的类：
$.isPlainObject(new Person()); // false
```

**isObject**

***判断是否是对象（可以使自定义类的示例）***

使用示例：

```js
$.isObject({}); // true
$.isObject(new Function()); // false
// 假设 Person 是一个自定义类：
$.isObject(new Person()); // true
```

**isString**

***判断是否是字符串***

使用示例：

```js
$.isString(''); // true
$.isString(1); // false
```

**isArray**

***判断是否是数组***

使用示例：

```js
$.isArray([]); // true
```

**isArrayLike**

***判断是否是类数组对象（length 属性是一个数字的对象，数组不是类数组对象）***

使用示例：

```js
$.isArrayLike('123'); // true
$.isArrayLike({'0': 12, length: 1}); // true
$.isArrayLike([1, 2, 3]); // false
```

**isNaN**

***判断是否是 NaN***

使用示例：

```js
$.isNaN(NaN); // true
$.isNaN('a123'); // false
```

**isSymbol**

***判断是否是 Symbol 类型***

使用示例：

```js
$.isSymbol(Symbol(12)); // true
```

**isRegExp**

***判断是否是正则表达式类型***

使用示例：

```js
$.isRegExp(/\.test$/); // true
```

**isDate**

***判断是否是日期类型***

使用示例：

```js
$.isDate(new Date()); // true
```

**isUndefined**

***判断是否是 undefined***

使用示例：

```js
$.isUndefined(); // true
$.isUndefined(null); // false
```

**isNull**

***判断是否是 null***

使用示例：

```js
$.isNull(undefined); // false
$.isNull(null); //true
```

**isInt**

***判断是否是整数类型***

使用示例：

```js
$.isInt(12); // true
$.isInt(12.00); // true
$.isInt(12.1); // false
```

**isFalsy**

***判断是否是 null/undefined/''/0/false/NaN***

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

***判断是否是 DOM 元素节点***

使用示例：

```js
$.isElement(document.querySelector('#test')); // true
$.isElement({}); // false
```

**mixin**

***混淆函数，可以进行浅拷贝***

>@param {Object} des 拷贝的目标对象
>
>@param {Object} source 拷贝的源对象

使用示例：

```js
let dest = {name: 'test'};
$.mixin(dest, { age: 1 }); // dest 变成 { name: 'test', age: 1 };
```

**each**

***遍历数组、类数组对象或纯对象***

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

***遍历数组、类数组对象或纯对象，返回一个结果数组***

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

***遍历数组、类数组对象或纯对象，返回一个累计值结果***

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

***检测字符串或数组或类数组对象是否包含某个项***

>@param {String|Array} param 要检测的数组或类数组对象
>
>@param {Any} subItem 要检测的项

使用示例：

```js
$.contains([1, 2, 3], 3); // true
$.contains('123345', '33'); //true
```

**keys**

***返回对象所有属性名组成的数组***

> @param {Any} obj 要查询的对象

使用示例：

```js
$.keys({name: 'Jerry'}); // ['name']
```

**has**

***判断某个对象自身（不是位于原型链）是否包含某个属性***

>@param {Any} obj 任意值
>
>@param {String|Array} key 属性名

使用示例：

```js
$.has({name: 'Jerry'}, 'name'); // true
$.has({name: 'Jerry'}, 'age'); // false
```

**equals**

***判断两个变量是否相等***

使用示例：

```js
$.equals({}, {}); // true
$.equals({name: 'Jerry'}, {name: 'Jerry'}); // true
$.equals(NaN, NaN); // true
$.equals(0, -0); // false
$.equals(/\.Jerry$/gi, /\.Jerry$/ig); // true
$.equals([3, 2, 1], [1, 2, 3]); // true
```


### 持续更新

更多功能，持续更新中……
