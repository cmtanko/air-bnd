import React, { useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Item,
  Divider
} from "@mui/material";
import DatePicker from "react-datepicker";
import { RoomCard } from "./RoomCard";
import { ProductListToolbar } from "./RoomListToolbar";
import "react-datepicker/dist/react-datepicker.css";

import isWeekend from "date-fns/isWeekend";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
const RoomDetailsPage = () => {
  const { room, error = "" } = useSelector((state) => state.room);
  const [value, setValue] = React.useState(new Date());

  useEffect(() => {
    error && toast.error(error);
  }, []);

  return (
    <Container maxWidth={false}>
      <Box sx={{ pt: 3 }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            {room.name}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1
          }}
        >
          <Typography sx={{ m: 1 }} variant="h7">
            {room.address.trim()}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1
          }}
        >
          <Typography sx={{ m: 1 }} variant="h7">
            ({room.numOfReviews} Reviews)
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Card
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardContent>
              <CardMedia
                component="img"
                height="480"
                image={room.images[0].url}
                alt="hotels"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Card
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardContent>
              <Typography gutterBottom color="textPrimary" variant="h5">
                Description
              </Typography>
              <Divider />
              <Typography
                gutterBottom
                align="left"
                color="textPrimary"
                variant="body1"
              >
                {room.description}
              </Typography>
              <Typography gutterBottom color="textPrimary" variant="h5">
                Features
              </Typography>
              <Divider />
              <Typography align="left" color="textPrimary" variant="body1">
                {room.guestCapacity} Guests
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                {room.numOfBeds} Beds
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                {room.breakfast ? "√" : "X"} Breakfast
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                {room.internet ? "√" : "X"} Internet
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                {room.airConditioned ? "√" : "X"} Air Conditioned
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                {room.petsAllowed ? "√" : "X"} Pets Allowed
              </Typography>
              <Typography align="left" color="textPrimary" variant="body1">
                {room.roomCleaning ? "√" : "X"} Room Cleaning
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="textPrimary" variant="h7">
                ${room.pricePerNight}/night
              </Typography>
              <Divider />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  orientation="portrait"
                  openTo="day"
                  value={value}
                  shouldDisableDate={isWeekend}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="textPrimary" variant="h5">
                Reviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomDetailsPage;
