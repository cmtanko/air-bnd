import React from "react";
import Image from "next/image";

const CityCard = ({ img, distance, location }) => {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
      <div className="relative h-16 w-16">
        <Image alt={location} src={img} layout="fill" className="rounded-lg" />
      </div>
      <div className="">
        <h2 className="">{location}</h2>
        <h3 className="text-gray-500">{distance}</h3>
      </div>
    </div>
  );
};

export default CityCard;
