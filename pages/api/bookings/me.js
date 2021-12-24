import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";
import { isAuthenticatedUser } from "../../../_Server/middlewares/auth";

import { myBookings } from "../../../_Server/controllers/booking/bookingController";

const handler = nc({ onError });
dbConnect();
handler.use(isAuthenticatedUser).get(myBookings);

export default handler;
