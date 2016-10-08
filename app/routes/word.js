import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      Ember.$('html, body').animate({ scrollTop: 0 });
    }
  },

  model(params) {
    return this.store.findRecord('word', params.word);
  }
});
