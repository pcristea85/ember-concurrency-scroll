import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
export default Component.extend({
  tagName: 'button',
  scroller: service(),
  scroll: task(function *() {
    yield this.get('scroller.scrollToElementId').perform(...arguments);
    if (this.get('bounce')){
      yield this.get('scroller.scrollToElementId').perform('1');
    }
  }),
  click() {
    this.get('scroll').perform(this.get('target'), {
      duration: 1500,
      type: 'sin'
    });
    let cancel = ()=> {
      // console.log('cancel!', this.get('scroller.scrollToX.state'));
      if (this.get('scroller.scrollToX.isRunning')) {
        this.get('scroller.scrollToElementId').perform('1');
      }
    };
    this.$(document.body).one('click', cancel);
  }
})
