/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 16:36:33 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-17 14:37:50
 */

const _Util = require('./packages/Util');
const _Number = require('./packages/Number');
const _String = require('./packages/String');
const _Array = require('./packages/Array');
const { mixin, each, isUndefined } = _Util;
const modules = [_Util, _Number, _String, _Array];         // Bind modules to Jerry.
const { slice } = require('./utils');
const { version } = require('../package.json');

 /**
  * 
  * @param {Any} obj 传递给 Jerry 函数或者构造器的值。
  */
function Jerry(obj) {
  if (obj instanceof Jerry) return obj;
  else if (this instanceof Jerry) this._wrapped = obj;
  else return new Jerry(obj);
}

each(modules, (module) => {
  each(module, (val, key) => {
    mixin(Jerry, {
      [key]: module[key]
    });
    mixin(Jerry.prototype, {
      [key]() {
        let args = slice.call(arguments);
        let res = module[key].apply(this, [this._wrapped, ...args]);
        // 如果执行函数有返回结果就直接把结果返回，否则返回实例本身，实现链式调用。
        if (!isUndefined(res)) return res;
        return this;
      }
    });
  });
});

Jerry.__VERSION__ = version;

let root;
if (!isUndefined(global)) root = global;
else if (!isUndefined(window) && !isUndefined(self) && self.self === self) root = window;
else root = {};

const _Jerry = Jerry;
Jerry.noConflict = function() {
  root.Jerry = _Jerry;
  return this;
};

root.Jerry = Jerry;
if (module && module.exports) module.exports = Jerry;
