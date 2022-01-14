import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";

export const RoomCard = ({ product: room }) => {
  const roomLink = `/rooms/${room._id}`;
  return (
    <Link href={roomLink} passHref>
      <div className="md:flex py-7 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition transform duration-200 ease-out first:border-t">
        <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 ml-3">
          <Image
            className="rounded-2xl"
            src={room.images[0].url}
            layout="fill"
            objectFit="contain"
            alt={room.title}
          />
        </div>
        <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p>{room.name}</p>
            <HeartIcon className="h-7 cursor-pointer" />
          </div>

          <h4 className="text-xl">{room.title}</h4>
          <div className="border-b w-10 pt-2"></div>
          <p className="pt-2 text-sm text-gray-500 flex-grow">
            {room.description}
          </p>

          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" />
              {room.ratings} ({room.numOfReviews} Reviews)
            </p>

            <div>
              <p className="text-lg lg:text-xl font-semibold pb-2">
                ${room.pricePerNight}/night
              </p>
              <p className="text-right font-extralight">
                ${room.pricePerNight}/total
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

RoomCard.propTypes = {
  product: PropTypes.object.isRequired
};
