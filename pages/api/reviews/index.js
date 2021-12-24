import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { createRoomReview } from "../../../_Server/controllers/rooms/roomControllers";
import { isAuthenticatedUser } from "../../../_Server/middlewares/auth";

const handler = nc({ onError });
dbConnect();
handler.use(isAuthenticatedUser).put(createRoomReview);

export default handler;
