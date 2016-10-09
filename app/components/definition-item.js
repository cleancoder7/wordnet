import Ember from 'ember';
const {
  Component,
  computed,
  isEmpty
} = Ember;

export default Component.extend({
  actions: {
    selectGraphType(type) {
      this.set('selectedGraphType', {
        word: this.get('model.word.word'),
        parentsLabel: type.parentsLabel,
        childrenLabel: type.childrenLabel,
        parents: Ember.makeArray(this.get(`model.${type.parentsLabel.camelize()}`)),
        children: Ember.makeArray(this.get(`model.${type.childrenLabel.camelize()}`))
      });
    }
  },


  classNames: ['definition-item'],

  graphTypes: [
    {
      name: 'Categories',
      parentsLabel: 'In Category',
      childrenLabel: 'Has Categories',
    },
    {
      name: 'Regions',
      parentsLabel: 'In Region',
      childrenLabel: 'Region Of',
    },
    {
      name: 'Instances',
      parentsLabel: 'Instance Of',
      childrenLabel: 'Has Instances',
    },
    {
      name: 'Memberships',
      parentsLabel: 'Member Of',
      childrenLabel: 'Has Members',
    },
    {
      name: 'Substances',
      parentsLabel: 'Substance Of',
      childrenLabel: 'Has Substances',
    },
    {
      name: 'Types',
      parentsLabel: 'Type Of',
      childrenLabel: 'Has Types',
    },
    {
      name: 'Usages',
      parentsLabel: 'Usage Of',
      childrenLabel: 'Has Usages',
    },

  ],

  validGraphTypes: computed('model', function () {
    return this.get('graphTypes').filter(type => {
      return !isEmpty(this.get(`model.${type.parentsLabel.camelize()}`)) ||
        !isEmpty(this.get(`model.${type.childrenLabel.camelize()}`));
    });
  }),

  tagName: 'li'
});
