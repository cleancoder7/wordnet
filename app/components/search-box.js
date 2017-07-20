import Ember from 'ember'
const { Component, computed, get } = Ember

export default Component.extend({
  // Default properties

  classNames: ['card'],

  // Computed properties

  value: computed.readOnly('word'),

  // Custom methods

  keyPress(event) {
    if (event.key === 'Enter') {
      this.submit(get(this, 'value'))
    }
  },
})
