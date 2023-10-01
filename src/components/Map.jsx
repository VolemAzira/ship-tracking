import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import Ship from "./Ship";
import Dock from "./Dock";

function Map() {
  // Initial map center and zoom level
  const initialZoom = 13;
  const initialMapCenter = {
    lat: -6.087396180866604,
    lng: 106.83912017970863,
  };
  // Initial positions for docks and ships
  const [dockPositions, setDockPositions] = useState([
    {
      lat: -6.0948648709414135,
      lng: 106.79984582918543,
      title: "Pelabuhan Muara Baru",
      capacity: 70,
    },
    {
      lat: -6.095648733301278,
      lng: 106.88234686749408,
      title: "Pelabuhan Tanjung Priok",
      capacity: 100,
    },
  ]);

  const [shipPositions, setShipPositions] = useState([
    {
      lat: -6.087271483353298,
      lng: 106.82179412420203,
      title: "Ship 1",
      destination: "Pelabuhan Muara Baru",
    },
    {
      lat: -6.087185549916167,
      lng: 106.85237039150249,
      title: "Ship 2",
      destination: "Pelabuhan Tanjung Priok",
    },
  ]);

  const [isMoving, setIsMoving] = useState(false);

  // Function to move ships towards docks
  const moveShipsToDocks = () => {
    const speed = 0.0002;

    setShipPositions((prevPositions) =>
      prevPositions.map((ship, index) => {
        const dockPosition = dockPositions[index];
        const latDiff = dockPosition.lat - ship.lat;
        const lngDiff = dockPosition.lng - ship.lng;
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
        const latIncrement = (speed * latDiff) / distance;
        const lngIncrement = (speed * lngDiff) / distance;

        return {
          ...ship,
          lat: ship.lat + latIncrement,
          lng: ship.lng + lngIncrement,
        };
      })
    );
  };

  // Function to handle position changes for ships
  const handlePositionChange = (index, event) => {
    const { name, value } = event.target;
    setShipPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = {
        ...newPositions[index],
        [name]: parseFloat(value),
      };
      return newPositions;
    });
  };

  // Use effect to start or stop ship movement
  useEffect(() => {
    let intervalId;

    if (isMoving) {
      intervalId = setInterval(moveShipsToDocks, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isMoving, dockPositions]);

  return (
    <main className="pt-[5rem] lg:pt-[6rem]">
      <div
        className="h-[500px] mb-5 border-b-2 border-black shadow-lg"
        id="home"
      >
        <MapContainer center={initialMapCenter} zoom={initialZoom}>
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=3br2UB6uKpvaxdJt7ODS"
          />
          {shipPositions.map((ship, index) => (
            <Ship
              key={index}
              position={ship}
              title={ship.title}
              destination={ship.destination}
            />
          ))}
          {dockPositions.map((dock, index) => (
            <Dock
              key={index}
              position={dock}
              title={dock.title}
              capacity={dock.capacity}
            />
          ))}
          {shipPositions.map((ship, index) => (
            <Polyline
              key={index}
              pathOptions={{ color: "blue" }}
              positions={[ship, dockPositions[index]]}
            />
          ))}
        </MapContainer>
      </div>
      <form
        className="flex flex-col justify-center items-center mx-5"
        id="form"
      >
        <h3 className="text-3xl font-bold">Edit Ships Positions:</h3>
        <div className="flex flex-col md:flex-row gap-10 m-5 border-2 border-black w-full md:w-auto">
          {shipPositions.map((position, index) => (
            <div key={index} className="p-3">
              <h3 className="text-xl font-semibold mb-3">Ship {index + 1}</h3>
              <label>Latitude:</label>
              <br />
              <input
                type="number"
                name="lat"
                value={position.lat}
                step="0.0001"
                onChange={(event) => handlePositionChange(index, event)}
                className="border border-black p-1 w-full"
              />
              <br />
              <br />
              <label>Longitude:</label>
              <br />
              <input
                type="number"
                name="lng"
                value={position.lng}
                step="0.0001"
                onChange={(event) => handlePositionChange(index, event)}
                className="border border-black p-1 w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIsMoving(!isMoving)}
            className={`${
              isMoving
                ? "bg-red-500 hover:bg-red-700"
                : "bg-green-500 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            {isMoving ? "Stop" : "Start"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Map;
