import Ember from 'ember';
import RESTSerializer from 'ember-data/serializers/rest';
import {
  v4
} from "ember-uuid";

export default RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const normalizedResponse = {
      data: {
        type: 'word',
        id: v4(),
        attributes: {
          word: payload.word,
          frequency: payload.frequency,
          syllables: payload.syllables ? payload.syllables.list : [payload.word],
          pronunciation: payload.pronunciation
        },
        relationships: {
          definitions: {
            data: []
          }
        }
      },
      included: []
    };

    if (payload.results) { // payload.results is a list of definitions for the word.
      payload.results.forEach(d => { // add each definition to the word's relationships
        if (!Ember.isBlank(d.partOfSpeech)) {
          const uuid = v4(); // generate a uuid for this definition

          const definition = {
            type: 'definition',
            id: uuid,
            attributes: d
          };

          // add definition id to the relationships array
          normalizedResponse.data.relationships.definitions.data.push({
            type: 'definition',
            id: uuid
          });

          // add definition object to included array so it gets loaded into ember-data
          normalizedResponse.included.push(definition);
        }
      });
    }

    // console.log(normalizedResponse);
    return normalizedResponse;
  }
});
