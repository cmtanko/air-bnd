import Booking from "../../models/Booking";
import Room from "../../models/room";
import User from "../../models/user";
import ErrorHandler from "../../utils/errorHandler";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";
import APIFeatures from "../../utils/apiFeatures";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Create new room   =>   /api/rooms
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now()
  });

  res.status(200).json({
    success: true,
    booking
  });
});

const checkRoomBookingsAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate
        }
      },
      {
        checkOutDate: {
          $gte: checkInDate
        }
      }
    ]
  });

  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable
  });
});

const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];
  const timeDiff = moment().utcOffset() / 60;

  bookings.map((booking) => {
    const checkInDate = moment(booking.checkInDate).add(timeDiff, "hours");
    const checkOutDate = moment(booking.checkOutDate).add(timeDiff, "hours");

    const range = moment.range(checkInDate, checkOutDate);

    const dates = Array.from(range.by("day"));

    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates
  });
});

const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name pricePerNight images"
    })
    .populate({
      path: "user",
      select: "name email"
    });

  res.status(200).json({
    success: true,
    bookings
  });
});

const getBookingDetails = catchAsyncErrors(async (req, res) => {
  debugger;
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images"
    })
    .populate({
      path: "user",
      select: "name email"
    });

  res.status(200).json({
    success: true,
    booking
  });
});

export {
  myBookings,
  newBooking,
  getBookingDetails,
  checkBookedDatesOfRoom,
  checkRoomBookingsAvailability
};
