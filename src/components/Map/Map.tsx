import React from "react";
import {MapContainer, Marker, Popup, TileLayer, GeoJSON, GeoJSONProps} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import "./Map.css";

// <TileLayer
// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <Marker position={[51.505, -0.09]}>
// <Popup>
// A pretty CSS3 popup. <br /> Easily customizable.
// </Popup>
// </Marker>

const Map = () => {
    const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position
    const borders = async fetch("borders.json")
    console.log(borders)
    return (
        <div className="map__container">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: "98%"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*<GeoJSON key='my-geojson' data={borders} />*/}
            </MapContainer>
        </div>
    )
}

export default Map