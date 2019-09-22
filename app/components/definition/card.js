import Component from "@ember/component"
import { computed } from "@ember/object"
import { isPresent } from "@ember/utils"

export default Component.extend({
  tagName: "",

  color: computed("partOfSpeech", function() {
    switch (this.partOfSpeech) {
      case "adjective":
        return "red"
      case "adverb":
        return "orange"
      case "conjunction":
        return "yellow"
      case "definite-article":
        return "green"
      case "noun":
        return "teal"
      case "preposition":
        return "blue"
      case "pronoun":
        return "indigo"
      case "verb":
        return "purple"
      default:
        return "gray"
    }
  }),

  pronunciation: computed("word", "partOfSpeech", function() {
    const pronunciation = this.word.pronunciation

    if (typeof pronunciation === "object") {
      // pronunciation is either an object with keys that describe pronunciations for different parts of speech
      return `/${pronunciation[this.partOfSpeech] || pronunciation.all}/`
    } else if (isPresent(pronunciation)) {
      // or it's a string if all parts of speech are pronounced the same
      return `/${pronunciation}/`
    } else {
      return ""
    }
  }),

  syllables: computed("word", function() {
    return this.word.syllables.join("·")
  }),
})
