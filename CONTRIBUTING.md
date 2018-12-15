## How to contribute to Jerry?

* 首先，请仔细阅读 [CODE_OF_CONDUCT](https://github.com/zhongdeming428/Jerry/blob/master/CODE_OF_CONDUCT.md)并遵守里面的规定。
* 在提交 issue 或 PR 时，请先关注有没有同类问题已被提出或解决。
* 在发起 PR 之前，请确保你已经新增了合适的测试案例到 test 文件夹下，然后运行了 `npm run test` 并且通过了所有测试案例。
* 请与已有代码风格保持一致，保证能够通过 `npm run eslint` 的检测。
* 在你的 PR 中不用修改项目文档（README）。
* 在提交 PR 之前，确保 `npm run build` 能够打包成功。
* 请遵循 README 中所写的代码架构。
  ```
  src
  ├── index.js
  ├── packages
  |   ├── ...
  │   ├── Number.js
  │   ├── String.js
  │   └── Util.js
  └── utils.js
  ```
  src 源代码目录结构如上所示，其中 `index.js` 是打包入口文件；`packages` 文件夹是所有模块的集合，其中分类保存着各个模块的源代码；`utils.js` 区别于 `packages` 文件夹中的 `Util`，这个需要注意。`utils.js` 中所写的工具函数仅供内部使用，不会暴露出来；而 `Util.js` 内部的工具函数同样会暴露出来给用户使用，这值得注意。

  如果你要新增模块的话，请在 `packages` 文件夹下新建一个模块文件，取好一个名字，然后记得在 `index.js` 文件中将新模块引入。

* 最重要的一点是，请不要直接在 master 分支修改代码，请在 fork repo 之后新建一个分支，根据你所要新增的功能或者要修复的 bug 进行命名。比如：`feature/string_date_add` 和 `bugfix/util_mixin`。