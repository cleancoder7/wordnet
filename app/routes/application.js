import Ember from 'ember'
const { Route } = Ember

export default Route.extend({
  actions: {
    searchWord(word) {
      this.transitionTo('word', word)
    },
  },
})
