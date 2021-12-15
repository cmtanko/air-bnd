import Booking from "../../models/Booking";
import ErrorHandler from "../../utils/errorHandler";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";
import APIFeatures from "../../utils/apiFeatures";

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

  console.warn(req.body);
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

  console.warn(booking);
  res.status(200).json({
    success: true,
    booking
  });
});

const checkRoomBookingsAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checckOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checckOutDate = new Date(checckOutDate);

  const booking = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checckOutDate
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

  console.warn(booking);
  res.status(200).json({
    success: true,
    booking
  });
});

export { newBooking, checkRoomBookingsAvailability };
