import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography
} from "@mui/material";

import CardMedia from "@mui/material/CardMedia";

export const RoomCard = ({ product: room, ...rest }) => {
  const roomLink = `/rooms/${room._id}`;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3
          }}
        >
          <Link href={roomLink}>
            <a>
              <CardMedia
                component="img"
                height="240"
                image={room.images[0].url}
                alt="hotels"
              />
            </a>
          </Link>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {room.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {room.description.toString().slice(0, 100)}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex"
            }}
          >
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {room.ratings} ({room.numOfReviews} Reviews)
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex"
            }}
          >
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              ${room.pricePerNight} / night
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

RoomCard.propTypes = {
  product: PropTypes.object.isRequired
};
