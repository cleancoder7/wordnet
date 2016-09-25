import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    searchWord(word) {
      this.transitionTo('word', word);
    }
  }
});
