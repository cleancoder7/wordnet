import Model, { attr, hasMany} from "@ember-data/model"
import { computed } from "@ember/object"

export default Model.extend({
  frequency: attr("number"),
  pronunciation: attr(),
  syllables: attr(),

  definitions: hasMany("definitions", { inverse: "word" }),

  definitionsByPartOfSpeech: computed("definitions.@each.partOfSpeech", function() {
    const partsOfSpeech = {}

    this.definitions
      .mapBy("partOfSpeech")
      .uniq()
      .sort()
      .forEach((part) => partsOfSpeech[part] = [])

    this.definitions
      .forEach((definition) =>
        partsOfSpeech[definition.partOfSpeech].pushObject(definition)
      )

    return partsOfSpeech
  })
})
