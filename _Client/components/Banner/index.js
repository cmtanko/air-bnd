import React from "react";
import { Button } from "@mui/material";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner_info">
        <h1>Vacation rentals</h1>
        <h5>Find and book unique accommodation on Airbnb</h5>
        <Button variant="outlined">Explore Nearby</Button>
      </div>
    </div>
  );
};

export default Banner;
