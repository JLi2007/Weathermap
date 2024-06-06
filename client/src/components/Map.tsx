import React, { useCallback, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  Rectangle,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 100, width: 100 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

function Zoom({ location, zoom }) {
  const map = useMap();
  map.flyTo(location, zoom, { duration: 1.0 });
  const popup = location === "00" ? "origin" : location;
  return (
    <Marker position={location}>
      <Popup>you are here: {popup}</Popup>
    </Marker>
  );
}

function Map(props) {
  const markerPosition = props.position;
  return (
    <MapContainer
      id="map"
      className="bottom-container"
      center={markerPosition}
      zoom={1}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={markerPosition}>
                <Popup>
                    {markerPosition}
                </Popup>
            </Marker> */}

      <Zoom location={markerPosition} zoom={7} />
      <MinimapControl position="topright" zoom={0} />
    </MapContainer>
  );
}

export default Map;
