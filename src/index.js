/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 16:36:33 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-11 19:50:49
 */

const Util = require('./packages/Util');
const mixin = Util.mixin;
const modules = [Util];
const { slice } = require('./utils');

 /**
  * 
  * @param {Any} obj 传递给 Jerry 函数或者构造器的值。
  */
function Jerry (obj) {
  if (obj instanceof Jerry) return obj;
  else if (this instanceof Jerry) this._wrapped = obj;
  else return new Jerry(obj);
}

modules.forEach(module => {
  Object.keys(module).forEach(key => {
    mixin(Jerry, {
      [key]: module[key]
    });
    mixin(Jerry.prototype, {
      [key]() {
        let args = slice.call(arguments);
        let res = module[key].apply(this, [this._wrapped, ...args]);
        // 如果执行函数有返回结果就直接把结果返回，否则返回实例本身，实现链式调用。
        if (res !== void 0) return res;
        return this;
      }
    });
  });
});

let root;
if (global !== void 0) root = global;
else if (window !== void 0 && self.self === self) root = window;
else root = {};

root.Jerry = Jerry;
if (module && module.exports) module.exports = Jerry;
