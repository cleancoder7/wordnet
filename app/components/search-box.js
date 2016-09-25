import Ember from 'ember';

export default Ember.Component.extend({
  keyPress(event) {
    if (event.key === 'Enter') {
      this.submit(this.get('value'));
    }
  },
  value: Ember.computed.oneWay('word'),
  classNames: ['card-panel'],
  tagName: 'div'
});
