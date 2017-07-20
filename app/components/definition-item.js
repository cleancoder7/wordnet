import Ember from 'ember'
const { Component, computed, get, isEmpty, makeArray, set } = Ember

export default Component.extend({
  // Default properties

  classNames: ['definition-item'],

  tagName: 'li',

  // Computed properties

  graphTypes: computed(function() {
    return [
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
    ]
  }),

  validGraphTypes: computed('definition', function() {
    return get(this, 'graphTypes').filter((type) => {
      return (
        !isEmpty(get(this, `definition.${type.parentsLabel.camelize()}`)) ||
        !isEmpty(get(this, `definition.${type.childrenLabel.camelize()}`))
      )
    })
  }),

  // Actions

  actions: {
    selectGraphType(type) {
      set(this, 'selectedGraphType', {
        word: get(this, 'definition.word.word'),
        parentsLabel: type.parentsLabel,
        childrenLabel: type.childrenLabel,
        parents: makeArray(get(this, `definition.${type.parentsLabel.camelize()}`)),
        children: makeArray(get(this, `definition.${type.childrenLabel.camelize()}`)),
      })
    },
  },
})
