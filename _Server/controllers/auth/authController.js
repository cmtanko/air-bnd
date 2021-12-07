import Room from "../../models/room";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";
import APIFeatures from "../../utils/apiFeatures";
import User from "../../models/user";

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    name: firstName + " " + lastName,
    email,
    password,
    avatar: {
      public_id: "PUBLIC_ID",
      url: "URL"
    }
  });

  res.status(200).json({
    success: true,
    message: "Account Registerd Successfully"
  });
});

const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user
  });
});

export { registerUser, currentUserProfile };
