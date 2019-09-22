import Component from "@ember/component"
import { computed } from "@ember/object"
import { isPresent } from "@ember/utils"

export default Component.extend({
  pronunciation: computed("word", "partOfSpeech", function() {
    const pronunciation = this.word.pronunciation

    if (typeof pronunciation === "object") {
      // pronunciation is either an object with keys that describe pronunciations for different parts of speech
      return `/${pronunciation[this.partOfSpeech] || pronunciation.all}/`
    } else if (isPresent(pronunciation)) {
      // or it's a string if all parts of speech are pronounced the same
      return `/${pronunciation}/`
    }
  }),

  syllables: computed("word", function() {
    return this.word.syllables.join("·")
  }),
})
