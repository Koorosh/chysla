import {computed} from 'mobx'
import {keys, get, extend, set} from 'lodash'
import MapContext, {ItemType, ZoomLevel} from './map-context'
import UserContext from './user-context'

export interface Styled {
  styles: any
  class: string[]
}

export interface Marker {
  label: string
  id: string
  position: [number, number]
}

export interface GeomentryProperties {
  name: string
  markers: Marker[]
}

export interface Geometry {
  id: string
  properties: GeomentryProperties
}

class PropertiesContext {
  private properties: any = {};

  @computed
  get propertiesTemplate(): any {
    switch (MapContext.selectedObjectType) {
      case ItemType.TEXT:
        return {
          id: 'text-properties',
          name: 'Text properties',
          properties: [
            {
              id: 'font-family',
              name: 'Font',
              inputType: 'list',
              inputOptions: {
                defaultValue: 'Roboto',
                type: 'string'
              }
            },
            {
              id: 'font-size',
              name: 'Font size',
              inputType: 'list',
              inputOptions: {
                defaultValue: 10,
                min: 0,
                max: 32,
                type: 'number'
              }
            }
          ]
        }
      case ItemType.PATH:
        return {
          id: 'text-properties',
          name: 'Text properties',
          properties: [
            {
              id: 'background',
              name: 'Background color',
              inputType: 'colorPicker',
              inputOptions: {
                defaultValue: 'yellow',
                type: 'string'
              }
            },
            {
              id: 'border-color',
              name: 'Border color',
              inputType: 'text',
              inputOptions: {
                defaultValue: 'red',
                type: 'string'
              }
            }
          ]
        }
      default:
        return undefined
    }
  }

  @computed
  get modifiedProperties(): any {
    return this.properties;
  }

  onChange({styleName, styleVal}) {
    const item = MapContext.selectedObjectItem
    const path = item.properties.meta.path
    const map = UserContext.map
    this.properties[path] = extend({}, this.properties[path], {[styleName]: styleVal})
    set(map, path, this.properties[path])
  }

  applyZoomFilter(zoomLevel: ZoomLevel) {
    MapContext.zoomFilter = zoomLevel
  }
}

export default new PropertiesContext()
