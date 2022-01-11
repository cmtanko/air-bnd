import PropTypes from "prop-types";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

export const RoomCard = ({ product: room }) => {
  const roomLink = `/rooms/${room._id}`;

  return (
    <>
      <Link href={roomLink} passHref>
        <div className="card">
          <CardMedia
            component="img"
            height="340px"
            image={room.images[0].url}
            alt="hotels"
          />
          <div className="card__info">
            <h2>{room.title}</h2>
            <h4>{room.description}</h4>
            <h3>${room.pricePerNight}/night</h3>
            <h4>
              {room.ratings} ({room.numOfReviews} Reviews)
            </h4>
          </div>
        </div>
      </Link>
    </>
  );
};

RoomCard.propTypes = {
  product: PropTypes.object.isRequired
};
