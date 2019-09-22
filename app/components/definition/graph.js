import Component from "@ember/component"
import { computed } from "@ember/object"
import { isEmpty } from "@ember/utils"
import { event, select } from "d3-selection"
import { zoom } from "d3-zoom"

export default Component.extend({
  childrenData: computed("data.{parents,children}", function() {
    return this.data.children.map((word, i) => ({
      word: word,
      x: this._getXCoords("children"),
      y: this._getYCoords("children", i),
    }))
  }),

  parentsData: computed("data.{parents,children}", function() {
    return this.data.parents.map((word, i) => ({
      word: word,
      x: this._getXCoords("parents"),
      y: this._getYCoords("parents", i),
    }))
  }),

  didRender() {
    this._super(...arguments)

    const parents = this.parentsData
    const children = this.childrenData

    const svg = select(this.element.querySelector("svg"))
      .attr("width", this.element.offsetWidth)
      .attr("height", this.element.offsetHeight)
      .call(
        zoom().on("zoom", function() {
          svg.attr("transform", event.transform.toString())
        })
      )
      .select(".zoom")

    // Create links and nodes for parents
    const parentsLinks = svg
      .select(".parents-links")
      .selectAll(".link")
      .data(parents)

    parentsLinks.exit().remove()

    parentsLinks.attr("d", (d) => this._getPathCoords("parents", d.x, d.y))

    // add links for new parents data
    parentsLinks
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => this._getPathCoords("parents", d.x, d.y))

    // place parent nodes in appropriate positions
    svg
      .select(".parents-nodes")
      .selectAll(".node")
      .attr("transform", (d, i) => `translate(${parents[i].x}, ${parents[i].y})`)
      .select("text")
      .attr("dy", "0.35rem")
      .attr("dx", "-1rem")

    // Create links and nodes for children
    const childrenLinks = svg
      .select(".children-links")
      .selectAll(".link")
      .data(children)

    // remove existing children links
    childrenLinks.exit().remove()

    childrenLinks.attr("d", (d) => this._getPathCoords("children", d.x, d.y))

    // add links for new children data
    childrenLinks
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => this._getPathCoords("children", d.x, d.y))

    // place children nodes in appropriate positions
    svg
      .select(".children-nodes")
      .selectAll(".node")
      .attr("transform", (d, i) => `translate(${children[i].x}, ${children[i].y})`)
      .select("text")
      .attr("dy", "0.35rem")
      .attr("dx", "1rem")

    // place the self node
    svg
      .select(".self-node")
      .attr("transform", () => `translate(${this._getXCoords("self",)}, ${this._getYCoords("self")})`)
  },

  // Returns the equation for the path linking parent/child nodes to the center node
  _getPathCoords(type, x, y) {
    // links start at the center
    const start = {
      x: this._getXCoords("self"),
      y: this._getYCoords("self"),
    }

    // bezier point is halfway between the center and node
    const bezier = {
      x: (this._getXCoords(type) + this._getXCoords("self")) / 2,
      y: y,
    }

    // links end at the node's coordinates
    const final = {
      x: x,
      y: y,
    }

    return `M ${start.x}, ${start.y}
            S ${bezier.x}, ${bezier.y}
              ${final.x},${final.y}`
  },

  _getXCoords(type) {
    const width = this.element.offsetWidth

    switch (type) {
      case "parents":
        return width * 0.2
      case "self":
        if (isEmpty(this.parentsData)) {
          return width * 0.2
        } else if (isEmpty(this.childrenData)) {
          return width * 0.8
        } else {
          return width * 0.5
        }
      case "children":
        return isEmpty(this.parentsData) ? width * 0.6 : width * 0.8
    }
  },

  _getYCoords(type, index) {
    let y = this.element.offsetHeight / 2

    if (type === "self") {
      return y
    } else {
      const mid = Math.floor(this.data[type].length / 2)
      const dist = Math.abs(index - mid)

      if (index < mid) {
        y -= dist * 25
      } else if (index > mid) {
        y += dist * 25
      }
      return y
    }
  },
})
