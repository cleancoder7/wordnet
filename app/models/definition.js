import Data from 'ember-data';
const {
  attr,
  belongsTo,
  Model
} = Data;


export default Model.extend({
  word: belongsTo('word', { inverse: 'definitions' }),

  definition: attr(),
  examples: attr(),
  partOfSpeech: attr(),

  synonyms: attr(),
  similarTo: attr(),
  antonyms: attr(),

  also: attr(),
  entails: attr(),
  pertainsTo: attr(),

  inCategory: attr(),
  hasCategories: attr(),

  inRegion: attr(),
  regionOf: attr(),

  instanceOf: attr(),
  hasInstances: attr(),

  memberOf: attr(),
  hasMembers: attr(),

  partOf: attr(),
  hasParts: attr(),

  substanceOf: attr(),
  hasSubstances: attr(),

  typeOf: attr(),
  hasTypes: attr(),

  usageOf: attr(),
  hasUsages: attr(),
});
