import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(process.env.DB_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((con) => console.log("Connected to local database"))
    .catch((err) => console.error("Unable to Connect with MongoDB" + err));
};

export default dbConnect;
