/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-17 21:18:24 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-17 21:27:29
 */

const {
  CustomEvents
} = require('../src/packages/Event');
const expect = require('expect.js');

describe('*************************************测试 Event *************************************', function() {
  describe('测试 CustomEvent', function() {
    it('#事件的订阅、发布、取消订阅', function(done) {
      const EE = new CustomEvents();
      const cb = function(e) {
        expect(e.eventType).to.be('mocha');
        expect(e.data).to.be('test!');
      };
      EE.subscribe('mocha', cb);
      setTimeout(() => {
        EE.dispatch('mocha', 'test!');
        setTimeout(() => {
          EE.unsubscribe('mocha', cb);
          expect(EE.callbacks['mocha'].length).to.be(0);
          done();
        }, 200);
      }, 200);
    });
  });
});