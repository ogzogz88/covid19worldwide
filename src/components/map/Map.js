import React from 'react'
import './Map.css'
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet'
import ShowDataOnMap from './ShowDataOnMap'

// draw interactive tooltips on the map
const dataTypeColors = {
    cases: {
        hex: "#9090ff",
        multiplier: 300
    },
    recovered: {
        hex: "#9090ff",
        multiplier: 300
    },
    deaths: {
        hex: "#9090ff",
        multiplier: 1000
    },
};

//refresh the map. Recommended from leaflet docs
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}
function Map({ countries, dataType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {ShowDataOnMap(countries, dataType, dataTypeColors)}
            </LeafletMap>
        </div>
    )

}
export default Map;
