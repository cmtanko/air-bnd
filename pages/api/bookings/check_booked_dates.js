import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { checkBookedDatesOfRoom } from "../../../_Server/controllers/booking/bookingController";

const handler = nc({ onError });
dbConnect();
handler.get(checkBookedDatesOfRoom);

export default handler;
