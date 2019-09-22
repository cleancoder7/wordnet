import Component from "@ember/component"
import { oneWay } from "@ember/object/computed"
import { inject as service } from "@ember/service"

export default Component.extend({
  router: service(),

  card: false,

  tagName: "",

  value: oneWay("word"),

  actions: {
    search(value) {
      this.router.transitionTo("word", value)
    }
  }
})
