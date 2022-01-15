import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: 480,
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
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
    />
  );
};

export default Map;
