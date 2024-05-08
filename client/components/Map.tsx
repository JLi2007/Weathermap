import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"

function Map(){
    // let previousMarker: L.Marker | null = null;
    // useEffect(()=>{
    //     const map = L.map('Map', { zoomControl: false, minZoom: 1.1 }).setView([0, 0], 5); 
    //     const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    //     const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    //     const tiles = L.tileLayer(tileURL, { attribution });
    //     tiles.addTo(map);

    // }, []);

    return(
        <MapContainer id="map" center={[0,0]} zoom={5} zoomControl={false} minZoom={1.1}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default Map