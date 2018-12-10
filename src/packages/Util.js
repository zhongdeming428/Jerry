/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 17:13:16 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-10 21:59:44
 */

const toString = Object.prototype.toString,
      slice = Array.prototype.slicec;

export function mixin (des, source) {
  if (arguments.length === 0) throw new TypeError('mixin 函数的参数个数不得小于 1！');
  if (des && source) {
    return _mixin(des, source, false);
  }
  if (source === void 0 && this instanceof Jerry) return _mixin(Jerry.prototype, source, true);
}

function _mixin (dest, source, needRedefineed) {
  for (let key in source) {
    if (isFunction(source[key] && needRedefineed)) {
      dest[key] = function () {
        return source[key].apply([this._wrapped, ...arguments.slice()]);
      }
    } else {
      dest[key] = source[key];
    }
  }
  return dest;
}

export function isFunction (param) {
  return toString.call(param) === '[object Function]';
}