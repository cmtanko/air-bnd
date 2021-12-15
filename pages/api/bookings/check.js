import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { checkRoomBookingsAvailability } from "../../../_Server/controllers/booking/bookingController";

const handler = nc({ onError });
dbConnect();
handler.get(checkRoomBookingsAvailability);

export default handler;
