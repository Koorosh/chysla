import { GeoJsonData } from './map-context'
import { observable } from 'mobx'

class UserContext {
  @observable
  id: string

  @observable
  map: GeoJsonData
}

export default new UserContext()
