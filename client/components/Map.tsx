import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet'
// import Weather from './Weather';

import "leaflet/dist/leaflet.css"

function Map(){
    return(
        <MapContainer id="map" center={[0,0]} zoom={5} zoomControl={false} minZoom={1.1}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default Map;
