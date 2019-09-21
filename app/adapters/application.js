import RESTAdapter from "@ember-data/adapter/rest"
import ENV from "wordnet/config/environment"
import { computed } from "@ember/object"

export default RESTAdapter.extend({
  host: "https://wordsapiv1.p.mashape.com",

  headers: computed(() => ({
    "X-Mashape-Key": ENV.APP.API_KEY,
    "Accept": "application/json",
    "Cache-Control": "public, max-age=86400",
  })),
})
