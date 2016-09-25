import RESTAdapter from 'ember-data/adapters/rest';
import ENV from 'wordnet/config/environment';

export default RESTAdapter.extend({
  host: 'https://wordsapiv1.p.mashape.com',
  headers: {
    'X-Mashape-Key': ENV.APP.API_KEY,
    'Accept': 'application/json',
    'Cache-Control': 'public, max-age=86400'
  },
});
