import * as React from 'react';
import * as _ from 'lodash'
import styled from 'styled-components'
import { withFauxDOM } from 'react-faux-dom'
import { select } from 'd3-selection'
import {geoMercator, geoPath} from 'd3-geo'
import { feature, mesh } from 'topojson-client'

import data from './ukraine.json';
import Tooltip from '../Tooltip'
import withD3Renderer from '../withD3Renderer'
import './map.css'

const LOADING = 'loading...'

const Wrapper = styled.div<{ hover?: boolean}>`
  position: relative;
  display: inline-block;
  .tooltip {
    visibility: ${({hover}) => (hover ? 'visible' : 'hidden')};
    -webkit-transition: top .2s ease-out, left .2s ease-out;
  }
`

class Map extends React.PureComponent<any, any> {

  constructor(props) {
    super(props)
  }

  x: any;
  y: any;

  computeTooltipProps = letter => {
    const hoveredData = _.omit(_.find(this.props.data, {x: letter}), 'x')
    const computeTop = this.state.look === 'stacked'
      ? arr => this.y(_.sum(arr))
      : arr => this.y(_.max(arr))
    return {
      style: {
        top: computeTop(_.values(hoveredData)) + 5,
        left: this.x(letter) + 40
      },
      content: `${letter}: ${_.values(hoveredData).join(', ')}`
    }
  }

  render() {
    const {hover, chart} = this.props
    return (
      <Wrapper className="map">
        {chart}
        {chart !== LOADING &&
        hover &&
        hover.map((letter, index) => (
          <Tooltip key={index} {...this.computeTooltipProps(letter)} />
        ))}
      </Wrapper>
    )
  }

  renderD3() {
    const {
      connectFauxDOM,
      // animateFauxDOM
    } = this.props

    const projection = geoMercator()
      .scale(2600)
      .translate([-960, 2830])

    const path = geoPath(projection)

    const countries = (feature(data, data.objects.countries) as any).features
    const lakes = (feature(data, data.objects.lakes) as any).features
    const rivers = (feature(data, data.objects.rivers) as any).features
    const regions = (feature(data, data.objects.regions) as any).features

    const faux = connectFauxDOM('div', 'chart')

    const svg = select(faux)
      .append('center')
      .append('svg')
      .attr('viewBox', '0 0 900 600')
      .attr('width', 900)
      .attr('height', 600)

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
      .attr('transform', (d: any) => `translate(${projection(d.properties.label_point)})`)
      .classed('region-label', true)
      .selectAll('tspan')
      .data((d: any) => d.properties.localized_name.ua.split(' '))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('dy', (d, i) => i > 0 ? "1.1em" : "0")
      .text((d: any) => `${d} `)
  }
}

export default withFauxDOM(
  withD3Renderer({updateOn: ['data']})(Map)
)
