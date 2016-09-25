import Ember from 'ember';
const {
  Component,
  computed,
  isBlank
} = Ember;

export default Component.extend({

  cssClass: computed('partOfSpeech', function() {
    return `definition-card ${this.get('partOfSpeech').dasherize()}`;
  }),

  partOfSpeech: computed('definitions', function() {
    return this.get('definitions.firstObject.partOfSpeech');
  }),

  pronunciation: computed('word', 'partOfSpeech', function() {
    const pronunciation = this.get('word.pronunciation');

    if (typeof pronunciation === 'object') {
      return `/${pronunciation[this.get('partOfSpeech')] || pronunciation.all}/`;
    } else {
      if (!isBlank(pronunciation)) {
        return `/${pronunciation}/`;
      }
    }
  }),

  syllables: computed('word', function() {
    return this.get('word.syllables').join('·');
  }),

  tagName: '',

  word: computed('definitions', function() {
    return this.get('definitions.firstObject.word');
  }),

});
