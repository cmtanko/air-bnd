import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();

  return (
    <div className="relative h-[400px] sm:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px]">
      <Image
        alt="hero-image"
        src="https://news.airbnb.com/wp-content/uploads/sites/4/2021/04/Olivares-Dome_12873798_0767.jpg"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-lg md:text-4xl sm:text-2xl text-white font-bold">
          Not sure where to go? Perfect.
        </p>
        <button
          className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-lg active:scale-90 transition duration-150"
          onClick={() => {
            router.push("/rooms");
          }}
        >
          I'm flexible
        </button>
      </div>
    </div>
  );
};

export default Banner;
