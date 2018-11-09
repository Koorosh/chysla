import * as d3 from 'd3'
import {feature, mesh} from 'topojson-client'
import { map } from 'lodash'
import './map.css'

import dataA from '../../geo-data/ukraine.json'
import mapContext, {GeoJsonData, ItemType} from '../../contexts/map-context'
import {MapModel} from '../../models/map-model'

export class SimpleMap {
  constructor() {

  }

  onValueChange() {

  }

  render(root: any) {
    const map = new MapModel(dataA)
    const data = map.data
    const handleClick = (type: ItemType, d: any) => {
      mapContext.selectedObject = {
        type,
        item: d
      }
    }

    d3.dragDisable(window)

    const projection = d3.geoMercator()
      .scale(2600)
      .translate([-960, 2830])

    const path = d3.geoPath(projection)

    const countries = (feature(data, data.objects.countries) as any).features
    const lakes = (feature(data, data.objects.lakes) as any).features
    const rivers = (feature(data, data.objects.rivers) as any).features
    const regions = (feature(data, data.objects.regions) as any).features

    const svg = d3.select(root)
      .append('center')
      .append('svg')
      .attr('viewBox', '0 0 900 600')
      .attr('width', '100%')
      .attr('height', '100%')

    svg.selectAll(".country")
      .data(countries)
      .enter()
      .append("path")
      .attr("class", function(d: any) { return "country " + d.id; })
      .attr("d", path);

    svg.append('path')
      .datum(mesh(data, data.objects.countries, (a, b) => a !== b))
      .attr('class', 'country-boundary')
      .attr('d', path);

    svg.append('path')
      .datum(mesh(data, data.objects.countries, (a, b) => a === b))
      .attr('class', 'coastline')
      .attr('d', path);

    const waterGroup = svg.append('g')
      .attr('id', 'water-resources')

    waterGroup.selectAll('.river')
      .data(rivers)
      .enter()
      .append('path')
      .attr('class', 'river')
      .attr('name', (d: any) => d.properties.name)
      .attr('d', path)

    waterGroup.selectAll('.lake')
      .data(lakes)
      .enter()
      .append('path')
      .attr('class', 'lake')
      .attr('name', (d: any) => d.properties.name)
      .attr('d', path)

    svg.selectAll('.region')
      .data(regions)
      .enter()
      .append('path')
      .classed('region', true)
      .on('click', function(d: any) {
        handleClick(ItemType.PATH, d)
        console.log(d)
      })
      .attr('id', (d: any) => d.id)
      .attr('d', path)

    svg.append('path')
      .datum(mesh(data, data.objects.regions, (a, b) => a !== b))
      .classed('region-boundary', true)
      .attr('d', path)

    svg.selectAll('.region-label')
      .data(regions)
      .enter()
      .append('text')
      .on('click', function(d: any) {
        handleClick(ItemType.TEXT, d)
        console.log(ItemType.TEXT)
      })
      .call(d3.drag()
        .on('drag', function(d: any) {
          d.x = d3.event.x;
          d.y = d3.event.y
          d3.select(this)
            .attr('transform', "translate(" + d3.event.x + "," + d3.event.y + ")")
        }))

      .attr("text-anchor", 'middle')
      .attr('transform', (d: any) => `translate(${projection(d.properties.label_point)})`)
      .attr('class', (d: any) => `region-label-${d.id}`)
      .classed('region-label', true)
      .classed('draggable', true)
      .classed('noselect', true)
      .selectAll('tspan')
      .data((d: any) => (d.properties.name || d.properties.localized_name.ua).split(' '))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('dy', (d, i) => i > 0 ? "1.1em" : "0")
      .text((d: any) => `${d} `)
  }
}
