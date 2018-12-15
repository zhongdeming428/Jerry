<center><img src="./Jerry.png" alt="Jerry"/></center>


这个项目是基于个人兴趣所写的一个个人认为比较使用的代码库，收录了一些日常开发中比较常用的功能代码，通过使用这个工具库可以节省一些写工具函数的时间。

如果你想为这个项目做贡献，请参考一下说明：

* [项目声明](https://github.com/zhongdeming428/Jerry/blob/master/CODE_OF_CONDUCT.md)

* [提交代码注意事项](https://github.com/zhongdeming428/Jerry/blob/master/CONTRIBUTING.md)

尤其是在你写代码之前，请注意仔细阅读提交代码所要注意的事项。

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

## 使用文档

### Get Started

使用 Jerry 的方式有两种，一是通过 `script` 标签引入，二是通过 `npm` 安装。

引入标签可以通过 [unpkg](https://unpkg.com/#/) 提供的 CDN 服务。

npm 安装：

```bash
$ npm i jerrytools -S
```

使用的时候，通过 `import` 或者 `require` 引入就好了：

```js
const $ = require('jerrytools');
// 或者 import $ from 'jerrytools';

// 然后就可以开始使用啦！
$(123).isNumber(); // true
```

当然也可以通过如下方式使用，这样就可以把第一个参数构造为一个 Jerry 对象，在某些时候可以进行链式调用。

```js
$.isNumber(123);
```

### 使用文档

