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

const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.firstName + " " + req.body.lastName;
    user.email = req.body.email;

    if (req.body.password) user.password = req.body.password;
  }

  await user.save();

  res.status(200).json({
    success: true
  });
});

export { registerUser, currentUserProfile, updateProfile };
