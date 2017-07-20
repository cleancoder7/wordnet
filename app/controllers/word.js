import Ember from 'ember'
const { computed, Controller, get } = Ember

export default Controller.extend({
  groupedDefinitions: computed('model.definitions', function() {
    const definitions = get(this, 'model.definitions')
    const grouped = {}

    // group and alphabetically sort definitions by part of speech
    const partsOfSpeech = definitions.map((d) => get(d, 'partOfSpeech')).uniq().sort()

    partsOfSpeech.forEach((part) => {
      grouped[part] = []
    })

    definitions.forEach((definition) => {
      grouped[get(definition, 'partOfSpeech')].pushObject(definition)
    })

    return grouped
  }),
})
