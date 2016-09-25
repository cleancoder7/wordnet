import Ember from 'ember';
const {
  computed,
  Controller
} = Ember;

export default Controller.extend({
  groupedDefinitions: computed('model.definitions', function() {
    // group and alphabetically sort definitions by part of speech
    const partsOfSpeech = this.get('model.definitions').map(d => d.get('partOfSpeech')).uniq().sort();
    const grouped = {};

    partsOfSpeech.forEach(part => {
      grouped[part] = [];
    });

    this.get('model.definitions').forEach(definition => {
      grouped[definition.get('partOfSpeech')].push(definition);
    });
    return grouped;
  })
});
