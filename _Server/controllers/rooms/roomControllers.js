import Room from "../../models/room";
import Booking from "../../models/Booking";
import ErrorHandler from "../../utils/errorHandler";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";
import APIFeatures from "../../utils/apiFeatures";

const allRooms = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 6;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  apiFeatures.pagination(resPerPage);
  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms
  });
});

// Create new room   =>   /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room
  });
});

// Get room details   =>   /api/rooms/:id
const getRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    room
  });
});

// Update room details   =>   /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    room
  });
});

// Delete room   =>   /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room is deleted."
  });
});

const checkReviewAvailability = catchAsyncErrors(async (req, res, next) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  let isReviewAvailable = bookings.length > 0;

  res.status(200).json({
    success: true,
    isReviewAvailable
  });
});

const createRoomReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.map((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  });
});

export {
  allRooms,
  newRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  checkReviewAvailability,
  createRoomReview
};
