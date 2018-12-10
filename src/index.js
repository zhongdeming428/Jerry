/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 16:36:33 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-10 22:00:45
 */

 import { mixin } from './packages/Util';

 /**
  * 
  * @param {Any} obj 传递给 Jerry 函数或者构造器的值。
  */
function Jerry (obj) {
  if (obj instanceof Jerry) return obj;
  else if (this instanceof Jerry) this._wrapped = obj;
  else {
    return new Jerry(obj);
  }
}

mixin(Jerry.prototype, {
  sayName() {
    console.log(this.name);
  }
});

Jerry({ name: 'none' }).sayName();