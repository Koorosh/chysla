import {computed, observable} from 'mobx'
import {keys, get} from 'lodash'
import * as d3 from 'd3'
import {feature, mesh} from 'topojson-client'

import ukrJson from '../geo-data/ukr.json'

export interface GeoObjectProperties {
  name?: string;
}

export interface GeoObjectGeometry {
  type?: string;
  id?: string;
  properties: GeoObjectProperties
}

export interface GeoObject {
  type?: string;
  geometries?: GeoObjectGeometry[]
}

export interface GeoJsonData {
  type?: string;
  objects: {
    [index: string]: GeoObject
  }
}

export interface SelectedObject {
  type: ItemType,
  item: any
}

export enum ItemType {
  PATH,
  TEXT
}

export enum ZoomLevel {
  COUNTRY,
  STATE,
  REGION
}

class MapContext {

  @observable
  root: any

  @observable
  source: GeoJsonData

  @observable
  userMap: GeoJsonData

  @observable
  name = 'Ukraine'

  @observable
  selectedObject: SelectedObject = { type: ItemType.TEXT, item: undefined }

  @observable
  zoomFilter: ZoomLevel = ZoomLevel.COUNTRY

  @computed
  get selectedObjectType(): ItemType | undefined {
    return get(this, ['selectedObject', 'type'])
  }

  @computed
  get selectedObjectItem(): any {
    return get(this, ['selectedObject', 'item'])
  }

  @computed
  get featuresNames(): string[] {
    return keys(this.source.objects)
  }

  @observable
  showRegionsBorders = false

  @observable
  showRegionsLabels = false

  @observable
  showStatesBorders = true

  @observable
  showStatesLabels = true

  @observable
  labelsToShow = [
    'Кілійський'
  ]

  @computed
  get render() {
    return null // TODO: D3 relative code has to be moved out
    const self = this
    const data = ukrJson
    const handleClick = (type: ItemType, d: any) => {
      this.selectedObject = {
        type,
        item: d
      }
    }

    d3.dragDisable(window)

    const projection = d3.geoMercator()
      .scale(2600)
      .translate([-960, 2830])

    const path = d3.geoPath(projection)

    const states = (feature(data, data.objects.states) as any).features
    const regionsPoints = (feature(data, data.objects['regions-points']) as any).features
    const regionsBorders = (feature(data, data.objects['regions-borders']) as any).features

    const svg = d3.select(this.root)
      .append('center')
      .append('svg')
      .attr('viewBox', '0 0 900 600')
      .attr('width', '100%')
      .attr('height', '100%')

    if (self.showStatesBorders) {

      // svg.append("path")
      //   .datum(mesh(data, data.objects['states'], (a, b) => a === b))
      //   .attr("fill", "none")
      //   .attr("stroke", "black")
      //   // .classed('state', true)
      //   .attr("d", path)
      //
      // svg.append("path")
      //   .datum(mesh(data, data.objects['states'], (a, b) => a !== b))
      //   .attr("fill", "none")
      //   .attr("stroke", "black")
      //   // .classed('state', true)
      //   .attr("d", path)

      svg.selectAll('.state')
        .data(states)
        .enter()
        //.filter((d: any) => d.properties.adm1Clas === 81200000)
        .append('path')
        .classed('state', true)
        .attr("fill", "green")
        .attr("stroke", "black")
        .attr("d", path)
        .on('click', function(d: any) {
          handleClick(ItemType.PATH, d)
          console.log(ItemType.PATH)
        })
    }

    if (self.showRegionsBorders) {
      svg.append("path")
        .datum(mesh(data, data.objects['regions-borders'], (a, b) => a === b))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("d", path);

      svg.append("path")
        .datum(mesh(data, data.objects['regions-borders'], (a, b) => a !== b))
        .attr("fill", "none")
        .classed("region", true)
        .attr("stroke", "black")
        .attr("d", path)
    }

    if (self.showStatesLabels) {
      const textStyle = `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 11px`;
      svg.selectAll(".state")
        .data(states)
        .enter()
        .append("text")
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
        .attr("style", textStyle)
        .attr("transform", (d: any) => `translate(${projection(d3.geoCentroid(d))})`)
        .selectAll("tspan")
        .data(function (d: any) {
          return d.properties['ADM1_UA'].split(" ")
        })
        .enter()
        .append("tspan")
        .attr("x", "0")
        .attr("dy", (d, i) => i > 0 ? "1.1em" : "0")
        .text(d => d + " ")
    }

    if (self.showRegionsLabels) {
      const textStyle = `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 11px`;
      svg.selectAll(".region")
        .data(regionsPoints)
        .enter()
        .filter((d: any) => {
          return self.labelsToShow.some(label => d.properties['ADM2_UA'] === label)
        })
        .append("text")
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
        .attr("style", textStyle)
        .attr("transform", (d: any) => `translate(${projection(d.geometry.coordinates)})`)
        .classed("aaaa-label", true)
        .selectAll("tspan")
        .data((d: any) => d.properties['ADM2_UA'].split(" "))
        .enter()
        .append("tspan")
        .attr("x", "0")
        .attr("dy", (d, i) => i > 0 ? "1.1em" : "0")
        .text(d => d + " ")
        .exit()
    }
  }
}

export default new MapContext()
