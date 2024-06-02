import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"

function Map(){

    const previousMarker:[number,number] = [0.0, 0.0];
    return(
        <MapContainer id="map" className='bottom-container' center={[0,0]} zoom={5} zoomControl={false} minZoom={1.1}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={previousMarker}>
                <Popup>
                    Monkey
                </Popup>
            </Marker>

        </MapContainer>
    )
}

export default Map;
