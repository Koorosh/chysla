import { merge, map, reduce, entries, chain } from 'lodash'
import {GeoJsonData, GeoObject, GeoObjectGeometry} from '../contexts/map-context'
import {basicMapTheme} from '../map-themes/basic'

export class MapModel {
  constructor(private rawData: GeoJsonData) {
    this.data = this.extendWithDefaults(rawData, basicMapTheme)
  }

  static setToPath(path: string[], value) {

  }

  data: any

  extendWithDefaults(data: GeoJsonData, theme: GeoJsonData) {

    const objects = chain(data.objects)
      .entries()
      .map(([key, val]: [string, GeoObject]) => {
        const geometries = map(val.geometries, (geometry: GeoObjectGeometry) => ({
          id: geometry.id || geometry.properties.name,
          properties: {
            ...geometry.properties,
            meta: {
              path: ['objects', key, 'geometries', geometry.id || geometry.properties.name]
            },
            styles: {
              background: 'red',
              ['font-size']: '10px'
            }
          }
        }))
        return [key, { geometries }]
      })
      .fromPairs()
      .value()

    return merge<any, GeoJsonData, GeoJsonData>({}, data, { objects })
  }
}
