import Ember from 'ember'
const { Component, computed, get, isBlank } = Ember

export default Component.extend({
  // Default properties

  classNames: ['card'],

  classNameBindings: ['cssClass'],

  tagName: 'div',

  // Computed properties

  cssClass: computed('partOfSpeech', function() {
    return `definition-card ${get(this, 'partOfSpeech').dasherize()}`
  }),

  pronunciation: computed('word', 'partOfSpeech', function() {
    const pronunciation = get(this, 'word.pronunciation')

    if (typeof pronunciation === 'object') {
      // pronunciation is either an object with keys that describe pronunciations for different parts of speech
      return `/${pronunciation[get(this, 'partOfSpeech')] || pronunciation.all}/`
    } else {
      // or it's a string if all parts of speech are pronounced the same
      if (!isBlank(pronunciation)) {
        return `/${pronunciation}/`
      }
    }
  }),

  syllables: computed('word', function() {
    return get(this, 'word.syllables').join('·')
  }),
})
