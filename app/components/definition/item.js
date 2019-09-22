import Component from "@ember/component"
import { computed, get, set } from "@ember/object"
import { isPresent } from "@ember/utils"

const GRAPH_TYPES = [
  {
    name: "Categories",
    parentsLabel: "In Category",
    childrenLabel: "Has Categories",
  },
  {
    name: "Regions",
    parentsLabel: "In Region",
    childrenLabel: "Region Of",
  },
  {
    name: "Instances",
    parentsLabel: "Instance Of",
    childrenLabel: "Has Instances",
  },
  {
    name: "Memberships",
    parentsLabel: "Member Of",
    childrenLabel: "Has Members",
  },
  {
    name: "Substances",
    parentsLabel: "Substance Of",
    childrenLabel: "Has Substances",
  },
  {
    name: "Types",
    parentsLabel: "Type Of",
    childrenLabel: "Has Types",
  },
  {
    name: "Usages",
    parentsLabel: "Usage Of",
    childrenLabel: "Has Usages",
  },
]

export default Component.extend({
  tagName: "li",

  validGraphTypes: computed("definition", function() {
    return GRAPH_TYPES.filter(({ parentsLabel, childrenLabel }) =>
      isPresent(get(this.definition, parentsLabel.camelize())) ||
      isPresent(get(this.definition, childrenLabel.camelize()))
    )
  }),

  actions: {
    selectGraphType({ parentsLabel, childrenLabel }) {
      set(this, "selectedGraphData", {
        word: get(this.definition, "word.id"),
        parentsLabel: parentsLabel,
        childrenLabel: childrenLabel,
        parents: get(this.definition, parentsLabel.camelize()) || [],
        children: get(this.definition, childrenLabel.camelize()) || [],
      })
    },
  },
})
