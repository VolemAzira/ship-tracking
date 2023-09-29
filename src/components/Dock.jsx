import React from "react";
import { Marker, Popup } from "react-leaflet";

const Dock = ({ position, title, capacity }) => {
  return (
    <Marker position={position} title={title}>
      <Popup>
        {title}
        <p>Capacity: {capacity} Ships</p>
      </Popup>
    </Marker>
  );
};

export default Dock;
