/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 20:26:51 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-01-30 17:10:40
 */

const { isInBrowser } = require('../utils');
const { each } = require('./Util');

/**
 * 兼容模式的事件绑定函数
 * @param {Element} el 要绑定事件的 DOM 元素
 * @param {String} eventType 事件类型
 * @param {Function} callback 事件处理函数
 */
const addEvent = (function(window) {
  // mocha 测试 window 等 DOM 对象时会报错，需要使用 jsdom~
  // 参考：https://stackoverflow.com/questions/34059644/mocha-command-giving-referenceerror-window-is-not-defined
  if (!isInBrowser()) return function() {
    throw new Error('请在浏览器中使用 addEvent 函数，Node 环境下请使用自定义事件 API。');
  };
  if (window.addEventListener) {
    return function(el, eventType, callback) {
      el.addEventListener(eventType, callback);
    };
  } else if (window.attachEvent) {
    return function(el, eventType, callback) {
      el.attachEvent('on' + eventType, callback);
    };
  } else {
    return function(el, eventType, callback) {
      el['on' + eventType] = callback;
    };
  }
})(window);

/**
 * 兼容模式的事件解绑函数
 * @param {Element} el 要解绑事件的 DOM 元素
 * @param {String} eventType 事件类型
 * @param {Function} callback 事件处理函数
 */
function removeEvent(el, eventType, callback) {
  if (!isInBrowser()) return;
  if (window.removeEventListener) {
    el.removeEventListener(eventType, callback);
  } else if (window.detachEvent) {
    el.detachEvent('on' + eventType, callback);
  } else {
    el['on' + eventType] = callback;
  }
}

/**
 * 自定义事件中心
 */
class CustomEvents {
  constructor() {
    this.callbacks = {};
  }
  subscribe(eventType, callback) {
    this.callbacks[eventType] ? this.callbacks[eventType].push(callback) : this.callbacks[eventType] = [callback];
  }
  dispatch(eventType, data) {
    let e = {
      eventType,
      data
    };
    each(this.callbacks[eventType], callback => callback(e));
  }
  unsubscribe(eventType, callback) {
    let idx = this.callbacks[eventType].indexOf(callback);
    this.callbacks[eventType].splice(idx, 1);
  }
}

let callbacks = [];

function ready(fn) {
  if (!isInBrowser() || document.readyState === 'complete') return fn();
  callbacks.push(fn);

  let domContentLoadedHandler = () => {
    removeEvent(document, 'DOMContentLoaded', domContentLoadedHandler);
    removeEvent(document, 'readystatechange', readyStateChangeHandler);
    removeEvent(window, 'load', loadHandler);
    each(callbacks, fn => {
      fn();
    });
    callbacks = [];
  };
  let readyStateChangeHandler = domContentLoadedHandler;
  let loadHandler = readyStateChangeHandler;
  addEvent(document, 'DOMContentLoaded', domContentLoadedHandler);
  addEvent(document, 'readystatechange', readyStateChangeHandler);
  addEvent(window, 'load', loadHandler);
}

module.exports = {
  addEvent,
  removeEvent,
  CustomEvents,
  ready
};
