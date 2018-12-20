/*
 * @Author: Russ Zhong
 * @Date: 2018-12-10 17:13:16
 * @Last Modified by: 格子熊
 * @Last Modified time: 2018-12-19 22:10:41
 */

const { toString, slice, hasOwnProp, throwTypeErr, isInBrowser } = require('../utils');

/**
 * 混淆函数，实现浅拷贝
 * @param {Object} des 拷贝的目标对象
 * @param {Object} source 拷贝的源对象
 */
function mixin (des, source) {
  if (arguments.length === 0) throwTypeErr('mixin 函数的参数个数不得小于 1！');
  if (des && source) _mixin(des, source);
}

function _mixin (dest, source) {
  for (let key in source) {
    dest[key] = source[key];
  }
  return dest;
}

function isFunction (param) {
  return toString.call(param) === '[object Function]';
}

function isNumber (param) {
  return toString.call(param) === '[object Number]' && !isNaN(param);
}

function isPlainObject (param) {
  if (!isObject(param)) return false;
  let proto = param;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(param) === proto;
}

function isObject (param) {
  if (isUndefined(param) || isNull(param)) return false;
  return toString.call(param) === '[object Object]';
}

function isString(param) {
  return toString.call(param) === '[object String]'
}

function isArray(param) {
  return toString.call(param) === '[object Array]' && Array.isArray(param);
}

function isArrayLike(param) {
  let hasLengthProp = isNumber(param.length);
  return !isArray(param) && hasLengthProp;
}

function isNaN(param) {
  return param !== param;
}

function isSymbol(param) {
  return toString.call(param) === '[object Symbol]' && typeof param === 'symbol';
}

function isRegExp(param) {
  return toString.call(param) === '[object RegExp]';
}

function isDate(param) {
  return toString.call(param) === '[object Date]';
}

function isUndefined(param) {
  return param === void 0;
}

function isNull(param) {
  return param === null;
}

/**
 * 判断数字是否是整数
 * @param {Number} num 要判断的数字
 */
function isInt(num) {
  return isNumber(num) && isFinite(num) && (num + '').indexOf('.') === -1;
}

function isFalsy(param) {
  let falsyArr = [0, false, undefined, null, '', NaN];
  return contains(falsyArr, param);
}

/**
 * 判断一个对象是否是 DOM 元素节点
 * @param {Any} param 要判断的对象
 */
function isElement(param) {
  return param.nodeType && param.nodeType === 1;
}

/**
 * 遍历对象或数组，对操作对象的属性或元素做处理
 * @param {Object|Array} param 要遍历的对象或数组
 * @param {Function} callback 回调函数
 */
function each(param, callback) {
  if (isFalsy(param) || !isFunction(callback)) throwTypeErr('param 必须为对象或者数组，callback 必须是函数！');
  if (isArray(param) || isArrayLike(param)) {
    for (let i = 0; i < param.length; i++) {
      callback(param[i], i, param);
    }
  } else if (isObject(param)) {
    for (let val in param) {
      callback(param[val], val, param);
    }
  } else {
    throwTypeErr('each 的参数必须是 JavaScript 对象、数组或者类数组对象！');
  }
}

/**
 * 遍历数组、类数组对象或对象，返回一个对应的数组
 * @param {Object|Array} param 要遍历的对象、数组或类数组对象
 * @param {Function} callback 要使用的回调函数
 */
function map(param, callback) {
  if (!isFunction(callback)) throwTypeErr('map 回调函数不合法！');
  let res = [];
  each(param, (v, k, o) => {
    res.push(callback(v, k, o));
  });
  return res;
};

/**
 * 迭代数组、类数组对象或对象，返回一个累计值
 * @param {Object|Array} param 要迭代的数组、类数组对象或对象
 * @param {Function} callback 对每一项进行操作的回调函数，接收四个参数：acc 累加值、v 当前项、k 当前索引、o 当前迭代对象
 * @param {Any} initVal 传入的初始值
 */
function reduce(param, callback, initVal) {
  if (!isFunction(callback)) throwTypeErr('reduce 回调函数不合法！');
  let hasInitVal = !isUndefined(initVal);
  let acc = hasInitVal ? initVal : param[0];
  each(hasInitVal ? param : slice.call(param, 1), (v, k, o) => {
    acc = callback(acc, v, k, o);
  });
  return acc;
}

function filter(param, callback) {
  if (!isFunction(callback)) throwTypeErr('filter 回调函数不合法！');
  let res = [];
  each(param, (v, k, o) => {
    callback(v, k, o) ? res.push(v) : null;
  });
  return res;
}

/**
 * 数组或者类数组对象中是否包含指定元素
 * @param {String|Array} param 要检测的数组或类数组对象
 * @param {Any} subItem 要检测的项
 */
function contains(param, subItem) {
  if (!isArray(param) && !isArrayLike(param)) throwTypeErr('contains 参数不合法！');
  return isString(param) ? param.indexOf(subItem) > -1 : _arrContains(slice.call(param), subItem);
}

