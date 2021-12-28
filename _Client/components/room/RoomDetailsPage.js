import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
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
import NewReview from "../review/NewReview";

import isWeekend from "date-fns/isWeekend";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import axios from "axios";
import {
  checkBooking,
  getBookedDates
} from "../../redux/actions/bookingAction";
import { CHECK_BOOKING_REQUEST } from "../../redux/constants/actionConstants";
import getStripe from "../../../_Server/utils/getStripe";
import ListReviews from "../review/ListReviews";

const RoomDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { room, error = "" } = useSelector((state) => state.room);
  const { available } = useSelector((state) => state.checkBooking);
  const { dates = [] } = useSelector((state) => state.bookedDates);

  const { user } = useSelector((state) => state.auth);

  const [value, setValue] = React.useState(new Date());
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const excludedDates = [];
  dates.map((date) => {
    excludedDates.push(new Date(date));
  });

  const { id } = router.query;
  const onDateChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000
      );

      setDaysOfStay(days);

      dispatch(
        checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
      );
    }
  };

  const newBookingHandler = async () => {
    const bookingDate = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS"
      }
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const { data } = await axios.post("/api/bookings", bookingDate, config);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;

    try {
      const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;
      const { data } = await axios.get(link, { params: { amount } });

      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId: data.id });
      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getBookedDates(id));

    error && toast.error(error);
  }, [dispatch, id]);

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
              <Typography
                gutterBottom
                color="textPrimary"
                variant="h6"
                mb={1}
                mt={2}
              >
                Pick checkin and checkout dates
              </Typography>
              <DatePicker
                selected={checkInDate}
                startDate={checkInDate}
                endDate={checkOutDate}
                onChange={onDateChange}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />
              {available && (
                <Typography align="left" color="textPrimary" variant="body1">
                  Room is available. Book Here
                </Typography>
              )}
              {available !== null && !available && (
                <Typography align="left" color="textDanger" variant="body1">
                  Room is not available
                </Typography>
              )}
              {available && !user && (
                <Typography align="left" color="textPrimary" variant="body1">
                  Login to Book
                </Typography>
              )}
              {available && user && (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    bookRoom(room._id, room.pricePerNight);
                  }}
                  disabled={paymentLoading}
                >
                  Pay - ${daysOfStay * room.pricePerNight}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom color="textPrimary" variant="h5">
                Reviews
              </Typography>
              {room.reviews && room.reviews.length > 0 ? (
                <ListReviews reviews={room.reviews} />
              ) : (
                <p>No Reviews on this room</p>
              )}
            </CardContent>
            <NewReview />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomDetailsPage;
