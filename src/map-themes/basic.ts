import {GeoJsonData} from '../contexts/map-context'

export const basicMapTheme: GeoJsonData = {
  objects: {
    countries: {
      geometries: [
        {
          id: 'UKR',
          properties: {
            name: 'Україна'
          }
        }
      ]
    },
    regions: {
      geometries: [
        {
          id: 'crimea',
          properties: {
            name: 'Крим'
          }
        }
      ]
    }
  }
}
