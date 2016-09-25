import Data from 'ember-data';
const {
  attr,
  Model,
  hasMany
} = Data;

export default Model.extend({
  frequency: attr('number'),
  pronunciation: attr(),
  syllables: attr(),
  word: attr(),

  definitions: hasMany('definitions', { inverse: 'word' })
});