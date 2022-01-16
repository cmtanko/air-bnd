import Location from "../../models/Location";
import Suggestion from "../../models/Suggestion";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";

const allLocations = catchAsyncErrors(async (req, res, next) => {
  const locations = await Location.find();

  res.status(200).json(locations);
});

const allSuggestions = catchAsyncErrors(async (req, res, next) => {
  const suggestions = await Suggestion.find();

  res.status(200).json(suggestions);
});

export { allLocations, allSuggestions };
