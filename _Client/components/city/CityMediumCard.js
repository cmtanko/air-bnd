import React from "react";
import Link from "next/link";
import Image from "next/image";

const CityMediumCard = ({ img, title }) => {
  const link = `/rooms`;
  return (
    <Link href={link} passHref>
      <div className="cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
        <div className="relative h-80 w-80">
          <Image alt={title} src={img} layout="fill" className="rounded-xl" />
        </div>
        <h2 className="text-xl mt-3">{title}</h2>
      </div>
    </Link>
  );
};

export default CityMediumCard;
