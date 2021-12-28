import Moment from "moment";
import Room from "../../models/room";
import User from "../../models/user";
import Booking from "../../models/Booking";
import { extendMoment } from "moment-range";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";

const moment = extendMoment(Moment);

// Create new room   =>   /api/rooms
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    paidAt,
    amountPaid,
    daysOfStay,
    paymentInfo,
    checkInDate,
    checkOutDate
  } = req.body;

  const booking = await Booking.create({
    room,
    daysOfStay,
    amountPaid,
    paymentInfo,
    checkInDate,
    checkOutDate,
    paidAt: Date.now(),
    user: req.user._id
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
