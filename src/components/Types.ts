import { Feature, Geometry, GeoJsonProperties } from 'geojson'

export namespace Types {
export type MapObject = {
        mapFeatures: Feature<Geometry, GeoJsonProperties>[]
    }
}