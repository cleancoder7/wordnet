import Route from "@ember/routing/route"

export default Route.extend({
  model({ word }) {
    return this.store.findRecord("word", word)
  }
})
