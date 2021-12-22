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

export { newBooking, checkRoomBookingsAvailability };
