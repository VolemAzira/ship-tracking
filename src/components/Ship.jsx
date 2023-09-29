import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import ship from "../assets/ship.png";

const Ship = ({ position, title, destination }) => {
  const customIcon = new Icon({
    iconUrl: ship,
    iconSize: [40, 40],
  });
  return (
    <Marker position={position} title={title} icon={customIcon}>
      <Popup>
        {title}
        <p>Shipped to: {destination}</p>
      </Popup>
    </Marker>
  );
};

export default Ship;
