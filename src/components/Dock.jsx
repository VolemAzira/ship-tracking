import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Anchors from "../assets/anchors.png";

const Dock = ({ position, title, capacity }) => {
  const customIcon = new Icon({
    iconUrl: Anchors,
    iconSize: [50, 50],
  });
  return (
    <Marker position={position} title={title} icon={customIcon}>
      <Popup>
        {title}
        <p>Capacity: {capacity} Ships</p>
      </Popup>
    </Marker>
  );
};

export default Dock;