/**
 * 判断数组中是否包含指定项，是 contains 的辅助函数
 * @param {Array} arr 要判断的数组
 * @param {Any} subItme 指定项
 */
function _arrContains(arr, subItme) {
  for(let i = 0; i < arr.length; i++) {
    if (equals(arr[i], subItme)) return true;
  }
  return false;
};

/**
 * 判断变量是否相等的入口函数，用 underscore 的代码实现
 * @param {Any} a 要判断的对象 1
 * @param {Any} b 要判断的对象 2
 * @param {Array} aStack 栈 1
 * @param {Array} bStack 栈 2
 */
function _eq(a, b, aStack, bStack) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  if (a == null || b == null) return false;

  if (a !== a) return b !== b;

  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

  return _deepEqual(a, b, aStack, bStack);
};

function _deepEqual(a, b, aStack, bStack) {
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
      case '[object RegExp]':
      case '[object String]':
          return '' + a === '' + b;
      case '[object Number]':
          if (+a !== +a) return +b !== +b;
          return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
          return +a === +b;
      case '[object Symbol]':
          return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
  }

  var areArrays = className === '[object Array]';
  if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
          isFunction(bCtor) && bCtor instanceof bCtor)
          && ('constructor' in a && 'constructor' in b)) {
          return false;
      }
  }

  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    if (aStack[length] === a) return bStack[length] === b;
  }
  aStack.push(a);
  bStack.push(b);
  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;
    while (length--) {
      if (!equals(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    var _keys = keys(a), key;
    length = _keys.length;
    if (keys(b).length !== length) return false;
    while (length--) {
      key = _keys[length];
      if (!(has(b, key) && equals(a[key], b[key], aStack, bStack))) return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
};

/**
 * 判断两变量是否相等，{} 等于 {}、NaN 等于 NaN……
 * @param {Any} a 变量 1
 * @param {Any} b 变量 2
 */
function equals(a, b) {
  return _eq(a, b);
}

/**
 * 返回参数自身的所有属性，暂时不兼容 ie <= 9
 * @param {Any} obj 要查询的对象
 */
function keys(obj) {
  let res = [];
  for (let key in obj) {
    res.push(key);
  }
  return res;
}

/**
 * 返回一个对象自身是否具有某个属性
 * @param {Any} obj 任意值
 * @param {String|Array} key 属性名
 */
function has(obj, key) {
  if (isUndefined(key) || (!isString(key) && !isArray(key))) throwTypeErr('has 参数不合法！');
  if (isArray(key)) {
    let _obj = obj;
    for (let i = 0; i < key.length; i++) {
      if (has(_obj, key[i])) _obj = _obj[key[i]];
      else return false;
    }
    return true;
  }
  return hasOwnProp.call(obj, key);
}

/**
 * 深拷贝 deepClone
 * @param {Any} set 深拷贝对象
 */
function deepClone(set = {}) {
  if (!set || typeof set !== 'object') return set;
  if (isDate(set)) return new Date(set);
  if (set.nodeType && isFunction(item.cloneNode)) return set.cloneNode(true);
  
  let cloneSet = isArray(set) ? [] : {};
  each(set, key => {
    if (hasOwnProp.call(set, key)) {
      if (set[key] && typeof set[key] === 'object') {
        cloneSet[key] = deepClone(set[key]);
      } else {
        cloneSet[key] = set[key];
      }
    }
  });
  return cloneSet;
}

/**
 * 设置 cookie
 * @param {String} key cookie 名称
 * @param {String} value cookie 的值
 * @param {Number} day 有效时长（单位是天）
 */
function setCookie(key, value, day) {
  if (!isInBrowser()) return;
  let expires = day * 24 * 3600 * 1000,
      date = new Date(+(new Date()) + expires);
  window.document.cookie = `${key}=${value};expires=${date.toUTCString()}`;
}

/**
 * 获取 cookie 值
 * @param {String} key cookie 名称
 */
function getCookie(key) {
  if (!isInBrowser()) return '';
  let cookie = window.document.cookie,
      key_vals = cookie.split(';'),
      res = '';
  each(key_vals, key_val => {
    let k = key_val.split('=')[0].replace(/\s/g, '');
    if (k !== key) return;
    res = key_val.split('=')[1];
  });
  return res;
}

/**
 * 删除 cookie
 * @param {String} key cookie 名称
 */
function delCookie(key) {
  setCookie(key, '', -1);
}

module.exports = {
  mixin,
  isFunction,
  isNumber,
  isPlainObject,
  isObject,
  isString,
  isArray,
  isArrayLike,
  isNaN,
  isSymbol,
  isRegExp,
  isDate,
  isUndefined,
  isNull,
  isInt,
  isFalsy,
  isElement,
  each,
  map,
  reduce,
  filter,
  contains,
  keys,
  has,
  equals,
  deepClone,
  setCookie,
  getCookie,
  delCookie
};
