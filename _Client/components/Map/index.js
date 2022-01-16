import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import Link from "next/link";

const Map = ({ rooms }) => {
  const coordinates = rooms.map((result) => ({
    longitude: result.long,
    latitude: result.lat
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: 480,
    height: "100%",
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 8
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/cmtanko/ckyfq0saf2e9n14p6zuxvkuyr"
      mapboxApiAccessToken={process.env.MAP_BOX_ACCESS_TOKEN}
      {...viewport}
      onViewportChange={(newViewPort) => {
        setViewport(newViewPort);
      }}
    >
      {rooms.map((result) => {
        return (
          <div key={result.long}>
            <Marker
              longitude={parseFloat(result.long)}
              latitude={parseFloat(result.lat)}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Link href={`/rooms/${result._id}`} passHref>
                <p className="cursor-pointer text-lg animate-bounce bg-red-400">
                  ${result.pricePerNight}
                </p>
              </Link>
            </Marker>
          </div>
        );
      })}
    </ReactMapGL>
  );
};

export default Map;
