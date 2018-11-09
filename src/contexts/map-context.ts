import {computed, observable} from 'mobx'
import {keys, get} from 'lodash'

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

class MapContext {

  @observable
  source: GeoJsonData

  @observable
  userMap: GeoJsonData

  @observable
  name = 'Ukraine'

  @observable
  selectedObject: SelectedObject

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
}

export default new MapContext()
