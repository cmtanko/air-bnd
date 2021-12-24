import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { getBookingDetails } from "../../../_Server/controllers/booking/bookingController";
import { isAuthenticatedUser } from "../../../_Server/middlewares/auth";

const handler = nc({ onError });
dbConnect();
handler.use(isAuthenticatedUser).get(getBookingDetails);

export default handler;
