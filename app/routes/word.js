import Ember from 'ember'
const { $, Route } = Ember

export default Route.extend({
  model(params) {
    return this.store.queryRecord('word', { word: params.word })
  },

  actions: {
    didTransition() {
      $('html, body').animate({ scrollTop: 0 })
    },
  },
})
