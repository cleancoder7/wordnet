import Ember from 'ember';
import {
  event,
  select,
  selectAll
} from 'd3-selection';

import {
  hierarchy
} from 'd3-hierarchy';

import {
  zoom
} from 'd3-zoom';


export default Ember.Component.extend({

  classNames: ['definition-tree'],


  getPathCoords(type, x, y) {
    let bezierX = (this.getXCoords(type) + this.getXCoords('self')) / 2;

    return `M${this.getXCoords('self')},${this.element.offsetHeight / 2}
      S${bezierX},${y}
        ${x},${y}`;
  },

  getYCoords(type, index) {
    const mid = Math.floor(this.get(`model.${type}`).length / 2);
    const dist = Math.abs(index - mid);

    let y = this.element.offsetHeight / 2;
    if (index < mid) {
      y -= dist * 25;
    } else if (index > mid) {
      y += dist * 25;
    }

    return y;
  },

  getXCoords(type) {
    switch (type) {
    case 'parents':
      return this.element.offsetWidth * 0.2;
    case 'self':
      if (Ember.isEmpty(this.get('parentsData'))) {
          return this.element.offsetWidth * 0.2;
        } else if (Ember.isEmpty(this.get('childrenData'))) {
          return this.element.offsetWidth * 0.8;
        } else {
          return this.element.offsetWidth * 0.5;
        }
    case 'children':
      return this.get('parentsData').length > 0 ? this.element.offsetWidth * 0.8 : this.element.offsetWidth * 0.6;
    }
  },


  parentsData: Ember.computed('model.parents', 'model.children', function() {
    return this.get('model.parents').map((word, i) => ({
      word: word,
      x: this.getXCoords('parents'),
      y: this.getYCoords('parents', i)
    }));
  }),

  childrenData: Ember.computed('model.parents', 'model.children', function() {
    return this.get('model.children').map((word, i) => ({
      word: word,
      x: this.getXCoords('children'),
      y: this.getYCoords('children', i)
    }));
  }),

  didRender() {
    const _this = this;
    const parents = this.get('parentsData');
    const children = this.get('childrenData');

    const svg = select(this.element.querySelector('svg'))
      .attr('width', this.element.offsetWidth)
      .attr('height', this.element.offsetHeight)
      .call(zoom().on('zoom', function() {
        svg.attr('transform', event.transform.toString());
      }))
      .select('.zoom');


    // Create links and nodes for parents
    const parentsLinks = svg.select('.parents-links')
      .selectAll('.link')
      .data(parents);

    // add links for new parents data
    parentsLinks.enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d) {
        return _this.getPathCoords('parents', d.x, d.y);
      });

    // remove existing parent links
    parentsLinks.exit()
      .remove();

    // place parent nodes in appropriate positions
    svg.select('.parents-nodes')
      .selectAll('.node')
        .attr('transform', function(d, i) {
          return `translate(${parents[i].x}, ${parents[i].y})`;
        })
        .select('text')
        .attr('dy', '0.35rem')
        .attr('dx', '-1rem');


    // Create links and nodes for children
    const childrenLinks = svg.select('.children-links')
      .selectAll('.link')
      .data(children);

    // add links for new children data
    childrenLinks.enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d) {
        return _this.getPathCoords('children', d.x, d.y);
      });

    // remove existing children links
    childrenLinks.exit()
      .remove();

    // place children nodes in appropriate positions
    svg.select('.children-nodes')
      .selectAll('.node')
        .attr('transform', function(d, i) {
          return `translate(${children[i].x}, ${children[i].y})`;
        })
        .select('text')
        .attr('dy', '0.35rem')
        .attr('dx', '1rem');


    svg.select('.self-node')
      .attr('transform', function(d, i) {
        return `translate(${ _this.getXCoords('self') }, ${_this.element.offsetHeight * 0.5})`;
      });
  },

  model: {
    parents: [
    'automotive vehicle',
    'motor vehicle'
  ],

    children: [
    'cruiser',
    'ambulance',
    'beach waggon',
    'beach wagon',
    'bus',
    'tourer',
    'touring car',
    'two-seater',
    'used-car', 'beach wagon',
    'bus',
    'tourer',
    'touring car',
    'two-seater',
    'used-car', 'beach wagon',
    'bus',
    'tourer',
    'touring car',
    'two-seater',
    'used-car', 'beach wagon',
    'bus',
    'tourer',
    'touring car',
    'two-seater',
    'used-car',
    'waggon',
    'wagon'
  ]}
});
