import Ember from 'ember';
import { hierarchy } from 'd3-hierarchy';
import { event, select, selectAll } from 'd3-selection';
import { zoom } from 'd3-zoom';

const {
  Component,
  computed,
  isEmpty,
} = Ember;

export default Component.extend({

  classNames: ['definition-tree'],

  childrenData: computed('model.parents', 'model.children', function() {
    return this.get('model.children').map((word, i) => ({
      word: word,
      x: this.getXCoords('children'),
      y: this.getYCoords('children', i)
    }));
  }),

  parentsData: computed('model.parents', 'model.children', function() {
    return this.get('model.parents').map((word, i) => ({
      word: word,
      x: this.getXCoords('parents'),
      y: this.getYCoords('parents', i)
    }));
  }),

  // Returns the equation for the path linking parent/child nodes to the center node
  getPathCoords(type, x, y) {
    // links start at the center
    const start = {
      x: this.getXCoords('self'),
      y: this.getYCoords('self')
    };

    // bezier point is halfway between the center and node
    const bezier = {
      x: (this.getXCoords(type) + this.getXCoords('self')) / 2,
      y: y
    };

    // links end at the node's coordinates
    const final = {
      x: x,
      y: y
    };

    return `M ${start.x}, ${start.y}
            S ${bezier.x}, ${bezier.y}
              ${final.x},${final.y}`;
  },

  getXCoords(type) {
    const width = this.element.offsetWidth;

    switch (type) {
    case 'parents':
      return width * 0.2;
    case 'self':
      if (isEmpty(this.get('parentsData'))) {
        return width * 0.2;
      } else if (isEmpty(this.get('childrenData'))) {
        return width * 0.8;
      } else {
        return width * 0.5;
      }
    case 'children':
      return isEmpty(this.get('parentsData')) ? width * 0.6 : width * 0.8;
    }
  },

  getYCoords(type, index) {
    let y = this.element.offsetHeight / 2;

    if (type === 'self') {
      return y;
    } else {
      const mid = Math.floor(this.get(`model.${type}`).length / 2);
      const dist = Math.abs(index - mid);

      if (index < mid) {
        y -= dist * 25;
      } else if (index > mid) {
        y += dist * 25;
      }
      return y;
    }
  },

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

    parentsLinks.exit()
      .remove();

    parentsLinks
      .attr('d', function(d) {
        return _this.getPathCoords('parents', d.x, d.y);
      });

    // add links for new parents data
    parentsLinks.enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d) {
        return _this.getPathCoords('parents', d.x, d.y);
      });

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

    // remove existing children links
    childrenLinks.exit()
      .remove();

    childrenLinks
      .attr('d', function(d) {
        return _this.getPathCoords('children', d.x, d.y);
      });

    // add links for new children data
    childrenLinks.enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d) {
        return _this.getPathCoords('children', d.x, d.y);
      });

    // place children nodes in appropriate positions
    svg.select('.children-nodes')
      .selectAll('.node')
        .attr('transform', function(d, i) {
          return `translate(${children[i].x}, ${children[i].y})`;
        })
        .select('text')
        .attr('dy', '0.35rem')
        .attr('dx', '1rem');

    // place the self node
    svg.select('.self-node')
      .attr('transform', function() {
        return `translate(${ _this.getXCoords('self') }, ${_this.getYCoords('self')})`;
      });
  },
});
