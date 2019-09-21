import Model, { attr, hasMany} from "@ember-data/model"

export default Model.extend({
  frequency: attr("number"),
  pronunciation: attr(),
  syllables: attr(),

  definitions: hasMany("definitions", { inverse: "word" }),
})
