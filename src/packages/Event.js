/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 20:26:51 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-17 21:21:54
 */

const { isInBrowser } = require('../utils');
const { each } = require('./Util');

function addEvent(el, eventType, callback) {
  if (!isInBrowser()) return;
  if (!!window.addEventListener) {
    el.addEventListener(eventType, callback);
  } else if (!!window.attachEvent) {
    el.attachEvent('on' + eventType, callback);
  } else {
    el['on' + eventType] = callback;
  }
}

function removeEvent(el, eventType, callback) {
  if (!isInBrowser()) return;
  if (!!window.removeEventListener) {
    el.removeEventListener(eventType, callback);
  } else if (!!window.detachEvent) {
    el.detachEvent('on' + eventType, callback);
  } else {
    el['on' + eventType] = callback;
  }
}

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

module.exports = {
  addEvent,
  removeEvent,
  CustomEvents
};